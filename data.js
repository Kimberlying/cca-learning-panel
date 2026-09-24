/**
 * CCAR-F (Claude Certified Architect - Foundations) 备考全景数据库
 * 依据 Anthropic 官方 Exam Guide v1.0 及 2026-08-24 考纲总纲整理
 */

const examInfo = {
  title: "Claude Certified Architect - Foundations",
  code: "CCAR-F",
  aliases: ["CCA-F", "Claude Architect"],
  questionsCount: 60,
  durationMinutes: 120,
  seatTimeMinutes: 135,
  passingScore: 720,
  scoreRange: "100 - 1000",
  feeUSD: 125,
  validityMonths: 12,
  language: "English",
  format: "Multiple choice + multiple response (每题注明选几项)",
  delivery: "Pearson VUE 在线监考或考试中心",
  scenariosRule: "官方 6 个场景中每次随机抽 4 个",
  sourceVersion: "Effective July 2026 · Exam Guide v1.0",
};

const domains = [
  {
    code: "D1",
    title: "Agentic Architecture & Orchestration",
    weight: 27,
    order: 1,
    summary: "设计和编排高可靠、可扩展的自主 Agent 循环、多 Agent 协调、Hooks 与工作流。",
    topics: [
      {
        code: "1.1",
        title: "Agentic loop 与 stop_reason 推进机制",
        official: "Design and implement agentic loops for autonomous task execution",
        summary: "根据 stop_reason 推进 tool_use / tool_result 循环，并在 end_turn 正确终止。",
        keyPoints: [
          "标准循环：发送请求 → 检查 stop_reason → 若为 tool_use 执行工具 → 包装 tool_result 回传 → 递归推进直到 end_turn。",
          "完成信号：只有模型返回 stop_reason === 'end_turn' 时代表自主完成。",
          "生产全面分支：除核心二分外，真实工程还必须处理 max_tokens（超长截断）、pause_turn、refusal（模型拒答）、model_context_window_exceeded 等。",
        ],
        antiPatterns: [
          "[反模式] 依靠解析自然语言文本（如判断 'I am done'、'Finished'）作为循环结束依据。",
          "[反模式] 仅检查 assistant 返回文本而不检查 stop_reason。",
          "[反模式] 把固定的最大轮数（max_iterations）作为主要完成判断（最大轮数只能是兜底熔断，不是正常完成）。",
        ],
        evidence: "画出完整的 agentic loop 状态机，列出至少 3 种反模式并给出 stop_reason 完整处理代码伪代码。",
      },
      {
        code: "1.2",
        title: "Coordinator-Subagent 多 Agent 编排架构",
        official: "Orchestrate multi-agent systems with coordinator-subagent patterns",
        summary: "基于 Hub-and-Spoke 模式，由协调器负责拆解任务、委派执行、聚合结果与错误路由。",
        keyPoints: [
          "Hub-and-spoke 拓扑：中央协调器掌握全局目标，子 Agent 专注于单一隔离领域，结果回传给协调器聚合判断。",
          "上下文绝对隔离：子 Agent 默认不共享主会话上下文，也不与其他子 Agent 共享上下文，必须显式传递入参。",
          "开放性研究：协调器先划定互不重叠的研究范围（MECE）；若子 Agent 报告证据不足，协调器再动态补派。",
        ],
        antiPatterns: [
          "[反模式] 允许子 Agent 之间互相直接调用和横向网状通信（调试灾难、状态失控）。",
          "[反模式] 跳过协调器直接将原始子 Agent 输出拼接呈现给用户。",
          "[反模式] 任务拆分过细过窄，导致子 Agent 频繁丢失上下文且无法发现跨领域关联。",
        ],
        evidence: "为复杂代码审查或多源情报研究任务绘制 Hub-and-Spoke 数据流图，说明入参与出参边界。",
      },
      {
        code: "1.3",
        title: "Subagent 调用、上下文显式传递与并行化",
        official: "Configure subagent invocation, context passing, and spawning",
        summary: "显式向子 Agent 注入前序发现、约束边界与来源追溯，识别独立分支并发执行以降低延迟。",
        keyPoints: [
          "显式上下文传递：前序 findings、明确目标、不可逾越约束、来源元数据与结构化输出格式。",
          "并发优化：同一轮推理中若有多个互不依赖的子任务，协调器应一次性发起多个调用并行执行，极大缩短总体耗时。",
          "AgentDefinition 核心要素：清晰专一的 description、精准的 system prompt、受限工具集与最小权限。",
          "版本注意：官方 Exam Guide 习惯使用 Task 工具，当前 Claude Agent SDK 已升级为 Agent 工具。",
        ],
        antiPatterns: [
          "[反模式] 试图让子 Agent 自动继承父会话全部历史聊天记录（导致上下文污染和 Token 爆炸）。",
          "[反模式] 将串行没有依赖的 4 个查询依次排队调用，带来数倍的延迟惩罚。",
          "[反模式] 给子 Agent 分配与其专职无关的宽泛高危工具集。",
        ],
        evidence: "写出一份标准子 Agent 提示词模板，包含 findings 承接、边界限制、输出 schema 与并行调用示例。",
      },
      {
        code: "1.4",
        title: "多步工作流中的强制顺序控制与结构化交接 (Handoff)",
        official: "Implement multi-step workflows with enforcement and handoff patterns",
        summary: "区分自然语言 Prompt 软指导与程序级前置条件硬控制，设计规范的人工接管 Handoff。",
        keyPoints: [
          "核心分水岭：关键业务顺序（如先验身份再退款、先执行 dry-run 再落库）必须由程序代码/状态机/拦截器强制执行，绝对不能仅凭 Prompt 祈求模型遵守！",
          "复合需求分解：用户一个输入包含多项请求时，先解耦为独立调查项并行获取事实，最后统一合成回复。",
          "结构化人机交接 (Human Handoff)：人工接管必须包含结构化卡片（用户ID、意图、根因排查、已尝试步骤、潜在风险、建议下一步）。",
        ],
        antiPatterns: [
          "[反模式] 仅在 Prompt 中写「请务必在核验身份后再退款」（属于概率性软约束，严重安全合规漏洞）。",
          "[反模式] 遇到情绪激动的用户立即裸露转接人工，未附带任何上下文和已排查事实。",
          "[反模式] 因单个非关键子项出错，直接中止整个多步骤工作流。",
        ],
        evidence: "设计一个带程序级前置校验的退款工作流，并给出标准 JSON Handoff 数据包契约。",
      },
      {
        code: "1.5",
        title: "Agent SDK Hooks 确定性拦截与数据归一化",
        official: "Apply Agent SDK hooks for tool call interception and data normalization",
        summary: "利用 PreToolUse 与 PostToolUse 钩子在工具执行前后注入确定性安全策略与数据清洗。",
        keyPoints: [
          "PreToolUse Hook：在工具实际执行前触发，用于校验参数合法性、核查角色权限、阻断高危越权调用（确定性防御）。",
          "PostToolUse Hook：在工具执行后触发，用于统一清洗工具返回的数据格式、脱敏敏感信息、补充来源元数据、裁剪巨量冗余字段。",
          "决策原则：涉及资产资金、系统破坏、隐私安全、合规合规优先选择 Hooks/硬拦截；语气风格、排版偏好选择 Prompt。",
        ],
        antiPatterns: [
          "[反模式] 试图用 Few-shot 或更严厉的 Prompt 语气去防止 Prompt Injection 或工具越权调用。",
          "[反模式] 在 PostToolUse 中不做字段裁剪，任由后端几十 KB 的全部数据库 dump 灌入 LLM 上下文。",
        ],
        evidence: "写出 PreToolUse 与 PostToolUse 的触发时机对比表，并编写一个防 SQL 注入/高危指令的 PreToolUse 逻辑。",
      },
      {
        code: "1.6",
        title: "固定流水线与动态任务分解策略",
        official: "Design task decomposition strategies for complex workflows",
        summary: "针对确定性流水线采用 Prompt Chaining，针对未知探索采用先 mapping 后动态规划的双阶段分解。",
        keyPoints: [
          "Prompt Chaining（顺序链）：适用于输入输出明确、步骤稳定可预测的流程（例如：抓取 → 提取 → 校验 → 归档）。",
          "Dynamic Decomposition（动态分解）：适用于需求未知或大型代码库探索，必须先由 Explore 阶段摸清边界，再动态生成执行计划。",
          "大型代码审查模式：采用两阶段法（Local Pass 逐文件局部检查 + Integration Pass 跨文件接口与数据流整合审查）。",
        ],
        antiPatterns: [
          "[反模式] 对极其确定的流水线使用自由发挥的动态规划模型，导致执行路径飘忽不定。",
          "[反模式] 在对大型代码库毫无勘探的情况下，直接一揽子输出修改全部文件的最终代码。",
        ],
        evidence: "分别给出一个适用 Prompt Chaining 和适用 Dynamic Decomposition 的具体业务场景，并说明架构选型理由。",
      },
      {
        code: "1.7",
        title: "Session 状态持久化、恢复 (Resume) 与分叉 (Fork)",
        official: "Manage session state, resumption, and forking",
        summary: "合理选用 Resume 会话继续、Fork 探索多分支以及新 Session + 结构化摘要的生命周期模式。",
        keyPoints: [
          "Resume（恢复）：当原任务上下文依然有效、需要继续未完成的工作时，直接加载已有 Session ID。",
          "Fork（分叉）：当需要基于同一当前基线对比方案 A 与方案 B 的效果时，从该点 Fork 出独立分支，互不干扰。",
          "New Session + Summary：当上下文已经冗余退化、或者底层代码/数据发生重大结构变化时，弃用旧上下文，抽取结构化摘要开启新会话。",
          "恢复通知：恢复会话后，必须显式在第一轮提示中明确告知 Agent 哪些文件或外部环境在此期间发生了变动。",
        ],
        antiPatterns: [
          "[反模式] 在代码库已经被其他分支重构后，依然盲目 Resume 旧 Session，导致模型基于过期代码产生幻觉改动。",
          "[反模式] 为了比较两个重构方向，在同一个会话中来回撤销与修改。",
        ],
        evidence: "总结 Resume、Fork 与 New Session 三者的边界矩阵，列举各自的最佳适用场景与反模式。",
      },
    ],
  },
  {
    code: "D2",
    title: "Tool Design & MCP Integration",
    weight: 18,
    order: 4,
    summary: "设计高精确度工具接口、结构化错误规范、合理分配工具面与集成 MCP 资源与内置工具。",
    topics: [
      {
        code: "2.1",
        title: "工具接口定义与描述边界清晰化",
        official: "Design effective tool interfaces with clear descriptions and boundaries",
        summary: "通过精准的工具名称、功能描述、何时用/何时不用及相似工具边界说明，杜绝工具误选。",
        keyPoints: [
          "优秀描述五要素：工具做什么、入参规范、返回值结构、何时调用（When to use）、何时绝对不要用（When NOT to use）。",
          "相似工具隔离：如果两个工具功能相近，必须在各自描述中明确声明对方的边界（例如 search_code_symbol vs search_text_content）。",
          "排查顺序：当模型频繁选错工具时，第一步永远是**重命名与重写描述**，而不是先加外围路由模型或写更长的系统提示词！",
        ],
        antiPatterns: [
          "[反模式] 工具描述过于简略，如「查询数据」，缺少边界与入参限制。",
          "[反模式] 两个工具功能重叠且描述含糊，直接增加一个判定分类器来做路由（过度设计典型）。",
          "[反模式] 在描述中包含过于宽泛或具有误导性的关键词，引发系统性选错偏置。",
        ],
        evidence: "为一组易混淆的数据库查询工具（只读查账本 vs 事务预检）编写符合 Anthropic 最佳实践的描述文本。",
      },
      {
        code: "2.2",
        title: "MCP 结构化错误响应与自愈机制",
        official: "Implement structured error responses for MCP tools",
        summary: "返回包含 isError, errorCategory, isRetryable 与 partial results 的结构化错误，避免流程盲目崩溃。",
        keyPoints: [
          "规范错误契约：返回字段应包含 `isError: true`、`errorCategory`（分类）、`isRetryable`（是否可重试）、人类可读原因、已尝试操作及 partial results。",
          "0 results vs Timeout：`0 results` 表示查询成功只是无匹配记录，绝不是系统错误；`timeout` 表示未完成，两者自愈策略完全不同！",
          "重试分类法：瞬态网络波动 (Transient) 或限流可局部指数退避重试；认证失败 (Permission) 或非法业务请求不可盲目重试，必须转交或报错。",
        ],
        antiPatterns: [
          "[反模式] 静默跳过 (Silent skip)：工具失败时直接返回空字符串或无事发生，导致 Agent 基于错误假设继续执行。",
          "[反模式] 串联崩溃：因为某一个非致命次要子任务工具报错，直接抛出未捕获异常中断整个 Agent 工作流。",
          "[反模式] 将 0 results 当成 Exception 抛出引发无限循环重试。",
        ],
        evidence: "设计一个标准的 MCP Error Schema JSON 规范，展示网络超时与数据未查到时的差异化返回值。",
      },
      {
        code: "2.3",
        title: "工具集分配 (Tool Allocation) 与 tool_choice 控制",
        official: "Distribute tools appropriately across agents and configure tool choice",
        summary: "为每个 Agent 裁剪最小必要工具集，善用 auto, any 及指定工具精准引导调用节奏。",
        keyPoints: [
          "最小权限原则：每个子 Agent 只装配本角色必需的工具（如调研 Agent 绝不给代码修改工具），避免工具面过载与幻觉越权。",
          "`tool_choice: auto`：模型自主决定是否调用工具，适合常规自主多轮会话。",
          "`tool_choice: any`：强制模型在本轮必须调用至少一个工具，但不限制具体是哪一个（适合首轮必须查数据的场景）。",
          "`tool_choice: { type: 'tool', name: 'xxx' }`：强制本轮必须调用指定工具，适合确定性提取结构化数据或关键第一步。",
          "概念澄清：SDK 中的 `allowedTools` 主要控制免审批自动执行权限，并不等同于从可见性层面物理隐藏工具。",
        ],
        antiPatterns: [
          "[反模式] 给主协调器绑定超过 20 个琐碎具体业务工具，导致 Prompt 上下文过载和模型注意力涣散。",
          "[反模式] 在要求输出严格 JSON 数据的场景下使用纯文本 Prompt 而不使用工具强制绑定。",
        ],
        evidence: "列出 auto、any 与特定 tool 三种模式的典型应用场景对比表，并指出 allowedTools 的真正含义。",
      },
      {
        code: "2.4",
        title: "MCP 作用域 (Scope) 管理与 Resources 机制",
        official: "Manage MCP scopes and leverage MCP resources for efficient access",
        summary: "合理区分项目级 .mcp.json 与个人级 ~/.claude.json，利用 Resources 暴露只读数据减少探索性损耗。",
        keyPoints: [
          "项目级 `.mcp.json`：团队共享、受版本控制管理，内部敏感 Token 绝不硬编码，统一由环境变量引用注入。",
          "用户级 `~/.claude.json`：仅针对当前开发者本地实验环境，不随 Git 提交，避免污染团队配置。",
          "MCP Resources 机制：将代码架构文档、数据库 Schema 字典、Issue 历史作为只读资源暴露，让 Agent 直接读取，避免反复调用繁重的工具。",
        ],
        antiPatterns: [
          "[反模式] 将包含个人 API Key 的敏感配置直接写在仓库根目录的 `.mcp.json` 中提交。",
          "[反模式] 团队共享的核心数据库 MCP Server 配置仅写在个人主目录 `~/.claude.json`，导致同事运行报错。",
        ],
        evidence: "给出一个标准的团队项目级 `.mcp.json` 模板，展示如何使用环境变量脱敏及配置 Resources。",
      },
      {
        code: "2.5",
        title: "Claude Code 内置工具深度运用与代码库探索",
        official: "Utilize built-in tools in Claude Code for repository exploration",
        summary: "精确掌握 Grep, Glob, Read, Edit, Write, Bash 各内置工具的职责边界与渐进式代码探索流。",
        keyPoints: [
          "`Grep`：用于根据模式/正则表达式在文件内容中搜索关键词；`Glob`：用于按文件名或路径通配模式定位文件位置。",
          "`Read`：读取指定文件内容；`Edit`：要求唯一文本匹配的高精度局部修改；`Write`：创建全新文件或整文件覆写。",
          "`Bash`：执行构建、单元测试、Linter 检查等确定性外部命令。",
          "最佳探索三部曲：先 Glob/Grep 定位入口 → 局部 Read 阅读核心实现及依赖链 → 逐步按需扩大探索范围，严禁盲目大面积读取无关文件。",
        ],
        antiPatterns: [
          "[反模式] 用 Bash 命令执行 `cat file` 代替原生 `Read` 工具，丧失系统优化与行号映射能力。",
          "[反模式] 使用 `Write` 覆盖性写入一个几千行的大文件，仅为了修改其中的一行代码（应使用 `Edit`）。",
        ],
        evidence: "画出面对一个 10 万行陌生代码库时，从提出问题到完成验证的最佳内置工具调用流水线。",
      },
    ],
  },
  {
    code: "D3",
    title: "Claude Code Configuration & Workflows",
    weight: 20,
    order: 2,
    summary: "精通 CLAUDE.md 层级架构、Skills/Commands、Path 规则、Plan vs Direct 与 CI/CD 集成。",
    topics: [
      {
        code: "3.1",
        title: "CLAUDE.md 层级架构与模块化拆分",
        official: "Architect hierarchical and modular CLAUDE.md configuration systems",
        summary: "理清用户级、项目级与子目录级配置优先级，利用 @path 导入与 .claude/rules 拆解巨型规范。",
        keyPoints: [
          "用户级：`~/.claude/CLAUDE.md`，只对当前用户全局生效，属于个人工作习惯。",
          "项目级：项目根目录 `CLAUDE.md` 或 `.claude/CLAUDE.md`，团队共享并入库版本控制，团队统一规范基石。",
          "目录级：子模块目录下的 `CLAUDE.md`，仅对该子目录及其子孙生效（局部隔离）。",
          "模块化：利用 `@path` 引入外部共享规范；当规则超过几百行时，按领域拆分至 `.claude/rules/*.md`。",
        ],
        antiPatterns: [
          "[反模式] 把全团队必须遵循的构建规范只写在自己的 `~/.claude/CLAUDE.md` 中，产生「在我机器上好使」的故障。",
          "[反模式] 在根目录维护数千行的超大单体 `CLAUDE.md`，每次交互无差别消耗数万 Token。",
        ],
        evidence: "为一个全栈 Monorepo 项目设计一份清晰的 CLAUDE.md 目录树，标出各级配置的作用范围。",
      },
      {
        code: "3.2",
        title: "Commands 与 Skills 扩展能力开发",
        official: "Develop reusable commands and skills for Claude Code workflows",
        summary: "掌握可复用工作流扩展定义，利用 frontmatter 设置 context: fork 隔离独立繁重任务。",
        keyPoints: [
          "存储路径：项目级放在 `.claude/commands/` 或 `.claude/skills/`（团队共享），个人级放在用户主目录对应位置。",
          "`context: fork`：对于执行过程非常冗长（Verbose）、中间日志多但最终只需要结构化报告的任务（如全面依赖体检、端到端测试），配置 fork 隔离在子分支执行，避免污染主上下文。",
          "Frontmatter：通过 YAML Frontmatter 定义参数提示、工具白名单、触发描述及隔离行为。",
        ],
        antiPatterns: [
          "[反模式] 在主会话上下文中直接运行输出 5 万行控制台日志的脚本，导致上下文瞬时被垃圾字符淹没。",
          "[反模式] 将项目特有的代码生成命令存放在用户个人主目录，导致 CI 和同事无法运行。",
        ],
        evidence: "编写一份带有完整 Frontmatter（含 description, tools, context: fork）的测试审查 Skill 定义文件。",
      },
      {
        code: "3.3",
        title: "路径级规则 (Path-specific Rules) 按需加载",
        official: "Implement path-specific rules for targeted context loading",
        summary: "使用 .claude/rules/*.md 配合 paths glob 模式，实现修改特定文件类型时按需加载规范。",
        keyPoints: [
          "按需匹配：在 `.claude/rules/` 下创建 Markdown 文件，并在 Frontmatter 中声明 `paths: [\"src/api/**/*.ts\", \"!**/*.test.ts\"]`。",
          "精准注入：只有当模型正在读取或修改符合 glob 的文件时，该规则才会被注入上下文，未涉及的文件完全不加载，极大节省 Token 窗口。",
          "选型分水岭：跨多个目录生效但绑定文件后缀用 Path rules；仅限于特定物理子目录用目录级 CLAUDE.md；全项目始终生效用根目录 CLAUDE.md。",
        ],
        antiPatterns: [
          "[反模式] 把仅针对前端 React 组件样式的几十条细则全量塞进根目录 `CLAUDE.md`（后端修改也会被迫背负这些规则）。",
          "[反模式] 使用错误的 glob 模式导致规则无法按预期触发或过度触发。",
        ],
        evidence: "写出三条分别针对数据库迁移文件、前端 UI 组件和单元测试文件的 Path-specific Rules 声明示例。",
      },
      {
        code: "3.4",
        title: "Plan Mode 与 Direct Execution 决策模型",
        official: "Select between Plan mode and direct execution based on task complexity",
        summary: "高风险、需求模糊、跨多文件或多方案设计必选 Plan 模式；单点、明确、可逆变更采用 Direct 执行。",
        keyPoints: [
          "Plan Mode（计划模式）：需求不确定、涉及系统核心架构、跨 3 个以上文件、存在多种可选技术路线；先探索只读输出方案，获得确认后再动代码。",
          "Direct Mode（直接执行）：需求极其明确、修改局限于单文件、可逆性高、单点 Bug 修复或小功能增补。",
          "经典黄金组合：先在 Plan 模式下让 Agent/Subagent 进行深度勘探并生成设计方案，用户确认后一键转为 Direct 实施执行。",
        ],
        antiPatterns: [
          "[反模式] 面对一个重构全系统鉴权流程的模糊需求，直接在 Direct 模式下一边猜一边改写几十个文件。",
          "[反模式] 仅仅修改一个错别字或调整一个变量名，却大动干戈开启三轮 Plan 规划模式（效率低下）。",
        ],
        evidence: "给出 5 个常见软件工程任务，准确判定它们应当使用 Plan 模式还是 Direct 模式，并阐明理由。",
      },
      {
        code: "3.5",
        title: "迭代优化 (Iterative Refinement) 与交互提问",
        official: "Apply iterative refinement techniques to align model outputs with intent",
        summary: "运用 Few-shot 输入输出示例、测试驱动迭代以及主动 Interview 澄清边界未知盲区。",
        keyPoints: [
          "预期不清时：不要空泛地说「请写得更好」，而是直接提供 2-3 组具体的 Input/Output 期望示例。",
          "复杂实现：先编写失败的单元测试用例，引导模型根据测试报错进行针对性迭代与修复。",
          "未知复杂业务：明确指示模型在开始动手写代码前，先主动向开发者提问（Interview），摸清缓存、故障容错、鉴权等潜在盲区。",
          "修复策略：相互依赖的连锁问题必须一并全盘提供；彼此独立的缺陷应当拆解为单点独立修复与单点验证。",
        ],
        antiPatterns: [
          "[反模式] 模型生成不理想时，重复发送相同的自然语言提示词催促其改进。",
          "[反模式] 在存在严重逻辑交叉依赖时，一次只修复其中一半，导致系统反复产生新的矛盾错误。",
        ],
        evidence: "设计一段 Prompt，指导模型在实现复杂接口前先通过 3 个核心问题进行需求澄清访谈。",
      },
      {
        code: "3.6",
        title: "CI/CD 流水线集成与自动化代码审查",
        official: "Integrate Claude Code into CI/CD pipelines with deterministic execution",
        summary: "非交互环境强制使用 -p 参数，结合 JSON Schema 输出、生成/审查实例分离及同步门禁。",
        keyPoints: [
          "非交互必备标志：在 GitHub Actions 或 GitLab CI 中调用必须使用 `claude -p` / `--print`，否则进程会因等待终端交互卡死挂起！",
          "机器可读结构化：添加 `--output-format json` 和 `--json-schema`，以便流水线通过 jq 等工具解析审查结果并判定是否打断流程。",
          "生成与审查分离：**编写代码的会话与审查代码的会话必须彻底解耦为独立实例**，避免自身确认偏差（Confirmation Bias）。",
          "流水线门禁：作为阻断性（Blocking）合并检查门禁时，必须使用同步实时 API，绝对不能使用延迟最长可达 24 小时的 Batch API！",
        ],
        antiPatterns: [
          "[反模式] 在 CI 脚本中直接执行 `claude`（不带 `-p` 参数），导致流水线无限超时超时挂起。",
          "[反模式] 将必须在 PR 合并前阻断的合规检查挂在 Batch API 上（最长等待一天才能拿到结果）。",
          "[反模式] 让写代码的同一个 Agent 实例立刻自我审查并给自己的代码打满分通过。",
        ],
        evidence: "写出一份完整的 GitHub Actions workflow yaml 配置文件，展示如何利用 `claude -p` 运行代码审查门禁。",
      },
    ],
  },
  {
    code: "D4",
    title: "Prompt Engineering & Structured Output",
    weight: 20,
    order: 3,
    summary: "定义显式判定标准、针对性 Few-shot、JSON Schema 结构化提取、重试自愈与独立复核。",
    topics: [
      {
        code: "4.1",
        title: "显式判定标准 (Explicit Criteria) 与消除模糊性",
        official: "Define explicit criteria to eliminate ambiguity in prompt instructions",
        summary: "杜绝「提高准确率」等空泛形容词，清晰定义纳入标准、排除清单、严重等级与边界案例。",
        keyPoints: [
          "精准定义边界：明确列出「必须报告什么」、「绝对忽略什么」、严重度等级划分原则以及模糊地带的默认行为。",
          "空洞形容词陷阱：像「be conservative」、「提高代码质量」、「更加谨慎」对消除误报几乎毫无工程价值，模型无法稳定执行。",
          "止血法则：当某一类特定检测的高误报率已经严重破坏用户对整个系统的信任时，第一步应当是直接将该检测类别关闭下线，待修复并充分验证后再重新放开。",
        ],
        antiPatterns: [
          "[反模式] 面对误报问题，仅在 Prompt 中追加「请更加仔细严谨，不要误报」这种无意义提示。",
          "[反模式] 没有给严重度划分阈值，导致所有轻微排版问题与严重内存泄漏混为一谈。",
        ],
        evidence: "为安全漏洞扫描 Prompt 编写一组包含 Explicit Included, Excluded, Severity Criteria 的标准准则定义。",
      },
      {
        code: "4.2",
        title: "针对性少样本提示 (Few-shot Prompting) 设计",
        official: "Design targeted few-shot examples for consistent reasoning patterns",
        summary: "在标准明确但执行仍有轻微波动时，补充 2-3 个覆盖歧义与对比解释的针对性示例。",
        keyPoints: [
          "适用时机：规则与标准已经十分详尽，但在特定临界案例上模型执行仍有飘移时使用。",
          "示例黄金法则：示例必须贴合真实易错场景，且每一个示例必须显式注明「为什么选择 A 而不是表面极像的 B」（标注判定理由）。",
          "不可替代边界：Few-shot 绝不能用来代替工具命名的重构、不能代替程序级的硬拦截，也不能代替模型未知事实的动态补救。",
        ],
        antiPatterns: [
          "[反模式] 在标准本就模糊不清的情况下，直接堆砌 20 个没有任何说明的复杂示例（混淆注意力）。",
          "[反模式] 使用 Few-shot 来试图 100% 杜绝模型调用越权工具（必须用程序拦截，而不是示例引导）。",
        ],
        evidence: "为金融交易可疑欺诈判定编写 2 个带详细 reasoning 解释的正反 Few-shot 样例。",
      },
      {
        code: "4.3",
        title: "结构化输出与 JSON Schema 健壮性设计",
        official: "Engineer robust JSON Schemas for predictable structured extraction",
        summary: "利用 tool_use 绑定 JSON Schema 规范输出，必须将缺失字段设为 optional/nullable 以防幻觉。",
        keyPoints: [
          "语法 vs 语义：Schema 只能 100% 保证 JSON 的语法合法与字段类型正确，但绝对无法自动保证里面的事实准确、字段没有张冠李戴或数学合计正确！",
          "防伪编造原则：对于原始输入材料中可能完全没有提及的字段，必须在 Schema 中声明为 Optional 或 Nullable，否则模型为了满足 `required` 会被迫胡编乱造！",
          "枚举兜底设计：在分类枚举值中，必须设计 `unclear` 或 `other`（带备注原因字段），防止模型在不确定时生搬硬套错误分类。",
        ],
        antiPatterns: [
          "[反模式] 把发票中可能不存在的「税务登记号」设为强制必须字段，导致模型随机编造数字填充。",
          "[反模式] 认为拿到合法的 JSON 字符串就代表提取的数据一定是真实正确的，跳过后续的业务语义核对校验。",
        ],
        evidence: "编写一个提取复杂合同关键条款的 JSON Schema，包含 optional 字段处理、枚举兜底与字段解释说明。",
      },
      {
        code: "4.4",
        title: "校验重试闭环 (Validation & Retry) 与语义核对",
        official: "Implement validation and retry loops with structured error feedback",
        summary: "重试时必须回传原输入、错误输出、精准报错信息与目标 Schema；双重提取核对业务逻辑。",
        keyPoints: [
          "四要素反馈重试：当模型输出未能通过校验时，下一次重试请求中必须带上：原始上下文、模型刚刚给出的错误输出、校验器返回的具体错误明细、目标 Schema 规范。",
          "幻觉止损点：如果反复报错的根因是信息根本不存在于原始材料中，继续无限重试只会成倍增加幻觉，此时必须果断标记为缺失或升级人工！",
          "双重语义核查：在提取财务类数据时，同时提取 `stated_total`（原文写明的合计）与 `calculated_total`（提取各项累加计算的值），由程序对比两者的差额发现潜在提取遗漏。",
        ],
        antiPatterns: [
          "[反模式] 重试时只说「你给的 JSON 格式不对，请重新生成」，不提供具体的校验报错信息。",
          "[反模式] 对由于原文缺损导致的提取校验失败进行无休止的无限循环重试，直至 Token 耗尽。",
        ],
        evidence: "画出包含 Schema 校验、业务语义核对、动态 Feedback 重试和人工降级分流的完整流程图。",
      },
      {
        code: "4.5",
        title: "Message Batches API 异步批处理决策与成本控制",
        official: "Leverage Message Batches API for asynchronous, cost-effective processing",
        summary: "针对离线、非阻塞、大体量任务利用 Batch API 享受约 50% 折扣与 24h 窗口，严格关联 custom_id。",
        keyPoints: [
          "适用场景：离线数据清洗、数万篇历史文档归档提取、不需要即时响应的后台报表生成；享受约 50% 的显著价格折扣，处理窗口最长约 24 小时。",
          "绝对不适用：实时交互对话、CI/CD PR 合并前阻断门禁、依赖前一步工具返回结果才能继续的多轮自主 Agent 循环。",
          "`custom_id` 追踪：每一个请求必须绑定唯一的 `custom_id`，结果出来后精准关联；当批量中只有 2% 请求失败时，只需提取失败的 `custom_id` 单独重试。",
        ],
        antiPatterns: [
          "[反模式] 将需要几分钟内反馈结果的在线客服或 Webhook 接入挂载到 Batch API 上。",
          "[反模式] 在一个 Batch 请求内部试图让模型连续做 5 轮复杂的工具调用交互。",
          "[反模式] 批量任务部分失败时，直接将数万个请求全量重新跑一遍，造成巨大资源浪费。",
        ],
        evidence: "对比实时 API 与 Message Batches API 在成本、延迟、并发限额与架构适用性上的差异表。",
      },
      {
        code: "4.6",
        title: "独立多轮复核 (Independent Multi-pass Review) 与置信度校准",
        official: "Apply independent multi-pass review to mitigate confirmation bias",
        summary: "审查代码必须由全新独立实例进行，分层完成逐文件局部检查与跨文件集成检查，以标注集校准置信度。",
        keyPoints: [
          "消除确认偏差：同一个模型实例在自我审查时，极度倾向于合理化自己刚才犯下的错误；复核必须由**不携带生成思考上下文的全新独立实例**进行。",
          "两阶段复审法：Pass 1 进行逐文件的局部语义与规范检查；Pass 2 进行跨文件的数据流、接口定义与依赖集成检查。",
          "置信度不可盲信：模型自评的「我非常确信」绝不能当成风险决策的真实依据；必须使用真实的标注验证集来校准字段级置信度与人工复核阈值。",
        ],
        antiPatterns: [
          "[反模式] 在写完代码的当前会话里直接追问「请仔细检查你刚刚写的代码有没有 Bug」（确认偏差严重）。",
          "[反模式] 盲信模型的置信度评分，将自评 90% 以上的任务直接放行免审，导致隐蔽 Bug 溜入生产。",
        ],
        evidence: "设计一个独立双实例代码生成与审计架构图，说明两者的上下文隔离与结果仲裁逻辑。",
      },
    ],
  },
  {
    code: "D5",
    title: "Context Management & Reliability",
    weight: 15,
    order: 5,
    summary: "关键信息常驻保真、降级与人工升级策略、错误传播控制、长上下文退化与来源追溯。",
    topics: [
      {
        code: "5.1",
        title: "关键交易事实常驻保留 (Case Facts Block)",
        official: "Preserve critical transaction facts across long-context interactions",
        summary: "长对话摘要极易丢失具体金额、订单号与政策条款，必须将关键事实放入独立持久块每轮注入。",
        keyPoints: [
          "摘要衰减陷阱：对话进行到几十轮时，自动摘要往往会丢弃具体的金额数值、退款比例、订单编号、日期时间以及具体的法律政策条款引用！",
          "`Case Facts` 机制：将核心交易事实单独提取并持久化存放在独立的 `case_facts` 结构中，每一轮模型交互时显式重新注入到系统提示或上下文顶部。",
          "Lost in the Middle 规避：LLM 对长文本中间区域的注意力天然衰减，关键结论和核心约束必须置于首部或尾部，并使用醒目的 Markdown 标题分割。",
          "源头裁剪：工具调用返回的数据在进入上下文前，只保留下游真正需要的字段，严禁把冗余元数据全部塞入。",
        ],
        antiPatterns: [
          "[反模式] 依赖普通的滚动摘要来记录用户的退款账号和交易金额（几轮之后数字被模型凭空篡改）。",
          "[反模式] 工具返回包含 100 个字段的完整对象，未经任何裁剪就整体以 tool_result 传回。",
        ],
        evidence: "设计一个客户服务 Agent 的 Prompt 模板，展示 `case_facts` 区块如何与动态对话历史正交共存。",
      },
      {
        code: "5.2",
        title: "升级人工 (Escalation) 与多义性 (Ambiguity) 澄清",
        official: "Implement escalation triggers and resolve ambiguities systematically",
        summary: "用户明确求人工或政策空白时立即结构化升级；多重匹配向用户索要标识；绝不因多问题盲目升级。",
        keyPoints: [
          "确定性升级触发点：用户明确要求转人工、遇到公司政策完全空白的例外情况、模型权限不足或涉及重大法律/声誉风险时，立即触发升级并附带结构化 Handoff。",
          "严禁盲目升级：有明确标准业务流程可走时，即便用户情绪稍显不悦或一次性提了 3 个问题，Agent 依然应正常处理，绝不能擅自推脱给人工！",
          "多意模糊澄清：当用户报出姓名查到系统中存在 3 个同名账户时，**绝对不能盲猜一个继续操作**，必须礼貌向用户索要第二身份标识（如手机尾号、订单号）。",
          "升级 vs Hook 区别：升级是因为「需要人类做出主观自由裁量」；Hook 是因为「已有明确硬性安全规则且必须百分之百强制执行」。",
        ],
        antiPatterns: [
          "[反模式] 当用户问「我退款进度如何？顺便问一下你们几点下班」时，因问题多而直接判为复杂直接扔给人工客服。",
          "[反模式] 在多个用户或多笔订单重名时，擅自选择最上面的一条执行扣款或退款（严重灾难）。",
          "[反模式] 仅凭模型自评的「情绪分析指数」作为唯一标准来强制打断服务转接人工。",
        ],
        evidence: "给出 4 个典型场景，分别界定其应当「继续自主处理」、「向用户索要澄清信息」还是「立即结构化升级人工」。",
      },
      {
        code: "5.3",
        title: "子 Agent 错误传播控制与证据缺口标注",
        official: "Manage error propagation in subagents and annotate evidence gaps",
        summary: "子 Agent 先局部消化瞬态错误，无法解决再上报；部分数据源失败继续合成但标注证据缺口。",
        keyPoints: [
          "局部恢复优先：子 Agent 内部先对网络超时等可恢复错误进行有限重试；确实无法恢复时，再向上级协调器上报结构化失败。",
          "丰富上报内容：上报错误时必须附带：失败类别、原始请求参数、已尝试次数、已获取的局部结果 (partial results) 及建议替代方案。",
          "降级合成与证据缺口：当要求汇总 5 个数据源而其中 1 个数据源崩溃时，协调器应利用已获取的 4 个数据源正常生成报告，但**必须在报告醒目位置显式注明证据缺口 (Evidence Gap)**，严禁因为单点崩溃导致全盘瘫痪！",
        ],
        antiPatterns: [
          "[反模式] 调研系统因为 5 个公开网页中有 1 个无法访问，直接抛出异常导致整个大模型报告完全无法生成。",
          "[反模式] 瞒报错误：某个子 Agent 抓取失败后返回空，协调器在最终报告中佯装所有数据均已完整覆盖。",
        ],
        evidence: "编写一份带有 [Stable Findings]、[Evidence Gaps] 与 [Disputed Points] 的多源情报分析报告结构规范。",
      },
      {
        code: "5.4",
        title: "大型代码库长会话上下文退化防范 (Degradation)",
        official: "Mitigate context degradation in large codebase explorations",
        summary: "监测模型出现抽象空话等退化征兆，利用 Scratchpad 保存定位，把深挖任务委派给子 Agent。",
        keyPoints: [
          "识别退化信号：当模型在长对话后期开始频繁给出「常见的实现方式如下...」等教科书套话，而不再引用代码库中具体的类名、函数名与文件路径时，说明上下文已发生严重注意力退化！",
          "Scratchpad / State File：在根目录或临时目录维护一个轻量的任务进度记录本，随时把已确认的类定义、核心逻辑行号与下一步探索目标持久化到文件，防范崩溃与退化。",
          "委派深挖：把耗费大量 Token 的具体单文件排查委托给子 Agent 执行，主会话只保留子 Agent 浓缩后的精简结论。",
          "谨慎使用 `/compact`：执行上下文压缩前，必须将核心交易数字、特定文件路径与不可遗忘的约束提取持久化，避免被压缩算法当成常规废话丢弃。",
        ],
        antiPatterns: [
          "[反模式] 放任一个会话持续进行上百轮且不清理，模型已经严重幻觉依然在此会话中继续写关键生产代码。",
          "[反模式] 在没有将核心发现落盘到状态文件的情况下，直接盲目执行上下文清空或重置。",
        ],
        evidence: "设计一个标准的 `PROJECT_SCRATCHPAD.md` 模板，展示在复杂代码重构期间如何记录探索状态。",
      },
      {
        code: "5.5",
        title: "人工监督分层抽样与置信度校准 (Calibration)",
        official: "Calibrate confidence thresholds and apply stratified human sampling",
        summary: "总体 97% 正确率易掩盖特定难点字段的溃败，必须按文档类型与字段分层评估并抽检高置信度项。",
        keyPoints: [
          "总体指标欺骗性：系统的全量整体准确率达到 97%，极有可能掩盖了「海外供应商复杂发票」这一细分类目准确率只有 40% 的严重缺陷！必须按文档类别和字段类型进行分层评估。",
          "分层抽样复核：低置信度数据必须 100% 路由给人工复审；**对于高置信度甚至满分置信度的数据，也必须保持一定比例（如 5%-10%）的分层随机抽样**，用于监控未知漂移与幻觉自信。",
          "校准真值：使用带人工精标注的独立评估集对模型的置信度输出进行校准，找出模型在何种阈值下才是真正可靠的。",
        ],
        antiPatterns: [
          "[反模式] 仅凭单一的 Macro Accuracy 大盘数据就宣布系统已达到生产上线标准，不看最差长尾切片的表现。",
          "[反模式] 相信模型自评的高置信度，对所谓「100% 确定」的数据完全不设任何人工抽查防线。",
        ],
        evidence: "为文档数据提取系统绘制一套基于字段重要性与置信度阈值的人工审核分流矩阵表。",
      },
      {
        code: "5.6",
        title: "来源追溯 (Provenance) 与多源数据冲突仲裁",
        official: "Enforce source provenance mapping and resolve conflicting evidence",
        summary: "强制要求 claim -> source 精准映射；遇到冲突保留双方数值与时间戳，标记为 disputed。",
        keyPoints: [
          "端到端来源链：模型输出的每一条关键论断（Claim），必须强制关联其确切的数据来源（URL、文档文件名、页码行号、抓取时间及支撑原句）。",
          "保留出处归属：在聚合多份报告时，必须保留每一项数据的出处，严禁融合成无根无据的笼统概述。",
          "数据冲突处理：当两个权威数据源对同一指标给出互相矛盾的数值时（如 A 报告显示营收增长 10%，B 报告显示增长 5%），**绝对不能由模型擅自挑一个顺眼的或者求平均数！** 正确做法是：同时保留两个数值、各自的时间、统计口径与来源，将其标注为 `disputed findings` 留待人类决策。",
        ],
        antiPatterns: [
          "[反模式] 面对数据冲突，模型为了迎合用户直接随心所欲删除掉其中一个矛盾值，假装天下太平。",
          "[反模式] 自动将多个不同口径的数据进行数学平均，捏造出一个从未在任何文档中出现过的全新数字。",
        ],
        evidence: "写出一份标准结构化输出 JSON 片段，展示如何对有争议的研究发现进行 Claim-Source 映射与 Disputed 标注。",
      },
    ],
  },
];

