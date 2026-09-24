/**
 * CCAR-F (Claude Certified Architect - Foundations) Bilingual Database
 * 备考全景数据库 (中英双语支持)
 * Based on Anthropic Exam Guide v1.0 (July 2026)
 */

const I18N = {
  "zh": {
    "brand_title": "备考全景看板 & 每日打卡",
    "brand_sub": "Claude Certified Architect · Foundations",
    "plan_7": "7 天冲刺",
    "plan_14": "14 天稳妥",
    "btn_pomodoro": "专注计时",
    "btn_export": "导出",
    "btn_import": "导入",
    "btn_reset": "重置",
    "mastery_kicker": "官方权重加权",
    "mastery_label": "加权掌握度",
    "mastery_caption": "按 D1 27%, D2 18%, D3 20%, D4 20%, D5 15% 精确计算",
    "today_pending": "待打卡",
    "today_done": "已打卡",
    "today_suggest": "建议学习",
    "minutes_unit": "分钟",
    "today_deliverable_label": "必做交付证据：",
    "checkin_label": "完成今日打卡",
    "checked_in_label": "今日已打卡",
    "btn_focus_now": "开始专注学习 (25m)",
    "stats_kicker": "备考战斗力统计",
    "stat_streak": "连续打卡",
    "stat_total_checkins": "总打卡",
    "stat_plan_progress": "计划进度",
    "stat_completion_rate": "完成率",
    "stat_verified": "考点已验证",
    "stat_covered": "总覆盖",
    "stat_mock_readiness": "Mock 就绪度",
    "stat_mock_none": "未开始",
    "stat_mock_no_record": "暂无模拟记录",
    "days_unit": "天",
    "times_unit": "次",
    "hours_unit": "小时",
    "set_exam_date_btn": "设置日期",
    "exam_countdown_unset": "目标考期：尚未设定",
    "strip_code": "代码：",
    "strip_questions": "题量：",
    "strip_questions_val": "60 题 (单选+多选)",
    "strip_duration": "时长：",
    "strip_duration_val": "120 分钟 (约 135 分钟 Seat Time)",
    "strip_scenarios": "场景：",
    "strip_scenarios_val": "6 抽 4 官方场景",
    "strip_pass": "及格分：",
    "strip_pass_val": "720 / 1000 (Scaled Score)",
    "strip_fee": "费用：",
    "strip_fee_val": "$125 USD",
    "tab_plan": "每日学习与打卡",
    "tab_blueprint": "30 项考点深度库",
    "tab_lens": "10 步决策罗盘 & 场景",
    "tab_mock": "Mock 模拟 & 错题本",
    "tab_resources": "考前清单 & 资源",
    "plan_subheading": "每一天都有明确的目标、实操任务与必须留下的可检验交付证据",
    "plan_done_prefix": "已完成",
    "deliverable_tag": "[检验产出] ",
    "mark_completed": "标记完成并打卡",
    "already_completed": "今日已完成",
    "btn_write_reflection": "写今日打卡心得",
    "calendar_title": "打卡日历 & 学习印记",
    "streak_label": "连胜",
    "legend_today": "今日已打卡",
    "legend_past": "历史打卡",
    "legend_empty": "未打卡",
    "notes_title": "每日打卡心得与错题速记",
    "btn_add_note": "+ 补充心得",
    "notes_empty_title": "[暂无心得]",
    "notes_empty_desc": "打卡时记录今天的思考、易混点或总结，将保存在此处。",
    "search_placeholder": "搜索考点、关键词（例如：hooks, stop_reason, batch, session, claude.md）...",
    "stage_filter_label": "掌握阶段筛选：",
    "stage_all": "全部 (30)",
    "stage_0": "0. 未学",
    "stage_1": "1. 理解",
    "stage_2": "2. 练习",
    "stage_3": "3. 验证",
    "stage_guide_title": "四阶掌握度标准：",
    "stage_step_0": "尚未阅读该 Task Statement 核心规范",
    "stage_step_1": "能解释核心原理、与相近概念的区别",
    "stage_step_2": "能写出对应的代码/配置/流程图反模式",
    "stage_step_3": "在陌生场景题中能迅速排除高频干扰项并做对",
    "domain_weight_prefix": "官方权重",
    "key_principles_label": "核心原理与最佳做法",
    "anti_patterns_label": "高频反模式与易错陷阱",
    "evidence_label": "掌握证据要求",
    "stage_select_prefix": "掌握阶段：",
    "compass_title": "场景题统一决策罗盘 (Exam Decision Lens)",
    "compass_subheading": "遇到任何复杂工程场景题，按以下 10 步黄金顺序快速判定最优解，秒杀干扰项！",
    "btn_copy_prompt": "复制 AI 刷题教练 Prompt",
    "rule_criterion_label": "判断准则：",
    "rule_trap_label": "[常见陷阱] ",
    "traps_title": "高频干扰项陷阱对比清单",
    "traps_subheading": "官方与高质量题库中最爱设下的 10 大思维误区，认清套路不踩坑！",
    "trap_tag": "[典型误区]",
    "trap_reason_label": "为什么错 / 正确做法：",
    "scenarios_title": "官方 6 大考试场景全貌 (每次考试抽选 4 个)",
    "scenarios_subheading": "理解每个场景的典型技术架构、关键设计点与考点映射",
    "scenario_prefix": "场景",
    "mock_form_title": "录入 Mock 模拟考成绩",
    "mock_form_sub": "每套模拟测试 60 题，建议在 105 分钟内答完，留 15 分钟复核",
    "readiness_unqualified": "未达到就绪标准",
    "readiness_qualified": "已达就绪标准 (>=80%)",
    "mock_date_label": "考试日期",
    "mock_correct_label": "答对题数 (0-60)",
    "mock_minutes_label": "用时 (分钟)",
    "mock_weakest_label": "表现最弱 Domain",
    "mock_source_label": "模拟题来源",
    "mock_notes_label": "总结与错因概括",
    "mock_submit_btn": "保存此次 Mock 战绩",
    "mock_history_title": "Mock 历史记录",
    "mock_empty_title": "[暂无记录]",
    "mock_empty_desc": "暂无 Mock 记录。建议按 60 题 / 120 分钟进行全真计时模拟，在此记录分数以评估就绪度。",
    "mistakes_title": "错题笔记本",
    "mistakes_subtitle": "复盘的是错因根因，而不是死背题号字母！",
    "btn_add_mistake": "+ 添加一道错题",
    "all_mistakes": "全部错题",
    "mistakes_empty_title": "[暂无错题记录]",
    "mistakes_empty_desc": "模拟做错题时，点击上方按钮按 9 大分类记录，随时复习避免二次踩坑。",
    "mistake_my_label": "我的错误选择：",
    "mistake_correct_label": "正确选项：",
    "mistake_reflection_label": "复盘心得：",
    "checklist_title": "考前最后一页 · 10 项确认清单",
    "checklist_sub": "走进考场或开启 Pearson 远程监控前，逐项自我确认（点击可打勾并自动保存）",
    "checklist_score_prefix": "已确认",
    "divergence_title": "版本演进避坑指南 (Exam Guide vs 当前官方文档)",
    "divergence_sub": "官方考试命题与实际最新 SDK 之间的差异对照，避免死背过时参数或与考纲冲突",
    "div_col_topic": "主题",
    "div_col_exam": "Exam Guide / 旧题库语境",
    "div_col_docs": "当前官方产品文档语境",
    "div_col_strategy": "答题与实操策略",
    "out_of_scope_title": "明确不考范围 (Out of Scope · 杜绝盲目内耗)",
    "out_of_scope_sub": "以下内容在真实工程中很有用，但 CCAR-F 考纲已明确排除，备考期间切勿把时间浪费在此处！",
    "resources_title": "官方与优质社区资源矩阵",
    "res_official_title": "官方权威通道 (最高优先级)",
    "res_community_title": "社区辅助实操与模拟",
    "footer_p1": "CCAR-F 学习看板数据完全运行于本地浏览器并保存在 localStorage，不会上传个人信息。",
    "footer_p2": "本项目独立制作，不隶属于 Anthropic，亦未获其赞助或背书。认证相关商标权属其合法所有人。",
    "modal_checkin_title": "记录今日打卡",
    "modal_checkin_date": "打卡日期",
    "modal_checkin_duration": "今日专注时长 (分钟)",
    "modal_checkin_day": "对应计划天数",
    "modal_checkin_note": "今日学习笔记 / 交付产物心得 (可选)",
    "modal_btn_cancel": "取消",
    "modal_btn_checkin_submit": "点亮今日打卡",
    "modal_mistake_title": "添加新错题记录",
    "modal_mistake_q": "题目标识 / 场景",
    "modal_mistake_domain": "所属 Domain & Task",
    "modal_mistake_stem": "核心题干与关键约束 (决定答案的关键句)",
    "modal_mistake_my": "我的错误选择",
    "modal_mistake_correct": "正确选项与理由",
    "modal_mistake_cat": "9 大标准错因分类",
    "modal_mistake_ref": "回补知识点 / 备考材料",
    "modal_mistake_refl": "复盘总结 (下次如何一眼识破此陷阱)",
    "modal_btn_save_mistake": "保存错题",
    "modal_pomo_title": "专注学习计时器",
    "pomo_preset_25": "25 分钟 (经典番茄)",
    "pomo_preset_50": "50 分钟 (深度研读)",
    "pomo_preset_15": "15 分钟 (速记复盘)",
    "pomo_ready": "准备就绪，保持专注",
    "pomo_running": "专注中，沉浸思考...",
    "pomo_paused": "已暂停",
    "pomo_finished": "太棒了！本次专注已完成！",
    "pomo_btn_start": "开始专注",
    "pomo_btn_pause": "暂停",
    "pomo_btn_resume": "继续",
    "pomo_btn_reset": "重置",
    "pomo_tip": "[提示] 专注结束后，学习时间将自动计入今日学习统计并提示打卡。",
    "modal_date_title": "设置目标考试日期",
    "modal_date_label": "目标考试日期 (YYYY-MM-DD)",
    "modal_btn_save_date": "保存日期",
    "modal_btn_clear_date": "清除日期",
    "toast_switched_lang": "已切换为中文显示",
    "toast_prompt_copied": "已复制 AI 刷题教练 Prompt 到剪贴板！",
    "toast_export_success": "学习进度数据已成功导出为 JSON 备份！",
    "toast_import_success": "数据恢复成功！看板已更新。",
    "toast_reset_success": "数据已重置为初始状态。",
    "confirm_reset": "警告：此操作将清空所有打卡记录、模拟成绩与错题笔记，确定重置吗？"
  },
  "en": {
    "brand_title": "CCAR-F Study Companion & Daily Flow",
    "brand_sub": "Claude Certified Architect · Foundations",
    "plan_7": "7-Day Sprint",
    "plan_14": "14-Day Steady",
    "btn_pomodoro": "Pomodoro",
    "btn_export": "Export",
    "btn_import": "Import",
    "btn_reset": "Reset",
    "mastery_kicker": "Domain-Weighted Mastery",
    "mastery_label": "Weighted Mastery",
    "mastery_caption": "Weighted precisely by D1 27%, D2 18%, D3 20%, D4 20%, D5 15%",
    "today_pending": "Pending",
    "today_done": "Completed",
    "today_suggest": "Suggested Study",
    "minutes_unit": "mins",
    "today_deliverable_label": "Required Deliverable:",
    "checkin_label": "Complete Today's Check-in",
    "checked_in_label": "Checked in Today",
    "btn_focus_now": "Start Focus Session (25m)",
    "stats_kicker": "Exam Readiness Matrix",
    "stat_streak": "Current Streak",
    "stat_total_checkins": "Total Logs",
    "stat_plan_progress": "Plan Progress",
    "stat_completion_rate": "Rate",
    "stat_verified": "Tasks Verified",
    "stat_covered": "Covered",
    "stat_mock_readiness": "Mock Readiness",
    "stat_mock_none": "Not Started",
    "stat_mock_no_record": "No mock records yet",
    "days_unit": "days",
    "times_unit": "times",
    "hours_unit": "hrs",
    "set_exam_date_btn": "Set Date",
    "exam_countdown_unset": "Target Date: Not Set",
    "strip_code": "Code: ",
    "strip_questions": "Format: ",
    "strip_questions_val": "60 Questions (Single + Multiple)",
    "strip_duration": "Duration: ",
    "strip_duration_val": "120 mins (~135 mins Seat Time)",
    "strip_scenarios": "Scenarios: ",
    "strip_scenarios_val": "4 of 6 Official Scenarios",
    "strip_pass": "Passing: ",
    "strip_pass_val": "720 / 1000 (Scaled Score)",
    "strip_fee": "Fee: ",
    "strip_fee_val": "$125 USD",
    "tab_plan": "Daily Flow & Habits",
    "tab_blueprint": "30 Task Statements",
    "tab_lens": "10-Step Decision Compass",
    "tab_mock": "Mock Results & Mistakes",
    "tab_resources": "Pre-Flight & Resources",
    "plan_subheading": "Every day includes clear objectives, hands-on tasks, and verifiable deliverable artifacts.",
    "plan_done_prefix": "Completed",
    "deliverable_tag": "[Deliverable] ",
    "mark_completed": "Mark Done & Check-in",
    "already_completed": "Completed Today",
    "btn_write_reflection": "Write Daily Reflection",
    "calendar_title": "Check-in Calendar & Habits",
    "streak_label": "Streak",
    "legend_today": "Today Checked",
    "legend_past": "Past Checked",
    "legend_empty": "Not Checked",
    "notes_title": "Daily Reflections & Pitfall Notes",
    "btn_add_note": "+ Add Reflection",
    "notes_empty_title": "[No Notes Yet]",
    "notes_empty_desc": "Reflections, tricky pitfalls, and takeaways recorded during check-in will appear here.",
    "search_placeholder": "Search tasks, keywords (e.g., hooks, stop_reason, batch, session, claude.md)...",
    "stage_filter_label": "Mastery Filter:",
    "stage_all": "All (30)",
    "stage_0": "0. Unstarted",
    "stage_1": "1. Concept",
    "stage_2": "2. Practice",
    "stage_3": "3. Verified",
    "stage_guide_title": "4-Stage Mastery Standards:",
    "stage_step_0": "Have not read the core specification for this Task Statement",
    "stage_step_1": "Can articulate core principles and distinctions from adjacent concepts",
    "stage_step_2": "Can implement code, configuration, and identify anti-patterns",
    "stage_step_3": "Can reliably eliminate subtle traps in new unseen scenario questions",
    "domain_weight_prefix": "Official Weight",
    "key_principles_label": "Core Principles & Best Practices",
    "anti_patterns_label": "Anti-Patterns & Pitfalls",
    "evidence_label": "Evidence Required",
    "stage_select_prefix": "Stage:",
    "compass_title": "Universal Scenario Decision Lens",
    "compass_subheading": "Eliminate wrong options sequentially using these 10 golden rules when facing complex exam questions!",
    "btn_copy_prompt": "Copy AI Coach System Prompt",
    "rule_criterion_label": "Criterion: ",
    "rule_trap_label": "[Common Trap] ",
    "traps_title": "10 High-Frequency Trap Comparisons",
    "traps_subheading": "The 10 most common cognitive traps in official questions. Spot the pattern, avoid the trap!",
    "trap_tag": "[Pitfall]",
    "trap_reason_label": "Why It's Wrong & Proper Approach: ",
    "scenarios_title": "6 Official Exam Scenarios (4 Selected per Exam)",
    "scenarios_subheading": "Understand each scenario's architectural patterns, key design considerations, and domain mappings.",
    "scenario_prefix": "Scenario",
    "mock_form_title": "Record Mock Exam Score",
    "mock_form_sub": "60 questions per set. Recommended completion within 105 mins with 15 mins for review.",
    "readiness_unqualified": "Not Yet Ready",
    "readiness_qualified": "Ready for Exam (>=80%)",
    "mock_date_label": "Date",
    "mock_correct_label": "Correct (0-60)",
    "mock_minutes_label": "Time (mins)",
    "mock_weakest_label": "Weakest Domain",
    "mock_source_label": "Exam Source",
    "mock_notes_label": "Summary & Error Notes",
    "mock_submit_btn": "Save Mock Result",
    "mock_history_title": "Mock History",
    "mock_empty_title": "[No Records]",
    "mock_empty_desc": "No mock records yet. Complete a 60-question / 120-min timed practice exam to gauge exam readiness.",
    "mistakes_title": "Mistake Notebook",
    "mistakes_subtitle": "Focus on the root cause of mistakes, not rote memorization of question letters!",
    "btn_add_mistake": "+ Add Mistake Review",
    "all_mistakes": "All Mistakes",
    "mistakes_empty_title": "[No Mistakes Logged]",
    "mistakes_empty_desc": "When you miss a question during practice, log it here under one of the 9 error categories to avoid repeating the mistake.",
    "mistake_my_label": "My Selection: ",
    "mistake_correct_label": "Correct Answer: ",
    "mistake_reflection_label": "Takeaway Reflection: ",
    "checklist_title": "Pre-Flight Matrix · 10-Point Checklist",
    "checklist_sub": "Before stepping into the exam room or starting Pearson VUE proctoring, verify each item (auto-saved).",
    "checklist_score_prefix": "Verified",
    "divergence_title": "Version Evolution Notice (Exam Guide vs Current Docs)",
    "divergence_sub": "Comparison of exam scope expectations vs latest SDK release updates to avoid obsolete parameters.",
    "div_col_topic": "Topic",
    "div_col_exam": "Exam Guide / Question Context",
    "div_col_docs": "Current Documentation Context",
    "div_col_strategy": "Exam & Engineering Strategy",
    "out_of_scope_title": "Explicitly Out of Scope (Do Not Waste Time)",
    "out_of_scope_sub": "Valuable in real production, but explicitly excluded from the CCAR-F blueprint. Do not study these for the exam!",
    "resources_title": "Official & Community Resource Matrix",
    "res_official_title": "Official Primary Channels (Highest Priority)",
    "res_community_title": "Community Practice & Video Tutorials",
    "footer_p1": "CCAR-F Study Companion operates 100% locally in your browser and stores data in localStorage. Zero tracking.",
    "footer_p2": "Independent open-source study tool, not affiliated with, endorsed by, or sponsored by Anthropic PBC. Trademarks belong to their respective owners.",
    "modal_checkin_title": "Log Today's Check-in",
    "modal_checkin_date": "Date",
    "modal_checkin_duration": "Focus Duration (mins)",
    "modal_checkin_day": "Study Plan Day",
    "modal_checkin_note": "Daily Reflections / Deliverable Learnings (Optional)",
    "modal_btn_cancel": "Cancel",
    "modal_btn_checkin_submit": "Submit Check-in",
    "modal_mistake_title": "Add Mistake Review",
    "modal_mistake_q": "Question / Scenario ID",
    "modal_mistake_domain": "Domain & Task Statement",
    "modal_mistake_stem": "Question Stem & Core Constraint",
    "modal_mistake_my": "My Selection",
    "modal_mistake_correct": "Correct Answer & Justification",
    "modal_mistake_cat": "9 Root-Cause Error Category",
    "modal_mistake_ref": "Reference Review Topic",
    "modal_mistake_refl": "Reflection & Prevention Rule",
    "modal_btn_save_mistake": "Save Mistake",
    "modal_pomo_title": "Pomodoro Focus Timer",
    "pomo_preset_25": "25 Mins (Classic Focus)",
    "pomo_preset_50": "50 Mins (Deep Dive)",
    "pomo_preset_15": "15 Mins (Quick Recall)",
    "pomo_ready": "Ready to focus",
    "pomo_running": "Focusing... Keep deep concentration",
    "pomo_paused": "Paused",
    "pomo_finished": "Great job! Focus session completed!",
    "pomo_btn_start": "Start Focus",
    "pomo_btn_pause": "Pause",
    "pomo_btn_resume": "Resume",
    "pomo_btn_reset": "Reset",
    "pomo_tip": "[Tip] Once finished, focus minutes are automatically logged to study stats.",
    "modal_date_title": "Set Target Exam Date",
    "modal_date_label": "Target Date (YYYY-MM-DD)",
    "modal_btn_save_date": "Save Date",
    "modal_btn_clear_date": "Clear Date",
    "toast_switched_lang": "Switched to English",
    "toast_prompt_copied": "AI Coach Prompt copied to clipboard!",
    "toast_export_success": "Study progress exported as JSON!",
    "toast_import_success": "Data imported successfully! Dashboard updated.",
    "toast_reset_success": "All data reset to initial state.",
    "confirm_reset": "Warning: This will clear all check-in logs, mock scores, and mistake reviews. Are you sure?"
  }
};

