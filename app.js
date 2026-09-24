/**
 * CCAR-F (Claude Certified Architect - Foundations)
 * 交互式学习看板 & 每日打卡核心引擎
 */

// ================= 全局状态与本地持久化 =================
const STORAGE_KEY = "cca-study-companion-v2";

const defaultState = {
  plan: "14", // "7" 或 "14"
  theme: "sakura", // biennale, cobalt, emerald, neo-grid, block-frame, sakura, dark
  days: {
    7: {},
    14: {},
  },
  topics: {}, // code -> stage (0: 未开始, 1: 理解, 2: 练习, 3: 验证)
  checkins: [], // [{ id, date: "YYYY-MM-DD", minutes: 120, planDay: 1, note: "..." }]
  mocks: [], // [{ id, date, correct, minutes, weakestDomain, source, notes }]
  mistakes: [], // [{ id, questionNo, domain, taskCode, stem, myAnswer, correctAnswer, errorCategory, reviewRef, reflection }]
  checklist: {}, // { c1: true, c2: false... }
  examDate: "", // 目标考试日期 YYYY-MM-DD
  activeErrorCat: "all",
  activeStageFilter: "all",
  searchKeyword: "",
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // 尝试从 v1 迁移旧数据
      const legacy = localStorage.getItem("cca-learning-panel-v1");
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        return {
          ...defaultState,
          plan: parsedLegacy.plan || "14",
          days: { ...defaultState.days, ...parsedLegacy.days },
          topics: Object.fromEntries(
            Object.entries(parsedLegacy.topics || {}).map(([k, v]) => [k, v ? 1 : 0]),
          ),
        };
      }
      return structuredClone(defaultState);
    }
    const parsed = JSON.parse(saved);
    const resolvedTheme =
      !parsed.theme || ["editorial", "blue-pro", "swiss", "notebook", "block-frame"].includes(parsed.theme)
        ? "sakura"
        : parsed.theme;
    return {
      ...defaultState,
      ...parsed,
      theme: resolvedTheme,
      days: {
        7: { ...defaultState.days[7], ...(parsed.days?.[7] || {}) },
        14: { ...defaultState.days[14], ...(parsed.days?.[14] || {}) },
      },
      topics: { ...defaultState.topics, ...(parsed.topics || {}) },
      checklist: { ...defaultState.checklist, ...(parsed.checklist || {}) },
    };
  } catch (err) {
    console.error("加载状态异常，恢复默认:", err);
    return structuredClone(defaultState);
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("保存状态异常:", err);
  }
}

// ================= 工具函数 =================
function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function calculateWeightedMastery() {
  let totalScore = 0;
  domains.forEach((dom) => {
    let domainPoints = 0;
    dom.topics.forEach((t) => {
      const stage = state.topics[t.code] || 0;
      domainPoints += stage / 3; // 0, 0.33, 0.66, 1
    });
    const domainRatio = dom.topics.length > 0 ? domainPoints / dom.topics.length : 0;
    totalScore += domainRatio * dom.weight;
  });
  return Math.min(100, Math.round(totalScore));
}

function calculateStreak() {
  if (!state.checkins || state.checkins.length === 0) return 0;
  const uniqueDates = [...new Set(state.checkins.map((c) => c.date))].sort().reverse();
  const today = todayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // 如果最近一次打卡既不是今天也不是昨天，连胜断开
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 0;
  let expected = new Date(uniqueDates[0]);

  for (const dateStr of uniqueDates) {
    const cur = new Date(dateStr);
    const diffDays = Math.round((expected - cur) / 86400000);
    if (diffDays === 0) {
      streak++;
      expected = new Date(cur.getTime() - 86400000);
    } else {
      break;
    }
  }
  return streak;
}

function getNextUnfinishedDayIndex() {
  const planList = studyPlans[state.plan];
  return planList.findIndex((_, idx) => !state.days[state.plan]?.[idx]);
}

function showToast(message, icon = "[OK]") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// 简易 Web Audio 提示音（番茄钟结束、打卡成功）
function playChime(success = true) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    if (success) {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // 忽略音频不可用环境
  }
}

