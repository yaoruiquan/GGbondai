# 公司配置隔离核查报告

- 日期：2026-10-30
- 状态：已完成
- 关联：[服务器部署指南](../operations/deployment.md)

对照公司 sub2api（龙道 AI）仓库，核查 GGbondai 是否还残留公司配置、凭据和路径。


## 1. 核查方法

- 对照公司本地仓库 `sub2api`（远程 `tokeys/longdaoai`），对 GGbondai 做逐文件 diff；
- 全仓库扫描公司特征：`longdao` / `tokeys` / `龙道` / `longdaoai.cn` / `longdaoSEP.cn` / `longdao-network`、硬编码 IP、本机绝对路径、镜像仓库、OAuth 凭据；
- 检查 Git 历史、远程地址与已跟踪的敏感文件（`.env`、数据目录、`.docx` / `.xlsx`、密钥）。

## 2. 已隔离干净的项

| 类别 | 结论 |
|------|------|
| Git 历史 | 从 `73ede75 chore: initialize personal GGbondai repository` 全新开始，作者均为个人账号；仅有 `origin` 指向 `yaoruiquan/GGbondai`，无公司远程、无公司提交 |
| 公司域名与标识 | 未发现 `longdaoai.cn`、`longdaoSEP.cn`、`tokeys`、`longdao-network` |
| 公司文档与数据 | 未复制交接文档、成本核算、腾讯云采购说明、领导汇报、`deploy/.env`、`postgres_data` / `redis_data` / `data` |
| 硬编码 OAuth 凭据 | Gemini CLI、Antigravity 的 Client ID / Secret 已移除，改为环境变量 `GEMINI_CLI_OAUTH_CLIENT_ID`、`ANTIGRAVITY_OAUTH_CLIENT_ID` 等 |
| 品牌默认值 | 站点名、邮件站点名、TOTP Issuer 均为 `GGbond AI`；默认 Logo 为 `/logo.png` |
| 镜像仓库 | 统一为 `ghcr.io/yaoruiquan/ggbondai` |
| Compose 隔离 | 生产 Compose 项目名 `ggbondai`，网络 `ggbond-network`，容器/卷按项目命名空间隔离 |
| Caddy | 域名变量为 `GGBONDAI_DOMAIN` / `GGBONDAI_ACME_EMAIL`；公司 SEP 站点配置已移除 |
| 部署路径 | GitHub Actions 默认部署路径 `/opt/ggbondai` |
| 硬编码 IP / 本机路径 | 无（仅交接文档中记录了本地开发目录，不影响部署） |

## 3. 残留项处理结果

| 位置 | 原问题 | 处理 |
|------|------|------|
| `frontend/src/i18n/locales/{zh,en}/longdao.ts`、`home-longdao.ts`、变量 `homeLongdao` | 文件名/变量名仍为 longdao | 已重命名为 `ggbond.ts`、`home-ggbond.ts`、`homeGgbond` |
| `frontend/src/components/admin/payment/__tests__/orderCurrencyDisplay.spec.ts` | 注释中有“龙道 AI 用户端” | 已改为“GGbond AI 用户端” |
| `deploy/install.sh`、`deploy/docker-deploy.sh`、`deploy/sub2api.service` | 指向上游 `Wei-Shaw/sub2api` | 已改为 `yaoruiquan/GGbondai` |
| `deploy/docker-compose{,.local,.standalone}.yml` | 应用镜像为上游 `weishaw/sub2api:latest` | 已改为 `ghcr.io/yaoruiquan/ggbondai:latest` |
| `backend/internal/service/update_service.go`、`frontend/src/components/common/VersionBadge.vue` | 后台“在线更新/回滚”检查上游 Release，可能把个人版本替换成上游版本 | 已改为检查 `yaoruiquan/GGbondai`，回滚镜像为 `ghcr.io/yaoruiquan/ggbondai` |
| 数据库用户/库名 `sub2api`、容器 `sub2api-blue/green`、Go 模块路径 `github.com/Wei-Shaw/sub2api` | 上游开源命名，与公司无关 | 保留 |

## 4. 待决定（上游链接，非公司配置）

| 位置 | 说明 |
|------|------|
| `frontend/src/views/KeyUsageView.vue:437` | 公开的 Key 用量页显示上游 GitHub 链接，用户可见 |
| `frontend/src/components/layout/AppHeader.vue:158` | 管理员下拉菜单中的上游 GitHub 链接（仅管理员可见） |
| `frontend/src/views/admin/SettingsView.vue`（支付文档链接）、`adminCompliance.ts` / `AdminComplianceDialog.vue`（合规文档链接） | 指向上游仓库文档 |
| `README_CN.md` / `README_JA.md` 中的 `docs/PAYMENT*.md` | 本仓库不存在该文件，链接失效 |

验证：`go build ./...`、`go test ./internal/service -run 'Update|Rollback'`、前端 `pnpm run typecheck` 与相关 13 个测试文件（68 项）均通过。

## 5. 注意事项

- **不要复用公司密钥**：公司本地 `sub2api/deploy/.env` 中有真实密码与密钥，个人站所有密钥必须重新生成。
- **不要连接公司资源**：个人站使用独立的 PostgreSQL、Redis、Caddy，不与公司服务器共用。
- **开源许可**：上游 sub2api 为 **LGPL-3.0**，商业运营时保留 `LICENSE` 文件。