const examInfo = {
  "title": "Claude Certified Architect - Foundations",
  "code": "CCAR-F",
  "aliases": [
    "CCA-F",
    "Claude Architect"
  ],
  "questionsCount": 60,
  "durationMinutes": 120,
  "seatTimeMinutes": 135,
  "passingScore": 720,
  "scoreRange": "100 - 1000",
  "feeUSD": 125,
  "validityMonths": 12,
  "language": "English",
  "format": "Multiple choice + multiple response (每题注明选几项)",
  "delivery": "Pearson VUE 在线监考或考试中心",
  "scenariosRule": "官方 6 个场景中每次随机抽 4 个",
  "sourceVersion": "Effective July 2026 · Exam Guide v1.0"
};

const domains = [
  {
    "code": "D1",
    "title": "Agentic Architecture & Orchestration",
    "weight": 27,
    "order": 1,
    "summary": "设计和编排高可靠、可扩展的自主 Agent 循环、多 Agent 协调、Hooks 与工作流。",
    "topics": [
      {
        "code": "1.1",
        "title": "Agentic loop 与 stop_reason 推进机制",
        "official": "Design and implement agentic loops for autonomous task execution",
        "summary": "根据 stop_reason 推进 tool_use / tool_result 循环，并在 end_turn 正确终止。",
        "keyPoints": [
          "标准循环：发送请求 → 检查 stop_reason → 若为 tool_use 执行工具 → 包装 tool_result 回传 → 递归推进直到 end_turn。",
          "完成信号：只有模型返回 stop_reason === 'end_turn' 时代表自主完成。",
          "生产全面分支：除核心二分外，真实工程还必须处理 max_tokens（超长截断）、pause_turn、refusal（模型拒答）、model_context_window_exceeded 等。"
        ],
        "antiPatterns": [
          "[反模式] 依靠解析自然语言文本（如判断 'I am done'、'Finished'）作为循环结束依据。",
          "[反模式] 仅检查 assistant 返回文本而不检查 stop_reason。",
          "[反模式] 把固定的最大轮数（max_iterations）作为主要完成判断（最大轮数只能是兜底熔断，不是正常完成）。"
        ],
        "evidence": "画出完整的 agentic loop 状态机，列出至少 3 种反模式并给出 stop_reason 完整处理代码伪代码。",
        "title_en": "Agentic Loop & stop_reason Flow",
        "summary_en": "Drive tool_use / tool_result recursive cycles based on stop_reason, cleanly terminating on end_turn.",
        "keyPoints_en": [
          "Standard loop: Send request -> inspect stop_reason -> execute tool if tool_use -> package tool_result back -> recurse until end_turn.",
          "Completion signal: The model has autonomously completed only when stop_reason === 'end_turn'.",
          "Production branches: In real systems, handle max_tokens (truncation), pause_turn, refusal, and model_context_window_exceeded."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Relying on natural language text parsing (e.g. 'I am done', 'Task complete') to conclude the loop.",
          "[Anti-Pattern] Inspecting assistant message text while ignoring stop_reason.",
          "[Anti-Pattern] Treating fixed max_iterations as normal completion rather than a circuit-breaker fallback."
        ],
        "evidence_en": "Draw complete agentic loop state machine, list 3 anti-patterns, and provide complete stop_reason handling pseudocode."
      },
      {
        "code": "1.2",
        "title": "Coordinator-Subagent 多 Agent 编排架构",
        "official": "Orchestrate multi-agent systems with coordinator-subagent patterns",
        "summary": "基于 Hub-and-Spoke 模式，由协调器负责拆解任务、委派执行、聚合结果与错误路由。",
        "keyPoints": [
          "Hub-and-spoke 拓扑：中央协调器掌握全局目标，子 Agent 专注于单一隔离领域，结果回传给协调器聚合判断。",
          "上下文绝对隔离：子 Agent 默认不共享主会话上下文，也不与其他子 Agent 共享上下文，必须显式传递入参。",
          "开放性研究：协调器先划定互不重叠的研究范围（MECE）；若子 Agent 报告证据不足，协调器再动态补派。"
        ],
        "antiPatterns": [
          "[反模式] 允许子 Agent 之间互相直接调用和横向网状通信（调试灾难、状态失控）。",
          "[反模式] 跳过协调器直接将原始子 Agent 输出拼接呈现给用户。",
          "[反模式] 任务拆分过细过窄，导致子 Agent 频繁丢失上下文且无法发现跨领域关联。"
        ],
        "evidence": "为复杂代码审查或多源情报研究任务绘制 Hub-and-Spoke 数据流图，说明入参与出参边界。",
        "title_en": "Coordinator-Subagent Architecture",
        "summary_en": "Employ a Hub-and-Spoke topology where the coordinator decomposes tasks, delegates to isolated workers, and synthesizes results.",
        "keyPoints_en": [
          "Hub-and-spoke topology: Central coordinator maintains global goals; subagents specialize in isolated domains and return results to coordinator.",
          "Strict context isolation: Subagents do not share main session history or peer contexts by default; inputs must be explicitly supplied.",
          "Open-ended research: Coordinator establishes MECE research boundaries. If evidence is insufficient, coordinator dynamically dispatches follow-ups."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Allowing subagents to communicate mesh-style or call each other directly (cascading state drift).",
          "[Anti-Pattern] Bypassing the coordinator to present raw subagent outputs directly to the user.",
          "[Anti-Pattern] Slicing tasks too narrowly, causing subagents to lose domain context and cross-cutting connections."
        ],
        "evidence_en": "Draw a Hub-and-Spoke dataflow diagram for code review or intelligence research, detailing input/output boundaries."
      },
      {
        "code": "1.3",
        "title": "Subagent 调用、上下文显式传递与并行化",
        "official": "Configure subagent invocation, context passing, and spawning",
        "summary": "显式向子 Agent 注入前序发现、约束边界与来源追溯，识别独立分支并发执行以降低延迟。",
        "keyPoints": [
          "显式上下文传递：前序 findings、明确目标、不可逾越约束、来源元数据与结构化输出格式。",
          "并发优化：同一轮推理中若有多个互不依赖的子任务，协调器应一次性发起多个调用并行执行，极大缩短总体耗时。",
          "AgentDefinition 核心要素：清晰专一的 description、精准的 system prompt、受限工具集与最小权限。",
          "版本注意：官方 Exam Guide 习惯使用 Task 工具，当前 Claude Agent SDK 已升级为 Agent 工具。"
        ],
        "antiPatterns": [
          "[反模式] 试图让子 Agent 自动继承父会话全部历史聊天记录（导致上下文污染和 Token 爆炸）。",
          "[反模式] 将串行没有依赖的 4 个查询依次排队调用，带来数倍的延迟惩罚。",
          "[反模式] 给子 Agent 分配与其专职无关的宽泛高危工具集。"
        ],
        "evidence": "写出一份标准子 Agent 提示词模板，包含 findings 承接、边界限制、输出 schema 与并行调用示例。",
        "title_en": "Subagent Context Passing & Concurrency",
        "summary_en": "Explicitly inject prior findings, constraints, and provenance to subagents; dispatch independent branches concurrently to reduce latency.",
        "keyPoints_en": [
          "Explicit context passing: Prior findings, clear objectives, strict constraints, source metadata, and structured output schemas.",
          "Concurrency optimization: When multiple independent subtasks exist in a turn, coordinator should dispatch them in parallel via Promise.all.",
          "AgentDefinition essentials: Focused description, targeted system prompt, restricted toolset, and least privilege.",
          "Version note: Official Exam Guide uses 'Task' tool; current Claude Agent SDK uses 'Agent' tool."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Letting subagents automatically inherit entire parent conversation history (token explosion & context pollution).",
          "[Anti-Pattern] Queuing 4 independent queries sequentially, compounding latency penalties.",
          "[Anti-Pattern] Allocating broad, risky toolsets to subagents unrelated to their specialty."
        ],
        "evidence_en": "Write a standardized subagent prompt template with findings inheritance, boundary limits, output schema, and parallel call examples."
      },
      {
        "code": "1.4",
        "title": "多步工作流中的强制顺序控制与结构化交接 (Handoff)",
        "official": "Implement multi-step workflows with enforcement and handoff patterns",
        "summary": "区分自然语言 Prompt 软指导与程序级前置条件硬控制，设计规范的人工接管 Handoff。",
        "keyPoints": [
          "核心分水岭：关键业务顺序（如先验身份再退款、先执行 dry-run 再落库）必须由程序代码/状态机/拦截器强制执行，绝对不能仅凭 Prompt 祈求模型遵守！",
          "复合需求分解：用户一个输入包含多项请求时，先解耦为独立调查项并行获取事实，最后统一合成回复。",
          "结构化人机交接 (Human Handoff)：人工接管必须包含结构化卡片（用户ID、意图、根因排查、已尝试步骤、潜在风险、建议下一步）。"
        ],
        "antiPatterns": [
          "[反模式] 仅在 Prompt 中写「请务必在核验身份后再退款」（属于概率性软约束，严重安全合规漏洞）。",
          "[反模式] 遇到情绪激动的用户立即裸露转接人工，未附带任何上下文和已排查事实。",
          "[反模式] 因单个非关键子项出错，直接中止整个多步骤工作流。"
        ],
        "evidence": "设计一个带程序级前置校验的退款工作流，并给出标准 JSON Handoff 数据包契约。",
        "title_en": "Enforcement & Structured Handoffs",
        "summary_en": "Distinguish between prompt soft guidance and code-level deterministic prerequisites; engineer structured human handoffs.",
        "keyPoints_en": [
          "Core boundary: Critical business ordering (e.g. verify identity before refund) must be enforced programmatically by code, state machines, or interceptors, never by prompt alone!",
          "Compound request decoupling: Deconstruct multi-intent requests into independent investigation branches, gather facts in parallel, and synthesize.",
          "Structured human handoff: Human handoff payloads must contain a structured card (user ID, intent, root cause, attempted steps, risks, recommended next step)."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Relying solely on prompts like 'Please ensure identity is verified before refunding' (probabilistic soft guidance, critical security flaw).",
          "[Anti-Pattern] Naked transfer to human agents upon encountering emotional users without attaching structured case facts.",
          "[Anti-Pattern] Aborting the entire workflow when a single non-critical sub-step encounters an issue."
        ],
        "evidence_en": "Design a refund workflow with programmatic pre-validation and provide a standard JSON handoff payload schema."
      },
      {
        "code": "1.5",
        "title": "Agent SDK Hooks 确定性拦截与数据归一化",
        "official": "Apply Agent SDK hooks for tool call interception and data normalization",
        "summary": "利用 PreToolUse 与 PostToolUse 钩子在工具执行前后注入确定性安全策略与数据清洗。",
        "keyPoints": [
          "PreToolUse Hook：在工具实际执行前触发，用于校验参数合法性、核查角色权限、阻断高危越权调用（确定性防御）。",
          "PostToolUse Hook：在工具执行后触发，用于统一清洗工具返回的数据格式、脱敏敏感信息、补充来源元数据、裁剪巨量冗余字段。",
          "决策原则：涉及资产资金、系统破坏、隐私安全、合规合规优先选择 Hooks/硬拦截；语气风格、排版偏好选择 Prompt。"
        ],
        "antiPatterns": [
          "[反模式] 试图用 Few-shot 或更严厉的 Prompt 语气去防止 Prompt Injection 或工具越权调用。",
          "[反模式] 在 PostToolUse 中不做字段裁剪，任由后端几十 KB 的全部数据库 dump 灌入 LLM 上下文。"
        ],
        "evidence": "写出 PreToolUse 与 PostToolUse 的触发时机对比表，并编写一个防 SQL 注入/高危指令的 PreToolUse 逻辑。",
        "title_en": "Agent SDK Hooks & Interception",
        "summary_en": "Leverage PreToolUse and PostToolUse hooks for deterministic security guardrails and data normalization.",
        "keyPoints_en": [
          "PreToolUse Hook: Triggers before tool execution to validate argument legality, check permissions, and block unauthorized invocations.",
          "PostToolUse Hook: Triggers after tool execution to sanitize data, mask sensitive info, attach metadata, and prune bloated response fields.",
          "Decision rule: Financial assets, security, and permissions require Hooks/code controls; tone, formatting, and style use Prompts."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Using Few-shot or severe prompt phrasing to prevent Prompt Injections or unauthorized tool executions.",
          "[Anti-Pattern] Forgetting to prune fields in PostToolUse, allowing dozens of kilobytes of raw database dumps into LLM context."
        ],
        "evidence_en": "Write a trigger comparison table for PreToolUse vs PostToolUse and implement a PreToolUse hook preventing SQL injection / risky commands."
      },
      {
        "code": "1.6",
        "title": "固定流水线与动态任务分解策略",
        "official": "Design task decomposition strategies for complex workflows",
        "summary": "针对确定性流水线采用 Prompt Chaining，针对未知探索采用先 mapping 后动态规划的双阶段分解。",
        "keyPoints": [
          "Prompt Chaining（顺序链）：适用于输入输出明确、步骤稳定可预测的流程（例如：抓取 → 提取 → 校验 → 归档）。",
          "Dynamic Decomposition（动态分解）：适用于需求未知或大型代码库探索，必须先由 Explore 阶段摸清边界，再动态生成执行计划。",
          "大型代码审查模式：采用两阶段法（Local Pass 逐文件局部检查 + Integration Pass 跨文件接口与数据流整合审查）。"
        ],
        "antiPatterns": [
          "[反模式] 对极其确定的流水线使用自由发挥的动态规划模型，导致执行路径飘忽不定。",
          "[反模式] 在对大型代码库毫无勘探的情况下，直接一揽子输出修改全部文件的最终代码。"
        ],
        "evidence": "分别给出一个适用 Prompt Chaining 和适用 Dynamic Decomposition 的具体业务场景，并说明架构选型理由。",
        "title_en": "Workflow Decomposition Strategies",
        "summary_en": "Apply Prompt Chaining for deterministic pipelines, and dual-phase explore-then-plan for open-ended exploration.",
        "keyPoints_en": [
          "Prompt Chaining: Best for deterministic pipelines with predictable steps (e.g. fetch -> extract -> validate -> archive).",
          "Dynamic Decomposition: Best for unknown scopes or large repos; first Explore to map boundaries, then dynamically plan execution.",
          "Large repo review pattern: Two-pass strategy (Local Pass per file + Integration Pass across interface and dataflows)."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Using freeform dynamic planning models on highly predictable pipelines, causing erratic execution paths.",
          "[Anti-Pattern] Emitting a batch of final code edits without prior exploration of a large unfamiliar codebase."
        ],
        "evidence_en": "Provide concrete business scenarios suitable for Prompt Chaining vs Dynamic Decomposition with architectural justifications."
      },
      {
        "code": "1.7",
        "title": "Session 状态持久化、恢复 (Resume) 与分叉 (Fork)",
        "official": "Manage session state, resumption, and forking",
        "summary": "合理选用 Resume 会话继续、Fork 探索多分支以及新 Session + 结构化摘要的生命周期模式。",
        "keyPoints": [
          "Resume（恢复）：当原任务上下文依然有效、需要继续未完成的工作时，直接加载已有 Session ID。",
          "Fork（分叉）：当需要基于同一当前基线对比方案 A 与方案 B 的效果时，从该点 Fork 出独立分支，互不干扰。",
          "New Session + Summary：当上下文已经冗余退化、或者底层代码/数据发生重大结构变化时，弃用旧上下文，抽取结构化摘要开启新会话。",
          "恢复通知：恢复会话后，必须显式在第一轮提示中明确告知 Agent 哪些文件或外部环境在此期间发生了变动。"
        ],
        "antiPatterns": [
          "[反模式] 在代码库已经被其他分支重构后，依然盲目 Resume 旧 Session，导致模型基于过期代码产生幻觉改动。",
          "[反模式] 为了比较两个重构方向，在同一个会话中来回撤销与修改。"
        ],
        "evidence": "总结 Resume、Fork 与 New Session 三者的边界矩阵，列举各自的最佳适用场景与反模式。",
        "title_en": "Session State, Resumption & Forking",
        "summary_en": "Choose appropriately between Resume for session continuity, Fork for branch exploration, and New Session with structured summary.",
        "keyPoints_en": [
          "Resume: Continue active tasks when existing context remains valid by loading existing Session ID.",
          "Fork: Fork independent branches from a baseline state to evaluate alternatives A vs B without mutual cross-contamination.",
          "New Session + Summary: When context degrades or codebase undergoes major structural shifts, discard old context and start fresh with structured summary.",
          "Resumption Notification: When resuming a session, explicitly inform the agent in the first turn which external files changed in the interim."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Blindly resuming old sessions after codebase refactors, causing hallucinations based on outdated code.",
          "[Anti-Pattern] Repeatedly undoing and modifying code in a single session to compare two refactoring directions."
        ],
        "evidence_en": "Summarize boundary matrix for Resume, Fork, and New Session with optimal scenarios and anti-patterns."
      }
    ],
    "summary_en": "Design and orchestrate reliable, scalable autonomous agent loops, multi-agent coordination, hooks, and workflows."
  },
  {
    "code": "D2",
    "title": "Tool Design & MCP Integration",
    "weight": 18,
    "order": 4,
    "summary": "设计高精确度工具接口、结构化错误规范、合理分配工具面与集成 MCP 资源与内置工具。",
    "topics": [
      {
        "code": "2.1",
        "title": "工具接口定义与描述边界清晰化",
        "official": "Design effective tool interfaces with clear descriptions and boundaries",
        "summary": "通过精准的工具名称、功能描述、何时用/何时不用及相似工具边界说明，杜绝工具误选。",
        "keyPoints": [
          "优秀描述五要素：工具做什么、入参规范、返回值结构、何时调用（When to use）、何时绝对不要用（When NOT to use）。",
          "相似工具隔离：如果两个工具功能相近，必须在各自描述中明确声明对方的边界（例如 search_code_symbol vs search_text_content）。",
          "排查顺序：当模型频繁选错工具时，第一步永远是**重命名与重写描述**，而不是先加外围路由模型或写更长的系统提示词！"
        ],
        "antiPatterns": [
          "[反模式] 工具描述过于简略，如「查询数据」，缺少边界与入参限制。",
          "[反模式] 两个工具功能重叠且描述含糊，直接增加一个判定分类器来做路由（过度设计典型）。",
          "[反模式] 在描述中包含过于宽泛或具有误导性的关键词，引发系统性选错偏置。"
        ],
        "evidence": "为一组易混淆的数据库查询工具（只读查账本 vs 事务预检）编写符合 Anthropic 最佳实践的描述文本。",
        "title_en": "Tool Interface Definition & Boundaries",
        "summary_en": "Eliminate tool misrouting via precise names, functional descriptions, when-to-use, when-NOT-to-use guidelines, and boundary clarifications.",
        "keyPoints_en": [
          "Five core description elements: What tool does, argument constraints, return schema, when to use, and when NOT to use.",
          "Adjacent tool disambiguation: If tools have adjacent functionality, explicitly state boundaries in both descriptions (e.g. search_symbols vs search_files).",
          "Troubleshooting sequence: When tools are frequently misrouted, the first action is ALWAYS to rename and rewrite descriptions, NOT add routing LLMs!"
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Vague tool descriptions like 'Search data' without parameter bounds or constraints.",
          "[Anti-Pattern] Adding an external classification model to route between ambiguous tools (classic overengineering).",
          "[Anti-Pattern] Including broad, misleading keywords in descriptions that introduce systematic routing bias."
        ],
        "evidence_en": "Write Anthropic-compliant tool descriptions for a pair of confusing database tools (read-only query vs transaction pre-flight)."
      },
      {
        "code": "2.2",
        "title": "MCP 结构化错误响应与自愈机制",
        "official": "Implement structured error responses for MCP tools",
        "summary": "返回包含 isError, errorCategory, isRetryable 与 partial results 的结构化错误，避免流程盲目崩溃。",
        "keyPoints": [
          "规范错误契约：返回字段应包含 `isError: true`、`errorCategory`（分类）、`isRetryable`（是否可重试）、人类可读原因、已尝试操作及 partial results。",
          "0 results vs Timeout：`0 results` 表示查询成功只是无匹配记录，绝不是系统错误；`timeout` 表示未完成，两者自愈策略完全不同！",
          "重试分类法：瞬态网络波动 (Transient) 或限流可局部指数退避重试；认证失败 (Permission) 或非法业务请求不可盲目重试，必须转交或报错。"
        ],
        "antiPatterns": [
          "[反模式] 静默跳过 (Silent skip)：工具失败时直接返回空字符串或无事发生，导致 Agent 基于错误假设继续执行。",
          "[反模式] 串联崩溃：因为某一个非致命次要子任务工具报错，直接抛出未捕获异常中断整个 Agent 工作流。",
          "[反模式] 将 0 results 当成 Exception 抛出引发无限循环重试。"
        ],
        "evidence": "设计一个标准的 MCP Error Schema JSON 规范，展示网络超时与数据未查到时的差异化返回值。",
        "title_en": "MCP Structured Error Responses",
        "summary_en": "Return structured errors containing isError, errorCategory, isRetryable, and partial results to prevent workflow collapse.",
        "keyPoints_en": [
          "Standard error contract: Fields should include isError: true, errorCategory, isRetryable, human-readable reason, attempted steps, and partial results.",
          "0 results vs Timeout: 0 results indicates successful query with empty matches, never an exception; timeout is transient unfulfilled execution. Self-healing differs fundamentally!",
          "Retry taxonomy: Transient network blips or 429 rate limits allow exponential backoff retries; 401/403 permissions or invalid queries must never retry blindly."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Silent skips: Returning empty strings on tool failure, causing agent to continue on false assumptions.",
          "[Anti-Pattern] Cascading crashes: Unhandled exceptions from non-critical sub-tasks terminating the entire workflow.",
          "[Anti-Pattern] Throwing exceptions on 0 results, triggering infinite retry loops."
        ],
        "evidence_en": "Design an MCP Error Schema JSON showing differentiated returns for network timeouts vs zero records found."
      },
      {
        "code": "2.3",
        "title": "工具集分配 (Tool Allocation) 与 tool_choice 控制",
        "official": "Distribute tools appropriately across agents and configure tool choice",
        "summary": "为每个 Agent 裁剪最小必要工具集，善用 auto, any 及指定工具精准引导调用节奏。",
        "keyPoints": [
          "最小权限原则：每个子 Agent 只装配本角色必需的工具（如调研 Agent 绝不给代码修改工具），避免工具面过载与幻觉越权。",
          "`tool_choice: auto`：模型自主决定是否调用工具，适合常规自主多轮会话。",
          "`tool_choice: any`：强制模型在本轮必须调用至少一个工具，但不限制具体是哪一个（适合首轮必须查数据的场景）。",
          "`tool_choice: { type: 'tool', name: 'xxx' }`：强制本轮必须调用指定工具，适合确定性提取结构化数据或关键第一步。",
          "概念澄清：SDK 中的 `allowedTools` 主要控制免审批自动执行权限，并不等同于从可见性层面物理隐藏工具。"
        ],
        "antiPatterns": [
          "[反模式] 给主协调器绑定超过 20 个琐碎具体业务工具，导致 Prompt 上下文过载和模型注意力涣散。",
          "[反模式] 在要求输出严格 JSON 数据的场景下使用纯文本 Prompt 而不使用工具强制绑定。"
        ],
        "evidence": "列出 auto、any 与特定 tool 三种模式的典型应用场景对比表，并指出 allowedTools 的真正含义。",
        "title_en": "Tool Allocation & tool_choice Control",
        "summary_en": "Provision least-privilege tool subsets per agent role and leverage auto, any, or forced tool_choice to govern execution cadence.",
        "keyPoints_en": [
          "Least privilege: Grant each subagent only tools needed for its role (e.g. research subagents never get code write tools).",
          "tool_choice: auto lets model autonomously decide tool calls for conversational multi-turn sessions.",
          "tool_choice: any mandates calling at least one tool on the turn, without restricting which tool.",
          "tool_choice: { type: 'tool', name: 'xxx' } forces invocation of a specific tool, ideal for structured extraction.",
          "Clarification: allowedTools in SDK controls auto-approval without user confirmation, not physical context hiding."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Binding 20+ granular tools to the primary coordinator, causing context overload and attention degradation.",
          "[Anti-Pattern] Relying on plaintext prompts rather than forced tool_choice when strict JSON output is required."
        ],
        "evidence_en": "Produce a comparison table of auto, any, and specific tool modes, explaining the true function of allowedTools."
      },
      {
        "code": "2.4",
        "title": "MCP 作用域 (Scope) 管理与 Resources 机制",
        "official": "Manage MCP scopes and leverage MCP resources for efficient access",
        "summary": "合理区分项目级 .mcp.json 与个人级 ~/.claude.json，利用 Resources 暴露只读数据减少探索性损耗。",
        "keyPoints": [
          "项目级 `.mcp.json`：团队共享、受版本控制管理，内部敏感 Token 绝不硬编码，统一由环境变量引用注入。",
          "用户级 `~/.claude.json`：仅针对当前开发者本地实验环境，不随 Git 提交，避免污染团队配置。",
          "MCP Resources 机制：将代码架构文档、数据库 Schema 字典、Issue 历史作为只读资源暴露，让 Agent 直接读取，避免反复调用繁重的工具。"
        ],
        "antiPatterns": [
          "[反模式] 将包含个人 API Key 的敏感配置直接写在仓库根目录的 `.mcp.json` 中提交。",
          "[反模式] 团队共享的核心数据库 MCP Server 配置仅写在个人主目录 `~/.claude.json`，导致同事运行报错。"
        ],
        "evidence": "给出一个标准的团队项目级 `.mcp.json` 模板，展示如何使用环境变量脱敏及配置 Resources。",
        "title_en": "MCP Scopes & Resources Management",
        "summary_en": "Distinguish between project .mcp.json and user ~/.claude.json; leverage Resources for read-only access with minimal overhead.",
        "keyPoints_en": [
          "Project-level .mcp.json: Team-shared, version-controlled, sensitive tokens injected via environment variables.",
          "User-level ~/.claude.json: Local experimentation only, not committed to git to prevent configuration drift.",
          "MCP Resources: Expose architecture docs, schema dictionaries, and issue histories as read-only resources, avoiding costly tool calls."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Committing sensitive personal API keys directly inside repo-level .mcp.json.",
          "[Anti-Pattern] Placing team-shared core database MCP configs only in personal ~/.claude.json."
        ],
        "evidence_en": "Provide a standard team project .mcp.json template demonstrating environment variable injection and resource declarations."
      },
      {
        "code": "2.5",
        "title": "Claude Code 内置工具深度运用与代码库探索",
        "official": "Utilize built-in tools in Claude Code for repository exploration",
        "summary": "精确掌握 Grep, Glob, Read, Edit, Write, Bash 各内置工具的职责边界与渐进式代码探索流。",
        "keyPoints": [
          "`Grep`：用于根据模式/正则表达式在文件内容中搜索关键词；`Glob`：用于按文件名或路径通配模式定位文件位置。",
          "`Read`：读取指定文件内容；`Edit`：要求唯一文本匹配的高精度局部修改；`Write`：创建全新文件或整文件覆写。",
          "`Bash`：执行构建、单元测试、Linter 检查等确定性外部命令。",
          "最佳探索三部曲：先 Glob/Grep 定位入口 → 局部 Read 阅读核心实现及依赖链 → 逐步按需扩大探索范围，严禁盲目大面积读取无关文件。"
        ],
        "antiPatterns": [
          "[反模式] 用 Bash 命令执行 `cat file` 代替原生 `Read` 工具，丧失系统优化与行号映射能力。",
          "[反模式] 使用 `Write` 覆盖性写入一个几千行的大文件，仅为了修改其中的一行代码（应使用 `Edit`）。"
        ],
        "evidence": "画出面对一个 10 万行陌生代码库时，从提出问题到完成验证的最佳内置工具调用流水线。",
        "title_en": "Claude Code Built-in Tools & Exploration",
        "summary_en": "Master boundaries of Grep, Glob, Read, Edit, Write, Bash and execute progressive repo exploration.",
        "keyPoints_en": [
          "Grep: Search file contents via pattern/regex; Glob: Locate file paths via filename globs.",
          "Read: Inspect file content; Edit: Precise localized replacements; Write: Create brand-new files or complete rewrites.",
          "Bash: Run deterministic builds, tests, and linter commands.",
          "Optimal exploration pipeline: Glob/Grep entrypoint -> localized Read -> expand as needed; avoid massive unneeded reads."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Running bash 'cat file' instead of native Read, losing line numbering and caching benefits.",
          "[Anti-Pattern] Using Write to rewrite a 3000-line file just to change a single line (use Edit instead)."
        ],
        "evidence_en": "Map out the optimal built-in tool sequence from problem statement to verification across a 100k-line unfamiliar codebase."
      }
    ],
    "summary_en": "Design high-precision tool interfaces, structured error standards, tool allocation, and MCP integration."
  },
  {
    "code": "D3",
    "title": "Claude Code Configuration & Workflows",
    "weight": 20,
    "order": 2,
    "summary": "精通 CLAUDE.md 层级架构、Skills/Commands、Path 规则、Plan vs Direct 与 CI/CD 集成。",
    "topics": [
      {
        "code": "3.1",
        "title": "CLAUDE.md 层级架构与模块化拆分",
        "official": "Architect hierarchical and modular CLAUDE.md configuration systems",
        "summary": "理清用户级、项目级与子目录级配置优先级，利用 @path 导入与 .claude/rules 拆解巨型规范。",
        "keyPoints": [
          "用户级：`~/.claude/CLAUDE.md`，只对当前用户全局生效，属于个人工作习惯。",
          "项目级：项目根目录 `CLAUDE.md` 或 `.claude/CLAUDE.md`，团队共享并入库版本控制，团队统一规范基石。",
          "目录级：子模块目录下的 `CLAUDE.md`，仅对该子目录及其子孙生效（局部隔离）。",
          "模块化：利用 `@path` 引入外部共享规范；当规则超过几百行时，按领域拆分至 `.claude/rules/*.md`。"
        ],
        "antiPatterns": [
          "[反模式] 把全团队必须遵循的构建规范只写在自己的 `~/.claude/CLAUDE.md` 中，产生「在我机器上好使」的故障。",
          "[反模式] 在根目录维护数千行的超大单体 `CLAUDE.md`，每次交互无差别消耗数万 Token。"
        ],
        "evidence": "为一个全栈 Monorepo 项目设计一份清晰的 CLAUDE.md 目录树，标出各级配置的作用范围。",
        "title_en": "CLAUDE.md Hierarchy & Modularization",
        "summary_en": "Clarify user, project, and directory scope precedence; use @path imports and .claude/rules to modularize large specifications.",
        "keyPoints_en": [
          "User level: ~/.claude/CLAUDE.md applies globally to current user only.",
          "Project level: CLAUDE.md at repo root or .claude/CLAUDE.md, version-controlled foundation for team standards.",
          "Directory level: Submodule CLAUDE.md scoped strictly to that directory and descendants.",
          "Modularization: Use @path to import shared rules; split large rules into .claude/rules/*.md by domain."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Putting team build standards exclusively in personal ~/.claude/CLAUDE.md ('works on my machine' syndrome).",
          "[Anti-Pattern] Maintaining a massive monolithic 5000-line CLAUDE.md at root, wasting tokens on every interaction."
        ],
        "evidence_en": "Design a clean CLAUDE.md directory tree for a fullstack monorepo, delineating scope per level."
      },
      {
        "code": "3.2",
        "title": "Commands 与 Skills 扩展能力开发",
        "official": "Develop reusable commands and skills for Claude Code workflows",
        "summary": "掌握可复用工作流扩展定义，利用 frontmatter 设置 context: fork 隔离独立繁重任务。",
        "keyPoints": [
          "存储路径：项目级放在 `.claude/commands/` 或 `.claude/skills/`（团队共享），个人级放在用户主目录对应位置。",
          "`context: fork`：对于执行过程非常冗长（Verbose）、中间日志多但最终只需要结构化报告的任务（如全面依赖体检、端到端测试），配置 fork 隔离在子分支执行，避免污染主上下文。",
          "Frontmatter：通过 YAML Frontmatter 定义参数提示、工具白名单、触发描述及隔离行为。"
        ],
        "antiPatterns": [
          "[反模式] 在主会话上下文中直接运行输出 5 万行控制台日志的脚本，导致上下文瞬时被垃圾字符淹没。",
          "[反模式] 将项目特有的代码生成命令存放在用户个人主目录，导致 CI 和同事无法运行。"
        ],
        "evidence": "编写一份带有完整 Frontmatter（含 description, tools, context: fork）的测试审查 Skill 定义文件。",
        "title_en": "Commands & Skills Extension Development",
        "summary_en": "Master reusable workflow extensions; utilize frontmatter context: fork to isolate heavy, verbose operations.",
        "keyPoints_en": [
          "Storage paths: Project-level in .claude/commands/ or .claude/skills/ (team-shared); personal in user directory.",
          "context: fork: For tasks with verbose output where only the final report is needed, isolate in a sub-fork to protect main context.",
          "Frontmatter: Define parameter hints, tool whitelists, descriptions, and isolation flags via YAML Frontmatter."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Running scripts that output 50,000 console lines directly in main context, flooding it with garbage.",
          "[Anti-Pattern] Storing project-specific code generators in personal user directories, breaking CI and team workflows."
        ],
        "evidence_en": "Write a test-review Skill definition file complete with Frontmatter (description, tools, context: fork)."
      },
      {
        "code": "3.3",
        "title": "路径级规则 (Path-specific Rules) 按需加载",
        "official": "Implement path-specific rules for targeted context loading",
        "summary": "使用 .claude/rules/*.md 配合 paths glob 模式，实现修改特定文件类型时按需加载规范。",
        "keyPoints": [
          "按需匹配：在 `.claude/rules/` 下创建 Markdown 文件，并在 Frontmatter 中声明 `paths: [\"src/api/**/*.ts\", \"!**/*.test.ts\"]`。",
          "精准注入：只有当模型正在读取或修改符合 glob 的文件时，该规则才会被注入上下文，未涉及的文件完全不加载，极大节省 Token 窗口。",
          "选型分水岭：跨多个目录生效但绑定文件后缀用 Path rules；仅限于特定物理子目录用目录级 CLAUDE.md；全项目始终生效用根目录 CLAUDE.md。"
        ],
        "antiPatterns": [
          "[反模式] 把仅针对前端 React 组件样式的几十条细则全量塞进根目录 `CLAUDE.md`（后端修改也会被迫背负这些规则）。",
          "[反模式] 使用错误的 glob 模式导致规则无法按预期触发或过度触发。"
        ],
        "evidence": "写出三条分别针对数据库迁移文件、前端 UI 组件和单元测试文件的 Path-specific Rules 声明示例。",
        "title_en": "Path-Specific Rules & Targeted Loading",
        "summary_en": "Leverage .claude/rules/*.md with paths glob patterns to inject guidelines on-demand when editing specific file types.",
        "keyPoints_en": [
          "On-demand matching: Create markdown files under .claude/rules/ with frontmatter paths: [\"src/api/**/*.ts\", \"!**/*.test.ts\"].",
          "Targeted injection: Rules are injected only when model inspects or edits matching files, conserving context window.",
          "Selection criteria: Cross-directory filetype conventions use Path rules; directory-specific submodules use directory CLAUDE.md; global rules use root CLAUDE.md."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Stuffing React styling rules into root CLAUDE.md, forcing backend edits to bear frontend overhead.",
          "[Anti-Pattern] Specifying flawed glob patterns that fail to trigger or trigger indiscriminately."
        ],
        "evidence_en": "Provide 3 sample Path-specific rule declarations for database migrations, frontend UI components, and unit tests."
      },
      {
        "code": "3.4",
        "title": "Plan Mode 与 Direct Execution 决策模型",
        "official": "Select between Plan mode and direct execution based on task complexity",
        "summary": "高风险、需求模糊、跨多文件或多方案设计必选 Plan 模式；单点、明确、可逆变更采用 Direct 执行。",
        "keyPoints": [
          "Plan Mode（计划模式）：需求不确定、涉及系统核心架构、跨 3 个以上文件、存在多种可选技术路线；先探索只读输出方案，获得确认后再动代码。",
          "Direct Mode（直接执行）：需求极其明确、修改局限于单文件、可逆性高、单点 Bug 修复或小功能增补。",
          "经典黄金组合：先在 Plan 模式下让 Agent/Subagent 进行深度勘探并生成设计方案，用户确认后一键转为 Direct 实施执行。"
        ],
        "antiPatterns": [
          "[反模式] 面对一个重构全系统鉴权流程的模糊需求，直接在 Direct 模式下一边猜一边改写几十个文件。",
          "[反模式] 仅仅修改一个错别字或调整一个变量名，却大动干戈开启三轮 Plan 规划模式（效率低下）。"
        ],
        "evidence": "给出 5 个常见软件工程任务，准确判定它们应当使用 Plan 模式还是 Direct 模式，并阐明理由。",
        "title_en": "Plan Mode vs Direct Execution Trade-offs",
        "summary_en": "Mandate Plan mode for high-risk, ambiguous, multi-file architectural changes; use Direct execution for atomic, localized edits.",
        "keyPoints_en": [
          "Plan Mode: Ambiguous requirements, architectural refactors, touches 3+ files, multiple competing approaches; explore read-only first.",
          "Direct Mode: Highly defined requirements, single-file scope, high reversibility, isolated bug fixes.",
          "Golden workflow: Deep exploration in Plan mode -> generate plan -> user approval -> execute in Direct mode."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Guessing and modifying dozens of files in Direct mode for a system-wide auth refactoring.",
          "[Anti-Pattern] Triggering multiple rounds of Plan mode to rename a variable or fix a typo (inefficient overhead)."
        ],
        "evidence_en": "Evaluate 5 common software tasks and categorize them into Plan Mode vs Direct Mode with detailed justifications."
      },
      {
        "code": "3.5",
        "title": "迭代优化 (Iterative Refinement) 与交互提问",
        "official": "Apply iterative refinement techniques to align model outputs with intent",
        "summary": "运用 Few-shot 输入输出示例、测试驱动迭代以及主动 Interview 澄清边界未知盲区。",
        "keyPoints": [
          "预期不清时：不要空泛地说「请写得更好」，而是直接提供 2-3 组具体的 Input/Output 期望示例。",
          "复杂实现：先编写失败的单元测试用例，引导模型根据测试报错进行针对性迭代与修复。",
          "未知复杂业务：明确指示模型在开始动手写代码前，先主动向开发者提问（Interview），摸清缓存、故障容错、鉴权等潜在盲区。",
          "修复策略：相互依赖的连锁问题必须一并全盘提供；彼此独立的缺陷应当拆解为单点独立修复与单点验证。"
        ],
        "antiPatterns": [
          "[反模式] 模型生成不理想时，重复发送相同的自然语言提示词催促其改进。",
          "[反模式] 在存在严重逻辑交叉依赖时，一次只修复其中一半，导致系统反复产生新的矛盾错误。"
        ],
        "evidence": "设计一段 Prompt，指导模型在实现复杂接口前先通过 3 个核心问题进行需求澄清访谈。",
        "title_en": "Iterative Refinement & Proactive Interviewing",
        "summary_en": "Apply input/output few-shot examples, test-driven iteration, and proactive interviewing to eliminate requirements ambiguity.",
        "keyPoints_en": [
          "Unclear expectations: Avoid vague pleas like 'write better'; supply 2-3 concrete Input/Output examples.",
          "Complex implementation: Write failing unit tests first, guiding the model to iterate against test failure logs.",
          "Complex domain logic: Instruct model to interview the developer with clarifying questions before writing code.",
          "Repair strategy: Interdependent bugs must be fixed concurrently; orthogonal defects should be addressed atomically."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Repeating the same natural language prompt repeatedly when generated code fails.",
          "[Anti-Pattern] Fixing only half of a cross-dependent defect pair, creating cyclical errors."
        ],
        "evidence_en": "Write a prompt instructing the model to conduct a 3-question clarifying interview before implementing a complex interface."
      },
      {
        "code": "3.6",
        "title": "CI/CD 流水线集成与自动化代码审查",
        "official": "Integrate Claude Code into CI/CD pipelines with deterministic execution",
        "summary": "非交互环境强制使用 -p 参数，结合 JSON Schema 输出、生成/审查实例分离及同步门禁。",
        "keyPoints": [
          "非交互必备标志：在 GitHub Actions 或 GitLab CI 中调用必须使用 `claude -p` / `--print`，否则进程会因等待终端交互卡死挂起！",
          "机器可读结构化：添加 `--output-format json` 和 `--json-schema`，以便流水线通过 jq 等工具解析审查结果并判定是否打断流程。",
          "生成与审查分离：**编写代码的会话与审查代码的会话必须彻底解耦为独立实例**，避免自身确认偏差（Confirmation Bias）。",
          "流水线门禁：作为阻断性（Blocking）合并检查门禁时，必须使用同步实时 API，绝对不能使用延迟最长可达 24 小时的 Batch API！"
        ],
        "antiPatterns": [
          "[反模式] 在 CI 脚本中直接执行 `claude`（不带 `-p` 参数），导致流水线无限超时超时挂起。",
          "[反模式] 将必须在 PR 合并前阻断的合规检查挂在 Batch API 上（最长等待一天才能拿到结果）。",
          "[反模式] 让写代码的同一个 Agent 实例立刻自我审查并给自己的代码打满分通过。"
        ],
        "evidence": "写出一份完整的 GitHub Actions workflow yaml 配置文件，展示如何利用 `claude -p` 运行代码审查门禁。",
        "title_en": "CI/CD Pipeline Integration & Review Gates",
        "summary_en": "Mandate -p flag in non-interactive CI environments, combine with JSON Schema output, instance isolation, and synchronous gates.",
        "keyPoints_en": [
          "Non-interactive flag: In GitHub Actions / GitLab CI, always use 'claude -p' / '--print', or process hangs awaiting terminal input!",
          "Machine-readable outputs: Use '--output-format json' and '--json-schema' so pipelines parse outputs via jq to make gate decisions.",
          "Generator/Reviewer separation: Code author session and reviewer session MUST be isolated instances to eliminate confirmation bias.",
          "Blocking pipeline gates: Must use synchronous real-time API; never use Message Batches API (up to 24h delay) for blocking PR checks!"
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Calling 'claude' without '-p' in CI, causing infinite timeouts on headless runners.",
          "[Anti-Pattern] Wiring blocking PR checks to the Batch API (waiting hours or a day for merge checks).",
          "[Anti-Pattern] Having the same agent instance review its own PR and rubber-stamp approval."
        ],
        "evidence_en": "Write a complete GitHub Actions workflow YAML showing 'claude -p' powering an automated PR review gate."
      }
    ],
    "summary_en": "Master hierarchical CLAUDE.md architecture, custom skills/commands, path rules, plan mode, and CI/CD integration."
  },
  {
    "code": "D4",
    "title": "Prompt Engineering & Structured Output",
    "weight": 20,
    "order": 3,
    "summary": "定义显式判定标准、针对性 Few-shot、JSON Schema 结构化提取、重试自愈与独立复核。",
    "topics": [
      {
        "code": "4.1",
        "title": "显式判定标准 (Explicit Criteria) 与消除模糊性",
        "official": "Define explicit criteria to eliminate ambiguity in prompt instructions",
        "summary": "杜绝「提高准确率」等空泛形容词，清晰定义纳入标准、排除清单、严重等级与边界案例。",
        "keyPoints": [
          "精准定义边界：明确列出「必须报告什么」、「绝对忽略什么」、严重度等级划分原则以及模糊地带的默认行为。",
          "空洞形容词陷阱：像「be conservative」、「提高代码质量」、「更加谨慎」对消除误报几乎毫无工程价值，模型无法稳定执行。",
          "止血法则：当某一类特定检测的高误报率已经严重破坏用户对整个系统的信任时，第一步应当是直接将该检测类别关闭下线，待修复并充分验证后再重新放开。"
        ],
        "antiPatterns": [
          "[反模式] 面对误报问题，仅在 Prompt 中追加「请更加仔细严谨，不要误报」这种无意义提示。",
          "[反模式] 没有给严重度划分阈值，导致所有轻微排版问题与严重内存泄漏混为一谈。"
        ],
        "evidence": "为安全漏洞扫描 Prompt 编写一组包含 Explicit Included, Excluded, Severity Criteria 的标准准则定义。",
        "title_en": "Explicit Criteria & Ambiguity Elimination",
        "summary_en": "Avoid vague adjectives; define inclusion standards, exclusion lists, severity grading, and edge-case fallbacks.",
        "keyPoints_en": [
          "Precise boundaries: Explicitly list what to report, what to ignore, severity tiers, and default behavior in gray zones.",
          "Empty adjective trap: Phrasing like 'be conservative' or 'be careful' provides zero actionable guidance to models.",
          "Triaging rule: When high false-positive rates erode user trust, immediately disable that detection category until validated."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Adding empty prompts like 'Please be more accurate and avoid false positives'.",
          "[Anti-Pattern] Omitting severity thresholds, lumping minor linting with critical memory leaks."
        ],
        "evidence_en": "Draft explicit included, excluded, and severity criteria for a security vulnerability scanner prompt."
      },
      {
        "code": "4.2",
        "title": "针对性少样本提示 (Few-shot Prompting) 设计",
        "official": "Design targeted few-shot examples for consistent reasoning patterns",
        "summary": "在标准明确但执行仍有轻微波动时，补充 2-3 个覆盖歧义与对比解释的针对性示例。",
        "keyPoints": [
          "适用时机：规则与标准已经十分详尽，但在特定临界案例上模型执行仍有飘移时使用。",
          "示例黄金法则：示例必须贴合真实易错场景，且每一个示例必须显式注明「为什么选择 A 而不是表面极像的 B」（标注判定理由）。",
          "不可替代边界：Few-shot 绝不能用来代替工具命名的重构、不能代替程序级的硬拦截，也不能代替模型未知事实的动态补救。"
        ],
        "antiPatterns": [
          "[反模式] 在标准本就模糊不清的情况下，直接堆砌 20 个没有任何说明的复杂示例（混淆注意力）。",
          "[反模式] 使用 Few-shot 来试图 100% 杜绝模型调用越权工具（必须用程序拦截，而不是示例引导）。"
        ],
        "evidence": "为金融交易可疑欺诈判定编写 2 个带详细 reasoning 解释的正反 Few-shot 样例。",
        "title_en": "Targeted Few-Shot Example Design",
        "summary_en": "Supply 2-3 focused examples with rationale explanations when standards are clear but edge-case execution fluctuates.",
        "keyPoints_en": [
          "When to use: Rules and criteria are detailed, but borderline edge cases exhibit slight execution drift.",
          "Golden rule of examples: Examples must mirror real tricky scenarios and explicitly explain WHY option A was chosen over B.",
          "Non-replacements: Few-shot cannot replace tool renaming, cannot replace code-level hooks, and cannot cure missing context."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Dumping 20 unexplained examples when core criteria are ambiguous.",
          "[Anti-Pattern] Attempting to use Few-shot to 100% guarantee preventing unauthorized tool invocations (use Hooks instead)."
        ],
        "evidence_en": "Write 2 few-shot examples with explicit reasoning annotations for suspicious fraud transaction triage."
      },
      {
        "code": "4.3",
        "title": "结构化输出与 JSON Schema 健壮性设计",
        "official": "Engineer robust JSON Schemas for predictable structured extraction",
        "summary": "利用 tool_use 绑定 JSON Schema 规范输出，必须将缺失字段设为 optional/nullable 以防幻觉。",
        "keyPoints": [
          "语法 vs 语义：Schema 只能 100% 保证 JSON 的语法合法与字段类型正确，但绝对无法自动保证里面的事实准确、字段没有张冠李戴或数学合计正确！",
          "防伪编造原则：对于原始输入材料中可能完全没有提及的字段，必须在 Schema 中声明为 Optional 或 Nullable，否则模型为了满足 `required` 会被迫胡编乱造！",
          "枚举兜底设计：在分类枚举值中，必须设计 `unclear` 或 `other`（带备注原因字段），防止模型在不确定时生搬硬套错误分类。"
        ],
        "antiPatterns": [
          "[反模式] 把发票中可能不存在的「税务登记号」设为强制必须字段，导致模型随机编造数字填充。",
          "[反模式] 认为拿到合法的 JSON 字符串就代表提取的数据一定是真实正确的，跳过后续的业务语义核对校验。"
        ],
        "evidence": "编写一个提取复杂合同关键条款的 JSON Schema，包含 optional 字段处理、枚举兜底与字段解释说明。",
        "title_en": "JSON Schema Engineering & Robust Extraction",
        "summary_en": "Bind JSON Schema via tool_use; designate potentially missing fields as optional/nullable to prevent hallucination.",
        "keyPoints_en": [
          "Syntax vs Semantics: Schema guarantees 100% syntactic validity and types, but NEVER guarantees semantic accuracy or math totals!",
          "Anti-hallucination principle: Fields not guaranteed in source documents must be optional or nullable, or model will invent values to satisfy 'required'!",
          "Enum fallback: Include 'unclear' or 'other' (with notes field) in enum definitions so uncertain models don't force false categories."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Marking tax registration number as required on invoices where it may not exist, prompting invented numbers.",
          "[Anti-Pattern] Assuming syntactically valid JSON guarantees accurate business facts, skipping semantic validation."
        ],
        "evidence_en": "Write a JSON Schema for contract clause extraction with optional handling, enum fallbacks, and description hints."
      },
      {
        "code": "4.4",
        "title": "校验重试闭环 (Validation & Retry) 与语义核对",
        "official": "Implement validation and retry loops with structured error feedback",
        "summary": "重试时必须回传原输入、错误输出、精准报错信息与目标 Schema；双重提取核对业务逻辑。",
        "keyPoints": [
          "四要素反馈重试：当模型输出未能通过校验时，下一次重试请求中必须带上：原始上下文、模型刚刚给出的错误输出、校验器返回的具体错误明细、目标 Schema 规范。",
          "幻觉止损点：如果反复报错的根因是信息根本不存在于原始材料中，继续无限重试只会成倍增加幻觉，此时必须果断标记为缺失或升级人工！",
          "双重语义核查：在提取财务类数据时，同时提取 `stated_total`（原文写明的合计）与 `calculated_total`（提取各项累加计算的值），由程序对比两者的差额发现潜在提取遗漏。"
        ],
        "antiPatterns": [
          "[反模式] 重试时只说「你给的 JSON 格式不对，请重新生成」，不提供具体的校验报错信息。",
          "[反模式] 对由于原文缺损导致的提取校验失败进行无休止的无限循环重试，直至 Token 耗尽。"
        ],
        "evidence": "画出包含 Schema 校验、业务语义核对、动态 Feedback 重试和人工降级分流的完整流程图。",
        "title_en": "Validation & Retry Feedback Loops",
        "summary_en": "Feedback loops must return original context, erroneous output, specific error message, and target schema; verify dual totals.",
        "keyPoints_en": [
          "Four-element feedback: On validation failure, retry request must supply: original input, flawed output, specific validator error, target schema.",
          "Hallucination circuit breaker: If failure stems from missing information in source documents, stop retrying and mark missing / escalate!",
          "Dual semantic check: In financial extraction, extract stated_total and calculated_total (sum of line items) and programmatically verify delta."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Vague retry prompts like 'Your JSON was invalid, regenerate' without supplying validator errors.",
          "[Anti-Pattern] Retrying infinitely when data is completely missing from source documents."
        ],
        "evidence_en": "Diagram a complete validation loop covering schema validation, semantic math checks, dynamic retry, and fallback."
      },
      {
        "code": "4.5",
        "title": "Message Batches API 异步批处理决策与成本控制",
        "official": "Leverage Message Batches API for asynchronous, cost-effective processing",
        "summary": "针对离线、非阻塞、大体量任务利用 Batch API 享受约 50% 折扣与 24h 窗口，严格关联 custom_id。",
        "keyPoints": [
          "适用场景：离线数据清洗、数万篇历史文档归档提取、不需要即时响应的后台报表生成；享受约 50% 的显著价格折扣，处理窗口最长约 24 小时。",
          "绝对不适用：实时交互对话、CI/CD PR 合并前阻断门禁、依赖前一步工具返回结果才能继续的多轮自主 Agent 循环。",
          "`custom_id` 追踪：每一个请求必须绑定唯一的 `custom_id`，结果出来后精准关联；当批量中只有 2% 请求失败时，只需提取失败的 `custom_id` 单独重试。"
        ],
        "antiPatterns": [
          "[反模式] 将需要几分钟内反馈结果的在线客服或 Webhook 接入挂载到 Batch API 上。",
          "[反模式] 在一个 Batch 请求内部试图让模型连续做 5 轮复杂的工具调用交互。",
          "[反模式] 批量任务部分失败时，直接将数万个请求全量重新跑一遍，造成巨大资源浪费。"
        ],
        "evidence": "对比实时 API 与 Message Batches API 在成本、延迟、并发限额与架构适用性上的差异表。",
        "title_en": "Message Batches API & Cost Optimization",
        "summary_en": "Leverage Message Batches API for offline, non-blocking workloads for 50% discount and 24h turnaround, tracking custom_id.",
        "keyPoints_en": [
          "Optimal use cases: Offline ETL, archiving tens of thousands of documents, overnight reports; ~50% cost savings with up to 24h SLA.",
          "Never use for: Real-time user chats, blocking CI/CD merge checks, multi-turn agent loops requiring immediate tool feedback.",
          "custom_id tracking: Bind every request to unique custom_id; if 2% fail, extract failed custom_ids and retry only those."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Routing customer support chatbots or real-time webhooks through the Batch API.",
          "[Anti-Pattern] Attempting to conduct 5 sequential interactive tool turns inside a single Batch request.",
          "[Anti-Pattern] Re-running all 50,000 requests when only 100 failed in a batch."
        ],
        "evidence_en": "Create a comparison matrix between Real-time API and Message Batches API across latency, cost, rate limits, and use cases."
      },
      {
        "code": "4.6",
        "title": "独立多轮复核 (Independent Multi-pass Review) 与置信度校准",
        "official": "Apply independent multi-pass review to mitigate confirmation bias",
        "summary": "审查代码必须由全新独立实例进行，分层完成逐文件局部检查与跨文件集成检查，以标注集校准置信度。",
        "keyPoints": [
          "消除确认偏差：同一个模型实例在自我审查时，极度倾向于合理化自己刚才犯下的错误；复核必须由**不携带生成思考上下文的全新独立实例**进行。",
          "两阶段复审法：Pass 1 进行逐文件的局部语义与规范检查；Pass 2 进行跨文件的数据流、接口定义与依赖集成检查。",
          "置信度不可盲信：模型自评的「我非常确信」绝不能当成风险决策的真实依据；必须使用真实的标注验证集来校准字段级置信度与人工复核阈值。"
        ],
        "antiPatterns": [
          "[反模式] 在写完代码的当前会话里直接追问「请仔细检查你刚刚写的代码有没有 Bug」（确认偏差严重）。",
          "[反模式] 盲信模型的置信度评分，将自评 90% 以上的任务直接放行免审，导致隐蔽 Bug 溜入生产。"
        ],
        "evidence": "设计一个独立双实例代码生成与审计架构图，说明两者的上下文隔离与结果仲裁逻辑。",
        "title_en": "Independent Multi-Pass Review & Calibration",
        "summary_en": "Review code with fresh, independent instances; execute two-pass inspection and calibrate confidence against labeled benchmarks.",
        "keyPoints_en": [
          "Eliminate confirmation bias: Models rationalize their own errors in the same session; reviews must use fresh instances without authoring history.",
          "Two-pass review: Pass 1 inspects localized file semantics; Pass 2 reviews cross-file interface contracts and integration.",
          "Do not trust raw confidence: Model self-reported 'I am 100% sure' is not a metric; calibrate thresholds using labeled evaluation sets."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Asking 'Are there any bugs in what you just wrote?' in the same session (severe confirmation bias).",
          "[Anti-Pattern] Auto-approving tasks simply because model self-reported >90% confidence."
        ],
        "evidence_en": "Diagram an isolated two-instance code generation and review architecture with arbitration rules."
      }
    ],
    "summary_en": "Define explicit criteria, targeted few-shots, JSON Schema validation, retry self-healing, and multi-pass review."
  },
  {
    "code": "D5",
    "title": "Context Management & Reliability",
    "weight": 15,
    "order": 5,
    "summary": "关键信息常驻保真、降级与人工升级策略、错误传播控制、长上下文退化与来源追溯。",
    "topics": [
      {
        "code": "5.1",
        "title": "关键交易事实常驻保留 (Case Facts Block)",
        "official": "Preserve critical transaction facts across long-context interactions",
        "summary": "长对话摘要极易丢失具体金额、订单号与政策条款，必须将关键事实放入独立持久块每轮注入。",
        "keyPoints": [
          "摘要衰减陷阱：对话进行到几十轮时，自动摘要往往会丢弃具体的金额数值、退款比例、订单编号、日期时间以及具体的法律政策条款引用！",
          "`Case Facts` 机制：将核心交易事实单独提取并持久化存放在独立的 `case_facts` 结构中，每一轮模型交互时显式重新注入到系统提示或上下文顶部。",
          "Lost in the Middle 规避：LLM 对长文本中间区域的注意力天然衰减，关键结论和核心约束必须置于首部或尾部，并使用醒目的 Markdown 标题分割。",
          "源头裁剪：工具调用返回的数据在进入上下文前，只保留下游真正需要的字段，严禁把冗余元数据全部塞入。"
        ],
        "antiPatterns": [
          "[反模式] 依赖普通的滚动摘要来记录用户的退款账号和交易金额（几轮之后数字被模型凭空篡改）。",
          "[反模式] 工具返回包含 100 个字段的完整对象，未经任何裁剪就整体以 tool_result 传回。"
        ],
        "evidence": "设计一个客户服务 Agent 的 Prompt 模板，展示 `case_facts` 区块如何与动态对话历史正交共存。",
        "title_en": "Persistent Case Facts Block",
        "summary_en": "Long dialog summarization erodes monetary values, IDs, and policies; preserve critical facts in an isolated persistent block.",
        "keyPoints_en": [
          "Summary decay trap: Rolling conversation summaries frequently drop exact transaction amounts, account IDs, dates, and policy citations!",
          "Case Facts mechanism: Extract essential transaction facts into a persistent 'case_facts' structure, re-injected each turn at context top.",
          "Lost in the middle mitigation: Attention wanes in middle tokens; place core constraints at prompt beginning/end with clear headings.",
          "Upstream pruning: Filter tool output payloads to retain only downstream fields before injecting into context."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Relying on rolling summaries to remember account numbers and refund amounts across 30 turns.",
          "[Anti-Pattern] Feeding 100-field raw database records into context without filtering."
        ],
        "evidence_en": "Design a customer support prompt template showing case_facts block orthogonal to conversation history."
      },
      {
        "code": "5.2",
        "title": "升级人工 (Escalation) 与多义性 (Ambiguity) 澄清",
        "official": "Implement escalation triggers and resolve ambiguities systematically",
        "summary": "用户明确求人工或政策空白时立即结构化升级；多重匹配向用户索要标识；绝不因多问题盲目升级。",
        "keyPoints": [
          "确定性升级触发点：用户明确要求转人工、遇到公司政策完全空白的例外情况、模型权限不足或涉及重大法律/声誉风险时，立即触发升级并附带结构化 Handoff。",
          "严禁盲目升级：有明确标准业务流程可走时，即便用户情绪稍显不悦或一次性提了 3 个问题，Agent 依然应正常处理，绝不能擅自推脱给人工！",
          "多意模糊澄清：当用户报出姓名查到系统中存在 3 个同名账户时，**绝对不能盲猜一个继续操作**，必须礼貌向用户索要第二身份标识（如手机尾号、订单号）。",
          "升级 vs Hook 区别：升级是因为「需要人类做出主观自由裁量」；Hook 是因为「已有明确硬性安全规则且必须百分之百强制执行」。"
        ],
        "antiPatterns": [
          "[反模式] 当用户问「我退款进度如何？顺便问一下你们几点下班」时，因问题多而直接判为复杂直接扔给人工客服。",
          "[反模式] 在多个用户或多笔订单重名时，擅自选择最上面的一条执行扣款或退款（严重灾难）。",
          "[反模式] 仅凭模型自评的「情绪分析指数」作为唯一标准来强制打断服务转接人工。"
        ],
        "evidence": "给出 4 个典型场景，分别界定其应当「继续自主处理」、「向用户索要澄清信息」还是「立即结构化升级人工」。",
        "title_en": "Escalation Triggers & Disambiguation",
        "summary_en": "Trigger structured handoff immediately on explicit human requests or policy voids; request disambiguation on multiple matches.",
        "keyPoints_en": [
          "Deterministic escalation: Explicit user request for human, policy voids, insufficient permission, or severe compliance risk.",
          "Do not over-escalate: If standard SOP exists, handle request even if user is frustrated or asks multiple questions.",
          "Disambiguation: If customer name matches 3 accounts, NEVER guess; politely request secondary identifier (e.g. last 4 phone digits).",
          "Escalation vs Hook: Escalation is for subjective human discretion; Hook is for strict programmatic enforcement."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Escalating to human simply because user asked two questions in one message.",
          "[Anti-Pattern] Guessing the first account in a multi-match collision and issuing a refund (critical disaster).",
          "[Anti-Pattern] Triggering human escalation purely on model self-assessed sentiment score."
        ],
        "evidence_en": "Categorize 4 scenarios into continue autonomous processing, request clarification, or immediate structured escalation."
      },
      {
        "code": "5.3",
        "title": "子 Agent 错误传播控制与证据缺口标注",
        "official": "Manage error propagation in subagents and annotate evidence gaps",
        "summary": "子 Agent 先局部消化瞬态错误，无法解决再上报；部分数据源失败继续合成但标注证据缺口。",
        "keyPoints": [
          "局部恢复优先：子 Agent 内部先对网络超时等可恢复错误进行有限重试；确实无法恢复时，再向上级协调器上报结构化失败。",
          "丰富上报内容：上报错误时必须附带：失败类别、原始请求参数、已尝试次数、已获取的局部结果 (partial results) 及建议替代方案。",
          "降级合成与证据缺口：当要求汇总 5 个数据源而其中 1 个数据源崩溃时，协调器应利用已获取的 4 个数据源正常生成报告，但**必须在报告醒目位置显式注明证据缺口 (Evidence Gap)**，严禁因为单点崩溃导致全盘瘫痪！"
        ],
        "antiPatterns": [
          "[反模式] 调研系统因为 5 个公开网页中有 1 个无法访问，直接抛出异常导致整个大模型报告完全无法生成。",
          "[反模式] 瞒报错误：某个子 Agent 抓取失败后返回空，协调器在最终报告中佯装所有数据均已完整覆盖。"
        ],
        "evidence": "编写一份带有 [Stable Findings]、[Evidence Gaps] 与 [Disputed Points] 的多源情报分析报告结构规范。",
        "title_en": "Error Propagation & Evidence Gap Annotation",
        "summary_en": "Subagents absorb transient errors locally before reporting; synthesize partial data while explicitly flagging evidence gaps.",
        "keyPoints_en": [
          "Local recovery: Subagent attempts retries on transient errors first; reports structured failure only when unrecoverable.",
          "Rich failure payload: Include failure category, arguments, attempted count, partial results, and recommended alternatives.",
          "Degraded synthesis & Evidence gaps: If 1 of 5 sources fails, synthesize findings from the 4 healthy sources and flag [Evidence Gap] prominently."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Crashing entire intelligence report generation because 1 out of 5 web sources timed out.",
          "[Anti-Pattern] Concealing failures: Returning empty from failed subagent and pretending full source coverage in final report."
        ],
        "evidence_en": "Produce report structure specification containing [Stable Findings], [Evidence Gaps], and [Disputed Points]."
      },
      {
        "code": "5.4",
        "title": "大型代码库长会话上下文退化防范 (Degradation)",
        "official": "Mitigate context degradation in large codebase explorations",
        "summary": "监测模型出现抽象空话等退化征兆，利用 Scratchpad 保存定位，把深挖任务委派给子 Agent。",
        "keyPoints": [
          "识别退化信号：当模型在长对话后期开始频繁给出「常见的实现方式如下...」等教科书套话，而不再引用代码库中具体的类名、函数名与文件路径时，说明上下文已发生严重注意力退化！",
          "Scratchpad / State File：在根目录或临时目录维护一个轻量的任务进度记录本，随时把已确认的类定义、核心逻辑行号与下一步探索目标持久化到文件，防范崩溃与退化。",
          "委派深挖：把耗费大量 Token 的具体单文件排查委托给子 Agent 执行，主会话只保留子 Agent 浓缩后的精简结论。",
          "谨慎使用 `/compact`：执行上下文压缩前，必须将核心交易数字、特定文件路径与不可遗忘的约束提取持久化，避免被压缩算法当成常规废话丢弃。"
        ],
        "antiPatterns": [
          "[反模式] 放任一个会话持续进行上百轮且不清理，模型已经严重幻觉依然在此会话中继续写关键生产代码。",
          "[反模式] 在没有将核心发现落盘到状态文件的情况下，直接盲目执行上下文清空或重置。"
        ],
        "evidence": "设计一个标准的 `PROJECT_SCRATCHPAD.md` 模板，展示在复杂代码重构期间如何记录探索状态。",
        "title_en": "Mitigating Context Degradation in Large Repos",
        "summary_en": "Detect symptoms like generic textbook answers, maintain Scratchpad state files, and delegate deep dives to subagents.",
        "keyPoints_en": [
          "Degradation symptoms: When model starts giving textbook generalities instead of citing actual project functions, context is degraded!",
          "Scratchpad / State file: Keep a lightweight project scratchpad logging confirmed classes, line numbers, and next goals.",
          "Delegate deep dives: Offload heavy file scanning to subagents, preserving only concise conclusions in main context.",
          "Careful with /compact: Save critical facts, paths, and constraints before compacting context."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Allowing a session to exceed 100 turns while hallucinations mount, continuing to write production code.",
          "[Anti-Pattern] Clearing or resetting context before persisting discoveries to a scratchpad file."
        ],
        "evidence_en": "Design a PROJECT_SCRATCHPAD.md template tracking exploration state during complex refactoring."
      },
      {
        "code": "5.5",
        "title": "人工监督分层抽样与置信度校准 (Calibration)",
        "official": "Calibrate confidence thresholds and apply stratified human sampling",
        "summary": "总体 97% 正确率易掩盖特定难点字段的溃败，必须按文档类型与字段分层评估并抽检高置信度项。",
        "keyPoints": [
          "总体指标欺骗性：系统的全量整体准确率达到 97%，极有可能掩盖了「海外供应商复杂发票」这一细分类目准确率只有 40% 的严重缺陷！必须按文档类别和字段类型进行分层评估。",
          "分层抽样复核：低置信度数据必须 100% 路由给人工复审；**对于高置信度甚至满分置信度的数据，也必须保持一定比例（如 5%-10%）的分层随机抽样**，用于监控未知漂移与幻觉自信。",
          "校准真值：使用带人工精标注的独立评估集对模型的置信度输出进行校准，找出模型在何种阈值下才是真正可靠的。"
        ],
        "antiPatterns": [
          "[反模式] 仅凭单一的 Macro Accuracy 大盘数据就宣布系统已达到生产上线标准，不看最差长尾切片的表现。",
          "[反模式] 相信模型自评的高置信度，对所谓「100% 确定」的数据完全不设任何人工抽查防线。"
        ],
        "evidence": "为文档数据提取系统绘制一套基于字段重要性与置信度阈值的人工审核分流矩阵表。",
        "title_en": "Stratified Sampling & Confidence Calibration",
        "summary_en": "Overall 97% accuracy can mask complete failure on difficult fields; evaluate stratified by category and sample high-confidence outputs.",
        "keyPoints_en": [
          "Overall accuracy trap: 97% overall accuracy can conceal a 40% failure rate on complex foreign invoices! Evaluate stratified by category.",
          "Stratified sampling: Low confidence routes 100% to human review; maintain 5-10% random sampling on high-confidence items to catch drift.",
          "Confidence calibration: Calibrate model confidence outputs against labeled human gold standard test sets."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Claiming production readiness based purely on macro accuracy without inspecting weakest long-tail slices.",
          "[Anti-Pattern] Trusting model high self-assessed confidence and eliminating all human spot checks."
        ],
        "evidence_en": "Create a human review routing matrix based on field criticality and confidence thresholds for document extraction."
      },
      {
        "code": "5.6",
        "title": "来源追溯 (Provenance) 与多源数据冲突仲裁",
        "official": "Enforce source provenance mapping and resolve conflicting evidence",
        "summary": "强制要求 claim -> source 精准映射；遇到冲突保留双方数值与时间戳，标记为 disputed。",
        "keyPoints": [
          "端到端来源链：模型输出的每一条关键论断（Claim），必须强制关联其确切的数据来源（URL、文档文件名、页码行号、抓取时间及支撑原句）。",
          "保留出处归属：在聚合多份报告时，必须保留每一项数据的出处，严禁融合成无根无据的笼统概述。",
          "数据冲突处理：当两个权威数据源对同一指标给出互相矛盾的数值时（如 A 报告显示营收增长 10%，B 报告显示增长 5%），**绝对不能由模型擅自挑一个顺眼的或者求平均数！** 正确做法是：同时保留两个数值、各自的时间、统计口径与来源，将其标注为 `disputed findings` 留待人类决策。"
        ],
        "antiPatterns": [
          "[反模式] 面对数据冲突，模型为了迎合用户直接随心所欲删除掉其中一个矛盾值，假装天下太平。",
          "[反模式] 自动将多个不同口径的数据进行数学平均，捏造出一个从未在任何文档中出现过的全新数字。"
        ],
        "evidence": "写出一份标准结构化输出 JSON 片段，展示如何对有争议的研究发现进行 Claim-Source 映射与 Disputed 标注。",
        "title_en": "Source Provenance & Conflicting Evidence",
        "summary_en": "Mandate claim-to-source mapping; when sources conflict, preserve both figures and timestamps as disputed rather than averaging.",
        "keyPoints_en": [
          "End-to-end provenance: Every critical claim must map to exact source (URL, document name, page/line, timestamp, quote).",
          "Preserve attribution: Retain source citations when aggregating reports; avoid ungrounded summaries.",
          "Resolving conflicts: When authoritative sources disagree (e.g. 10% vs 5% growth), NEVER pick arbitrarily or average them! Report both as disputed."
        ],
        "antiPatterns_en": [
          "[Anti-Pattern] Arbitrarily deleting one conflicting figure to produce a clean-looking report for the user.",
          "[Anti-Pattern] Averaging contradictory figures to invent numbers absent from all source documents."
        ],
        "evidence_en": "Write a structured JSON output snippet showing Claim-Source mapping and Disputed status annotation for conflicting research findings."
      }
    ],
    "summary_en": "Critical fact persistence, escalation triggers, error propagation control, context degradation defenses, and source attribution."
  }
];

