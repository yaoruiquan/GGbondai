# GGbondai 文档中心

本目录维护 GGbondai 的全套 spec 文档：需求、设计、架构、计划、运维和过程记录。代码改了行为，就要同步改对应的 spec。

## 目录结构

| 目录 | 放什么 | 典型文档 |
|------|------|------|
| [`product/`](product/README.md) | 产品需求与功能规格：系统**应该**怎么表现 | PRD、功能 spec、业务规则 |
| [`design/`](design/README.md) | 品牌、视觉与交互规范 | 品牌规范、色板、组件规范、页面设计 |
| [`architecture/`](architecture/README.md) | 技术架构与技术决策 | 架构总览、模块说明、数据模型、[ADR](architecture/adr/README.md) |
| [`plans/`](plans/README.md) | 尚未完成的方案与实施计划 | 重构方案、改版计划 |
| [`operations/`](operations/README.md) | 部署、运维、应急 | 部署指南、备份恢复、故障手册 |
| [`reports/`](reports/README.md) | 过程记录：某一时刻的结论，写完不再更新 | 阶段总结、核查报告、交接记录 |
| [`archive/`](archive/README.md) | 已被取代或已废弃的文档 | 旧方案、过期资料 |
| [`legal/`](legal/) | 合规文档 | 管理员合规声明 |
| [`templates/`](templates/) | 新建文档用的模板 | 功能 spec、ADR、计划 |

> `legal/` 的路径被前端代码和 Dockerfile 直接引用（`docs/legal/*.md?raw`），**不要移动或重命名**。

## 文档索引

### 运维
- [服务器部署指南](operations/deployment.md)

### 计划
- [落地页重做方案](plans/landing-redesign.md)（主要决定已确认，进行中）
- [前端重构方案](plans/frontend-refactor.md)（角色与配色部分已被落地页方案取代）

### 架构
- [架构总览](architecture/overview.md)

### 报告
- [2026-10-30 公司配置隔离核查](reports/2026-10-30-company-isolation-audit.md)
- [2026-10-30 项目交接](reports/2026-10-30-project-handover.md)
- [2026-10-30 阶段 2 总结](reports/2026-10-30-phase-2-summary.md)

### 归档
- [猪猪侠 IP 资料](archive/ggbond-ip-reference.md)（配色描述错误，已废弃）

## 编写规范

### 文件命名
- 英文小写 + 连字符：`api-key-quota.md`
- `reports/` 用日期前缀：`YYYY-MM-DD-主题.md`
- ADR 用四位编号：`architecture/adr/0001-主题.md`
- 每个目录有一个 `README.md`，说明用途并列出文档

### 文档头
每份文档开头写明元信息：

```markdown
# 标题

- 状态：草稿 | 评审中 | 已确认 | 已实现 | 已废弃
- 更新日期：YYYY-MM-DD
- 关联：相关文档、代码路径、PR
```

### 生命周期
1. 新想法 → 在 `plans/` 写计划（用 `templates/plan.md`）
2. 方案确认 → 在 `product/` / `design/` 写或更新 spec；有技术取舍时在 `architecture/adr/` 记 ADR
3. 实现完成 → spec 状态改为「已实现」，计划移到 `archive/`，必要时在 `reports/` 写总结
4. spec 被取代 → 移到 `archive/`，文档头注明被哪份文档取代

### 原则
- spec 描述**当前应有的行为**；过程和历史写进 `reports/`
- 不写入任何真实密钥、服务器 IP、公司环境配置或用户数据
- 改代码行为的 PR 同时更新对应 spec
- 新增文档后更新本索引和所在目录的 `README.md`