const decisionRules = [
  {
    step: 1,
    title: "后果是否涉及高风险？",
    rule: "金钱交易、系统安全、身份认证、法律合规 → 必须优先选择程序级硬控制（Hooks / 前置拦截 / 状态机），绝对不能仅选 Prompt 软约束！",
    trap: "干扰项常给出措辞严厉的 Prompt（如「请严格务必在退款前检查密码」），看似合理但属于概率性控制，必错！",
  },
  {
    step: 2,
    title: "属于标准不清还是执行不稳？",
    rule: "没有明确标准/误报高 → 补充 Explicit Criteria（边界与排除项）；已有清晰标准但模型执行有波动 → 补充针对性 Few-shot；每次漏项不同 → 引入 Evaluator-Optimizer 循环。",
    trap: "干扰项常在没有标准时直接加 Few-shot，或者盲目用「be conservative」等空泛提示词。",
  },
  {
    step: 3,
    title: "工具为什么会选错？",
    rule: "第一步先排查工具自身的命名、描述、入参边界和反例说明，其次排查 System Prompt 中的偏置；只有确实需要时才考虑外置分类器路由。",
    trap: "干扰项常在工具描述本身模糊不清时，舍本逐末地新增一个专门的大模型路由层（过度设计）。",
  },
  {
    step: 4,
    title: "是真正系统错误还是正常无结果？",
    rule: "0 results 是业务逻辑成功但无匹配，不属于系统异常；timeout 是瞬态未完成。根据 isRetryable 决定是否局部重试，认证与权限错误绝不可盲目重试。",
    trap: "干扰项常把 0 results 当成 Exception 抛出，或者对权限不足的 403 错误执行 5 次重试。",
  },
  {
    step: 5,
    title: "信息是否完整？有多重意图吗？",
    rule: "多重身份匹配绝不能盲猜，必须向用户索取额外标识；信息在原文根本不存在时停止无限重试并标记缺失；多意图拆成独立分支并行获取最后合成。",
    trap: "干扰项常选择「猜测最接近的一个用户继续执行」或「对不存在的信息继续重试 3 轮」。",
  },
  {
    step: 6,
    title: "上下文是否发生过载或退化？",
    rule: "从源头对工具输出进行字段裁剪；核心交易事实提取至独立的持久 Case Facts 块；未知探索委派给子 Agent，主会话只保留精炼结论。",
    trap: "干扰项常提倡在每一轮都对几万行的全量工具返回做深度摘要，反而增加延迟与信息损耗。",
  },
  {
    step: 7,
    title: "需要同步实时还是异步批处理？",
    rule: "需要立即阻断的流程（如 CI 合并门禁、实时客服）必须使用同步实时 API；海量离线文档提取、夜间数据回溯选择 Message Batches API（半价但最长 24h）。",
    trap: "干扰项把需要 10 分钟内完成的 CI gate 挂到 Batch API 上，导致流水线长时间挂起。",
  },
  {
    step: 8,
    title: "配置属于哪个生效范围 (Scope)？",
    rule: "团队共享放入项目根目录 CLAUDE.md / .mcp.json；个人专属放入 ~/.claude/；跨目录特定类型文件用 Path rules；任务驱动的重复流程封装为 Skill。",
    trap: "干扰项把全团队必须遵循的构建规范放在个人主目录 ~/.claude/CLAUDE.md 中，导致他人无法复现。",
  },
  {
    step: 9,
    title: "生成与审查是否保持独立？",
    rule: "代码生成与代码审查必须由两个没有共享生成思考历史的独立实例执行；多文件审查采用 Local Pass + Integration Pass 两阶段进行。",
    trap: "干扰项常在生成完代码的当前会话里直接让该 Agent 自检，引发严重的自我确认偏差。",
  },
  {
    step: 10,
    title: "最简单方案是否已经解决根因？",
    rule: "遵循奥卡姆剃刀原则：先改 Prompt/修描述/加前置条件；只有根因确实需要时才增加外置模型、复杂分类器或重型微调系统（高风险硬拦截除外）。",
    trap: "干扰项经常用极度高大上的多 Agent 架构、知识图谱或微调方案来解决一个修改 Prompt 说明就能解决的小问题。",
  },
];