const decisionRules = [
  {
    "step": 1,
    "title": "后果是否涉及高风险？",
    "rule": "金钱交易、系统安全、身份认证、法律合规 → 必须优先选择程序级硬控制（Hooks / 前置拦截 / 状态机），绝对不能仅选 Prompt 软约束！",
    "trap": "干扰项常给出措辞严厉的 Prompt（如「请严格务必在退款前检查密码」），看似合理但属于概率性控制，必错！",
    "title_en": "Do consequences involve high risk?",
    "rule_en": "Financial transactions, security, permissions, legal compliance -> Mandate programmatic hard controls (Hooks / Pre-validation / State machines), NEVER prompt soft guidance alone!",
    "trap_en": "Distractors present sternly worded prompts (e.g. 'Must verify password before refund'), which are probabilistic and fail exam criteria!"
  },
  {
    "step": 2,
    "title": "属于标准不清还是执行不稳？",
    "rule": "没有明确标准/误报高 → 补充 Explicit Criteria（边界与排除项）；已有清晰标准但模型执行有波动 → 补充针对性 Few-shot；每次漏项不同 → 引入 Evaluator-Optimizer 循环。",
    "trap": "干扰项常在没有标准时直接加 Few-shot，或者盲目用「be conservative」等空泛提示词。",
    "title_en": "Ambiguous criteria or execution fluctuation?",
    "rule_en": "Missing criteria / high false positives -> Add Explicit Criteria (inclusion/exclusion); Clear criteria but execution drifts -> Add targeted Few-shot; Inconsistent omissions -> Introduce Evaluator-Optimizer loop.",
    "trap_en": "Distractors add few-shot examples when criteria are missing, or use empty prompts like 'be conservative'."
  },
  {
    "step": 3,
    "title": "工具为什么会选错？",
    "rule": "第一步先排查工具自身的命名、描述、入参边界和反例说明，其次排查 System Prompt 中的偏置；只有确实需要时才考虑外置分类器路由。",
    "trap": "干扰项常在工具描述本身模糊不清时，舍本逐末地新增一个专门的大模型路由层（过度设计）。",
    "title_en": "Why was the wrong tool selected?",
    "rule_en": "First inspect tool name, description, parameter bounds, and anti-examples; second inspect system prompt bias; only add external router if strictly necessary.",
    "trap_en": "Distractors add a complex routing LLM layer when tool descriptions themselves are overlapping and ambiguous (overengineering)."
  },
  {
    "step": 4,
    "title": "是真正系统错误还是正常无结果？",
    "rule": "0 results 是业务逻辑成功但无匹配，不属于系统异常；timeout 是瞬态未完成。根据 isRetryable 决定是否局部重试，认证与权限错误绝不可盲目重试。",
    "trap": "干扰项常把 0 results 当成 Exception 抛出，或者对权限不足的 403 错误执行 5 次重试。",
    "title_en": "Is it a true system error or normal zero results?",
    "rule_en": "0 results is successful business execution with zero matches, not an exception; timeout is transient. Retry based on isRetryable; never blindly retry 401/403 auth errors.",
    "trap_en": "Distractors throw exceptions on 0 results, or execute 5 retries on 403 Forbidden errors."
  },
  {
    "step": 5,
    "title": "信息是否完整？有多重意图吗？",
    "rule": "多重身份匹配绝不能盲猜，必须向用户索取额外标识；信息在原文根本不存在时停止无限重试并标记缺失；多意图拆成独立分支并行获取最后合成。",
    "trap": "干扰项常选择「猜测最接近的一个用户继续执行」或「对不存在的信息继续重试 3 轮」。",
    "title_en": "Is information complete? Are there multiple intents?",
    "rule_en": "Never guess on multiple matching identities; request disambiguating identifiers. Stop retrying when facts are absent from source material; decouple multi-intent requests into parallel branches.",
    "trap_en": "Distractors pick the closest user arbitrarily or retry 3 times for information completely absent from the source."
  },
  {
    "step": 6,
    "title": "上下文是否发生过载或退化？",
    "rule": "从源头对工具输出进行字段裁剪；核心交易事实提取至独立的持久 Case Facts 块；未知探索委派给子 Agent，主会话只保留精炼结论。",
    "trap": "干扰项常提倡在每一轮都对几万行的全量工具返回做深度摘要，反而增加延迟与信息损耗。",
    "title_en": "Is context overloading or degrading?",
    "rule_en": "Prune tool output payloads at the source; extract core transaction facts into persistent Case Facts; delegate exploration to subagents, preserving only findings.",
    "trap_en": "Distractors propose deep summarization of massive raw tool returns on every turn, increasing latency and losing numbers."
  },
  {
    "step": 7,
    "title": "需要同步实时还是异步批处理？",
    "rule": "需要立即阻断的流程（如 CI 合并门禁、实时客服）必须使用同步实时 API；海量离线文档提取、夜间数据回溯选择 Message Batches API（半价但最长 24h）。",
    "trap": "干扰项把需要 10 分钟内完成的 CI gate 挂到 Batch API 上，导致流水线长时间挂起。",
    "title_en": "Synchronous real-time or asynchronous batch?",
    "rule_en": "Blocking merge gates and customer chats mandate synchronous real-time API; offline document extraction and overnight ETL use Message Batches API (50% discount, 24h SLA).",
    "trap_en": "Distractors wire a 10-minute blocking CI gate to the Batch API, hanging pipelines for hours."
  },
  {
    "step": 8,
    "title": "配置属于哪个生效范围 (Scope)？",
    "rule": "团队共享放入项目根目录 CLAUDE.md / .mcp.json；个人专属放入 ~/.claude/；跨目录特定类型文件用 Path rules；任务驱动的重复流程封装为 Skill。",
    "trap": "干扰项把全团队必须遵循的构建规范放在个人主目录 ~/.claude/CLAUDE.md 中，导致他人无法复现。",
    "title_en": "Which configuration scope applies?",
    "rule_en": "Team shared standards go to project root CLAUDE.md / .mcp.json; personal preferences go to ~/.claude/; cross-directory filetypes use Path rules; repeatable workflows use Skills.",
    "trap_en": "Distractors put mandatory team build specs into personal ~/.claude/CLAUDE.md, breaking reproducible builds for teammates."
  },
  {
    "step": 9,
    "title": "生成与审查是否保持独立？",
    "rule": "代码生成与代码审查必须由两个没有共享生成思考历史的独立实例执行；多文件审查采用 Local Pass + Integration Pass 两阶段进行。",
    "trap": "干扰项常在生成完代码的当前会话里直接让该 Agent 自检，引发严重的自我确认偏差。",
    "title_en": "Is it single-step reasoning or iterative review?",
    "rule_en": "Generator and Reviewer must be separate context instances to avoid confirmation bias. Multi-pass review executes local checks before cross-file integration.",
    "trap_en": "Distractors ask the same assistant turn to double-check its own code for bugs in the same thread."
  },
  {
    "step": 10,
    "title": "最简单方案是否已经解决根因？",
    "rule": "遵循奥卡姆剃刀原则：先改 Prompt/修描述/加前置条件；只有根因确实需要时才增加外置模型、复杂分类器或重型微调系统（高风险硬拦截除外）。",
    "trap": "干扰项经常用极度高大上的多 Agent 架构、知识图谱或微调方案来解决一个修改 Prompt 说明就能解决的小问题。",
    "title_en": "Is this the simplest root-cause solution (Occam's Razor)?",
    "rule_en": "Follow Occam's Razor: First refine prompt / descriptions / add preconditions. Only add external models, classifiers, or fine-tuning when strictly demanded by root causes.",
    "trap_en": "Distractors deploy heavy multi-agent swarms or knowledge graphs to solve an issue easily fixed by a prompt clarification."
  }
];