// ================= DOM 元素缓存 =================
const elements = {
  // 计划切换
  planBtns: document.querySelectorAll("[data-plan]"),
  tabBtns: document.querySelectorAll("[data-tab]"),
  tabPanels: document.querySelectorAll(".tab-panel"),

  // Hero 核心指标
  masteryRing: document.getElementById("masteryRing"),
  masteryPercent: document.getElementById("masteryPercent"),
  todayDayBadge: document.getElementById("todayDayBadge"),
  todayStatusBadge: document.getElementById("todayStatusBadge"),
  todayEstimateTime: document.getElementById("todayEstimateTime"),
  todayTitle: document.getElementById("todayTitle"),
  todayObjective: document.getElementById("todayObjective"),
  todayOutput: document.getElementById("todayOutput"),
  todayCheckinBtn: document.getElementById("todayCheckinBtn"),
  todayStudyFocusBtn: document.getElementById("todayStudyFocusBtn"),

  // 统计矩阵
  streakDays: document.getElementById("streakDays"),
  totalCheckins: document.getElementById("totalCheckins"),
  planDaysDone: document.getElementById("planDaysDone"),
  planDaysTotal: document.getElementById("planDaysTotal"),
  planPercentText: document.getElementById("planPercentText"),
  verifiedTopicsCount: document.getElementById("verifiedTopicsCount"),
  coveredTopicsText: document.getElementById("coveredTopicsText"),
  mockReadinessText: document.getElementById("mockReadinessText"),
  latestMockText: document.getElementById("latestMockText"),
  countdownLabel: document.getElementById("countdownLabel"),
  setExamDateBtn: document.getElementById("setExamDateBtn"),

  // 标签页 1：每日学习与打卡
  planStreamHeading: document.getElementById("planStreamHeading"),
  planProgressPill: document.getElementById("planProgressPill"),
  dailyCardsContainer: document.getElementById("dailyCardsContainer"),
  sideStreakCount: document.getElementById("sideStreakCount"),
  checkinCalendarCells: document.getElementById("checkinCalendarCells"),
  checkinNotesList: document.getElementById("checkinNotesList"),
  addNewCheckinNoteBtn: document.getElementById("addNewCheckinNoteBtn"),

  // 标签页 2：考纲深度库
  topicSearchInput: document.getElementById("topicSearchInput"),
  stageFilterBtns: document.querySelectorAll("[data-filter-stage]"),
  domainsAccordionContainer: document.getElementById("domainsAccordionContainer"),

  // 标签页 3：10 步决策罗盘
  decisionRulesGrid: document.getElementById("decisionRulesGrid"),
  trapsGrid: document.getElementById("trapsGrid"),
  scenariosGrid: document.getElementById("scenariosGrid"),
  copyAiPromptBtn: document.getElementById("copyAiPromptBtn"),

  // 标签页 4：Mock & 错题本
  readinessIndicator: document.getElementById("readinessIndicator"),
  readinessStatusText: document.getElementById("readinessStatusText"),
  mockEntryForm: document.getElementById("mockEntryForm"),
  mockDate: document.getElementById("mockDate"),
  mockCorrect: document.getElementById("mockCorrect"),
  mockMinutes: document.getElementById("mockMinutes"),
  mockWeakest: document.getElementById("mockWeakest"),
  mockSource: document.getElementById("mockSource"),
  mockNotes: document.getElementById("mockNotes"),
  mockHistoryList: document.getElementById("mockHistoryList"),
  openAddMistakeModalBtn: document.getElementById("openAddMistakeModalBtn"),
  errorCatFilterContainer: document.getElementById("errorCatFilterContainer"),
  mistakesListContainer: document.getElementById("mistakesListContainer"),

  // 标签页 5：考前清单与资源
  preExamChecklistContainer: document.getElementById("preExamChecklistContainer"),
  checklistScorePill: document.getElementById("checklistScorePill"),
  divergenceTableBody: document.getElementById("divergenceTableBody"),
  outOfScopeListContainer: document.getElementById("outOfScopeListContainer"),
  officialResourcesContainer: document.getElementById("officialResourcesContainer"),
  communityResourcesContainer: document.getElementById("communityResourcesContainer"),

  // 工具栏与模态
  themeSelector: document.getElementById("themeSelector"),
  openPomodoroBtn: document.getElementById("openPomodoroBtn"),
  exportBtn: document.getElementById("exportBtn"),
  importBtn: document.getElementById("importBtn"),
  importFileInput: document.getElementById("importFileInput"),
  resetBtn: document.getElementById("resetBtn"),

  // 打卡弹窗
  checkinModalOverlay: document.getElementById("checkinModalOverlay"),
  closeCheckinModalBtn: document.getElementById("closeCheckinModalBtn"),
  cancelCheckinModalBtn: document.getElementById("cancelCheckinModalBtn"),
  checkinModalForm: document.getElementById("checkinModalForm"),
  checkinDate: document.getElementById("checkinDate"),
  checkinDuration: document.getElementById("checkinDuration"),
  checkinDayIndex: document.getElementById("checkinDayIndex"),
  checkinNote: document.getElementById("checkinNote"),

  // 错题弹窗
  mistakeModalOverlay: document.getElementById("mistakeModalOverlay"),
  closeMistakeModalBtn: document.getElementById("closeMistakeModalBtn"),
  cancelMistakeModalBtn: document.getElementById("cancelMistakeModalBtn"),
  mistakeModalForm: document.getElementById("mistakeModalForm"),
  mistakeQuestionNo: document.getElementById("mistakeQuestionNo"),
  mistakeDomain: document.getElementById("mistakeDomain"),
  mistakeStem: document.getElementById("mistakeStem"),
  mistakeMyAnswer: document.getElementById("mistakeMyAnswer"),
  mistakeCorrectAnswer: document.getElementById("mistakeCorrectAnswer"),
  mistakeErrorCategory: document.getElementById("mistakeErrorCategory"),
  mistakeReviewRef: document.getElementById("mistakeReviewRef"),
  mistakeReflection: document.getElementById("mistakeReflection"),

  // 番茄钟弹窗
  pomodoroOverlay: document.getElementById("pomodoroOverlay"),
  closePomodoroModalBtn: document.getElementById("closePomodoroModalBtn"),
  pomodoroClockDisplay: document.getElementById("pomodoroClockDisplay"),
  pomodoroStateText: document.getElementById("pomodoroStateText"),
  pomodoroStartBtn: document.getElementById("pomodoroStartBtn"),
  pomodoroPauseBtn: document.getElementById("pomodoroPauseBtn"),
  pomodoroResetBtn: document.getElementById("pomodoroResetBtn"),
  pomodoroPresetBtns: document.querySelectorAll(".pomodoro-presets .preset-btn"),
};

// ================= 模块渲染逻辑 =================

