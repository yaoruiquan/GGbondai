# GGbondai 项目交接

更新日期：2026-10-30

## 项目位置与 Git 状态

- 本地目录：`/Users/yao/LLM/GGbondai`
- 分支：`main`
- 远程：`origin` 指向 `https://github.com/yaoruiquan/GGbondai`
- 本次推送将创建仓库的首个提交；服务器尚未部署。
- 基础源码从公司工作区当时的已提交版本 `5fd22ed0` 复制。未复制公司 `.env`、运行数据、`outputs`、私钥或本机个人配置。

## 已完成

- 将站点品牌、生产镜像默认地址和个人部署路径调整为 GGbondai 使用的值。
- 生产 Compose 项目名设为 `ggbondai`，容器、网络和数据卷由 Compose 按项目隔离命名，不再固定使用全局容器名或卷名。
- 蓝绿切换脚本通过当前 Compose 项目管理 PostgreSQL、Redis、Caddy 和应用，不再按共享容器名扫描其他项目。
- 移除公司多站点 Caddy `conf.d` 导入和 SEP 专用忽略规则；移除只适用于上游仓库的 CLA 工作流及其 CLA 文件。
- 修复 API 接入指南的 i18n 命名空间，将测试与组件统一为 `ggbond.apiGuide`。
- 将 GoReleaser 的 GHCR 镜像名统一为 `ggbondai`，与生产 Compose 预期的 `ghcr.io/yaoruiquan/ggbondai` 一致。
- 修正个人部署说明中的过期容器名、资源名、镜像名和旧单实例迁移步骤。
- 按源项目 `docs` 分类补齐 `features/` 和 `plans/`；保留现有 `legal/` 文档。本仓库没有复制公司服务器采购、成本核算或运营交接材料。
- 移除 Antigravity / Gemini CLI 硬编码的 OAuth 客户端 ID 和 Secret，改为环境变量配置；缺失时返回明确错误。生产及通用 Compose 模板已补齐变量透传，测试使用假凭据。

## 验证记录

- `docker compose ... config -q`：通过，使用 `.env.example` 和临时 `IMAGE_TAG=check` 验证，未创建真实 `.env`。
- 生产目录下 shell 脚本 `bash -n`：通过。
- `ApiIntegrationGuide.spec.ts`：1 项测试通过。
- 前端 `pnpm run typecheck`：通过。
- OAuth 定向测试：`go test -tags=unit ./internal/pkg/antigravity ./internal/pkg/geminicli ./internal/service -run 'Test(GetClientSecret|ValidateOAuthConfig|Constants_|Client_|EffectiveOAuthConfig|BuildAuthorizationURL|GeminiOAuthService_)' -count=1` 通过。
- 后端 `go build ./cmd/server`：已验证通过。

## 部署前由项目所有者填写

1. 将 `deploy/production/.env.example` 复制为 `.env`，填写真实域名、管理员邮箱和初始密码。
2. 为 PostgreSQL、Redis、JWT 和 TOTP 分别生成独立随机密钥并妥善保存；不得提交 `.env`。
3. 确认域名 DNS A 记录指向个人服务器公网 IP，防火墙允许所需端口；确认 80/443 未被现有服务占用。
4. 发布个人 GitHub Release 后，使用实际版本号替换 `IMAGE_TAG`，确认服务器可拉取个人 GHCR 镜像。
5. 如需 GitHub Actions 自动部署，还需设置服务器 SSH 主机、用户、部署路径、私钥和 known_hosts。当前 release workflow 的生产部署 job 被显式禁用，配置完成后需由所有者审阅并启用。
6. 如需 Antigravity 或 Gemini CLI OAuth 登录，在服务器 `.env` 中成对填写 `ANTIGRAVITY_OAUTH_CLIENT_ID` / `ANTIGRAVITY_OAUTH_CLIENT_SECRET` 或 `GEMINI_CLI_OAUTH_CLIENT_ID` / `GEMINI_CLI_OAUTH_CLIENT_SECRET`，然后重建应用容器；不用对应登录流可留空。不得将真实值提交到 Git。

详细步骤见 [`deploy/production/README.md`](../deploy/production/README.md)。

## 后续注意

- 在确认代码与个人部署配置无误前，不要把 `.env`、密钥、服务器运行数据或公司资料加入仓库。
- 当前远程只包含本次提交的项目源码与模板；服务器尚未部署，真实部署参数仍需项目所有者配置。
- 未来的 token 组织化管理能力尚未实现，应在计划文档中跟踪，不作为当前功能描述。