const highFrequencyTraps = [
  {
    trap: "用更长更严厉的 Prompt 替代安全前置条件",
    reason: "Prompt 永远是概率性的指导，面对资金、隐私和系统破坏，必须由代码级 PreToolUse Hook、权限系统或状态机强制拦截。",
  },
  {
    trap: "新增外置路由模型，但原工具描述依然重叠模糊",
    reason: "根因是工具职责边界未定义清晰，外置路由同样会受到模糊描述误导。最简单最高效的做法是重命名和重写描述。",
  },
  {
    trap: "根据模型自评情绪或置信度直接触发人工升级",
    reason: "模型自评的置信度存在未经校准的幻觉，情绪分析也容易误判。升级应基于明确的业务触发点（如用户明确要求、超权限、政策空白）。",
  },
  {
    trap: "看到一个非核心子 Agent 失败就终止整条工作流",
    reason: "健壮的多 Agent 系统应具备容错降级能力，部分数据源失败时继续基于现有数据合成，并在报告中显式标注 [Evidence Gaps]。",
  },
  {
    trap: "对不存在于原始上下文的信息进行持续循环重试",
    reason: "信息若根本不在原文中，反复重试只会迫使模型为了满足必填项而开始胡编乱造，应当果断标记为 Optional 或转入人工。",
  },
  {
    trap: "使用同一个上下文 Session 既写代码又审查代码",
    reason: "同一个实例自带严重的确认偏差，极容易忽略自己的逻辑盲区，必须由互不相通的独立实例进行 Review。",
  },
  {
    trap: "将 Batch API 用于阻塞式 CI/CD 检查",
    reason: "Batch API 最长可能需要 24 小时处理，适合非阻塞、离线场景，绝对不能用在需要立即判断能否 Merge 的实时门禁中。",
  },
  {
    trap: "把团队必须遵循的项目规则保存在用户目录 ~/.claude/",
    reason: "用户目录仅对自己本地生效，不会进入 Git 版本控制，同事拉取代码或 CI 流水线执行时该规范将彻底缺失。",
  },
  {
    trap: "只看模型整体准确率 (97%)，忽视长尾字段表现",
    reason: "总体的高分往往会掩盖关键极难字段（如手写签名或海外税务号）极低准确率的重大缺陷，必须按文档类型与字段分层评估。",
  },
  {
    trap: "在多源信息汇总时私自删除冲突数据或对数值求平均",
    reason: "模型无权代替人类决定哪个权威源更正确，也绝不能擅自算平均数捏造数字，必须完整保留各自的来源并标为 Disputed。",
  },
];