// 1. 渲染 Hero 与顶部概览
function renderHero() {
  const mastery = calculateWeightedMastery();
  elements.masteryPercent.textContent = `${mastery}%`;
  elements.masteryRing.style.setProperty("--mastery-deg", `${mastery * 3.6}deg`);

  const planList = studyPlans[state.plan];
  const nextIdx = getNextUnfinishedDayIndex();
  const daysDoneCount = planList.filter((_, idx) => state.days[state.plan]?.[idx]).length;

  // 今日行动
  if (nextIdx === -1) {
    elements.todayDayBadge.textContent = "已达成";
    elements.todayStatusBadge.textContent = "已完成全部计划";
    elements.todayStatusBadge.className = "badge-status checked";
    elements.todayEstimateTime.textContent = "0";
    elements.todayTitle.textContent = `恭喜！${state.plan} 天备考计划已全部打卡完成`;
    elements.todayObjective.textContent = "知识体系已打通！现在进入 Mock 标签页，进行全真模拟测试并针对错因定向回补。";
    elements.todayOutput.textContent = "完成至少两套 60 题计时 Mock，确保稳定达到 80% 以上！";
    elements.todayCheckinBtn.innerHTML = `<span class="checkin-icon">[通关]</span><span>计划已全部通关</span>`;
    elements.todayCheckinBtn.className = "btn-checkin is-done";
  } else {
    const todayTask = planList[nextIdx];
    elements.todayDayBadge.textContent = `Day ${nextIdx + 1}`;
    elements.todayStatusBadge.textContent = "待打卡";
    elements.todayStatusBadge.className = "badge-status";
    elements.todayEstimateTime.textContent = String(todayTask.minutes);
    elements.todayTitle.textContent = todayTask.title;
    elements.todayObjective.textContent = todayTask.objective;
    elements.todayOutput.textContent = todayTask.output;
    elements.todayCheckinBtn.innerHTML = `<span class="checkin-icon">[打卡]</span><span>完成今日打卡</span>`;
    elements.todayCheckinBtn.className = "btn-checkin";
  }

  // 统计指标
  const streak = calculateStreak();
  elements.streakDays.innerHTML = `${streak} <small>天</small>`;
  elements.sideStreakCount.textContent = String(streak);
  elements.totalCheckins.textContent = String(state.checkins.length);

  elements.planDaysDone.innerHTML = `${daysDoneCount} <small id="planDaysTotal">/ ${planList.length}</small>`;
  const planPct = Math.round((daysDoneCount / planList.length) * 100);
  elements.planPercentText.textContent = `完成率 ${planPct}%`;

  const verifiedCount = Object.values(state.topics).filter((s) => s === 3).length;
  const coveredCount = Object.values(state.topics).filter((s) => s >= 1).length;
  elements.verifiedTopicsCount.innerHTML = `${verifiedCount} <small>/ 30</small>`;
  elements.coveredTopicsText.textContent = `已学考点 ${coveredCount}/30`;

  // Mock 就绪度评估
  const qualifiedMocks = state.mocks.filter((m) => m.correct / 60 >= 0.8).length;
  const isReady = qualifiedMocks >= 2;
  elements.readinessStatusText.textContent = isReady
    ? "已达就绪标准 (2次以上 80%+)"
    : `就绪度：${qualifiedMocks}/2 次 Mock 达到 80%`;
  elements.readinessIndicator.className = `readiness-indicator ${isReady ? "is-ready" : ""}`;
  elements.mockReadinessText.textContent = isReady ? "已就绪" : `${qualifiedMocks} / 2 套`;

  if (state.mocks.length > 0) {
    const latest = state.mocks[0];
    elements.latestMockText.textContent = `最近 ${latest.correct}/60 · ${latest.minutes}m`;
  } else {
    elements.latestMockText.textContent = "暂无 Mock 记录";
  }

  // 目标考期倒计时
  if (state.examDate) {
    const target = new Date(state.examDate + "T00:00:00");
    const diff = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      elements.countdownLabel.textContent = `考期倒计时：还有 ${diff} 天 (${state.examDate})`;
    } else if (diff === 0) {
      elements.countdownLabel.textContent = `今天就是考试日！保持冷静，自信应战！`;
    } else {
      elements.countdownLabel.textContent = `考期已过 (${state.examDate})，点击修改`;
    }
  } else {
    elements.countdownLabel.textContent = "目标考期：尚未设定";
  }
}

// 2. 渲染每日学习计划卡片流与日历
function renderDailyPlan() {
  const planList = studyPlans[state.plan];
  elements.planStreamHeading.textContent = `${state.plan} 天${state.plan === "7" ? "冲刺" : "稳妥"}学习计划`;

  const doneCount = planList.filter((_, idx) => state.days[state.plan]?.[idx]).length;
  elements.planProgressPill.textContent = `已完成 ${doneCount} / ${planList.length} 天`;

  elements.dailyCardsContainer.innerHTML = "";

  planList.forEach((item, index) => {
    const isCompleted = Boolean(state.days[state.plan]?.[index]);
    const card = document.createElement("article");
    card.className = `daily-card ${isCompleted ? "is-completed" : ""}`;

    const tasksHtml = item.tasks.map((t) => `<li>${t}</li>`).join("");

    card.innerHTML = `
      <div class="daily-card-top">
        <div class="daily-day-label">
          <span class="day-badge-num">Day ${index + 1}</span>
          <h4 class="daily-card-title">${item.title}</h4>
        </div>
        <span class="daily-time-tag">建议 ${item.minutes} 分钟</span>
      </div>
      <p class="daily-card-objective">${item.objective}</p>
      <ul class="daily-task-items">${tasksHtml}</ul>
      <div class="daily-card-deliverable">
        <strong>[检验产出] </strong>
        <span>${item.output}</span>
      </div>
      <div class="daily-card-footer">
        <label class="daily-checkbox-label">
          <input type="checkbox" data-day-index="${index}" ${isCompleted ? "checked" : ""} />
          <span>${isCompleted ? "今日已完成" : "标记完成并打卡"}</span>
        </label>
        <button type="button" class="btn-card-log" data-log-day="${index + 1}">写今日打卡心得</button>
      </div>
    `;
    elements.dailyCardsContainer.appendChild(card);
  });

  renderCalendar();
  renderCheckinNotes();
}

// 渲染打卡日历（生成当月日期）
function renderCalendar() {
  const container = elements.checkinCalendarCells;
  container.innerHTML = "";
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0 是周日
  const offset = (firstDay + 6) % 7; // 转为周一为 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = now.getDate();

  const checkedDates = new Set(state.checkins.map((c) => c.date));

  // 补齐月初空白
  for (let i = 0; i < offset; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "cal-cell";
    emptyCell.style.opacity = "0.2";
    container.appendChild(emptyCell);
  }

  // 填充当月天数
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    const dStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = day === todayDate;
    const isChecked = checkedDates.has(dStr);

    cell.className = `cal-cell ${isToday ? "today" : ""} ${isChecked ? "checked" : ""}`;
    cell.textContent = String(day);
    cell.title = `${dStr}${isChecked ? " (已打卡)" : ""}`;

    container.appendChild(cell);
  }
}

