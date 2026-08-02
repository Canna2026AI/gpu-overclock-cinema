# GPU 视觉展示官网产品需求文档（PRD）

| 字段 | 内容 |
| --- | --- |
| 产品名称 | GPU — The Meme-Stock Engine |
| 文档版本 | V1.0 |
| 文档状态 | 已上线版本基线 |
| 更新日期 | 2026-08-02 |
| 当前公开地址 | https://gpu-overclock-cinema.vercel.app |
| 官方 X | https://x.com/GPUonBSC |
| DexScreener | https://dexscreener.com/bsc/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e |

## 1. 文档目的

本文档定义 GPU 视觉展示官网的产品定位、页面范围、内容边界、交互规范、技术要求和验收标准，作为设计、前端、内容、运营及后续协作者的统一交付基线。

当前 V1 已在 Vercel 公开上线。后续任何改版应通过 GitHub 分支和 Pull Request 提交，在不破坏品牌叙事、风险提示与可访问性的前提下迭代。

## 2. 产品背景与定位

`$GPU` 是基于 Four.meme 新 Meme-Stock 机制推出的 meme token，并与 tokenized NVIDIA stock（`$NVDAb`）直接配对。官网负责将“华尔街 AI 超级周期”与“BSC 高速 meme 流动性”的叙事转化为可传播、可记忆的视觉体验。

网站定位为英文单页品牌展示站，不承担交易、钱包连接、实时行情、账户系统或社区后台功能。

核心英文介绍：

> $GPU is the premier meme token launched from Four.meme’s new Meme-Stock mechanism, paired directly against tokenized NVIDIA stock ($NVDAb). Bridging Wall Street's AI supercycle with high-velocity BSC meme liquidity.

## 3. 产品目标

1. 在首屏快速建立 `$GPU`、Meme × Stock、AI supercycle 和 BSC 的品牌关联。
2. 使用七张品牌素材形成电影化、连续的滚动叙事，提高视觉记忆和社交传播价值。
3. 将用户稳定引导至官方 X 与 DexScreener，不在站内制造交易或收益承诺。
4. 在桌面和移动设备保持清晰、流畅、可访问，并支持减少动态效果设置。
5. 提供公开、可协作的 GitHub 源码，支持 Fork、分支开发、Pull Request 审核与合并。

## 4. 非目标

- 不提供钱包连接、Swap、购买按钮或站内交易。
- 不提供静态或实时价格、K 线、市值、持仓量、收益率等行情数据。
- 不新增后端、数据库、用户账户或公开 API。
- 不发布未经确认的 tokenomics、路线图、收益承诺或合作关系。
- 不暗示与 NVIDIA Corporation 存在官方关联。

## 5. 目标用户与主要场景

### 5.1 目标用户

- 从 X、社区消息或合作传播进入的加密用户。
- 对 BSC、Four.meme、Meme-Stock、AI 或 GPU 文化感兴趣的用户。
- 需要快速理解品牌气质、获取官方入口的媒体、创作者和潜在协作者。

### 5.2 主要场景

1. 用户打开社交分享链接，在数秒内理解 GPU 的品牌定位。
2. 用户滚动浏览 Power、Velocity、Culture 三段视觉叙事。
3. 用户在胶片画廊中查看全部七张品牌素材。
4. 用户点击 X 了解官方动态，或点击 View Chart 前往 DexScreener。
5. 开发者从 GitHub Fork 项目、提交修改并通过 Pull Request 合并回来。

## 6. 产品原则

- **Visual first：** 影像是第一信息层，文字短、硬、有节奏。
- **Overclock Cinema：** 黑色基底、金色光线和荧光绿信号色构成电影式叙事。
- **Fast by design：** 使用优化后的 WebP、Next/Image 和轻量动效控制加载成本。
- **Trust by clarity：** 外链、概念图标注、关联声明和风险提示必须清晰。
- **Accessible motion：** 键盘、焦点、替代文本和 `prefers-reduced-motion` 是基础要求。

## 7. 信息架构与页面模块