const officialScenarios = [
  {
    id: 1,
    title: "Customer Support Resolution Agent",
    nameZh: "智能客服多轮履约与争议解决",
    focus: "身份核验前置硬控制、Case Facts 常驻保存、结构化人机 Handoff、多意图并发解耦、防盲目升级与防同名误操作。",
    keyTasks: ["D1.4 强制顺序与交接", "D1.5 Hooks 确定性防御", "D5.1 Case Facts", "D5.2 升级与澄清"],
  },
  {
    id: 2,
    title: "Code Generation with Claude Code",
    nameZh: "Claude Code 辅助开发与代码生成",
    focus: "项目级 CLAUDE.md 规范、Plan vs Direct 决策、基于失败测试用例的迭代修复、Path-specific Rules 按需加载、内置工具规范。",
    keyTasks: ["D3.1 CLAUDE.md 层级", "D3.3 Path 规则", "D3.4 Plan vs Direct", "D3.5 迭代优化"],
  },
  {
    id: 3,
    title: "Multi-Agent Research System",
    nameZh: "多 Agent 分布式情报研究系统",
    focus: "Coordinator-Subagent Hub-and-Spoke 拓扑、并发调度、Claim-Source 来源精准追溯、冲突数据标记 Disputed、容忍单点失败标记证据缺口。",
    keyTasks: ["D1.2 协调器编排", "D1.3 上下文与并行", "D5.3 错误传播", "D5.6 来源追溯与冲突"],
  },
  {
    id: 4,
    title: "Developer Productivity with Claude",
    nameZh: "开发者效能工具与定制命令",
    focus: "项目级 Commands 与 Skills 沉淀、context: fork 隔离冗长任务、避免上下文污染、主动 Interview 消除需求歧义。",
    keyTasks: ["D3.2 Commands 与 Skills", "D1.7 Session 与 Fork", "D3.5 需求 Interview 访谈"],
  },
  {
    id: 5,
    title: "Claude Code for Continuous Integration",
    nameZh: "CI/CD 流水线代码自动审查门禁",
    focus: "claude -p 非交互执行防卡死、--output-format json 机器可读、生成与审查双实例隔离、必须使用实时同步 API 防挂起。",
    keyTasks: ["D3.6 CI/CD 集成", "D4.6 独立审查模式", "D4.5 同步 vs Batch 选型"],
  },
  {
    id: 6,
    title: "Structured Data Extraction",
    nameZh: "大规模文档结构化信息提取",
    focus: "JSON Schema 约束输出、缺失字段设为 optional/nullable 防胡编、四要素 Feedback 重试循环、双重语义核验、离线大批量用 Batch API。",
    keyTasks: ["D4.3 JSON Schema 设计", "D4.4 校验重试闭环", "D4.5 Batch 异步批处理", "D5.5 分层抽样校准"],
  },
];