// 渲染打卡心得笔记
function renderCheckinNotes() {
  const container = elements.checkinNotesList;
  container.innerHTML = "";

  const notes = state.checkins.filter((c) => c.note && c.note.trim() !== "");
  if (notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>[暂无记录]</span>
        <p>打卡时记录的学习笔记与思考心得，将在此处存档。</p>
      </div>
    `;
    return;
  }

  notes.slice(0, 15).forEach((item) => {
    const card = document.createElement("div");
    card.className = "checkin-note-item";
    card.innerHTML = `
      <div class="note-item-header">
        <strong>${item.date} · Day ${item.planDay || 1}</strong>
        <span>${item.minutes || 120} 分钟</span>
      </div>
      <p class="note-item-content">${escapeHtml(item.note)}</p>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 3. 渲染 30 项考点深度库
function renderBlueprint() {
  const container = elements.domainsAccordionContainer;
  container.innerHTML = "";

  const searchKeyword = state.searchKeyword.toLowerCase().trim();
  const stageFilter = state.activeStageFilter;

  domains.forEach((dom) => {
    // 过滤 topics
    const filteredTopics = dom.topics.filter((topic) => {
      const currentStage = state.topics[topic.code] ?? 0;
      if (stageFilter !== "all" && String(currentStage) !== stageFilter) {
        return false;
      }
      if (!searchKeyword) return true;
      const haystack = `${topic.code} ${topic.title} ${topic.official} ${topic.summary} ${topic.keyPoints.join(" ")} ${topic.antiPatterns.join(" ")}`.toLowerCase();
      return haystack.includes(searchKeyword);
    });

    if (filteredTopics.length === 0 && (searchKeyword || stageFilter !== "all")) {
      return; // 搜索无匹配时隐藏整个 Domain
    }

    // 计算该 Domain 进度
    let domainPoints = 0;
    dom.topics.forEach((t) => {
      domainPoints += (state.topics[t.code] || 0) / 3;
    });
    const domPercent = Math.round((domainPoints / dom.topics.length) * 100);

    const card = document.createElement("div");
    card.className = "domain-accordion-card is-open";

    card.innerHTML = `
      <div class="domain-accordion-header" data-domain-toggle="${dom.code}">
        <div class="domain-title-group">
          <span class="domain-code-badge">${dom.code}</span>
          <div class="domain-title-text">
            <h3>${dom.code} · ${dom.title}</h3>
            <p>${dom.summary}</p>
          </div>
        </div>
        <div class="domain-progress-side">
          <span class="domain-weight-tag">官方权重 ${dom.weight}%</span>
          <div class="domain-bar-wrapper">
            <div class="domain-bar-fill" style="width: ${domPercent}%"></div>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
      </div>
      <div class="domain-topics-body" id="body-${dom.code}"></div>
    `;

    const bodyContainer = card.querySelector(`#body-${dom.code}`);

    filteredTopics.forEach((topic) => {
      const stage = state.topics[topic.code] ?? 0;
      const keyPointsHtml = topic.keyPoints.map((kp) => `<li>${kp}</li>`).join("");
      const antiPatternsHtml = topic.antiPatterns.map((ap) => `<li>${ap}</li>`).join("");

      const topicEl = document.createElement("article");
      topicEl.className = "topic-card";
      topicEl.innerHTML = `
        <div class="topic-card-header">
          <div class="topic-title-area">
            <span class="topic-num-badge">${topic.code}</span>
            <div class="topic-headings">
              <h4>${topic.title}</h4>
              <div class="topic-official-name">${topic.official}</div>
            </div>
          </div>
          <div class="stage-select-box">
            <label for="stage-${topic.code}" class="sr-only">掌握阶段</label>
            <select id="stage-${topic.code}" data-topic-code="${topic.code}">
              <option value="0" ${stage === 0 ? "selected" : ""}>0. 未开始</option>
              <option value="1" ${stage === 1 ? "selected" : ""}>1. 理解概念</option>
              <option value="2" ${stage === 2 ? "selected" : ""}>2. 完成练习</option>
              <option value="3" ${stage === 3 ? "selected" : ""}>3. 新题验证</option>
            </select>
          </div>
        </div>
        <p class="topic-summary-box"><strong>考纲核心：</strong>${topic.summary}</p>
        <div class="topic-keypoints">
          <strong>[核心原理与正确做法] </strong>
          <ul>${keyPointsHtml}</ul>
        </div>
        <div class="topic-antipatterns">
          <strong>[高频反模式与易错陷阱] </strong>
          <ul>${antiPatternsHtml}</ul>
        </div>
        <div class="topic-evidence-box">
          <span><strong>[掌握证据] </strong>${topic.evidence}</span>
        </div>
      `;
      bodyContainer.appendChild(topicEl);
    });

    container.appendChild(card);
  });

  if (container.children.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>[无结果]</span>
        <p>没有找到与「${escapeHtml(state.searchKeyword)}」或当前筛选条件匹配的考点，请尝试清除搜索词。</p>
      </div>
    `;
  }
}

// 4. 渲染 10 步决策罗盘与场景
function renderDecisionLens() {
  // 10 步决策
  elements.decisionRulesGrid.innerHTML = "";
  decisionRules.forEach((item) => {
    const card = document.createElement("div");
    card.className = "rule-card";
    card.innerHTML = `
      <div class="rule-card-header">
        <span class="rule-step-badge">${item.step}</span>
        <h4>${item.title}</h4>
      </div>
      <div class="rule-body">
        <strong>判断准则：</strong>${item.rule}
      </div>
      <div class="rule-trap">
        <strong>[常见陷阱] </strong>${item.trap}
      </div>
    `;
    elements.decisionRulesGrid.appendChild(card);
  });

  // 10 大陷阱
  elements.trapsGrid.innerHTML = "";
  highFrequencyTraps.forEach((trap) => {
    const card = document.createElement("div");
    card.className = "trap-card";
    card.innerHTML = `
      <div class="trap-title">
        <span>[无结果]</span>
        <span>${trap.trap}</span>
      </div>
      <p class="trap-reason"><strong>为什么错 / 正确做法：</strong>${trap.reason}</p>
    `;
    elements.trapsGrid.appendChild(card);
  });

  // 6 个官方场景
  elements.scenariosGrid.innerHTML = "";
  officialScenarios.forEach((sc) => {
    const card = document.createElement("div");
    card.className = "scenario-card";
    const taskPills = sc.keyTasks.map((t) => `<span class="scenario-task-pill">${t}</span>`).join("");
    card.innerHTML = `
      <div class="scenario-top">
        <span class="scenario-id-tag">场景 ${sc.id}</span>
      </div>
      <h4>${sc.nameZh}</h4>
      <div class="scenario-en-title">${sc.title}</div>
      <p class="scenario-focus">${sc.focus}</p>
      <div class="scenario-tasks-tags">${taskPills}</div>
    `;
    elements.scenariosGrid.appendChild(card);
  });
}

// 5. 渲染 Mock 成绩与错题本
function renderMockAndMistakes() {
  // Mock 历史
  elements.mockHistoryList.innerHTML = "";
  if (state.mocks.length === 0) {
    elements.mockHistoryList.innerHTML = `
      <div class="empty-state">
        <span>[暂无记录]</span>
        <p>暂无 Mock 记录。建议按 60 题 / 120 分钟进行全真计时模拟，在此记录分数以评估就绪度。</p>
      </div>
    `;
  } else {
    state.mocks.forEach((m) => {
      const isPass = m.correct / 60 >= 0.72;
      const isQualified = m.correct / 60 >= 0.8;
      const item = document.createElement("div");
      item.className = "mock-history-item";
      item.innerHTML = `
        <div class="mock-stat-left">
          <div class="mock-score-circle ${isQualified ? "pass" : ""}">
            ${m.correct}
          </div>
          <div class="mock-details">
            <strong>${m.date} · ${m.source || "计时模拟"} (${Math.round((m.correct / 60) * 100)}%)</strong>
            <span>耗时 ${m.minutes} 分钟 · 最弱：${m.weakestDomain} ${m.notes ? "· " + escapeHtml(m.notes) : ""}</span>
          </div>
        </div>
        <button type="button" class="btn-delete-item" data-delete-mock="${m.id}" title="删除记录">删除</button>
      `;
      elements.mockHistoryList.appendChild(item);
    });
  }

  // 错因筛选胶囊
  elements.errorCatFilterContainer.innerHTML = "";
  const allPill = document.createElement("button");
  allPill.className = `cat-pill ${state.activeErrorCat === "all" ? "active" : ""}`;
  allPill.textContent = `全部 (${state.mistakes.length})`;
  allPill.dataset.cat = "all";
  elements.errorCatFilterContainer.appendChild(allPill);

  errorCategories.forEach((cat) => {
    const count = state.mistakes.filter((m) => m.errorCategory === cat.code).length;
    const pill = document.createElement("button");
    pill.className = `cat-pill ${state.activeErrorCat === cat.code ? "active" : ""}`;
    pill.textContent = `${cat.name.split(" ")[0]} (${count})`;
    pill.dataset.cat = cat.code;
    elements.errorCatFilterContainer.appendChild(pill);
  });

  // 错题列表
  elements.mistakesListContainer.innerHTML = "";
  const filteredMistakes = state.mistakes.filter((m) => {
    if (state.activeErrorCat === "all") return true;
    return m.errorCategory === state.activeErrorCat;
  });

  if (filteredMistakes.length === 0) {
    elements.mistakesListContainer.innerHTML = `
      <div class="empty-state">
        <span>[暂无记录]</span>
        <p>当前分类下暂无错题。在平时的场景练习或 Mock 模拟中遇到错误，点击上方「+ 添加一道错题」记录复盘！</p>
      </div>
    `;
    return;
  }

  filteredMistakes.forEach((m) => {
    const catObj = errorCategories.find((c) => c.code === m.errorCategory);
    const card = document.createElement("div");
    card.className = "mistake-card";
    card.innerHTML = `
      <div class="mistake-card-header">
        <div class="mistake-tag-row">
          <span class="tag-qno">${escapeHtml(m.questionNo || "错题")}</span>
          <span class="tag-cat">${catObj ? catObj.name : m.errorCategory}</span>
          ${m.taskCode ? `<span class="tag-qno">${m.taskCode}</span>` : ""}
        </div>
        <button type="button" class="btn-delete-item" data-delete-mistake="${m.id}" title="删除此题">删除</button>
      </div>
      <div class="mistake-stem">${escapeHtml(m.stem)}</div>
      <div class="mistake-answers-diff">
        <div class="ans-wrong">[错误选项] ${escapeHtml(m.myAnswer)}</div>
        <div class="ans-right">[正确选项] ${escapeHtml(m.correctAnswer)}</div>
      </div>
      ${m.reflection ? `<div class="mistake-reflection"><strong>[复盘总结] </strong>${escapeHtml(m.reflection)}</div>` : ""}
    `;
    elements.mistakesListContainer.appendChild(card);
  });
}

// 6. 渲染考前清单与资源
function renderResourcesAndChecklist() {
  // 考前 10 项清单
  elements.preExamChecklistContainer.innerHTML = "";
  let checkedCount = 0;
  preExamChecklist.forEach((item) => {
    const isChecked = Boolean(state.checklist[item.id]);
    if (isChecked) checkedCount++;
    const row = document.createElement("label");
    row.className = `checklist-row ${isChecked ? "checked" : ""}`;
    row.innerHTML = `
      <input type="checkbox" data-checklist-id="${item.id}" ${isChecked ? "checked" : ""} />
      <span>${item.text}</span>
    `;
    elements.preExamChecklistContainer.appendChild(row);
  });
  elements.checklistScorePill.textContent = `已确认 ${checkedCount} / ${preExamChecklist.length}`;

  // 版本分歧对照表
  elements.divergenceTableBody.innerHTML = "";
  versionDivergence.forEach((v) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${v.topic}</strong></td>
      <td><code>${v.examGuide}</code></td>
      <td><code>${v.currentDocs}</code></td>
      <td>${v.strategy}</td>
    `;
    elements.divergenceTableBody.appendChild(tr);
  });

  // 明确不考列表
  elements.outOfScopeListContainer.innerHTML = "";
  outOfScopeList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elements.outOfScopeListContainer.appendChild(li);
  });

  // 资源链接
  elements.officialResourcesContainer.innerHTML = "";
  studyResources.official.forEach((r) => {
    const a = document.createElement("a");
    a.className = "resource-link-item";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `
      <strong>${r.name} ↗</strong>
      <span>${r.desc}</span>
    `;
    elements.officialResourcesContainer.appendChild(a);
  });

  elements.communityResourcesContainer.innerHTML = "";
  studyResources.community.forEach((r) => {
    const a = document.createElement("a");
    a.className = "resource-link-item";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `
      <strong>${r.name} ↗</strong>
      <span>${r.desc}</span>
    `;
    elements.communityResourcesContainer.appendChild(a);
  });
}