const highFrequencyTraps = [
  {
    "trap": "用更长更严厉的 Prompt 替代安全前置条件",
    "reason": "Prompt 永远是概率性的指导，面对资金、隐私和系统破坏，必须由代码级 PreToolUse Hook、权限系统或状态机强制拦截。",
    "trap_en": "Using longer, sterner prompts instead of programmatic guardrails",
    "reason_en": "Prompts are probabilistic guidance. High-risk financial, privacy, and security boundaries must be intercepted by code-level PreToolUse Hooks or state machines."
  },
  {
    "trap": "新增外置路由模型，但原工具描述依然重叠模糊",
    "reason": "根因是工具职责边界未定义清晰，外置路由同样会受到模糊描述误导。最简单最高效的做法是重命名和重写描述。",
    "trap_en": "Adding an external routing model while tool descriptions remain ambiguous",
    "reason_en": "The root cause is overlapping tool definitions; external routers will also be misled. Renaming and clarifying descriptions is simpler and more effective."
  },
  {
    "trap": "根据模型自评情绪或置信度直接触发人工升级",
    "reason": "模型自评的置信度存在未经校准的幻觉，情绪分析也容易误判。升级应基于明确的业务触发点（如用户明确要求、超权限、政策空白）。",
    "trap_en": "Triggering human escalation based purely on model self-assessed sentiment or confidence",
    "reason_en": "Model confidence scores suffer from uncalibrated hallucinations. Escalations must trigger on deterministic business events (explicit request, policy gaps)."
  },
  {
    "trap": "看到一个非核心子 Agent 失败就终止整条工作流",
    "reason": "健壮的多 Agent 系统应具备容错降级能力，部分数据源失败时继续基于现有数据合成，并在报告中显式标注 [Evidence Gaps]。",
    "trap_en": "Aborting entire workflow when a single non-critical subagent fails",
    "reason_en": "Robust multi-agent systems require graceful degradation. Synthesize available data and explicitly flag [Evidence Gaps] in the report."
  },
  {
    "trap": "对不存在于原始上下文的信息进行持续循环重试",
    "reason": "信息若根本不在原文中，反复重试只会迫使模型为了满足必填项而开始胡编乱造，应当果断标记为 Optional 或转入人工。",
    "trap_en": "Looping retries continuously for information absent from source context",
    "reason_en": "Repeated retries for absent facts force models to hallucinate values to satisfy required fields; mark as optional or escalate."
  },
  {
    "trap": "使用同一个上下文 Session 既写代码又审查代码",
    "reason": "同一个实例自带严重的确认偏差，极容易忽略自己的逻辑盲区，必须由互不相通的独立实例进行 Review。",
    "trap_en": "Using the same conversational session to both write and review code",
    "reason_en": "A single session exhibits severe confirmation bias, rationalizing its own flaws. Review must execute in an isolated fresh instance."
  },
  {
    "trap": "将 Batch API 用于阻塞式 CI/CD 检查",
    "reason": "Batch API 最长可能需要 24 小时处理，适合非阻塞、离线场景，绝对不能用在需要立即判断能否 Merge 的实时门禁中。",
    "trap_en": "Deploying the Message Batches API for blocking CI/CD gates",
    "reason_en": "The Batch API may take up to 24 hours to process; blocking PR gates require synchronous real-time responses."
  },
  {
    "trap": "把团队必须遵循的项目规则保存在用户目录 ~/.claude/",
    "reason": "用户目录仅对自己本地生效，不会进入 Git 版本控制，同事拉取代码或 CI 流水线执行时该规范将彻底缺失。",
    "trap_en": "Saving team project build rules into personal ~/.claude/ directory",
    "reason_en": "User home directories are personal and not version-controlled in git; teammates and CI runners will lack these rules."
  },
  {
    "trap": "只看模型整体准确率 (97%)，忽视长尾字段表现",
    "reason": "总体的高分往往会掩盖关键极难字段（如手写签名或海外税务号）极低准确率的重大缺陷，必须按文档类型与字段分层评估。",
    "trap_en": "Evaluating only aggregate accuracy (97%) while ignoring long-tail failure slices",
    "reason_en": "High macro scores mask catastrophic failure rates on difficult edge cases (e.g. 40% on complex invoices). Stratify evaluation by category."
  },
  {
    "trap": "在多源信息汇总时私自删除冲突数据或对数值求平均",
    "reason": "模型无权代替人类决定哪个权威源更正确，也绝不能擅自算平均数捏造数字，必须完整保留各自的来源并标为 Disputed。",
    "trap_en": "Deleting conflicting data points or averaging contradictory numbers during research",
    "reason_en": "Models must not fabricate averages or drop conflicting facts arbitrarily; preserve both citations and mark as Disputed."
  }
];