const errorCategories = [
  { code: "criteria", name: "标准不清 (Criteria)", desc: "未看出 Prompt 缺乏明确的纳入/排除标准或严重度分级。" },
  { code: "determinism", name: "弱约束当硬保证 (Determinism)", desc: "在涉及资金、权限、安全的高风险场景中误选了 Prompt 软约束而非程序级控制。" },
  { code: "tool-routing", name: "工具边界混淆 (Tool Routing)", desc: "忽略了工具名称与描述的重叠，或舍本逐末去加外置路由层。" },
  { code: "overengineering", name: "过度设计 (Overengineering)", desc: "选了不必要的独立分类器、重型多 Agent 或复杂模型微调，违背最简根因原则。" },
  { code: "error-recovery", name: "错误恢复失当 (Error Recovery)", desc: "未区分 0 results（正常无匹配）与 timeout（未完成），或盲目重试非瞬态错误。" },
  { code: "context", name: "上下文信息丢失 (Context)", desc: "丢失关键交易事实数字、来源出处映射或导致长上下文注意力衰退。" },
  { code: "scope", name: "配置作用域错配 (Scope)", desc: "混淆了用户级 (~/)、项目级、目录级与 Path 规则的生效边界。" },
  { code: "sla", name: "延迟/SLA 错配 (SLA / Batch)", desc: "在需要实时阻断的门禁中选了 Batch API，或并发策略未能降低耗时。" },
  { code: "question-limit", name: "审题粗心 (Question Limit)", desc: "漏看了「选择 N 项」、only、most effective 等关键限定词。" },
];