| 模块 | 产品目的 | 核心内容 | 主要交互 |
| --- | --- | --- | --- |
| 固定导航 | 提供快速定位与转化入口 | GPU、Manifesto、Gallery、X、View Chart | 锚点滚动；外链新标签页打开 |
| Hero 首屏 | 在数秒内建立品牌认知 | 城市主视觉、The Meme-Stock Engine、核心介绍、双 CTA | 轻微文字揭示、滚动提示 |
| Manifesto | 解释 Meme × Stock 叙事 | Meme Energy / Stock Gravity、AI Supercycle、BNB Chain、NVDAb Pair | 滚动进入揭示 |
| Power | 表达算力与 AI 文化 | 云端显卡主视觉、Compute becomes culture | 全屏影像、微视差 |
| Velocity | 表达 BSC 速度与传播 | GPU 卡车主视觉、High performance. Open road. | 全屏影像、微视差 |
| Culture | 表达构建者与社区文化 | 工作站主视觉、Build it. Power it. Dominate. | 全屏影像、微视差 |
| Gallery | 完整呈现七张品牌素材 | 横向胶片式画廊、标题和帧序号 | 横向滚动、按钮、左右方向键 |
| Final CTA | 完成情绪收束和外链转化 | 游艇主视觉、Follow on X、Open DexScreener | 双 CTA |
| Footer | 提供法律和风险信息 | 外链、NVIDIA 非关联声明、数字资产风险提示 | 外链新标签页打开 |

## 8. 详细功能需求

### 8.1 导航与外链

- 导航在桌面端固定显示；移动端需保留品牌与关键 CTA，避免遮挡内容。
- 站内链接定位至 `#gpu`、`#manifesto`、`#gallery`。
- X 与 DexScreener 必须使用文档首页列出的固定 URL。
- 所有外链在新标签页打开，并设置 `rel="noopener noreferrer"`。
- 所有交互控件必须有清晰的 hover、focus-visible 和 keyboard 状态。

### 8.2 视觉素材

- 七张素材必须全部出现：hero-city、meme-stock、power-cloud、velocity-truck、culture-workstation、market-concept、yacht。
- 图片使用准确英文替代文本；装饰性遮罩不进入可访问性树。
- 首屏主视觉优先加载，非首屏图片按框架策略延迟加载。
- 移动端允许裁切，但不得裁掉主要角色、GPU 标识或关键叙事主体。

### 8.3 胶片画廊

- 画廊支持触控横滑、鼠标横向滚动、上一帧/下一帧按钮和左右方向键。
- 每帧包含标题与序号，滚动位置使用 snap 提升可控性。
- market-concept 图片必须始终显示 `CONCEPT ART — NOT LIVE MARKET DATA`。

### 8.4 动效

- 允许使用光扫、文字揭示、微视差和低幅图片缩放。
- 动效必须克制，不能妨碍阅读、点击或滚动。
- 在 `prefers-reduced-motion: reduce` 下禁用视差、缩放、闪烁和自动平滑滚动。
- 页面核心信息不能依赖动画完成后才可读取。

### 8.5 响应式与可访问性

- 重点覆盖 390px 移动宽度、常见平板和 1440px 桌面宽度。
- 使用语义化 heading 层级、landmark、skip link 和准确 alt 文本。
- 正文、按钮和风险提示在图片背景上必须保持足够对比度。
- 页面可完全通过键盘浏览，焦点不得被隐藏或锁定。

## 9. 内容规范

### 9.1 可使用内容

- 用户确认的核心英文介绍。
- 官方 X 与 DexScreener 项目简介中可验证的短句。
- Power、Velocity、Culture 等品牌化、非收益型叙事。

### 9.2 禁止内容

- 未确认的 tokenomics、路线图、审计、合作方或交易所信息。
- 保证收益、价格目标、倒计时、FOMO 承诺或任何财务建议。
- 伪造或过时的市场数字、排行榜、持仓或成交数据。
- 暗示 NVIDIA Corporation 官方背书、合作或从属关系的表达。

### 9.3 必须保留的提示

- `CONCEPT ART — NOT LIVE MARKET DATA`
- `$GPU is an independent meme token and is not affiliated with NVIDIA Corporation.`
- `Digital assets involve risk. Nothing on this site is financial advice.`

## 10. 视觉与交互规范

| 项目 | 规范 |
| --- | --- |
| 视觉方向 | Overclock Cinema；全屏影像、深黑空间、金色体积光、荧光绿信号 |
| 核心颜色 | Black `#030503`；Acid Green `#C7FF00`；Gold `#FFB000` |
| 排版 | 大号 display 标题、紧凑大写标签、等宽或工业感 UI 文本 |
| 版式 | 影像全出血；文本使用高对比遮罩；章节保持强节奏与留白 |
| 动效 | 轻量 CSS 为主，少量滚动状态；移动端自动简化 |
| 语气 | 自信、简短、性能导向；避免复杂技术解释和投资承诺 |