const officialScenarios = [
  {
    "id": 1,
    "title": "Customer Support Resolution Agent",
    "nameZh": "智能客服多轮履约与争议解决",
    "focus": "身份核验前置硬控制、Case Facts 常驻保存、结构化人机 Handoff、多意图并发解耦、防盲目升级与防同名误操作。",
    "keyTasks": [
      "D1.4 强制顺序与交接",
      "D1.5 Hooks 确定性防御",
      "D5.1 Case Facts",
      "D5.2 升级与澄清"
    ],
    "focus_en": "Pre-flight identity verification, persistent Case Facts, structured human handoff, multi-intent decoupling, preventing blind escalations.",
    "keyTasks_en": [
      "D1.4 Workflow & Handoff",
      "D1.5 Hooks & Defense",
      "D5.1 Case Facts",
      "D5.2 Escalation & Clarification"
    ]
  },
  {
    "id": 2,
    "title": "Code Generation with Claude Code",
    "nameZh": "Claude Code 辅助开发与代码生成",
    "focus": "项目级 CLAUDE.md 规范、Plan vs Direct 决策、基于失败测试用例的迭代修复、Path-specific Rules 按需加载、内置工具规范。",
    "keyTasks": [
      "D3.1 CLAUDE.md 层级",
      "D3.3 Path 规则",
      "D3.4 Plan vs Direct",
      "D3.5 迭代优化"
    ],
    "focus_en": "Project-level CLAUDE.md standards, Plan vs Direct mode decisions, test-driven iterative repair, on-demand Path-specific rules.",
    "keyTasks_en": [
      "D3.1 CLAUDE.md Hierarchy",
      "D3.3 Path Rules",
      "D3.4 Plan vs Direct",
      "D3.5 Iterative Refinement"
    ]
  },
  {
    "id": 3,
    "title": "Multi-Agent Research System",
    "nameZh": "多 Agent 分布式情报研究系统",
    "focus": "Coordinator-Subagent Hub-and-Spoke 拓扑、并发调度、Claim-Source 来源精准追溯、冲突数据标记 Disputed、容忍单点失败标记证据缺口。",
    "keyTasks": [
      "D1.2 协调器编排",
      "D1.3 上下文与并行",
      "D5.3 错误传播",
      "D5.6 来源追溯与冲突"
    ],
    "focus_en": "Coordinator-Subagent Hub-and-Spoke topology, concurrency, claim-source attribution, preserving disputed findings, evidence gap annotation.",
    "keyTasks_en": [
      "D1.2 Coordinator Architecture",
      "D1.3 Context & Concurrency",
      "D5.3 Error Propagation",
      "D5.6 Source Provenance"
    ]
  },
  {
    "id": 4,
    "title": "Developer Productivity with Claude",
    "nameZh": "开发者效能工具与定制命令",
    "focus": "项目级 Commands 与 Skills 沉淀、context: fork 隔离冗长任务、避免上下文污染、主动 Interview 消除需求歧义。",
    "keyTasks": [
      "D3.2 Commands 与 Skills",
      "D1.7 Session 与 Fork",
      "D3.5 需求 Interview 访谈"
    ],
    "focus_en": "Custom Commands & Skills packaging, context: fork for verbose tasks, preventing context contamination, proactive requirement interviews.",
    "keyTasks_en": [
      "D3.2 Commands & Skills",
      "D1.7 Session & Fork",
      "D3.5 Clarifying Interviews"
    ]
  },
  {
    "id": 5,
    "title": "Claude Code for Continuous Integration",
    "nameZh": "CI/CD 流水线代码自动审查门禁",
    "focus": "claude -p 非交互执行防卡死、--output-format json 机器可读、生成与审查双实例隔离、必须使用实时同步 API 防挂起。",
    "keyTasks": [
      "D3.6 CI/CD 集成",
      "D4.6 独立审查模式",
      "D4.5 同步 vs Batch 选型"
    ],
    "focus_en": "claude -p non-interactive execution, --output-format json, author vs reviewer instance separation, synchronous real-time gate selection.",
    "keyTasks_en": [
      "D3.6 CI/CD Integration",
      "D4.6 Independent Review",
      "D4.5 Sync vs Batch Selection"
    ]
  },
  {
    "id": 6,
    "title": "Structured Data Extraction",
    "nameZh": "大规模文档结构化信息提取",
    "focus": "JSON Schema 约束输出、缺失字段设为 optional/nullable 防胡编、四要素 Feedback 重试循环、双重语义核验、离线大批量用 Batch API。",
    "keyTasks": [
      "D4.3 JSON Schema 设计",
      "D4.4 校验重试闭环",
      "D4.5 Batch 异步批处理",
      "D5.5 分层抽样校准"
    ],
    "focus_en": "JSON Schema output validation, nullable/optional missing fields, 4-element feedback retry loop, dual semantic checks, Message Batches API.",
    "keyTasks_en": [
      "D4.3 JSON Schema Design",
      "D4.4 Validation & Retry",
      "D4.5 Batch Processing",
      "D5.5 Stratified Sampling"
    ]
  }
];