const studyPlans = {
  7: [
    {
      day: 1,
      title: "考纲总览 + D1 架构核心",
      minutes: 150,
      objective: "吃透 CCAR-F 官方 5 域权重、30 项结构与 6 场景；重点掌握 Agentic loop 与 Coordinator 多 Agent 架构。",
      tasks: [
        "通读 Exam Guide，牢记 D1 权重 27%，明确 stop_reason === 'end_turn' 判定标准。",
        "画出 Agentic loop 状态机与 Hub-and-Spoke 多 Agent 数据流图。",
        "梳理 Pre/PostToolUse Hook 的确定性拦截与数据归一化应用场景。",
      ],
      output: "写出 5 组 Prompt 软约束 vs Hook 硬控制的对比选择题，并标明判定依据。",
    },
    {
      day: 2,
      title: "D2 工具与 MCP + D3 工作流配置",
      minutes: 150,
      objective: "攻克工具描述五要素、MCP 结构化错误、tool_choice 以及 CLAUDE.md 层级与 CI/CD 集成。",
      tasks: [
        "重构 3 组易混淆工具的描述，设计区分 0 results 与 timeout 的 MCP Error Schema。",
        "理清 ~/.claude 与项目根目录 CLAUDE.md、.claude/rules/*.md 的优先级与 scope。",
        "掌握 claude -p 非交互参数在 CI/CD 中的必须性与独立审查模式。",
      ],
      output: "设计一份项目级 .claude 规范目录树，附带一个带 context: fork 的 Skill 定义。",
    },
    {
      day: 3,
      title: "D4 Prompt 提示工程与结构化输出",
      minutes: 150,
      objective: "掌握 Explicit criteria 消除误报、Few-shot 临界场景设计、JSON Schema 容错与 Message Batches API。",
      tasks: [
        "练习为代码审查编写明确的纳入与排除标准，拒绝「be conservative」等空泛词。",
        "理解 Schema 中 optional/nullable 对防止编造的作用，以及双重语义核查机制。",
        "对比实时 API 与 Batch API（半价、24h 窗口、custom_id）在 CI 门禁与离线提取中的选型。",
      ],
      output: "为一个数据提取任务编写带 nullable 处理的 JSON Schema 与四要素反馈重试伪代码。",
    },
    {
      day: 4,
      title: "D5 上下文保真与高可靠性",
      minutes: 150,
      objective: "掌握 Case facts 常驻注入、Handoff 结构化交接、错误局部隔离、长上下文退化应对与来源追溯。",
      tasks: [
        "学习为什么摘要会丢失金额数字，如何利用独立持久的 Case Facts 块保真。",
        "掌握升级人工的真正触发点（政策空白/超权限/需要人类主观裁量）与多匹配澄清原则。",
        "理解多源冲突数据必须保留双方数值并标为 disputed，绝不擅自删除或求平均。",
      ],
      output: "写一份标准的人工接管 JSON Handoff 数据包契约，并制定来源追溯 Claim-Source 规范。",
    },
    {
      day: 5,
      title: "六大官方场景全覆盖实操训练",
      minutes: 180,
      objective: "针对 6 个官方场景逐个开展场景化决策训练，提炼决定性约束与高频干扰陷阱。",
      tasks: [
        "围绕 Customer Support、Code Generation、Research 等 6 大场景，每个场景至少推演 2 道复合题目。",
        "严格运用 10 步统一做题罗盘进行决策校验，识别「看似很严厉的 Prompt」等经典陷阱。",
        "总结个人最容易踩坑的思维盲区并做好记录。",
      ],
      output: "写出 6 个官方场景的核心架构图与关键防御点速查卡片。",
    },
    {
      day: 6,
      title: "完整 60 题 / 120 分钟计时 Mock",
      minutes: 150,
      objective: "模拟全真考试环境，在 105 分钟内完成 60 道单选与多选题，预留 15 分钟复核，记录错因分布。",
      tasks: [
        "严格限制时间完成一套完整的 60 题模拟（推荐社区 Mock 或基于 AI 教练生成的成套题）。",
        "多选题先圈定「选几项」，遇到犹豫题先标记不卡死时间。",
        "交卷后将所有错题与犹豫题录入错题本，归入 9 大标准错因分类。",
      ],
      output: "生成第一份完整 Mock 成绩单（记录得分、耗时、最弱 Domain 及错题归因分析）。",
    },
    {
      day: 7,
      title: "弱项定向回补 + 考前设备与环境检查",
      minutes: 120,
      objective: "只针对 Mock 暴露出的薄弱 Domain 进行考纲回看；复习 10 大避坑表，完成 Pearson VUE 考前检查。",
      tasks: [
        "逐一重做昨天的所有错题，直到能用自己的话清晰解释「为什么正确选项对，为什么每个干扰项错」。",
        "快速通读一遍考前最后一页清单与版本分歧避坑表。",
        "完成考试电脑、网络、摄像头、护照/证件及安静独立房间的检查。",
      ],
      output: "打勾确认考前 10 项检查清单，进入准备应考状态！",
    },
  ],
  14: [
    {
      day: 1,
      title: "官方 Exam Guide + 考试信息总览",
      minutes: 120,
      objective: "写出 5 域权重、30 项结构与 6 场景；完成一次不计时诊断测试，建立备考基线。",
      tasks: [
        "详细阅读 CCAR-F 官方指南，建立 5 个 Domain 的权重认知（D1 27% 最高）。",
        "理解 scaled score 720 分的含义，了解 60 题 / 120 分钟及多选题明确告知选项数的特点。",
        "完成初始诊断，摸清自己当前对 Agentic 系统与 Claude 产品的熟悉度。",
      ],
      output: "默写出 5 个 Domain 名称与其对应权重比例，列出 6 个官方场景。",
    },
    {
      day: 2,
      title: "D1 Agentic Loop、Hooks 与确定性保障",
      minutes: 120,
      objective: "画出 agentic loop 推进与终止状态机，深刻理解 Prompt 软指导与 Hook 硬限制的本质差异。",
      tasks: [
        "剖析 stop_reason 推进机制：tool_use 继续执行，end_turn 正常终止。",
        "学习 PreToolUse 与 PostToolUse 钩子的真实代码级拦截能力与数据归一化。",
        "对比自然语言安全提示与程序级前置条件的安全性差距。",
      ],
      output: "写出 5 组针对高危场景的「Prompt 伪安全 vs Hook 真控制」对比案例题。",
    },
    {
      day: 3,
      title: "D1 Coordinator、Subagent 编排与 Session",
      minutes: 120,
      objective: "掌握 Hub-and-Spoke 多 Agent 拓扑、显式上下文传递、并发调用与 Resume / Fork / New Session 边界。",
      tasks: [
        "学习为什么子 Agent 必须上下文隔离，协调器如何拆解、委派与二次补派。",
        "识别同一轮中无依赖的独立调用，配置并发执行提升性能。",
        "梳理会话继续 (Resume)、探索分叉 (Fork) 与新会话 (New Session) 的决策树。",
      ],
      output: "为分布式研究系统画出完整的数据流图与子 Agent 提示词入参契约。",
    },
    {
      day: 4,
      title: "D2 Tool Design 接口规范、错误响应与 MCP",
      minutes: 120,
      objective: "改写模糊工具描述，设计结构化 MCP 错误规范，理解 0 results 与 timeout 的本质区别。",
      tasks: [
        "掌握优秀工具描述五要素（功能、入参、返回值、何时用、何时不用）。",
        "设计含 isError, errorCategory, isRetryable, partial results 的错误响应结构。",
        "理解最小工具集分配与 tool_choice (auto / any / specific) 的行为逻辑。",
      ],
      output: "改写 3 组易混淆工具描述，并编写符合规范的 MCP 结构化错误 JSON 示例。",
    },
    {
      day: 5,
      title: "D3 CLAUDE.md 配置层级、Rules 与 Skills",
      minutes: 120,
      objective: "梳理用户级、项目级、目录级配置范围，掌握 Path-specific Rules 与 context: fork Skill。",
      tasks: [
        "理清 ~/.claude/CLAUDE.md 与项目根目录 CLAUDE.md 的隔离与共享机制。",
        "学习在 .claude/rules/ 下通过 paths glob 实现文件匹配按需加载。",
        "理解 Skill 的 Frontmatter 配置以及 context: fork 隔离冗长任务输出。",
      ],
      output: "为一个全栈项目设计一份包含根目录、目录级与 Path 规则的完整配置清单。",
    },
    {
      day: 6,
      title: "D3 Plan vs Direct、迭代优化与 CI/CD 集成",
      minutes: 120,
      objective: "掌握 Plan 模式与 Direct 执行的选型，精通非交互 claude -p 与生成/审查双实例分离架构。",
      tasks: [
        "梳理 Plan Mode（模糊、跨多文件、架构决策）与 Direct Mode（明确单点可逆）的判断条件。",
        "学习复杂实现中的需求 Interview 澄清访谈与测试驱动迭代。",
        "掌握非交互环境必须加 -p / --print 参数，以及为什么写代码与查代码必须分离实例。",
      ],
      output: "编写一份标准的 CI 流水线代码审查 GitHub Actions yaml 配置文件。",
    },
    {
      day: 7,
      title: "D4 显式标准 (Explicit Criteria) 与 Few-shot 示例",
      minutes: 120,
      objective: "为提示工程编写无歧义的纳入与排除准则，设计针对临界易错场景的高质量 Few-shot 样例。",
      tasks: [
        "学习为什么「be conservative」等空泛词不能解决误报，如何书写显式判定边界。",
        "掌握在标准已清楚但执行有波动时，如何编写附带判定理由的针对性 Few-shot。",
        "理解面对严重误报破坏信任时的紧急止血法则（临时关闭该项）。",
      ],
      output: "为代码质量审查写出一套具备明确纳入、排除与严重度分级的准则文本及 2 个对比示例。",
    },
    {
      day: 8,
      title: "D4 JSON Schema、Validation 重试与 Batch API",
      minutes: 120,
      objective: "掌握防幻觉 Schema 设计（optional/nullable）、双重语义校验、四要素重试与异步 Batch API。",
      tasks: [
        "掌握为什么可能缺失的字段必须设为 nullable，避免模型为了 required 编造事实。",
        "掌握重试请求必须携带原始材料、错误输出、验证报错明细与目标 Schema。",
        "理解 Batch API 的半价折扣、24h 窗口与 custom_id 对应，以及为何 CI 门禁禁用 Batch。",
      ],
      output: "设计一套文档提取的 Schema，附带 stated_total 与 calculated_total 双重核对逻辑。",
    },
    {
      day: 9,
      title: "D5 关键事实常驻 (Case Facts)、人工升级与错误控制",
      minutes: 120,
      objective: "设计 Case Facts 独立常驻块防止长对话金额被篡改，规范结构化 Handoff 与多义澄清。",
      tasks: [
        "理解普通摘要为何会丢失具体订单号和金额，掌握 Case Facts 块每轮注入技术。",
        "明晰升级人工的真正边界：政策空白/超权限，严禁因多问题或情绪直接甩给人工。",
        "处理同名多匹配问题：主动向用户索要第二标识，绝不擅自猜测执行。",
      ],
      output: "写一份标准的 Case Facts 模板与一份包含已排查证据的人工接管 JSON 数据包。",
    },
    {
      day: 10,
      title: "D5 置信度分层校准 (Calibration) 与来源追溯",
      minutes: 120,
      objective: "规避整体 97% 正确率的欺骗性，设计高置信度抽样复核与精确的 Claim-Source 追溯链条。",
      tasks: [
        "理解为什么必须按文档类型和字段分层评估，不能只看整体大盘数字。",
        "建立对高置信度结果的定期分层随机抽样机制，防止盲目信任引发生产事故。",
        "掌握数据冲突处理原则：保留双方数值与来源并标记 disputed，绝不私自删除或求平均。",
      ],
      output: "设计一份包含 Stable Findings, Disputed Data 与 Evidence Gaps 的标准多源分析报告模板。",
    },
    {
      day: 11,
      title: "六大官方场景综合推演与决策罗盘融会贯通",
      minutes: 150,
      objective: "将 30 个考点全面代入 6 个官方场景，逐条演练 10 步统一决策罗盘，攻克高频干扰陷阱。",
      tasks: [
        "针对客服、代码生成、多 Agent 调研、CI 门禁等场景，全面练习辨识干扰项。",
        "牢记「Prompt 不是硬限制」、「工具选错先改描述」、「CI 门禁不用 Batch」等黄金铁律。",
        "针对自己的弱项 Domain 进行重点场景推演。",
      ],
      output: "完成每个场景至少 2 道综合原创题的推演，写出最优选择与最有迷惑性干扰项的错因。",
    },
    {
      day: 12,
      title: "全真计时模拟 Mock 1 (60 题 / 120 分钟)",
      minutes: 150,
      objective: "完成第一次严格限时的 60 题模拟，建立精准的错题与犹豫题清单，分析最弱 Domain。",
      tasks: [
        "在完全不受打扰的环境下，105 分钟内答完 60 题，15 分钟复核标记题。",
        "记录最终答对题数与耗时，对照 720 分通过线与 80% 就绪标准。",
        "将全部错题归入 9 大错因分类，定位失分最严重的考点领域。",
      ],
      output: "生成 Mock 1 成绩单与薄弱考点清单（重点标记犹豫题与错题）。",
    },
    {
      day: 13,
      title: "弱项考点定向回补 + 计时模拟 Mock 2",
      minutes: 150,
      objective: "只回补 Mock 1 暴露出的知识盲区；换用新题完成 Mock 2，验证成绩是否稳定达到 80% 以上。",
      tasks: [
        "回看总纲中对应 Task Statement 的核心原理与反模式陷阱。",
        "完成第二套陌生题或随机题 Mock（避免背熟悉答案产生虚假安全感）。",
        "检查是否满足「两次 Mock 均达到 80% 且无单项 Domain 低于 75%」的建议就绪标准。",
      ],
      output: "生成 Mock 2 成绩对比单，评估是否已具备走进考场的硬实力。",
    },
    {
      day: 14,
      title: "考前清单复核 + 证件网络与监考环境检查",
      minutes: 90,
      objective: "不再大量刷陌生新题，温习 10 大避坑原则与版本分歧指南，完成系统与证件最终确认。",
      tasks: [
        "快速浏览一遍 30 个 Task Statement 的反模式清单，加深本能条件反射。",
        "运行 Pearson VUE 官方系统测试程序，检查网络稳定性、麦克风与摄像头可用性。",
        "准备好有效官方证件（如护照），清理考桌，确保四周安静无杂物。",
      ],
      output: "逐项勾选考前 10 项确认清单，以最佳状态自信应战！",
    },
  ],
};