// 刷新整个视图
function renderAll() {
  // 更新计划按钮状态
  elements.planBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.plan === state.plan);
  });

  renderHero();
  renderDailyPlan();
  renderBlueprint();
  renderDecisionLens();
  renderMockAndMistakes();
  renderResourcesAndChecklist();
}

// ================= 事件绑定与交互 =================

// 计划切换 (7天 vs 14天)
elements.planBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.plan = btn.dataset.plan;
    saveState();
    renderAll();
    showToast(`已切换为 ${state.plan} 天学习计划`, "[PLAN]");
  });
});

// 标签页切换
elements.tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.dataset.tab;
    elements.tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
    elements.tabPanels.forEach((p) => p.classList.toggle("active", p.id === `tab-${tabId}`));
  });
});

// 每日任务打卡勾选
elements.dailyCardsContainer.addEventListener("change", (e) => {
  const checkbox = e.target.closest("[data-day-index]");
  if (!checkbox) return;
  const idx = checkbox.dataset.dayIndex;
  state.days[state.plan][idx] = checkbox.checked;

  if (checkbox.checked) {
    // 自动添加打卡记录
    const today = todayString();
    if (!state.checkins.some((c) => c.date === today && c.planDay === Number(idx) + 1)) {
      state.checkins.unshift({
        id: String(Date.now()),
        date: today,
        minutes: studyPlans[state.plan][idx]?.minutes || 120,
        planDay: Number(idx) + 1,
        note: `完成 Day ${Number(idx) + 1}：${studyPlans[state.plan][idx]?.title}`,
      });
    }
    playChime(true);
    showToast(`Day ${Number(idx) + 1} 打卡成功！连续学习 ${calculateStreak()} 天`, "[打卡]");
  }

  saveState();
  renderAll();
});