const errorCategories = [
  {
    "code": "criteria",
    "name": "标准不清 (Criteria)",
    "desc": "未看出 Prompt 缺乏明确的纳入/排除标准或严重度分级。",
    "name_en": "Ambiguous Criteria",
    "desc_en": "Failed to notice prompt lacked explicit inclusion/exclusion bounds or severity grading."
  },
  {
    "code": "determinism",
    "name": "弱约束当硬保证 (Determinism)",
    "desc": "在涉及资金、权限、安全的高风险场景中误选了 Prompt 软约束而非程序级控制。",
    "name_en": "Soft Prompt for Hard Control",
    "desc_en": "Chose prompt soft guidance over code-level hooks in high-risk financial or security flows."
  },
  {
    "code": "tool-routing",
    "name": "工具边界混淆 (Tool Routing)",
    "desc": "忽略了工具名称与描述的重叠，或舍本逐末去加外置路由层。",
    "name_en": "Tool Boundary Ambiguity",
    "desc_en": "Overlooked overlapping tool descriptions or introduced redundant external routing LLMs."
  },
  {
    "code": "overengineering",
    "name": "过度设计 (Overengineering)",
    "desc": "选了不必要的独立分类器、重型多 Agent 或复杂模型微调，违背最简根因原则。",
    "name_en": "Overengineering Architecture",
    "desc_en": "Chose unnecessary multi-agent swarms, classifiers, or fine-tuning violating Occam's Razor."
  },
  {
    "code": "error-recovery",
    "name": "错误恢复失当 (Error Recovery)",
    "desc": "未区分 0 results（正常无匹配）与 timeout（未完成），或盲目重试非瞬态错误。",
    "name_en": "Flawed Error Recovery",
    "desc_en": "Confused 0 results (empty matches) with timeout, or blindly retried non-transient auth errors."
  },
  {
    "code": "context",
    "name": "上下文信息丢失 (Context)",
    "desc": "丢失关键交易事实数字、来源出处映射或导致长上下文注意力衰退。",
    "name_en": "Context Degradation / Loss",
    "desc_en": "Lost transaction facts, citation provenance, or allowed rolling summaries to corrupt numbers."
  },
  {
    "code": "scope",
    "name": "配置作用域错配 (Scope)",
    "desc": "混淆了用户级 (~/)、项目级、目录级与 Path 规则的生效边界。",
    "name_en": "Scope Misplacement",
    "desc_en": "Confused user-level (~/), project-level, directory-level, and path-specific configuration boundaries."
  },
  {
    "code": "sla",
    "name": "延迟/SLA 错配 (SLA / Batch)",
    "desc": "在需要实时阻断的门禁中选了 Batch API，或并发策略未能降低耗时。",
    "name_en": "SLA / Batch Mismatch",
    "desc_en": "Used Message Batches API for blocking real-time merge gates, or missed concurrent execution."
  },
  {
    "code": "question-limit",
    "name": "审题粗心 (Question Limit)",
    "desc": "漏看了「选择 N 项」、only、most effective 等关键限定词。",
    "name_en": "Overlooked Constraint",
    "desc_en": "Missed 'Select N', 'only', or negative constraints in the question stem."
  }
];