## 11. 技术要求

- 使用 Next.js App Router、React 和 TypeScript，单路由静态展示。
- 主要实现位于 `app/page.tsx`、`app/globals.css`、`app/layout.tsx`，交互组件拆分至独立客户端组件。
- 使用 Next/Image 与优化后的 WebP 资源；Open Graph 分享图使用 `public/og.jpg`。
- 站点不依赖数据库、钱包 SDK、行情 API 或第三方运行时密钥。
- 生产部署目标为 Vercel；域名接入可在后续版本通过 DNS 配置完成。
- GitHub 仓库为源码事实来源，`main` 为可部署主分支，所有外部修改通过 Pull Request 合并。

## 12. 产品指标建议

V1 不强制接入分析工具。后续若启用，应只收集必要的匿名产品数据：

- 页面访问量与来源渠道。
- X CTA 与 DexScreener CTA 点击率。
- Manifesto、Gallery、Final CTA 的滚动到达率。
- 移动端与桌面端访问比例。
- Core Web Vitals 与前端错误率。

不得在未披露的情况下采集钱包地址、账户身份或跨站敏感信息。

## 13. 验收标准

- 生产构建和 ESLint 检查成功，无 starter 占位内容。
- 桌面端与 390px 移动端布局无横向溢出、遮挡或不可读文字。
- 七张素材全部出现，裁切合理且拥有准确英文替代文本。
- X 与 DexScreener URL 完全正确，并安全地在新标签页打开。
- 页面无行情接口、钱包连接、虚构 token 数据或收益承诺。
- market-concept 图片始终显示概念图提示。
- 减少动态效果模式下无视差、缩放、闪烁或强制平滑滚动。
- 键盘可访问导航、CTA 和画廊控件，焦点清晰可见。
- 页面标题、描述、favicon、Open Graph 与 X 分享元数据完整。
- Vercel 部署状态为 Ready，公开 URL 可在无登录状态下访问。
- GitHub 仓库公开，README、贡献流程、PRD 和完整源码可查看。

## 14. 风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 大图导致首屏慢 | 降低访问和转化 | WebP、响应式尺寸、首屏 priority、其余图片延迟加载 |
| 图片裁切损失主体 | 品牌信息不完整 | 为各断点单独检查 object-position 与文字遮罩 |
| 视觉动效造成眩晕 | 可访问性问题 | 支持 reduced motion，限制运动幅度和频率 |
| 概念行情被误解 | 信任与合规风险 | 固定显示 NOT LIVE MARKET DATA 标签 |
| NVIDIA 关联误解 | 品牌与法律风险 | 页脚保留明确非关联声明 |
| 外部贡献引入错误 | 线上质量回退 | 分支保护、Pull Request、自动构建和测试后再合并 |

## 15. 版本规划

| 版本 | 状态 | 范围 |
| --- | --- | --- |
| V1.0 | 已上线 | 英文单页、七张素材、完整视觉叙事、画廊、X/Dex CTA、风险提示、Vercel 部署 |
| V1.1 | 建议 | 自定义域名、匿名分析、社交分享验证、GitHub 分支保护与 Vercel 自动预览 |
| V1.2 | 可选 | 更精细的断点裁切、内容后台或轻量公告位；仍不接入交易功能 |
| V2.0 | 待评估 | 社区内容、更多语言或互动叙事；需单独评审安全、性能和内容范围 |

## 16. 附录：链接与资产清单

### 16.1 固定链接

- X：https://x.com/GPUonBSC
- DexScreener：https://dexscreener.com/bsc/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e
- Vercel：https://gpu-overclock-cinema.vercel.app

### 16.2 视觉资产

| 文件 | 用途 |
| --- | --- |
| `public/gpu/hero-city.webp` | Hero 首屏与 Gallery |
| `public/gpu/meme-stock.webp` | Manifesto 与 Gallery |
| `public/gpu/power-cloud.webp` | Power 章节与 Gallery |
| `public/gpu/velocity-truck.webp` | Velocity 章节与 Gallery |
| `public/gpu/culture-workstation.webp` | Culture 章节与 Gallery |
| `public/gpu/market-concept.webp` | Gallery；必须显示概念图提示 |
| `public/gpu/yacht.webp` | Final CTA 与 Gallery |
| `public/og.jpg` | Open Graph 与 X 分享图 |
