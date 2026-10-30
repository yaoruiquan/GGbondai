# 架构总览

- 状态：已实现（基于开源上游 sub2api）
- 更新日期：2026-10-30
- 关联：`DEV_GUIDE.md`、`deploy/production/`

## 1. 系统组成

```
用户 / API 客户端
      │ HTTPS
      ▼
   Caddy（自动证书、反向代理、蓝绿双 upstream）
      │
      ▼
 GGbondai 应用（Go 单二进制，内嵌前端静态资源）
      │                    │
      ▼                    ▼
 PostgreSQL            Redis
 （业务数据）          （缓存、限流、会话）
      │
      ▼
 上游模型服务（OpenAI / Claude / Gemini / Antigravity 等账号池）
```

## 2. 技术栈

| 层 | 技术 |
|------|------|
| 后端 | Go 1.26、Gin、Ent（ORM）、Wire（依赖注入）、go-redis |
| 前端 | Vue 3、TypeScript、Vite、Tailwind CSS、Pinia、Vue Router、vue-i18n |
| 测试 | Go `testing`；前端 Vitest |
| 数据 | PostgreSQL 18、Redis 8 |
| 部署 | Docker Compose、Caddy 2、GitHub Actions + GoReleaser、GHCR |

## 3. 代码结构

| 路径 | 说明 |
|------|------|
| `backend/cmd/server` | 服务入口 |
| `backend/internal/handler` | HTTP 处理层（含 `dto/`） |
| `backend/internal/service` | 业务逻辑 |
| `backend/internal/repository` | 数据访问 |
| `backend/internal/payment` | 支付与计费 |
| `backend/internal/web` | 通过 `//go:embed all:dist` 内嵌前端构建产物 |
| `backend/ent` | Ent schema 与生成代码 |
| `backend/migrations` | SQL 迁移 |
| `frontend/src` | 前端源码；文案在 `i18n/locales/{zh,en}` |
| `deploy/production` | 生产 Compose、Caddyfile、发布/回滚/备份脚本 |

## 4. 关键约定

- **品牌**：站点名默认 `GGbond AI`，可在后台设置覆盖；GGbond 文案在 i18n 的 `ggbond.*` 与 `home.*` 命名空间（`ggbond.ts`、`home-ggbond.ts`）
- **配置**：密钥与 OAuth 凭据只从环境变量读取，模板见 `deploy/production/.env.example`
- **发布**：镜像 tag 为 `YYYY.MM.DD-N`，禁止 `latest` 上生产；蓝绿切换由 `deploy/production/switch.sh` 完成
- **在线更新**：后台更新/回滚检查 `yaoruiquan/GGbondai` 的 GitHub Release
- **命名遗留**：Go 模块路径 `github.com/Wei-Shaw/sub2api`、数据库名 `sub2api`、容器名 `sub2api-*` 沿用上游，不影响隔离

## 5. 待补充

后端分层细节、数据模型、网关转发与计费链路，见 [architecture/README.md](README.md) 的建议拆分。
