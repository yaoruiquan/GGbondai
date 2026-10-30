# 服务器部署指南

- 更新日期：2026-10-30
- 状态：有效
- 关联：[隔离核查报告](../reports/2026-10-30-company-isolation-audit.md)、`deploy/production/README.md`

部署方案沿用仓库内的 `deploy/production`：Docker Compose + 容器化 Caddy（自动 HTTPS）+ 蓝绿零中断发布。

## 1. 前置条件

| 项目 | 要求 |
|------|------|
| 服务器 | Linux（推荐 Ubuntu 22.04/24.04），建议 2C4G 起步，x86_64 |
| 软件 | Docker（含 Compose v2）、Git |
| 域名 | 已添加 A 记录，例如 `api.你的域名` → 服务器公网 IP |
| 备案 | 服务器在**中国大陆**时，域名必须完成 ICP 备案，否则 80/443 无法访问；海外/香港服务器无需备案 |
| 防火墙 / 安全组 | 仅放行 22、80、443 |

## 2. 第一步：构建镜像（GitHub Actions）

仓库已配置 `.github/workflows/release.yml`，推送 `v*` tag 即自动构建并推送镜像到 GHCR。

1. 确保所有改动已提交并合并到 `main`（镜像基于已提交代码构建）。
2. 推荐在 GitHub 仓库 Settings → Variables 中添加 `SIMPLE_RELEASE=true`，只构建 amd64 镜像，速度更快。
3. 打 tag 并推送（格式必须为 `vYYYY.MM.DD-N`，否则部署 job 会拒绝）：

```bash
git checkout main && git pull
git tag v2026.10.30-1
git push origin v2026.10.30-1
```

4. 构建完成后，在 GitHub → Packages 中找到 `ggbondai`：
   - GHCR 新包默认**私有**。可将其设为 Public；
   - 或在服务器上用带 `read:packages` 权限的 PAT 登录：`docker login ghcr.io -u yaoruiquan`。

> 备选：在服务器上直接构建镜像 `IMAGE_REPO=ghcr.io/yaoruiquan/ggbondai ./deploy/build_production_image.sh 2026.10.30-1`（需服务器能访问 Go / npm 源，构建较慢）。

## 3. 第二步：初始化服务器

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # 重新登录后生效

# 拉取部署清单
sudo git clone https://github.com/yaoruiquan/GGbondai.git /opt/ggbondai
sudo chown -R $USER:$USER /opt/ggbondai
cd /opt/ggbondai/deploy/production
cp .env.example .env
```

## 4. 第三步：填写 `.env`

随机密钥统一用 `openssl rand -hex 32` 生成。

| 变量 | 必填 | 示例 / 说明 |
|------|:---:|------|
| `IMAGE_TAG` | 是 | `2026.10.30-1`（不带 `v`，禁止 `latest`） |
| `GGBONDAI_DOMAIN` | 是 | `api.你的域名` |
| `GGBONDAI_ACME_EMAIL` | 否 | 证书到期通知邮箱 |
| `POSTGRES_PASSWORD` | 是 | 随机密钥 |
| `REDIS_PASSWORD` | 是 | 随机密钥 |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | 是 | 首次启动自动创建的管理员 |
| `JWT_SECRET` | 是 | 随机密钥，必须固定，否则重启后登录态失效 |
| `TOTP_ENCRYPTION_KEY` | 是 | 随机密钥，必须固定，否则重启后 2FA 失效 |
| `TZ` | 否 | 默认 `Asia/Shanghai` |

Gemini / Antigravity OAuth、URL 白名单、更新代理等可选项见 `.env.example` 注释。

```bash
chmod 600 .env
```

## 5. 第四步：首次启动

```bash
cd /opt/ggbondai/deploy/production

# 校验配置（缺必填项会直接报错）
docker compose --profile blue --profile green config -q

# 启动基础服务与 blue 实例
docker compose up -d postgres redis caddy
docker compose --profile blue up -d sub2api-blue
echo blue > .active_color

# 观察日志：确认证书签发成功、应用启动正常
docker compose logs -f sub2api-blue caddy
```

访问 `https://你的域名`，用管理员账号登录，**立即修改初始密码**。

健康检查：

```bash
curl -fsS https://你的域名/health
./smoke-test.sh
```

> 注意：蓝绿模式下不要执行裸 `docker compose up -d`，它会同时拉起 blue 和 green。

## 6. 日常发布与回滚

**手动发布**：

```bash
cd /opt/ggbondai/deploy/production
git pull                          # 同步部署脚本
# 修改 .env 中的 IMAGE_TAG 为新版本
./deploy.sh                       # 检查 → 备份 → 迁移 → 蓝绿切换
```

**回滚**：

```bash
./rollback.sh 2026.10.30-1
# 若上次发布包含不兼容迁移（删列/改类型），先用 restore.sh 恢复数据库再回滚
```

**自动发布（可选）**：在 GitHub 仓库 Settings → Environments 创建 `production`，配置：

| 类型 | 名称 | 值 |
|------|------|------|
| Variable | `PRODUCTION_DEPLOY_ENABLED` | `true` |
| Variable | `PRODUCTION_SSH_HOST` | 服务器 IP |
| Variable | `PRODUCTION_SSH_USER` | 部署用户 |
| Variable | `PRODUCTION_URL` | `https://你的域名` |
| Variable | `PRODUCTION_DEPLOY_PATH` | `/opt/ggbondai`（默认值，可省略） |
| Secret | `PRODUCTION_SSH_PRIVATE_KEY` | 部署专用 SSH 私钥 |
| Secret | `PRODUCTION_SSH_KNOWN_HOSTS` | 本地执行 `ssh-keyscan 服务器IP` 的输出 |

配置后，推送新 tag 即自动构建、部署并做健康检查。

## 7. 备份

```bash
# crontab -e，每天凌晨 3 点备份
0 3 * * * cd /opt/ggbondai && ./deploy/production/backup.sh >> /var/log/ggbondai-backup.log 2>&1
```

默认备份到 `deploy/production/backups`，建议通过 `BACKUP_DIR` 指向独立磁盘，并定期同步到对象存储。

## 8. 常用命令

```bash
cat .active_color                                        # 当前活跃色
docker compose --profile blue --profile green ps         # 服务状态
docker compose logs -f sub2api-<color> caddy             # 查看日志
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile   # 重载 Caddy
```

## 9. 常见问题

| 现象 | 排查 |
|------|------|
| 证书签发失败 | 域名是否已解析到本机；80/443 是否放行；大陆服务器是否已备案 |
| `docker pull` 401 / denied | GHCR 包是否为 Public，或服务器是否已 `docker login ghcr.io` |
| 国内服务器拉镜像很慢 | 配置 Docker 镜像加速，或在本地 `docker save` 后 `scp` 到服务器 `docker load` |
| 重启后全部掉登录 | `JWT_SECRET` 未固定 |
| 重启后 2FA 失效 | `TOTP_ENCRYPTION_KEY` 未固定 |