const studyPlans = {
  "7": [
    {
      "day": 1,
      "title": "考纲总览 + D1 架构核心",
      "minutes": 150,
      "objective": "吃透 CCAR-F 官方 5 域权重、30 项结构与 6 场景；重点掌握 Agentic loop 与 Coordinator 多 Agent 架构。",
      "tasks": [
        "通读 Exam Guide，牢记 D1 权重 27%，明确 stop_reason === 'end_turn' 判定标准。",
        "画出 Agentic loop 状态机与 Hub-and-Spoke 多 Agent 数据流图。",
        "梳理 Pre/PostToolUse Hook 的确定性拦截与数据归一化应用场景。"
      ],
      "output": "写出 5 组 Prompt 软约束 vs Hook 硬控制的对比选择题，并标明判定依据。",
      "title_en": "Blueprint Overview & D1 Architecture",
      "objective_en": "Master the 5 Domain weightings, 30 tasks, and 6 scenarios. Focus on agentic loops and coordinator architectures.",
      "tasks_en": [
        "Read Anthropic Exam Guide v1.0 and memorize domain weights (D1 27%, D2 18%, D3 20%, D4 20%, D5 15%).",
        "Deep dive into D1.1: Trace tool_use / tool_result recursive loops and stop_reason signals.",
        "Review D1.2 & D1.3: Study Hub-and-Spoke patterns and subagent context isolation principles."
      ],
      "output_en": "Draw a complete Agentic Loop state machine diagram and a Hub-and-Spoke coordinator architecture diagram."
    },
    {
      "day": 2,
      "title": "D2 工具与 MCP + D3 工作流配置",
      "minutes": 150,
      "objective": "攻克工具描述五要素、MCP 结构化错误、tool_choice 以及 CLAUDE.md 层级与 CI/CD 集成。",
      "tasks": [
        "重构 3 组易混淆工具的描述，设计区分 0 results 与 timeout 的 MCP Error Schema。",
        "理清 ~/.claude 与项目根目录 CLAUDE.md、.claude/rules/*.md 的优先级与 scope。",
        "掌握 claude -p 非交互参数在 CI/CD 中的必须性与独立审查模式。"
      ],
      "output": "设计一份项目级 .claude 规范目录树，附带一个带 context: fork 的 Skill 定义。",
      "title_en": "D2 Tool Design & MCP in Practice",
      "objective_en": "Master high-precision tool descriptions, parameter schemas, MCP structured errors, and tool_choice controls.",
      "tasks_en": [
        "Review D2.1: Write 5-element tool descriptions with clear boundaries (When to use / When NOT to use).",
        "Review D2.2: Differentiate 0 results (empty matches) from timeout (transient failures) in MCP errors.",
        "Review D2.3: Understand auto, any, and forced tool_choice modes, and clarify allowedTools vs visibility."
      ],
      "output_en": "Write a standardized MCP Error Schema JSON and compare tool_choice mode trade-offs."
    },
    {
      "day": 3,
      "title": "D4 Prompt 提示工程与结构化输出",
      "minutes": 150,
      "objective": "掌握 Explicit criteria 消除误报、Few-shot 临界场景设计、JSON Schema 容错与 Message Batches API。",
      "tasks": [
        "练习为代码审查编写明确的纳入与排除标准，拒绝「be conservative」等空泛词。",
        "理解 Schema 中 optional/nullable 对防止编造的作用，以及双重语义核查机制。",
        "对比实时 API 与 Batch API（半价、24h 窗口、custom_id）在 CI 门禁与离线提取中的选型。"
      ],
      "output": "为一个数据提取任务编写带 nullable 处理的 JSON Schema 与四要素反馈重试伪代码。",
      "title_en": "D3 Claude Code Workflows & Configuration",
      "objective_en": "Master CLAUDE.md hierarchy, Skills with context: fork, path-specific rules, and non-interactive CI/CD.",
      "tasks_en": [
        "Review D3.1: Delineate user (~/), project root, and submodule CLAUDE.md boundaries.",
        "Review D3.2: Configure Skills with YAML frontmatter and context: fork to prevent context pollution.",
        "Review D3.3 & D3.6: Learn path-specific rules with paths globs and claude -p non-interactive CI gates."
      ],
      "output_en": "Design a complete monorepo CLAUDE.md file tree and write a GitHub Actions workflow using claude -p."
    },
    {
      "day": 4,
      "title": "D5 上下文保真与高可靠性",
      "minutes": 150,
      "objective": "掌握 Case facts 常驻注入、Handoff 结构化交接、错误局部隔离、长上下文退化应对与来源追溯。",
      "tasks": [
        "学习为什么摘要会丢失金额数字，如何利用独立持久的 Case Facts 块保真。",
        "掌握升级人工的真正触发点（政策空白/超权限/需要人类主观裁量）与多匹配澄清原则。",
        "理解多源冲突数据必须保留双方数值并标为 disputed，绝不擅自删除或求平均。"
      ],
      "output": "写一份标准的人工接管 JSON Handoff 数据包契约，并制定来源追溯 Claim-Source 规范。",
      "title_en": "D4 Prompt Engineering & Structured Outputs",
      "objective_en": "Master explicit criteria, targeted few-shot examples, JSON Schema nullable design, and Message Batches API.",
      "tasks_en": [
        "Review D4.1 & D4.2: Replace empty adjectives with explicit criteria; craft targeted few-shot examples with reasoning.",
        "Review D4.3 & D4.4: Mark missing fields as nullable/optional in JSON Schema; build 4-element retry loops.",
        "Review D4.5: Master Message Batches API (50% discount, 24h SLA) vs real-time synchronous requirements."
      ],
      "output_en": "Write a JSON Schema for contract clause extraction with optional fields, and produce a Real-time vs Batch comparison table."
    },
    {
      "day": 5,
      "title": "六大官方场景全覆盖实操训练",
      "minutes": 180,
      "objective": "针对 6 个官方场景逐个开展场景化决策训练，提炼决定性约束与高频干扰陷阱。",
      "tasks": [
        "围绕 Customer Support、Code Generation、Research 等 6 大场景，每个场景至少推演 2 道复合题目。",
        "严格运用 10 步统一做题罗盘进行决策校验，识别「看似很严厉的 Prompt」等经典陷阱。",
        "总结个人最容易踩坑的思维盲区并做好记录。"
      ],
      "output": "写出 6 个官方场景的核心架构图与关键防御点速查卡片。",
      "title_en": "D5 Context Management & Reliability",
      "objective_en": "Master Case Facts persistence, structured human handoffs, error propagation, and source attribution.",
      "tasks_en": [
        "Review D5.1: Implement persistent case_facts blocks to eliminate rolling summary fact decay.",
        "Review D5.2: Identify deterministic escalation triggers and polite secondary-identifier disambiguation.",
        "Review D5.3 & D5.6: Annotate [Evidence Gaps] on partial failures, and retain contradictory figures as disputed."
      ],
      "output_en": "Write a customer support prompt featuring a persistent case_facts block, and draft an intelligence report structure with evidence gaps."
    },
    {
      "day": 6,
      "title": "完整 60 题 / 120 分钟计时 Mock",
      "minutes": 150,
      "objective": "模拟全真考试环境，在 105 分钟内完成 60 道单选与多选题，预留 15 分钟复核，记录错因分布。",
      "tasks": [
        "严格限制时间完成一套完整的 60 题模拟（推荐社区 Mock 或基于 AI 教练生成的成套题）。",
        "多选题先圈定「选几项」，遇到犹豫题先标记不卡死时间。",
        "交卷后将所有错题与犹豫题录入错题本，归入 9 大标准错因分类。"
      ],
      "output": "生成第一份完整 Mock 成绩单（记录得分、耗时、最弱 Domain 及错题归因分析）。",
      "title_en": "10-Step Decision Compass & Scenarios",
      "objective_en": "Apply the 10-step decision compass across the 6 official exam scenarios; eliminate top 10 cognitive traps.",
      "tasks_en": [
        "Memorize 10-step compass sequence (High-risk code controls > Criteria > Tool boundary > Error recovery > Occam's razor).",
        "Deep dive into 6 official scenarios: Support Agent, Code Gen, Research System, Developer Productivity, CI, Data Extraction.",
        "Copy the AI Coach prompt to Claude / ChatGPT and practice 10 scenario-based questions."
      ],
      "output_en": "Map each of the 6 official scenarios to its primary architecture patterns and key traps."
    },
    {
      "day": 7,
      "title": "弱项定向回补 + 考前设备与环境检查",
      "minutes": 120,
      "objective": "只针对 Mock 暴露出的薄弱 Domain 进行考纲回看；复习 10 大避坑表，完成 Pearson VUE 考前检查。",
      "tasks": [
        "逐一重做昨天的所有错题，直到能用自己的话清晰解释「为什么正确选项对，为什么每个干扰项错」。",
        "快速通读一遍考前最后一页清单与版本分歧避坑表。",
        "完成考试电脑、网络、摄像头、护照/证件及安静独立房间的检查。"
      ],
      "output": "打勾确认考前 10 项检查清单，进入准备应考状态！",
      "title_en": "60-Question Mock Exam & Final Review",
      "objective_en": "Complete a 60-question / 120-minute timed practice exam, log mistakes into 9 categories, and review the pre-flight checklist.",
      "tasks_en": [
        "Execute a 60-question timed practice simulation under test conditions (105 mins answer + 15 mins review).",
        "Log all mistakes into the Mistake Notebook, analyzing root causes rather than memorizing letters.",
        "Review the 10 pre-flight checklist items and version evolution guidance."
      ],
      "output_en": "Score >= 80% on mock exam with no domain below 75%; complete all 10 pre-flight checklist items."
    }
  ],
  "14": [
    {
      "day": 1,
      "title": "官方 Exam Guide + 考试信息总览",
      "minutes": 120,
      "objective": "写出 5 域权重、30 项结构与 6 场景；完成一次不计时诊断测试，建立备考基线。",
      "tasks": [
        "详细阅读 CCAR-F 官方指南，建立 5 个 Domain 的权重认知（D1 27% 最高）。",
        "理解 scaled score 720 分的含义，了解 60 题 / 120 分钟及多选题明确告知选项数的特点。",
        "完成初始诊断，摸清自己当前对 Agentic 系统与 Claude 产品的熟悉度。"
      ],
      "output": "默写出 5 个 Domain 名称与其对应权重比例，列出 6 个官方场景。",
      "title_en": "Blueprint Deep Dive & Baseline Eval",
      "objective_en": "Understand exam format (60Q/120m/720 pass), 5 domain weights, and complete baseline evaluation.",
      "tasks_en": [
        "Read Exam Guide v1.0 thoroughly.",
        "Memorize 5 domain weights (D1 27%, D2 18%, D3 20%, D4 20%, D5 15%).",
        "Self-assess all 30 task statements."
      ],
      "output_en": "Record initial mastery baseline score on the dashboard."
    },
    {
      "day": 2,
      "title": "D1 Agentic Loop、Hooks 与确定性保障",
      "minutes": 120,
      "objective": "画出 agentic loop 推进与终止状态机，深刻理解 Prompt 软指导与 Hook 硬限制的本质差异。",
      "tasks": [
        "剖析 stop_reason 推进机制：tool_use 继续执行，end_turn 正常终止。",
        "学习 PreToolUse 与 PostToolUse 钩子的真实代码级拦截能力与数据归一化。",
        "对比自然语言安全提示与程序级前置条件的安全性差距。"
      ],
      "output": "写出 5 组针对高危场景的「Prompt 伪安全 vs Hook 真控制」对比案例题。",
      "title_en": "D1.1-D1.3 Core Loops & Subagents",
      "objective_en": "Master agentic loop stop_reason state machines, Hub-and-Spoke patterns, and subagent concurrency.",
      "tasks_en": [
        "Deep dive into D1.1 stop_reason branches (end_turn vs tool_use).",
        "Deep dive into D1.2 Coordinator-Subagent architecture.",
        "Deep dive into D1.3 Context isolation and concurrency."
      ],
      "output_en": "Draw complete agentic loop state machine and subagent dispatch diagrams."
    },
    {
      "day": 3,
      "title": "D1 Coordinator、Subagent 编排与 Session",
      "minutes": 120,
      "objective": "掌握 Hub-and-Spoke 多 Agent 拓扑、显式上下文传递、并发调用与 Resume / Fork / New Session 边界。",
      "tasks": [
        "学习为什么子 Agent 必须上下文隔离，协调器如何拆解、委派与二次补派。",
        "识别同一轮中无依赖的独立调用，配置并发执行提升性能。",
        "梳理会话继续 (Resume)、探索分叉 (Fork) 与新会话 (New Session) 的决策树。"
      ],
      "output": "为分布式研究系统画出完整的数据流图与子 Agent 提示词入参契约。",
      "title_en": "D1.4-D1.7 Workflow Ordering & Hooks",
      "objective_en": "Master programmatic enforcement, structured handoffs, PreToolUse/PostToolUse hooks, and session forks.",
      "tasks_en": [
        "Study D1.4: Code-level enforcement vs prompt soft guidance.",
        "Study D1.5: PreToolUse and PostToolUse hook guardrails.",
        "Study D1.6 & D1.7: Task decomposition and session forks."
      ],
      "output_en": "Write PreToolUse hook logic blocking unauthorized tool calls."
    },
    {
      "day": 4,
      "title": "D2 Tool Design 接口规范、错误响应与 MCP",
      "minutes": 120,
      "objective": "改写模糊工具描述，设计结构化 MCP 错误规范，理解 0 results 与 timeout 的本质区别。",
      "tasks": [
        "掌握优秀工具描述五要素（功能、入参、返回值、何时用、何时不用）。",
        "设计含 isError, errorCategory, isRetryable, partial results 的错误响应结构。",
        "理解最小工具集分配与 tool_choice (auto / any / specific) 的行为逻辑。"
      ],
      "output": "改写 3 组易混淆工具描述，并编写符合规范的 MCP 结构化错误 JSON 示例。",
      "title_en": "D2.1-D2.3 Tool Boundaries & Errors",
      "objective_en": "Master tool interface descriptions, 0 results vs timeout handling, and tool_choice controls.",
      "tasks_en": [
        "Study D2.1: Disambiguating adjacent tool descriptions.",
        "Study D2.2: Standardized MCP structured error contracts.",
        "Study D2.3: auto, any, and forced tool_choice modes."
      ],
      "output_en": "Draft standardized tool description contracts and an MCP error schema."
    },
    {
      "day": 5,
      "title": "D3 CLAUDE.md 配置层级、Rules 与 Skills",
      "minutes": 120,
      "objective": "梳理用户级、项目级、目录级配置范围，掌握 Path-specific Rules 与 context: fork Skill。",
      "tasks": [
        "理清 ~/.claude/CLAUDE.md 与项目根目录 CLAUDE.md 的隔离与共享机制。",
        "学习在 .claude/rules/ 下通过 paths glob 实现文件匹配按需加载。",
        "理解 Skill 的 Frontmatter 配置以及 context: fork 隔离冗长任务输出。"
      ],
      "output": "为一个全栈项目设计一份包含根目录、目录级与 Path 规则的完整配置清单。",
      "title_en": "D2.4-D2.5 MCP Scopes & Built-in Tools",
      "objective_en": "Master project .mcp.json vs user ~/.claude.json scopes, MCP Resources, and built-in CLI tools.",
      "tasks_en": [
        "Study D2.4: Project vs user scopes and read-only Resources.",
        "Study D2.5: Grep, Glob, Read, Edit, Write, Bash boundaries.",
        "Learn progressive repo exploration flow."
      ],
      "output_en": "Write a project-level .mcp.json template and built-in tool selection tree."
    },
    {
      "day": 6,
      "title": "D3 Plan vs Direct、迭代优化与 CI/CD 集成",
      "minutes": 120,
      "objective": "掌握 Plan 模式与 Direct 执行的选型，精通非交互 claude -p 与生成/审查双实例分离架构。",
      "tasks": [
        "梳理 Plan Mode（模糊、跨多文件、架构决策）与 Direct Mode（明确单点可逆）的判断条件。",
        "学习复杂实现中的需求 Interview 澄清访谈与测试驱动迭代。",
        "掌握非交互环境必须加 -p / --print 参数，以及为什么写代码与查代码必须分离实例。"
      ],
      "output": "编写一份标准的 CI 流水线代码审查 GitHub Actions yaml 配置文件。",
      "title_en": "D3.1-D3.3 CLAUDE.md Hierarchy & Rules",
      "objective_en": "Master CLAUDE.md inheritance, modular rules, Skills with context: fork, and path-specific rules.",
      "tasks_en": [
        "Study D3.1: User, project, and directory CLAUDE.md precedence.",
        "Study D3.2: Skills frontmatter and context: fork isolation.",
        "Study D3.3: Path-specific rules via glob patterns."
      ],
      "output_en": "Design a fullstack monorepo CLAUDE.md hierarchy and path rules."
    },
    {
      "day": 7,
      "title": "D4 显式标准 (Explicit Criteria) 与 Few-shot 示例",
      "minutes": 120,
      "objective": "为提示工程编写无歧义的纳入与排除准则，设计针对临界易错场景的高质量 Few-shot 样例。",
      "tasks": [
        "学习为什么「be conservative」等空泛词不能解决误报，如何书写显式判定边界。",
        "掌握在标准已清楚但执行有波动时，如何编写附带判定理由的针对性 Few-shot。",
        "理解面对严重误报破坏信任时的紧急止血法则（临时关闭该项）。"
      ],
      "output": "为代码质量审查写出一套具备明确纳入、排除与严重度分级的准则文本及 2 个对比示例。",
      "title_en": "D3.4-D3.6 Plan Mode & CI/CD Gates",
      "objective_en": "Master Plan vs Direct execution decisions, iterative refinement, and non-interactive CI gates.",
      "tasks_en": [
        "Study D3.4: Plan mode vs Direct execution trade-offs.",
        "Study D3.5: Test-driven iterative repair and interview questions.",
        "Study D3.6: claude -p, machine-readable JSON, and sync gates."
      ],
      "output_en": "Write GitHub Actions workflow YAML for automated PR code review."
    },
    {
      "day": 8,
      "title": "D4 JSON Schema、Validation 重试与 Batch API",
      "minutes": 120,
      "objective": "掌握防幻觉 Schema 设计（optional/nullable）、双重语义校验、四要素重试与异步 Batch API。",
      "tasks": [
        "掌握为什么可能缺失的字段必须设为 nullable，避免模型为了 required 编造事实。",
        "掌握重试请求必须携带原始材料、错误输出、验证报错明细与目标 Schema。",
        "理解 Batch API 的半价折扣、24h 窗口与 custom_id 对应，以及为何 CI 门禁禁用 Batch。"
      ],
      "output": "设计一套文档提取的 Schema，附带 stated_total 与 calculated_total 双重核对逻辑。",
      "title_en": "D4.1-D4.3 Explicit Criteria & Schema",
      "objective_en": "Master explicit criteria, targeted few-shot examples with rationale, and robust JSON Schema nullable design.",
      "tasks_en": [
        "Study D4.1: Explicit inclusion/exclusion bounds and severity tiers.",
        "Study D4.2: Targeted few-shot examples with decision reasoning.",
        "Study D4.3: JSON Schema syntax vs semantics and nullable fields."
      ],
      "output_en": "Write contract extraction JSON Schema with nullable fields and few-shot examples."
    },
    {
      "day": 9,
      "title": "D5 关键事实常驻 (Case Facts)、人工升级与错误控制",
      "minutes": 120,
      "objective": "设计 Case Facts 独立常驻块防止长对话金额被篡改，规范结构化 Handoff 与多义澄清。",
      "tasks": [
        "理解普通摘要为何会丢失具体订单号和金额，掌握 Case Facts 块每轮注入技术。",
        "明晰升级人工的真正边界：政策空白/超权限，严禁因多问题或情绪直接甩给人工。",
        "处理同名多匹配问题：主动向用户索要第二标识，绝不擅自猜测执行。"
      ],
      "output": "写一份标准的 Case Facts 模板与一份包含已排查证据的人工接管 JSON 数据包。",
      "title_en": "D4.4-D4.6 Retry Loops & Batch API",
      "objective_en": "Master 4-element feedback retry loops, Message Batches API, and isolated two-pass review instances.",
      "tasks_en": [
        "Study D4.4: 4-element error feedback loops and dual math checks.",
        "Study D4.5: Message Batches API (50% discount, 24h window).",
        "Study D4.6: Independent reviewer instance to eliminate confirmation bias."
      ],
      "output_en": "Diagram an isolated two-instance code review architecture with feedback retry."
    },
    {
      "day": 10,
      "title": "D5 置信度分层校准 (Calibration) 与来源追溯",
      "minutes": 120,
      "objective": "规避整体 97% 正确率的欺骗性，设计高置信度抽样复核与精确的 Claim-Source 追溯链条。",
      "tasks": [
        "理解为什么必须按文档类型和字段分层评估，不能只看整体大盘数字。",
        "建立对高置信度结果的定期分层随机抽样机制，防止盲目信任引发生产事故。",
        "掌握数据冲突处理原则：保留双方数值与来源并标记 disputed，绝不私自删除或求平均。"
      ],
      "output": "设计一份包含 Stable Findings, Disputed Data 与 Evidence Gaps 的标准多源分析报告模板。",
      "title_en": "D5.1-D5.3 Case Facts & Escalation",
      "objective_en": "Master Case Facts persistence, deterministic escalation triggers, disambiguation, and subagent error propagation.",
      "tasks_en": [
        "Study D5.1: Persistent case_facts block resisting summary decay.",
        "Study D5.2: Deterministic escalation vs secondary identifier queries.",
        "Study D5.3: Error propagation and flagging [Evidence Gaps]."
      ],
      "output_en": "Write a customer support prompt featuring persistent case_facts block."
    },
    {
      "day": 11,
      "title": "六大官方场景综合推演与决策罗盘融会贯通",
      "minutes": 150,
      "objective": "将 30 个考点全面代入 6 个官方场景，逐条演练 10 步统一决策罗盘，攻克高频干扰陷阱。",
      "tasks": [
        "针对客服、代码生成、多 Agent 调研、CI 门禁等场景，全面练习辨识干扰项。",
        "牢记「Prompt 不是硬限制」、「工具选错先改描述」、「CI 门禁不用 Batch」等黄金铁律。",
        "针对自己的弱项 Domain 进行重点场景推演。"
      ],
      "output": "完成每个场景至少 2 道综合原创题的推演，写出最优选择与最有迷惑性干扰项的错因。",
      "title_en": "D5.4-D5.6 Context Degradation & Conflicts",
      "objective_en": "Master context degradation symptoms, Scratchpad files, stratified sampling, and source provenance.",
      "tasks_en": [
        "Study D5.4: Spotting textbook fluff degradation and using scratchpads.",
        "Study D5.5: Stratified sampling to uncover long-tail failures.",
        "Study D5.6: Claim-source provenance and marking disputed facts."
      ],
      "output_en": "Draft PROJECT_SCRATCHPAD.md template and a Claim-Source provenance schema."
    },
    {
      "day": 12,
      "title": "全真计时模拟 Mock 1 (60 题 / 120 分钟)",
      "minutes": 150,
      "objective": "完成第一次严格限时的 60 题模拟，建立精准的错题与犹豫题清单，分析最弱 Domain。",
      "tasks": [
        "在完全不受打扰的环境下，105 分钟内答完 60 题，15 分钟复核标记题。",
        "记录最终答对题数与耗时，对照 720 分通过线与 80% 就绪标准。",
        "将全部错题归入 9 大错因分类，定位失分最严重的考点领域。"
      ],
      "output": "生成 Mock 1 成绩单与薄弱考点清单（重点标记犹豫题与错题）。",
      "title_en": "6 Official Scenarios Architectural Deep Dive",
      "objective_en": "Synthesize architectural patterns across all 6 official scenarios.",
      "tasks_en": [
        "Review Customer Support and Code Generation blueprints.",
        "Review Research System and Developer Productivity blueprints.",
        "Review CI/CD Gates and Structured Data Extraction blueprints."
      ],
      "output_en": "Create an architecture-to-scenario mapping matrix across all 6 domains."
    },
    {
      "day": 13,
      "title": "弱项考点定向回补 + 计时模拟 Mock 2",
      "minutes": 150,
      "objective": "只回补 Mock 1 暴露出的知识盲区；换用新题完成 Mock 2，验证成绩是否稳定达到 80% 以上。",
      "tasks": [
        "回看总纲中对应 Task Statement 的核心原理与反模式陷阱。",
        "完成第二套陌生题或随机题 Mock（避免背熟悉答案产生虚假安全感）。",
        "检查是否满足「两次 Mock 均达到 80% 且无单项 Domain 低于 75%」的建议就绪标准。"
      ],
      "output": "生成 Mock 2 成绩对比单，评估是否已具备走进考场的硬实力。",
      "title_en": "10-Step Decision Compass & Trap Elimination",
      "objective_en": "Master the 10-step decision compass; practice eliminating the top 10 cognitive traps.",
      "tasks_en": [
        "Drill the 10-step decision tree sequence.",
        "Review top 10 high-frequency trap comparisons.",
        "Practice 15 scenario questions using the AI Coach prompt."
      ],
      "output_en": "Achieve 100% elimination rate on distractor traps in practice drills."
    },
    {
      "day": 14,
      "title": "考前清单复核 + 证件网络与监考环境检查",
      "minutes": 90,
      "objective": "不再大量刷陌生新题，温习 10 大避坑原则与版本分歧指南，完成系统与证件最终确认。",
      "tasks": [
        "快速浏览一遍 30 个 Task Statement 的反模式清单，加深本能条件反射。",
        "运行 Pearson VUE 官方系统测试程序，检查网络稳定性、麦克风与摄像头可用性。",
        "准备好有效官方证件（如护照），清理考桌，确保四周安静无杂物。"
      ],
      "output": "逐项勾选考前 10 项确认清单，以最佳状态自信应战！",
      "title_en": "60-Question Mock Exam & Pre-Flight Checklist",
      "objective_en": "Execute a full 60-question timed practice exam, log mistakes into 9 categories, and complete pre-flight review.",
      "tasks_en": [
        "Complete 60-question timed practice simulation under test conditions.",
        "Log mistakes into 9 root-cause categories in Mistake Notebook.",
        "Verify all 10 pre-flight checklist items."
      ],
      "output_en": "Score >= 80% on mock exam with no domain below 75%; ready for formal test."
    }
  ]
};