// 点击卡片上的“写今日打卡心得”
elements.dailyCardsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-log-day]");
  if (!btn) return;
  const dayNum = Number(btn.dataset.logDay);
  openCheckinModal(dayNum);
});

// 今日行动一键打卡
elements.todayCheckinBtn.addEventListener("click", () => {
  const nextIdx = getNextUnfinishedDayIndex();
  if (nextIdx === -1) {
    showToast("当前计划所有天数均已打卡完成！", "[达成]");
    return;
  }
  openCheckinModal(nextIdx + 1);
});

// 打开打卡弹窗
function openCheckinModal(defaultDay = 1) {
  elements.checkinDate.value = todayString();
  elements.checkinDuration.value = String(studyPlans[state.plan][defaultDay - 1]?.minutes || 120);

  // 填充下拉选项
  elements.checkinDayIndex.innerHTML = "";
  studyPlans[state.plan].forEach((d, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = `Day ${idx + 1} · ${d.title}`;
    if (idx + 1 === defaultDay) opt.selected = true;
    elements.checkinDayIndex.appendChild(opt);
  });

  elements.checkinNote.value = "";
  elements.checkinModalOverlay.hidden = false;
}

elements.closeCheckinModalBtn.addEventListener("click", () => {
  elements.checkinModalOverlay.hidden = true;
});
elements.cancelCheckinModalBtn.addEventListener("click", () => {
  elements.checkinModalOverlay.hidden = true;
});
elements.addNewCheckinNoteBtn.addEventListener("click", () => {
  openCheckinModal(1);
});

// 提交打卡表单
elements.checkinModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateVal = elements.checkinDate.value;
  const durationVal = Number(elements.checkinDuration.value) || 120;
  const dayIdx = Number(elements.checkinDayIndex.value);
  const noteVal = elements.checkinNote.value.trim();

  // 标记该天计划完成
  state.days[state.plan][dayIdx] = true;

  // 写入打卡记录
  state.checkins.unshift({
    id: String(Date.now()),
    date: dateVal,
    minutes: durationVal,
    planDay: dayIdx + 1,
    note: noteVal,
  });

  saveState();
  elements.checkinModalOverlay.hidden = true;
  playChime(true);
  showToast(`已成功记录打卡！连续学习 ${calculateStreak()} 天`, "[打卡]");
  renderAll();
});

// 考点阶段变更
elements.domainsAccordionContainer.addEventListener("change", (e) => {
  const sel = e.target.closest("[data-topic-code]");
  if (!sel) return;
  const code = sel.dataset.topicCode;
  const stage = Number(sel.value);
  state.topics[code] = stage;
  saveState();
  renderHero(); // 快速更新环状图与统计

  // 更新卡片自身外框
  const domain = domains.find((d) => d.topics.some((t) => t.code === code));
  if (domain) {
    let domainPoints = 0;
    domain.topics.forEach((t) => {
      domainPoints += (state.topics[t.code] || 0) / 3;
    });
    const domPercent = Math.round((domainPoints / domain.topics.length) * 100);
    const card = sel.closest(".domain-accordion-card");
    if (card) {
      const fill = card.querySelector(".domain-bar-fill");
      if (fill) fill.style.width = `${domPercent}%`;
    }
  }
});