const preExamChecklist = [
  { id: "c1", text: "我知道正式考试代码是 CCAR-F，当前结构是 60 题 / 120 分钟（座席约 135 分钟），及格分为 720 / 1000。" },
  { id: "c2", text: "我记得多选题题目会明确写明「选择 N 项」，绝不把考试当成纯单选题来做，不会少选或多选。" },
  { id: "c3", text: "我能清晰说出五大 Domain 权重（D1 27%, D2 18%, D3 20%, D4 20%, D5 15%）并理解场景题多跨 Domain。" },
  { id: "c4", text: "我能条件反射般区分高风险硬拦截（Hooks/程序校验）与软指导（Prompt），绝不把 Prompt 当成安全硬控制。" },
  { id: "c5", text: "我清楚区分 0 results（查询成功但无匹配）与 timeout（未完成），并知道不可重试业务错误绝不盲目重试。" },
  { id: "c6", text: "我能准确界定 CLAUDE.md、Path rules、Skills 的范围，明白团队规范绝不能放在个人主目录 ~/.claude/ 下。" },
  { id: "c7", text: "我理解 JSON Schema 语法正确不代表事实语义正确，明白原文缺失字段必须设为 nullable 以防模型编造。" },
  { id: "c8", text: "我能熟练写出结构化 MCP 错误、人工交接 Handoff 数据包、Case facts 常驻块与 Claim-Source 来源映射。" },
  { id: "c9", text: "我完成过至少一次完整的 60 题计时模拟，且做题时复盘的是 9 大错因根因，而不是死记题库正确字母。" },
  { id: "c10", text: "我已提前完成 Pearson VUE 在线监考系统与设备检测，准备好有效证件（如护照），考桌与房间环境清理整洁。" },
];