const preExamChecklist = [
  {
    "id": "c1",
    "text": "我知道正式考试代码是 CCAR-F，当前结构是 60 题 / 120 分钟（座席约 135 分钟），及格分为 720 / 1000。",
    "text_en": "I know the formal exam code is CCAR-F, structured with 60 questions / 120 minutes (135 min seat time), passing score 720 / 1000."
  },
  {
    "id": "c2",
    "text": "我记得多选题题目会明确写明「选择 N 项」，绝不把考试当成纯单选题来做，不会少选或多选。",
    "text_en": "I remember multiple-response questions state '(Select N)'; I will verify answer counts precisely and avoid under-selecting."
  },
  {
    "id": "c3",
    "text": "我能清晰说出五大 Domain 权重（D1 27%, D2 18%, D3 20%, D4 20%, D5 15%）并理解场景题多跨 Domain。",
    "text_en": "I know the 5 Domain weightings (D1 27%, D2 18%, D3 20%, D4 20%, D5 15%) and understand questions cross multiple domains."
  },
  {
    "id": "c4",
    "text": "我能条件反射般区分高风险硬拦截（Hooks/程序校验）与软指导（Prompt），绝不把 Prompt 当成安全硬控制。",
    "text_en": "I distinguish programmatic hard gates (Hooks/code) from soft instructions (Prompt); I never treat Prompts as security guarantees."
  },
  {
    "id": "c5",
    "text": "我清楚区分 0 results（查询成功但无匹配）与 timeout（未完成），并知道不可重试业务错误绝不盲目重试。",
    "text_en": "I clearly differentiate 0 results (successful query with 0 matches) from timeout (unfulfilled), and never blindly retry 403 errors."
  },
  {
    "id": "c6",
    "text": "我能准确界定 CLAUDE.md、Path rules、Skills 的范围，明白团队规范绝不能放在个人主目录 ~/.claude/ 下。",
    "text_en": "I accurately define CLAUDE.md, Path rules, and Skills scopes; team rules never belong in personal ~/.claude/ directories."
  },
  {
    "id": "c7",
    "text": "我理解 JSON Schema 语法正确不代表事实语义正确，明白原文缺失字段必须设为 nullable 以防模型编造。",
    "text_en": "I understand JSON Schema syntax correctness does not guarantee semantic truth; missing fields must be nullable to stop hallucination."
  },
  {
    "id": "c8",
    "text": "我能熟练写出结构化 MCP 错误、人工交接 Handoff 数据包、Case facts 常驻块与 Claim-Source 来源映射。",
    "text_en": "I can write structured MCP errors, human handoff packets, persistent Case Facts blocks, and Claim-Source provenance schemas."
  },
  {
    "id": "c9",
    "text": "我完成过至少一次完整的 60 题计时模拟，且做题时复盘的是 9 大错因根因，而不是死记题库正确字母。",
    "text_en": "I have completed at least one full 60-question timed mock exam and analyzed mistakes by 9 root causes rather than memorizing letters."
  },
  {
    "id": "c10",
    "text": "我已提前完成 Pearson VUE 在线监考系统与设备检测，准备好有效证件（如护照），考桌与房间环境清理整洁。",
    "text_en": "I completed the Pearson VUE system test, prepared valid government ID (e.g. Passport), and cleaned my desk and testing room."
  }
];

const versionDivergence = [
  {
    "topic": "子 Agent 工具名",
    "examGuide": "使用 `Task` 工具发起子 Agent",
    "currentDocs": "Agent SDK v2.1.63 之后已全面更名为 `Agent` 工具",
    "strategy": "考试时看题干使用的是哪版名词（若题干写 Task 则按 Exam Guide 逻辑解答）；实际生产开发一律使用当前的 Agent 工具。",
    "topic_en": "Subagent Tool Name",
    "examGuide_en": "Uses 'Task' tool to spawn subagents",
    "currentDocs_en": "Agent SDK v2.1.63+ renamed this to 'Agent' tool",
    "strategy_en": "Follow the prompt's nomenclature (if exam says Task, apply Task logic); use Agent tool in current production code."
  },
  {
    "topic": "循环停止标志 (stop_reason)",
    "examGuide": "重点考察 `tool_use`（继续执行）与 `end_turn`（自主完成）的二分判断",
    "currentDocs": "当前生产 API 还有 `max_tokens`, `pause_turn`, `refusal`, `model_context_window_exceeded` 等状态",
    "strategy": "考试抓准 end_turn 才是正常完成；生产系统中必须写全所有停止原因的分支防护代码。",
    "topic_en": "stop_reason Signals",
    "examGuide_en": "Focuses on tool_use (continue loop) vs end_turn (autonomous completion)",
    "currentDocs_en": "Production APIs include max_tokens, pause_turn, refusal, model_context_window_exceeded",
    "strategy_en": "Remember end_turn indicates completion; implement defensive branches for all stop_reasons in production."
  },
  {
    "topic": "结构化输出机制",
    "examGuide": "核心通过 `tool_use` 绑定输入 Schema 强制约束输出结构",
    "currentDocs": "当前 API 额外提供了原生 JSON Outputs 模式与 Strict Tool Use 模式",
    "strategy": "深刻理解 JSON Schema 的字段防伪设计（nullable）与语义校验，不拘泥于特定参数名。",
    "topic_en": "Structured Output Mechanism",
    "examGuide_en": "Binds input Schema via tool_use to mandate output structures",
    "currentDocs_en": "Current APIs additionally offer native JSON Outputs mode and Strict Tool Use",
    "strategy_en": "Master JSON Schema defensive design (nullable fields) and semantic validation regardless of parameter naming."
  },
  {
    "topic": "Commands 与 Skills",
    "examGuide": "本地备考指南常将 Commands 与 Skills 作为两个独立概念横向对比",
    "currentDocs": "官方产品功能持续演进，Skills 正逐渐成为涵盖命令、权限、隔离的主流标准规范",
    "strategy": "考试按 Exam Guide 语境；实际代码工程按当前 Claude Code 官方最新文档规范组织。",
    "topic_en": "Commands vs Skills",
    "examGuide_en": "Earlier study guides often contrast Commands and Skills as separate concepts",
    "currentDocs_en": "Product evolution is unifying workflows into Skills with frontmatter permissions, isolation, and descriptions",
    "strategy_en": "Answer in Exam Guide context during the test; follow current Claude Code documentation for production repos."
  },
  {
    "topic": "工具权限限制 (allowedTools)",
    "examGuide": "部分早期非官方社区笔记常误把 allowedTools 当成物理可见性工具隔离手段",
    "currentDocs": "在当前 Agent SDK 中，allowedTools 仅代表自动批准免确认执行，不代表从上下文中隐藏",
    "strategy": "真正限制工具面与防越权必须结合 tools（定义可见集）、disallowedTools 与系统 Permission 模式。",
    "topic_en": "Tool Permissions (allowedTools)",
    "examGuide_en": "Early community notes mistook allowedTools for physical visibility isolation",
    "currentDocs_en": "In Agent SDK, allowedTools governs auto-approval without prompt confirmation, not context hiding",
    "strategy_en": "Physical tool allocation requires configuring tools (visible set), disallowedTools, and permission modes."
  }
];

const outOfScopeList = [
  {
    "zh": "模型微调 (Fine-tuning) 或从零预训练自定义 Claude 模型",
    "en": "Model fine-tuning or pre-training custom Claude models from scratch"
  },
  {
    "zh": "Claude 内部底层架构、Transformer 层数、权重分布、RLHF 与 Constitutional AI 训练技术细节",
    "en": "Claude internal transformer architectures, layers, RLHF weights, and Constitutional AI training math"
  },
  {
    "zh": "底层 API 鉴权、Token 签名算法、OAuth 内部协商、计费账户与 Key 轮换等协议实现细节",
    "en": "Low-level API token signing, OAuth negotiation, billing accounts, and API key rotation protocols"
  },
  {
    "zh": "MCP Server 的 Docker 容器构建、K8s 编排、网络隧道打通与云端托管运维",
    "en": "Dockerizing MCP servers, Kubernetes orchestration, reverse proxy tunnels, and cloud hosting ops"
  },
  {
    "zh": "向量数据库 (Vector DB) 索引构建、HNSW 算法细节与 Embedding 内部数学原理",
    "en": "Vector database index algorithms (HNSW), chunking geometry, and embedding math internals"
  },
  {
    "zh": "Computer Use 桌面接管、纯视觉多模态底层与 Server-Sent Events (SSE) 网络流处理细节",
    "en": "Computer Use desktop automation, low-level vision transformers, and SSE network streaming bytes"
  },
  {
    "zh": "特定云厂商 (AWS Bedrock / GCP Vertex AI / Azure) 专属控制台与 IAM 鉴权配置细节",
    "en": "Cloud provider proprietary IAM consoles (AWS Bedrock / GCP Vertex AI / Azure)"
  },
  {
    "zh": "Token 计数算法 (BPE Tokenizer)、精确每千 Token 价格数学心算与跨模型性能 Benchmark 跑分",
    "en": "BPE tokenizer math formulas, mental price-per-token arithmetic, and cross-model benchmark scores"
  },
  {
    "zh": "Prompt Caching 的底层缓存命中算法机制与硬件存储结构",
    "en": "Prompt Caching low-level LRU eviction algorithms and hardware memory structures"
  }
];

const studyResources = {
  "official": [
    {
      "name": "官方认证页与 Exam Guide",
      "url": "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification",
      "desc": "官方认证唯一权威报名入口、Exam Guide v1.0 PDF 下载与考试政策更新",
      "desc_en": "官方认证唯一权威报名入口、Exam Guide v1.0 PDF 下载与考试政策更新"
    },
    {
      "name": "Anthropic Academy 课程总入口",
      "url": "https://anthropic.skilljar.com/",
      "desc": "官方出品的互动学习课程（包含 Building with Claude API、MCP 入门等）",
      "desc_en": "官方出品的互动学习课程（包含 Building with Claude API、MCP 入门等）"
    },
    {
      "name": "Introduction to subagents 官方课",
      "url": "https://anthropic.skilljar.com/introduction-to-subagents",
      "desc": "深入讲解子 Agent 隔离、上下文传递、委托与反模式，与 D1/D5 考点高度契合",
      "desc_en": "深入讲解子 Agent 隔离、上下文传递、委托与反模式，与 D1/D5 考点高度契合"
    },
    {
      "name": "Claude Platform 文档",
      "url": "https://platform.claude.com/docs/en/home",
      "desc": "Anthropic 官方 API 文档、stop_reason 规范、Prompt 工程指南与 Message Batches API",
      "desc_en": "Anthropic 官方 API 文档、stop_reason 规范、Prompt 工程指南与 Message Batches API"
    },
    {
      "name": "Claude Code 官方文档",
      "url": "https://code.claude.com/docs/en/overview",
      "desc": "CLAUDE.md、Rules、Skills、内置工具与 CI/CD 集成权威指南",
      "desc_en": "CLAUDE.md、Rules、Skills、内置工具与 CI/CD 集成权威指南"
    },
    {
      "name": "Claude Agent SDK 官方文档",
      "url": "https://code.claude.com/docs/en/agent-sdk/overview",
      "desc": "Hooks 拦截器规范、多 Agent 架构契约与最新 Agent 工具使用指南",
      "desc_en": "Hooks 拦截器规范、多 Agent 架构契约与最新 Agent 工具使用指南"
    },
    {
      "name": "Model Context Protocol (MCP) 规范",
      "url": "https://modelcontextprotocol.io/",
      "desc": "MCP 官方协议标准、Resources、Prompts、Tools 与结构化错误响应规范",
      "desc_en": "MCP 官方协议标准、Resources、Prompts、Tools 与结构化错误响应规范"
    }
  ],
  "community": [
    {
      "name": "claudecertificationguide.com 社区模拟站",
      "url": "https://claudecertificationguide.com/mock-exam",
      "desc": "独立社区制作的 60 题全真模拟试卷，用于适应 120 分钟做题节奏与场景判断",
      "desc_en": "独立社区制作的 60 题全真模拟试卷，用于适应 120 分钟做题节奏与场景判断"
    },
    {
      "name": "Ray 的工作流实操 Skills 库",
      "url": "https://github.com/imraywang/rayskills",
      "desc": "社区优秀的 Agent 工作流可执行实操参考代码，体会工程落地实践",
      "desc_en": "社区优秀的 Agent 工作流可执行实操参考代码，体会工程落地实践"
    },
    {
      "name": "YouTube CCAR-F 完整视频课程列表",
      "url": "https://www.youtube.com/watch?v=v3tMqTmgg2Q&list=PLviC8AFqAj5A9MHkRIn2fU5Ac2lEdJxNf&index=13",
      "desc": "群友推荐的社区系统化复习视频讲解，帮助建立全景视觉框架",
      "desc_en": "群友推荐的社区系统化复习视频讲解，帮助建立全景视觉框架"
    },
    {
      "name": "Agent 工程反模式演讲 (2026 World's Fair)",
      "url": "https://www.youtube.com/watch?v=Z-c11pV_uvU",
      "desc": "深入剖析 Agent 常见落地灾难、工具误判与上下文过载，直击 D1/D2/D5 考点灵魂",
      "desc_en": "深入剖析 Agent 常见落地灾难、工具误判与上下文过载，直击 D1/D2/D5 考点灵魂"
    }
  ]
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

const aiCoachPromptEn = `You are my CCAR-F (Claude Certified Architect - Foundations) exam preparation coach. Please generate original, high-calibre scenario-based practice questions strictly aligned with Anthropic's official Exam Guide v1.0 and blueprint. Do not claim questions are from real exam dumps, and never use leaked question pools.

[Training Rules]
1. Randomly pick a realistic engineering scenario from the 6 official exam scenarios:
   - Customer Support Resolution Agent
   - Code Generation with Claude Code
   - Multi-Agent Research System
   - Developer Productivity with Claude
   - Claude Code for Continuous Integration
   - Structured Data Extraction
2. Embed one or more Domain tasks (D1 Architecture, D2 Tools/MCP, D3 Claude Code Workflows, D4 Prompt & Structured Outputs, D5 Reliability & Context) into a concrete architectural dilemma.
3. Formats can be single-choice or multiple-choice. For multiple-choice, explicitly specify '(Select 2)' or '(Select 3)' in the question stem.
4. Output exactly ONE question at a time. Never disclose the correct answer, task statement numbers, or explanations upfront.
5. Wait for my answer. After I respond:
   - Clearly state whether my answer is correct or incorrect.
   - Provide a comprehensive, step-by-step breakdown of why each option is correct or incorrect (especially explaining subtle distractor traps).
   - Identify which error archetype I fell into if wrong (e.g., overengineering, treating prompt as hard guardrail, ignoring negative constraint, tool boundary ambiguity, flawed error recovery, context degradation, scope misconfiguration, SLA/Batch mismatch).
   - Cite the exact Task Statement reference (e.g., D1.4, D4.3) and concepts to review.
6. Every 5 questions, summarize my accuracy by Domain and analyze error distributions, prioritizing my weakest areas in the next round.

Now, generate Question #1 based on the CCAR-F blueprint!`;

// Global Namespace Exports
const globalExports = {
  I18N,
  examInfo,
  domains,
  decisionRules,
  highFrequencyTraps,
  officialScenarios,
  errorCategories,
  studyPlans,
  preExamChecklist,
  versionDivergence,
  outOfScopeList,
  studyResources,
  aiCoachPrompt,
  aiCoachPromptEn
};

if (typeof window !== "undefined") {
  Object.assign(window, globalExports);
}
if (typeof globalThis !== "undefined") {
  Object.assign(globalThis, globalExports);
}