// 手风琴折叠展开
elements.domainsAccordionContainer.addEventListener("click", (e) => {
  const header = e.target.closest("[data-domain-toggle]");
  if (!header) return;
  const card = header.closest(".domain-accordion-card");
  if (card) {
    card.classList.toggle("is-open");
  }
});

// 考点搜索与过滤
elements.topicSearchInput.addEventListener("input", (e) => {
  state.searchKeyword = e.target.value;
  renderBlueprint();
});

elements.stageFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    elements.stageFilterBtns.forEach((b) => b.classList.toggle("active", b === btn));
    state.activeStageFilter = btn.dataset.filterStage;
    renderBlueprint();
  });
});

// 复制 AI 刷题 Prompt
elements.copyAiPromptBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(aiCoachPrompt);
    playChime(true);
    showToast("已成功复制 AI 刷题教练 Prompt！可粘贴至 Claude 对话开始练习", "[PROMPT]");
  } catch (err) {
    // 降级方案
    const ta = document.createElement("textarea");
    ta.value = aiCoachPrompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("已成功复制 AI 刷题教练 Prompt！", "[PROMPT]");
  }
});

// 提交 Mock 记录
elements.mockEntryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correctVal = Number(elements.mockCorrect.value);
  const minutesVal = Number(elements.mockMinutes.value);
  const dateVal = elements.mockDate.value || todayString();
  const weakestVal = elements.mockWeakest.value;
  const sourceVal = elements.mockSource.value.trim();
  const notesVal = elements.mockNotes.value.trim();

  state.mocks.unshift({
    id: String(Date.now()),
    date: dateVal,
    correct: correctVal,
    minutes: minutesVal,
    weakestDomain: weakestVal,
    source: sourceVal,
    notes: notesVal,
  });

  saveState();
  elements.mockEntryForm.reset();
  elements.mockDate.value = todayString();
  playChime(true);
  showToast("Mock 记录已保存！已实时重算就绪度状态", "[MOCK]");
  renderHero();
  renderMockAndMistakes();
});

// 删除 Mock 记录
elements.mockHistoryList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delete-mock]");
  if (!btn) return;
  const id = btn.dataset.deleteMock;
  if (!confirm("确定删除这条 Mock 记录吗？")) return;
  state.mocks = state.mocks.filter((m) => m.id !== id);
  saveState();
  renderHero();
  renderMockAndMistakes();
});

// 错因筛选
elements.errorCatFilterContainer.addEventListener("click", (e) => {
  const pill = e.target.closest("[data-cat]");
  if (!pill) return;
  state.activeErrorCat = pill.dataset.cat;
  renderMockAndMistakes();
});

// 打开添加错题弹窗
elements.openAddMistakeModalBtn.addEventListener("click", () => {
  // 填充 Domain 考点选项
  elements.mistakeDomain.innerHTML = "";
  domains.forEach((dom) => {
    dom.topics.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = `${dom.code} - ${t.code}`;
      opt.textContent = `${t.code} ${t.title} (${dom.code})`;
      elements.mistakeDomain.appendChild(opt);
    });
  });

  // 填充 9 大错因选项
  elements.mistakeErrorCategory.innerHTML = "";
  errorCategories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.code;
    opt.textContent = `${cat.name} - ${cat.desc}`;
    elements.mistakeErrorCategory.appendChild(opt);
  });

  elements.mistakeModalForm.reset();
  elements.mistakeModalOverlay.hidden = false;
});

elements.closeMistakeModalBtn.addEventListener("click", () => {
  elements.mistakeModalOverlay.hidden = true;
});
elements.cancelMistakeModalBtn.addEventListener("click", () => {
  elements.mistakeModalOverlay.hidden = true;
});

// 提交错题表单
elements.mistakeModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskCode = elements.mistakeDomain.value;
  state.mistakes.unshift({
    id: String(Date.now()),
    questionNo: elements.mistakeQuestionNo.value.trim(),
    domain: taskCode.split(" - ")[0],
    taskCode: taskCode,
    stem: elements.mistakeStem.value.trim(),
    myAnswer: elements.mistakeMyAnswer.value.trim(),
    correctAnswer: elements.mistakeCorrectAnswer.value.trim(),
    errorCategory: elements.mistakeErrorCategory.value,
    reviewRef: elements.mistakeReviewRef.value.trim(),
    reflection: elements.mistakeReflection.value.trim(),
  });

  saveState();
  elements.mistakeModalOverlay.hidden = true;
  playChime(true);
  showToast("错题已存入笔记本，常复习错因方能真正攻破！", "[错题]");
  renderMockAndMistakes();
});

// 删除错题
elements.mistakesListContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delete-mistake]");
  if (!btn) return;
  const id = btn.dataset.deleteMistake;
  if (!confirm("确定删除这道错题记录吗？")) return;
  state.mistakes = state.mistakes.filter((m) => m.id !== id);
  saveState();
  renderMockAndMistakes();
});

// 考前 10 项确认清单勾选
elements.preExamChecklistContainer.addEventListener("change", (e) => {
  const checkbox = e.target.closest("[data-checklist-id]");
  if (!checkbox) return;
  const id = checkbox.dataset.checklistId;
  state.checklist[id] = checkbox.checked;
  saveState();

  const checkedCount = Object.values(state.checklist).filter(Boolean).length;
  elements.checklistScorePill.textContent = `已确认 ${checkedCount} / ${preExamChecklist.length}`;
  checkbox.closest(".checklist-row")?.classList.toggle("checked", checkbox.checked);
});

// 设置目标考期
elements.setExamDateBtn.addEventListener("click", () => {
  const current = state.examDate || todayString();
  const input = prompt("请输入您的目标考试日期 (格式 YYYY-MM-DD)：", current);
  if (input !== null) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
      state.examDate = input.trim();
      saveState();
      renderHero();
      showToast(`已更新目标考期为 ${state.examDate}`, "[考期]");
    } else if (input.trim() === "") {
      state.examDate = "";
      saveState();
      renderHero();
    } else {
      alert("日期格式不正确，请输入类似 2026-10-15 的格式。");
    }
  }
});