const versionDivergence = [
  {
    topic: "子 Agent 工具名",
    examGuide: "使用 `Task` 工具发起子 Agent",
    currentDocs: "Agent SDK v2.1.63 之后已全面更名为 `Agent` 工具",
    strategy: "考试时看题干使用的是哪版名词（若题干写 Task 则按 Exam Guide 逻辑解答）；实际生产开发一律使用当前的 Agent 工具。",
  },
  {
    topic: "循环停止标志 (stop_reason)",
    examGuide: "重点考察 `tool_use`（继续执行）与 `end_turn`（自主完成）的二分判断",
    currentDocs: "当前生产 API 还有 `max_tokens`, `pause_turn`, `refusal`, `model_context_window_exceeded` 等状态",
    strategy: "考试抓准 end_turn 才是正常完成；生产系统中必须写全所有停止原因的分支防护代码。",
  },
  {
    topic: "结构化输出机制",
    examGuide: "核心通过 `tool_use` 绑定输入 Schema 强制约束输出结构",
    currentDocs: "当前 API 额外提供了原生 JSON Outputs 模式与 Strict Tool Use 模式",
    strategy: "深刻理解 JSON Schema 的字段防伪设计（nullable）与语义校验，不拘泥于特定参数名。",
  },
  {
    topic: "Commands 与 Skills",
    examGuide: "本地备考指南常将 Commands 与 Skills 作为两个独立概念横向对比",
    currentDocs: "官方产品功能持续演进，Skills 正逐渐成为涵盖命令、权限、隔离的主流标准规范",
    strategy: "考试按 Exam Guide 语境；实际代码工程按当前 Claude Code 官方最新文档规范组织。",
  },
  {
    topic: "工具权限限制 (allowedTools)",
    examGuide: "部分早期非官方社区笔记常误把 allowedTools 当成物理可见性工具隔离手段",
    currentDocs: "在当前 Agent SDK 中，allowedTools 仅代表自动批准免确认执行，不代表从上下文中隐藏",
    strategy: "真正限制工具面与防越权必须结合 tools（定义可见集）、disallowedTools 与系统 Permission 模式。",
  },
];

const outOfScopeList = [
  "模型微调 (Fine-tuning) 或从零预训练自定义 Claude 模型",
  "Claude 内部底层架构、Transformer 层数、权重分布、RLHF 与 Constitutional AI 训练技术细节",
  "底层 API 鉴权、Token 签名算法、OAuth 内部协商、计费账户与 Key 轮换等协议实现细节",
  "MCP Server 的 Docker 容器构建、K8s 编排、网络隧道打通与云端托管运维",
  "向量数据库 (Vector DB) 索引构建、HNSW 算法细节与 Embedding 内部数学原理",
  "Computer Use 桌面接管、纯视觉多模态底层与 Server-Sent Events (SSE) 网络流处理细节",
  "特定云厂商 (AWS Bedrock / GCP Vertex AI / Azure) 专属控制台与 IAM 鉴权配置细节",
  "Token 计数算法 (BPE Tokenizer)、精确每千 Token 价格数学心算与跨模型性能 Benchmark 跑分",
  "Prompt Caching 的底层缓存命中算法机制与硬件存储结构",
];

const studyResources = {
  official: [
    { name: "官方认证页与 Exam Guide", url: "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification", desc: "官方认证唯一权威报名入口、Exam Guide v1.0 PDF 下载与考试政策更新" },
    { name: "Anthropic Academy 课程总入口", url: "https://anthropic.skilljar.com/", desc: "官方出品的互动学习课程（包含 Building with Claude API、MCP 入门等）" },
    { name: "Introduction to subagents 官方课", url: "https://anthropic.skilljar.com/introduction-to-subagents", desc: "深入讲解子 Agent 隔离、上下文传递、委托与反模式，与 D1/D5 考点高度契合" },
    { name: "Claude Platform 文档", url: "https://platform.claude.com/docs/en/home", desc: "Anthropic 官方 API 文档、stop_reason 规范、Prompt 工程指南与 Message Batches API" },
    { name: "Claude Code 官方文档", url: "https://code.claude.com/docs/en/overview", desc: "CLAUDE.md、Rules、Skills、内置工具与 CI/CD 集成权威指南" },
    { name: "Claude Agent SDK 官方文档", url: "https://code.claude.com/docs/en/agent-sdk/overview", desc: "Hooks 拦截器规范、多 Agent 架构契约与最新 Agent 工具使用指南" },
    { name: "Model Context Protocol (MCP) 规范", url: "https://modelcontextprotocol.io/", desc: "MCP 官方协议标准、Resources、Prompts、Tools 与结构化错误响应规范" },
  ],
  community: [
    { name: "claudecertificationguide.com 社区模拟站", url: "https://claudecertificationguide.com/mock-exam", desc: "独立社区制作的 60 题全真模拟试卷，用于适应 120 分钟做题节奏与场景判断" },
    { name: "Ray 的工作流实操 Skills 库", url: "https://github.com/imraywang/rayskills", desc: "社区优秀的 Agent 工作流可执行实操参考代码，体会工程落地实践" },
    { name: "YouTube CCAR-F 完整视频课程列表", url: "https://www.youtube.com/watch?v=v3tMqTmgg2Q&list=PLviC8AFqAj5A9MHkRIn2fU5Ac2lEdJxNf&index=13", desc: "群友推荐的社区系统化复习视频讲解，帮助建立全景视觉框架" },
    { name: "Agent 工程反模式演讲 (2026 World's Fair)", url: "https://www.youtube.com/watch?v=Z-c11pV_uvU", desc: "深入剖析 Agent 常见落地灾难、工具误判与上下文过载，直击 D1/D2/D5 考点灵魂" },
  ],
};

const aiCoachPrompt = `你是我的 CCAR-F（Claude Certified Architect - Foundations）备考教练。请严格依据 Anthropic 官方 Exam Guide v1.0 与权威考纲出原创场景练习题，切勿声称题目来自真实考试，也不要使用泄露题库。

【训练规则】
1. 从 6 个官方场景中随机挑选一个真实工程场景：
   - Customer Support Resolution Agent
   - Code Generation with Claude Code
   - Multi-Agent Research System
   - Developer Productivity with Claude
   - Claude Code for Continuous Integration
   - Structured Data Extraction
2. 将一个或多个 Domain 考点（D1 架构、D2 工具/MCP、D3 Claude Code工作流、D4 Prompt与结构化输出、D5 可靠性与上下文）嵌入到具体工程决策中。
3. 题型可以是单选或多选；多选必须在题干明确注明「（选择 2 项）」或「（选择 3 项）」。
4. 每次只出 1 道题，绝不提前透露正确答案、考点编号或解析。
5. 等待我的回答。我回答后，先明确判断我的对错，然后逐一详细解释每一个选项为什么对、为什么错（尤其是迷惑性极强的干扰项错在何处）。
6. 指出我踩中的错因类别（如：过度设计、误把 Prompt 当硬限制、忽略题干约束、工具边界不清、错误恢复不当、上下文丢失、配置 Scope 错配、SLA/批处理错配等）。
7. 给出对应的 Task Statement 编号（如 D1.4、D4.3）和需要回看的知识点。
8. 每完成 5 题，按 Domain 统计我的正确率和错因分布，下一轮优先针对我的薄弱点出题。

现在，请根据 CCAR-F 核心考纲，为我生成第 1 道高质量场景题！`;

// 全局命名空间挂载（确保跨环境兼容）
if (typeof window !== "undefined") {
  window.examInfo = examInfo;
  window.domains = domains;
  window.decisionRules = decisionRules;
  window.highFrequencyTraps = highFrequencyTraps;
  window.officialScenarios = officialScenarios;
  window.errorCategories = errorCategories;
  window.studyPlans = studyPlans;
  window.preExamChecklist = preExamChecklist;
  window.versionDivergence = versionDivergence;
  window.outOfScopeList = outOfScopeList;
  window.studyResources = studyResources;
  window.aiCoachPrompt = aiCoachPrompt;
}
if (typeof globalThis !== "undefined") {
  globalThis.examInfo = examInfo;
  globalThis.domains = domains;
  globalThis.decisionRules = decisionRules;
  globalThis.highFrequencyTraps = highFrequencyTraps;
  globalThis.officialScenarios = officialScenarios;
  globalThis.errorCategories = errorCategories;
  globalThis.studyPlans = studyPlans;
  globalThis.preExamChecklist = preExamChecklist;
  globalThis.versionDivergence = versionDivergence;
  globalThis.outOfScopeList = outOfScopeList;
  globalThis.studyResources = studyResources;
  globalThis.aiCoachPrompt = aiCoachPrompt;
}