// 导出进度 JSON
elements.exportBtn.addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = `ccar-f-study-progress-${todayString()}.json`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("进度文件已成功导出至下载文件夹！", "[导出]");
});

// 导入进度 JSON
elements.importBtn.addEventListener("click", () => {
  elements.importFileInput.click();
});

elements.importFileInput.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (typeof imported !== "object") throw new Error("Format error");
      state = {
        ...defaultState,
        ...imported,
        days: {
          7: { ...defaultState.days[7], ...(imported.days?.[7] || {}) },
          14: { ...defaultState.days[14], ...(imported.days?.[14] || {}) },
        },
        topics: { ...defaultState.topics, ...(imported.topics || {}) },
        checklist: { ...defaultState.checklist, ...(imported.checklist || {}) },
      };
      saveState();
      renderAll();
      showToast("学习进度与打卡数据已成功恢复！", "[导入]");
    } catch (err) {
      alert("无法解析该备份文件，请确认它是正确的 JSON 备份。");
    } finally {
      elements.importFileInput.value = "";
    }
  };
  reader.readAsText(file);
});

// 重置全部数据
elements.resetBtn.addEventListener("click", () => {
  if (confirm("确定要重置全部学习打卡、30 项考点掌握度、Mock 与错题本数据吗？建议重置前先点击「导出」备份！")) {
    state = structuredClone(defaultState);
    saveState();
    renderAll();
    showToast("所有备考数据已恢复初始状态", "[重置]");
  }
});

// ================= 专注番茄钟引擎 =================
let pomodoroTimer = null;
let pomodoroTotalSecs = 25 * 60;
let pomodoroRemainingSecs = 25 * 60;
let pomodoroRunning = false;

function updatePomodoroDisplay() {
  const m = Math.floor(pomodoroRemainingSecs / 60);
  const s = pomodoroRemainingSecs % 60;
  elements.pomodoroClockDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startPomodoro() {
  if (pomodoroRunning) return;
  pomodoroRunning = true;
  elements.pomodoroStartBtn.disabled = true;
  elements.pomodoroPauseBtn.disabled = false;
  elements.pomodoroStateText.textContent = "正在深度专注中，远离干扰...";

  pomodoroTimer = setInterval(() => {
    if (pomodoroRemainingSecs > 0) {
      pomodoroRemainingSecs--;
      updatePomodoroDisplay();
    } else {
      // 倒计时结束
      clearInterval(pomodoroTimer);
      pomodoroRunning = false;
      elements.pomodoroStartBtn.disabled = false;
      elements.pomodoroPauseBtn.disabled = true;
      elements.pomodoroStateText.textContent = "太棒了！本次专注已达成！";
      playChime(true);

      const focusMinutes = Math.round(pomodoroTotalSecs / 60);
      showToast(`恭喜完成 ${focusMinutes} 分钟专注学习！`, "[专注]");

      // 询问是否记录为打卡
      setTimeout(() => {
        if (confirm(`本次专注用时 ${focusMinutes} 分钟，是否直接记入今日打卡记录？`)) {
          elements.pomodoroOverlay.hidden = true;
          const nextIdx = getNextUnfinishedDayIndex();
          openCheckinModal(nextIdx !== -1 ? nextIdx + 1 : 1);
          elements.checkinDuration.value = String(focusMinutes);
        }
      }, 300);
    }
  }, 1000);
}

function pausePomodoro() {
  if (!pomodoroRunning) return;
  clearInterval(pomodoroTimer);
  pomodoroRunning = false;
  elements.pomodoroStartBtn.disabled = false;
  elements.pomodoroPauseBtn.disabled = true;
  elements.pomodoroStateText.textContent = "专注已暂停";
}

function resetPomodoro() {
  clearInterval(pomodoroTimer);
  pomodoroRunning = false;
  pomodoroRemainingSecs = pomodoroTotalSecs;
  elements.pomodoroStartBtn.disabled = false;
  elements.pomodoroPauseBtn.disabled = true;
  elements.pomodoroStateText.textContent = "准备就绪，保持专注";
  updatePomodoroDisplay();
}

elements.openPomodoroBtn.addEventListener("click", () => {
  elements.pomodoroOverlay.hidden = false;
});
elements.todayStudyFocusBtn.addEventListener("click", () => {
  elements.pomodoroOverlay.hidden = false;
  resetPomodoro();
  startPomodoro();
});
elements.closePomodoroModalBtn.addEventListener("click", () => {
  elements.pomodoroOverlay.hidden = true;
});

elements.pomodoroPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    elements.pomodoroPresetBtns.forEach((b) => b.classList.toggle("active", b === btn));
    const mins = Number(btn.dataset.mins);
    pomodoroTotalSecs = mins * 60;
    resetPomodoro();
  });
});

elements.pomodoroStartBtn.addEventListener("click", startPomodoro);
elements.pomodoroPauseBtn.addEventListener("click", pausePomodoro);
elements.pomodoroResetBtn.addEventListener("click", resetPomodoro);

// ================= 主题色彩引擎 =================
function applyTheme(themeName) {
  state.theme = themeName || "sakura";
  document.body.className = document.body.className
    .replace(/\btheme-\S+/g, "")
    .trim();
  document.body.classList.add(`theme-${state.theme}`);
  if (elements.themeSelector) {
    elements.themeSelector.value = state.theme;
  }
}

if (elements.themeSelector) {
  elements.themeSelector.addEventListener("change", (e) => {
    applyTheme(e.target.value);
    saveState();
    const selText = elements.themeSelector.options[elements.themeSelector.selectedIndex]?.text || "";
    showToast(`主题已切换为：${selText}`, "[主题]");
  });
}

// ================= 初始化启动 =================
function init() {
  applyTheme(state.theme || "block-frame");
  elements.mockDate.value = todayString();
  renderAll();
}

init();

