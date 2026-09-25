/**
 * CCAR-F (Claude Certified Architect - Foundations)
 * 交互式学习看板 & 每日打卡核心引擎
 */

// ================= 全局状态与本地持久化 =================
const STORAGE_KEY = "cca-study-companion-v2";
const LEGACY_STORAGE_KEY = "cca-learning-panel-v1";
const DAY_MS = 86400000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const defaultState = {
  lang: "zh", // "zh" 或 "en"
  plan: "14", // "7" 或 "14"
  days: {
    7: {},
    14: {},
  },
  topics: {}, // code -> stage (0: 未开始, 1: 理解, 2: 练习, 3: 验证)
  checkins: [], // [{ id, date: "YYYY-MM-DD", minutes: 120, plan: "14", planDay: 1, note: "...", auto: false }]
  mocks: [], // [{ id, date, correct, minutes, weakestDomain, source, notes }]
  mistakes: [], // [{ id, questionNo, domain, taskCode, stem, myAnswer, correctAnswer, errorCategory, reviewRef, reflection }]
  checklist: {}, // { c1: true, c2: false... }
  examDate: "", // 目标考试日期 YYYY-MM-DD
};

// 仅在当前页面会话中有效的界面状态（不持久化，避免刷新后出现"隐形"搜索词）
const ui = {
  activeErrorCat: "all",
  activeStageFilter: "all",
  searchKeyword: "",
};

// ---- 数据清洗：localStorage 与导入的 JSON 都必须经过这里 ----
const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const asString = (v, fallback = "") => (typeof v === "string" ? v : typeof v === "number" ? String(v) : fallback);
const asDate = (v, fallback = "") => (typeof v === "string" && DATE_RE.test(v) ? v : fallback);

function asNumber(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function asBoolMap(v) {
  if (!isPlainObject(v)) return {};
  return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, Boolean(val)]));
}

function asList(v, mapItem) {
  if (!Array.isArray(v)) return [];
  return v.filter(isPlainObject).map(mapItem).filter(Boolean);
}

function sanitizeState(raw) {
  const src = isPlainObject(raw) ? raw : {};
  const days = isPlainObject(src.days) ? src.days : {};
  const topics = isPlainObject(src.topics) ? src.topics : {};
  let idSeq = 0;
  const makeId = (v) => asString(v) || `${Date.now()}-${idSeq++}`;

  return {
    lang: src.lang === "en" ? "en" : "zh",
    plan: String(src.plan) === "7" ? "7" : "14",
    days: {
      7: asBoolMap(days[7]),
      14: asBoolMap(days[14]),
    },
    topics: Object.fromEntries(Object.entries(topics).map(([k, v]) => [k, asNumber(v, 0, 3, 0)])),
    checkins: asList(src.checkins, (c) => {
      const date = asDate(c.date);
      if (!date) return null;
      return {
        id: makeId(c.id),
        date,
        minutes: asNumber(c.minutes, 1, 1440, 120),
        plan: c.plan === undefined ? undefined : String(c.plan) === "7" ? "7" : "14",
        planDay: asNumber(c.planDay, 1, 14, 1),
        note: asString(c.note),
        auto: Boolean(c.auto),
      };
    }),
    mocks: asList(src.mocks, (m) => ({
      id: makeId(m.id),
      date: asDate(m.date, todayString()),
      correct: asNumber(m.correct, 0, 60, 0),
      minutes: asNumber(m.minutes, 0, 600, 0),
      weakestDomain: asString(m.weakestDomain),
      source: asString(m.source),
      notes: asString(m.notes),
    })),
    mistakes: asList(src.mistakes, (m) => ({
      id: makeId(m.id),
      questionNo: asString(m.questionNo),
      domain: asString(m.domain),
      taskCode: asString(m.taskCode),
      stem: asString(m.stem),
      myAnswer: asString(m.myAnswer),
      correctAnswer: asString(m.correctAnswer),
      errorCategory: asString(m.errorCategory),
      reviewRef: asString(m.reviewRef),
      reflection: asString(m.reflection),
    })),
    checklist: asBoolMap(src.checklist),
    examDate: asDate(src.examDate),
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return sanitizeState(JSON.parse(saved));

    // 尝试从 v1 迁移旧数据
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsedLegacy = JSON.parse(legacy);
      return sanitizeState({
        plan: parsedLegacy.plan,
        days: parsedLegacy.days,
        topics: Object.fromEntries(
          Object.entries(parsedLegacy.topics || {}).map(([k, v]) => [k, v ? 1 : 0]),
        ),
      });
    }
  } catch (err) {
    console.error("加载状态异常，恢复默认:", err);
  }
  return structuredClone(defaultState);
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("保存状态异常:", err);
  }
}

// ================= 国际化与双语切换 (i18n) =================
function t(key, vars) {
  const dict = (typeof I18N !== "undefined" && I18N[state.lang]) || {};
  let text = dict[key] ?? I18N?.zh?.[key] ?? key;
  if (vars) {
    text = text.replace(/\{(\w+)\}/g, (m, name) => (vars[name] !== undefined ? String(vars[name]) : m));
  }
  return text;
}

// 从数据对象中取当前语言的字段（xxx_en 缺失时回退中文）
function pick(obj, field) {
  return state.lang === "en" ? (obj[`${field}_en`] ?? obj[field]) : obj[field];
}

function updateUILanguage() {
  const isEn = state.lang === "en";
  document.documentElement.lang = isEn ? "en" : "zh-CN";

  elements.langBtnZh?.classList.toggle("active", !isEn);
  elements.langBtnEn?.classList.toggle("active", isEn);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPh));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  renderPomodoroState();
}

function setLanguage(newLang) {
  if (state.lang === newLang) return;
  state.lang = newLang;
  saveState();
  updateUILanguage();
  renderAll();
  showToast(t("toast_switched_lang"), "[LANG]");
}

// ================= 工具函数 =================
// 统一使用本地日期，避免 toISOString() 在 UTC+8 等时区早上把日期算成前一天
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDateStr(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function todayString() {
  return toDateStr(new Date());
}

function daysBetween(fromStr, toStr) {
  return Math.round((parseDateStr(toStr) - parseDateStr(fromStr)) / DAY_MS);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function domainProgress(dom) {
  if (dom.topics.length === 0) return 0;
  const points = dom.topics.reduce((sum, topic) => sum + (state.topics[topic.code] || 0) / 3, 0);
  return points / dom.topics.length; // 0 ~ 1
}

function calculateWeightedMastery() {
  const totalScore = domains.reduce((sum, dom) => sum + domainProgress(dom) * dom.weight, 0);
  return Math.min(100, Math.round(totalScore));
}

function calculateStreak() {
  const uniqueDates = [...new Set(state.checkins.map((c) => c.date))].sort().reverse();
  if (uniqueDates.length === 0) return 0;

  // 如果最近一次打卡既不是今天也不是昨天，连胜断开
  if (daysBetween(uniqueDates[0], todayString()) > 1) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    if (daysBetween(uniqueDates[i], uniqueDates[i - 1]) !== 1) break;
    streak++;
  }
  return streak;
}

function getNextUnfinishedDayIndex() {
  const planList = studyPlans[state.plan];
  return planList.findIndex((_, idx) => !state.days[state.plan]?.[idx]);
}

// 旧版本记录没有 plan 字段，视为属于当前计划
function checkinBelongsTo(c, plan, planDay) {
  return (c.plan === undefined || c.plan === plan) && c.planDay === planDay;
}

function findCheckin(plan, planDay, date) {
  return state.checkins.find((c) => checkinBelongsTo(c, plan, planDay) && c.date === date);
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function showToast(message, icon = "[OK]") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-message";
  const iconEl = document.createElement("span");
  iconEl.textContent = icon;
  const msgEl = document.createElement("span");
  msgEl.textContent = message;
  toast.append(iconEl, msgEl);
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// 简易 Web Audio 提示音（番茄钟结束、打卡成功）
// 复用同一个 AudioContext：浏览器对同时存在的实例数量有上限
let audioCtx = null;

function playChime(success = true) {
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const ctx = audioCtx;
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
  calendarWeekdayHeader: document.getElementById("calendarWeekdayHeader"),
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
  langBtnZh: document.getElementById("langBtnZh"),
  langBtnEn: document.getElementById("langBtnEn"),
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

  // 考期弹窗
  examDateModalOverlay: document.getElementById("examDateModalOverlay"),
  closeExamDateModalBtn: document.getElementById("closeExamDateModalBtn"),
  clearExamDateBtn: document.getElementById("clearExamDateBtn"),
  examDateModalForm: document.getElementById("examDateModalForm"),
  examDateInput: document.getElementById("examDateInput"),

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

// ================= 弹窗通用逻辑（Esc / 点击遮罩关闭、焦点管理） =================
const modalOverlays = [
  elements.checkinModalOverlay,
  elements.mistakeModalOverlay,
  elements.examDateModalOverlay,
  elements.pomodoroOverlay,
];
let lastFocusedBeforeModal = null;

function openModal(overlay, focusTarget) {
  if (overlay.hidden) lastFocusedBeforeModal = document.activeElement;
  overlay.hidden = false;
  const target = focusTarget || overlay.querySelector("input, select, textarea, button");
  target?.focus();
}

function closeModal(overlay) {
  if (overlay.hidden) return;
  overlay.hidden = true;
  if (lastFocusedBeforeModal && document.contains(lastFocusedBeforeModal)) {
    lastFocusedBeforeModal.focus();
  }
  lastFocusedBeforeModal = null;
}

modalOverlays.forEach((overlay) => {
  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = modalOverlays.find((o) => !o.hidden);
  if (open) closeModal(open);
});

// ================= 模块渲染逻辑 =================

// 1. 渲染 Hero 与顶部概览
function renderHero() {
  const mastery = calculateWeightedMastery();
  elements.masteryPercent.textContent = `${mastery}%`;
  elements.masteryRing.style.setProperty("--mastery-deg", `${mastery * 3.6}deg`);

  const planList = studyPlans[state.plan];
  const nextIdx = getNextUnfinishedDayIndex();
  const daysDoneCount = planList.filter((_, idx) => state.days[state.plan]?.[idx]).length;

  // 今日行动：始终展示第一个尚未完成的计划日
  if (nextIdx === -1) {
    elements.todayDayBadge.textContent = t("today_finished_badge");
    elements.todayStatusBadge.textContent = t("today_finished_status");
    elements.todayStatusBadge.className = "badge-status checked";
    elements.todayEstimateTime.textContent = "0";
    elements.todayTitle.textContent = t("today_finished_title", { n: state.plan });
    elements.todayObjective.textContent = t("today_finished_obj");
    elements.todayOutput.textContent = t("today_finished_out");
    elements.todayCheckinBtn.innerHTML = `<span class="checkin-icon">[Done]</span><span>${escapeHtml(t("today_finished_btn"))}</span>`;
    elements.todayCheckinBtn.className = "btn-checkin is-done";
  } else {
    const todayTask = planList[nextIdx];
    elements.todayDayBadge.textContent = `Day ${nextIdx + 1}`;
    elements.todayStatusBadge.textContent = t("today_pending");
    elements.todayStatusBadge.className = "badge-status";
    elements.todayEstimateTime.textContent = String(todayTask.minutes);
    elements.todayTitle.textContent = pick(todayTask, "title");
    elements.todayObjective.textContent = pick(todayTask, "objective");
    elements.todayOutput.textContent = pick(todayTask, "output");
    elements.todayCheckinBtn.innerHTML = `<span class="checkin-icon">[OK]</span><span>${escapeHtml(t("checkin_label"))}</span>`;
    elements.todayCheckinBtn.className = "btn-checkin";
  }

  // 统计指标
  const streak = calculateStreak();
  elements.streakDays.innerHTML = `${streak} <small>${escapeHtml(t("days_unit"))}</small>`;
  elements.sideStreakCount.textContent = String(streak);
  elements.totalCheckins.textContent = String(state.checkins.length);

  elements.planDaysDone.innerHTML = `${daysDoneCount} <small id="planDaysTotal">/ ${planList.length}</small>`;
  const planPct = Math.round((daysDoneCount / planList.length) * 100);
  elements.planPercentText.textContent = `${t("stat_completion_rate")} ${planPct}%`;

  const totalTopics = domains.reduce((sum, d) => sum + d.topics.length, 0);
  const verifiedCount = Object.values(state.topics).filter((s) => s === 3).length;
  const coveredCount = Object.values(state.topics).filter((s) => s >= 1).length;
  elements.verifiedTopicsCount.innerHTML = `${verifiedCount} <small>/ ${totalTopics}</small>`;
  elements.coveredTopicsText.textContent = `${t("stat_covered")} ${coveredCount}/${totalTopics}`;

  // Mock 就绪度评估
  const qualifiedMocks = state.mocks.filter((m) => m.correct / 60 >= 0.8).length;
  const isReady = qualifiedMocks >= 2;
  elements.readinessStatusText.textContent = isReady
    ? t("readiness_ready")
    : t("readiness_progress", { n: qualifiedMocks });
  elements.readinessIndicator.className = `readiness-indicator ${isReady ? "is-ready" : ""}`;
  elements.mockReadinessText.textContent = isReady ? t("readiness_ready_short") : `${qualifiedMocks} / 2`;

  if (state.mocks.length > 0) {
    const latest = state.mocks[0];
    elements.latestMockText.textContent = t("latest_mock", { c: latest.correct, m: latest.minutes });
  } else {
    elements.latestMockText.textContent = t("stat_mock_no_record");
  }

  // 目标考期倒计时
  if (state.examDate) {
    const diff = daysBetween(todayString(), state.examDate);
    if (diff > 0) {
      elements.countdownLabel.textContent = t("countdown_days", { n: diff, d: state.examDate });
    } else if (diff === 0) {
      elements.countdownLabel.textContent = t("countdown_today");
    } else {
      elements.countdownLabel.textContent = t("countdown_passed", { d: state.examDate });
    }
  } else {
    elements.countdownLabel.textContent = t("exam_countdown_unset");
  }
}

// 2. 渲染每日学习计划卡片流与日历
function renderDailyPlan() {
  const planList = studyPlans[state.plan];
  elements.planStreamHeading.textContent = t(`plan_heading_${state.plan}`);

  const doneCount = planList.filter((_, idx) => state.days[state.plan]?.[idx]).length;
  elements.planProgressPill.textContent = t("plan_progress_pill", { done: doneCount, total: planList.length });

  elements.dailyCardsContainer.innerHTML = "";

  planList.forEach((item, index) => {
    const isCompleted = Boolean(state.days[state.plan]?.[index]);
    const card = document.createElement("article");
    card.className = `daily-card ${isCompleted ? "is-completed" : ""}`;

    const tasksHtml = pick(item, "tasks").map((task) => `<li>${task}</li>`).join("");

    card.innerHTML = `
      <div class="daily-card-top">
        <div class="daily-day-label">
          <span class="day-badge-num">Day ${index + 1}</span>
          <h4 class="daily-card-title">${pick(item, "title")}</h4>
        </div>
        <span class="daily-time-tag">${escapeHtml(t("suggest_minutes", { n: item.minutes }))}</span>
      </div>
      <p class="daily-card-objective">${pick(item, "objective")}</p>
      <ul class="daily-task-items">${tasksHtml}</ul>
      <div class="daily-card-deliverable">
        <strong>${escapeHtml(t("deliverable_tag"))}</strong>
        <span>${pick(item, "output")}</span>
      </div>
      <div class="daily-card-footer">
        <label class="daily-checkbox-label">
          <input type="checkbox" data-day-index="${index}" ${isCompleted ? "checked" : ""} />
          <span>${escapeHtml(isCompleted ? t("already_completed") : t("mark_completed"))}</span>
        </label>
        <button type="button" class="btn-card-log" data-log-day="${index + 1}">${escapeHtml(t("btn_write_reflection"))}</button>
      </div>
    `;
    elements.dailyCardsContainer.appendChild(card);
  });

  renderCalendar();
  renderCheckinNotes();
}

// 渲染打卡日历（生成当月日期）
function renderCalendar() {
  elements.calendarWeekdayHeader.innerHTML = t("cal_weekdays")
    .split(",")
    .map((d) => `<span>${escapeHtml(d)}</span>`)
    .join("");

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
    const dStr = toDateStr(new Date(year, month, day));
    const isToday = day === todayDate;
    const isChecked = checkedDates.has(dStr);

    cell.className = `cal-cell ${isToday ? "today" : ""} ${isChecked ? "checked" : ""}`;
    cell.textContent = String(day);
    cell.title = `${dStr}${isChecked ? t("cal_checked_suffix") : ""}`;

    container.appendChild(cell);
  }
}

// 渲染打卡心得笔记（按日期倒序）
function renderCheckinNotes() {
  const container = elements.checkinNotesList;
  container.innerHTML = "";

  const notes = state.checkins
    .filter((c) => c.note && c.note.trim() !== "")
    .sort((a, b) => b.date.localeCompare(a.date));
  if (notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>${escapeHtml(t("notes_empty_title"))}</span>
        <p>${escapeHtml(t("notes_empty_desc"))}</p>
      </div>
    `;
    return;
  }

  notes.slice(0, 15).forEach((item) => {
    const card = document.createElement("div");
    card.className = "checkin-note-item";
    card.innerHTML = `
      <div class="note-item-header">
        <strong>${escapeHtml(item.date)} · Day ${item.planDay}</strong>
        <span>${escapeHtml(t("note_minutes", { n: item.minutes }))}</span>
      </div>
      <p class="note-item-content">${escapeHtml(item.note)}</p>
    `;
    container.appendChild(card);
  });
}

// 3. 渲染 30 项考点深度库
function stageOptionsHtml(stage) {
  return [0, 1, 2, 3]
    .map((s) => `<option value="${s}" ${stage === s ? "selected" : ""}>${escapeHtml(t(`stage_name_${s}`))}</option>`)
    .join("");
}

function renderBlueprint() {
  const container = elements.domainsAccordionContainer;
  container.innerHTML = "";

  const searchKeyword = ui.searchKeyword.toLowerCase().trim();
  const stageFilter = ui.activeStageFilter;

  domains.forEach((dom) => {
    // 过滤 topics
    const filteredTopics = dom.topics.filter((topic) => {
      const currentStage = state.topics[topic.code] ?? 0;
      if (stageFilter !== "all" && String(currentStage) !== stageFilter) {
        return false;
      }
      if (!searchKeyword) return true;
      const haystack = `${topic.code} ${pick(topic, "title")} ${topic.official} ${pick(topic, "summary")}`.toLowerCase();
      return haystack.includes(searchKeyword);
    });

    if (filteredTopics.length === 0 && (searchKeyword || stageFilter !== "all")) {
      return; // 搜索无匹配时隐藏整个 Domain
    }

    const domPercent = Math.round(domainProgress(dom) * 100);

    const card = document.createElement("div");
    card.className = "domain-accordion-card is-open";

    card.innerHTML = `
      <div class="domain-accordion-header" data-domain-toggle="${dom.code}">
        <div class="domain-title-group">
          <span class="domain-code-badge">${dom.code}</span>
          <div class="domain-title-text">
            <h3>${dom.code} · ${dom.title}</h3>
            <p>${pick(dom, "summary")}</p>
          </div>
        </div>
        <div class="domain-progress-side">
          <span class="domain-weight-tag">${escapeHtml(t("domain_weight_prefix"))} ${dom.weight}%</span>
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
      const keyPointsHtml = pick(topic, "keyPoints").map((kp) => `<li>${kp}</li>`).join("");
      const antiPatternsHtml = pick(topic, "antiPatterns").map((ap) => `<li>${ap}</li>`).join("");

      const topicEl = document.createElement("article");
      topicEl.className = "topic-card";
      topicEl.innerHTML = `
        <div class="topic-card-header">
          <div class="topic-title-area">
            <span class="topic-num-badge">${topic.code}</span>
            <div class="topic-headings">
              <h4>${pick(topic, "title")}</h4>
              <div class="topic-official-name">${topic.official}</div>
            </div>
          </div>
          <div class="stage-select-box">
            <label for="stage-${topic.code}" class="sr-only">${escapeHtml(t("stage_select_aria"))}</label>
            <select id="stage-${topic.code}" data-topic-code="${topic.code}">
              ${stageOptionsHtml(stage)}
            </select>
          </div>
        </div>
        <p class="topic-summary-box"><strong>${escapeHtml(t("core_summary_label"))}</strong>${pick(topic, "summary")}</p>
        <div class="topic-keypoints">
          <strong>[${escapeHtml(t("key_principles_label"))}] </strong>
          <ul>${keyPointsHtml}</ul>
        </div>
        <div class="topic-antipatterns">
          <strong>[${escapeHtml(t("anti_patterns_label"))}] </strong>
          <ul>${antiPatternsHtml}</ul>
        </div>
        <div class="topic-evidence-box">
          <span><strong>[${escapeHtml(t("evidence_label"))}] </strong>${pick(topic, "evidence")}</span>
        </div>
      `;
      bodyContainer.appendChild(topicEl);
    });

    container.appendChild(card);
  });

  if (container.children.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>${escapeHtml(t("no_match_title"))}</span>
        <p>${escapeHtml(t("no_match_desc", { kw: ui.searchKeyword }))}</p>
      </div>
    `;
  }
}

// 4. 渲染 10 步决策罗盘与场景
function renderDecisionLens() {
  const isEn = state.lang === "en";
  // 10 步决策
  elements.decisionRulesGrid.innerHTML = "";
  decisionRules.forEach((item) => {
    const card = document.createElement("div");
    card.className = "rule-card";
    card.innerHTML = `
      <div class="rule-card-header">
        <span class="rule-step-badge">${item.step}</span>
        <h4>${pick(item, "title")}</h4>
      </div>
      <div class="rule-body">
        <strong>${escapeHtml(t("rule_criterion_label"))}</strong>${pick(item, "rule")}
      </div>
      <div class="rule-trap">
        <strong>${escapeHtml(t("rule_trap_label"))}</strong>${pick(item, "trap")}
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
        <span>${escapeHtml(t("trap_tag"))}</span>
        <span>${pick(trap, "trap")}</span>
      </div>
      <p class="trap-reason"><strong>${escapeHtml(t("trap_reason_label"))}</strong>${pick(trap, "reason")}</p>
    `;
    elements.trapsGrid.appendChild(card);
  });

  // 6 个官方场景
  elements.scenariosGrid.innerHTML = "";
  officialScenarios.forEach((sc) => {
    const card = document.createElement("div");
    card.className = "scenario-card";
    const taskPills = pick(sc, "keyTasks").map((task) => `<span class="scenario-task-pill">${task}</span>`).join("");
    card.innerHTML = `
      <div class="scenario-top">
        <span class="scenario-id-tag">${escapeHtml(t("scenario_prefix"))} ${sc.id}</span>
      </div>
      <h4>${isEn ? sc.title : sc.nameZh}</h4>
      <div class="scenario-en-title">${isEn ? sc.nameZh : sc.title}</div>
      <p class="scenario-focus">${pick(sc, "focus")}</p>
      <div class="scenario-tasks-tags">${taskPills}</div>
    `;
    elements.scenariosGrid.appendChild(card);
  });
}

// 5. 渲染 Mock 成绩与错题本
function errorCategoryName(cat, short = false) {
  if (state.lang === "en") return cat.name_en || cat.name;
  return short ? cat.name.split(" ")[0] : cat.name;
}

function renderMockAndMistakes() {
  // Mock 历史
  elements.mockHistoryList.innerHTML = "";
  if (state.mocks.length === 0) {
    elements.mockHistoryList.innerHTML = `
      <div class="empty-state">
        <span>${escapeHtml(t("mock_empty_title"))}</span>
        <p>${escapeHtml(t("mock_empty_desc"))}</p>
      </div>
    `;
  } else {
    state.mocks.forEach((m) => {
      const isQualified = m.correct / 60 >= 0.8;
      const meta = t("mock_meta", { m: m.minutes, w: m.weakestDomain }) + (m.notes ? ` · ${m.notes}` : "");
      const item = document.createElement("div");
      item.className = "mock-history-item";
      item.innerHTML = `
        <div class="mock-stat-left">
          <div class="mock-score-circle ${isQualified ? "pass" : ""}">
            ${m.correct}
          </div>
          <div class="mock-details">
            <strong>${escapeHtml(m.date)} · ${escapeHtml(m.source || t("mock_default_source"))} (${Math.round((m.correct / 60) * 100)}%)</strong>
            <span>${escapeHtml(meta)}</span>
          </div>
        </div>
        <button type="button" class="btn-delete-item" data-delete-mock="${escapeHtml(m.id)}">${escapeHtml(t("btn_delete"))}</button>
      `;
      elements.mockHistoryList.appendChild(item);
    });
  }

  // 错因筛选胶囊
  elements.errorCatFilterContainer.innerHTML = "";
  const allPill = document.createElement("button");
  allPill.type = "button";
  allPill.className = `cat-pill ${ui.activeErrorCat === "all" ? "active" : ""}`;
  allPill.textContent = t("all_count", { n: state.mistakes.length });
  allPill.dataset.cat = "all";
  elements.errorCatFilterContainer.appendChild(allPill);

  errorCategories.forEach((cat) => {
    const count = state.mistakes.filter((m) => m.errorCategory === cat.code).length;
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `cat-pill ${ui.activeErrorCat === cat.code ? "active" : ""}`;
    pill.textContent = `${errorCategoryName(cat, true)} (${count})`;
    pill.dataset.cat = cat.code;
    elements.errorCatFilterContainer.appendChild(pill);
  });

  // 错题列表
  elements.mistakesListContainer.innerHTML = "";
  const filteredMistakes = state.mistakes.filter((m) => {
    if (ui.activeErrorCat === "all") return true;
    return m.errorCategory === ui.activeErrorCat;
  });

  if (filteredMistakes.length === 0) {
    const desc = state.mistakes.length === 0 ? t("mistakes_empty_desc") : t("mistakes_filter_empty");
    elements.mistakesListContainer.innerHTML = `
      <div class="empty-state">
        <span>${escapeHtml(t("mistakes_empty_title"))}</span>
        <p>${escapeHtml(desc)}</p>
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
          <span class="tag-qno">${escapeHtml(m.questionNo || t("mistake_default_qno"))}</span>
          <span class="tag-cat">${escapeHtml(catObj ? errorCategoryName(catObj) : m.errorCategory)}</span>
          ${m.taskCode ? `<span class="tag-qno">${escapeHtml(m.taskCode)}</span>` : ""}
        </div>
        <button type="button" class="btn-delete-item" data-delete-mistake="${escapeHtml(m.id)}">${escapeHtml(t("btn_delete"))}</button>
      </div>
      <div class="mistake-stem">${escapeHtml(m.stem)}</div>
      <div class="mistake-answers-diff">
        <div class="ans-wrong">${escapeHtml(t("mistake_wrong_tag"))} ${escapeHtml(m.myAnswer)}</div>
        <div class="ans-right">${escapeHtml(t("mistake_right_tag"))} ${escapeHtml(m.correctAnswer)}</div>
      </div>
      ${m.reflection ? `<div class="mistake-reflection"><strong>${escapeHtml(t("mistake_reflection_tag"))} </strong>${escapeHtml(m.reflection)}</div>` : ""}
      ${m.reviewRef ? `<div class="mistake-reflection"><strong>${escapeHtml(t("mistake_ref_tag"))} </strong>${escapeHtml(m.reviewRef)}</div>` : ""}
    `;
    elements.mistakesListContainer.appendChild(card);
  });
}

// 6. 渲染考前清单与资源
function renderChecklistScore() {
  const checkedCount = preExamChecklist.filter((item) => state.checklist[item.id]).length;
  elements.checklistScorePill.textContent = `${t("checklist_score_prefix")} ${checkedCount} / ${preExamChecklist.length}`;
}

function renderResourceLinks(container, list) {
  container.innerHTML = "";
  list.forEach((r) => {
    const a = document.createElement("a");
    a.className = "resource-link-item";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `
      <strong>${pick(r, "name")} ↗</strong>
      <span>${pick(r, "desc")}</span>
    `;
    container.appendChild(a);
  });
}

function renderResourcesAndChecklist() {
  const isEn = state.lang === "en";
  // 考前 10 项清单
  elements.preExamChecklistContainer.innerHTML = "";
  preExamChecklist.forEach((item) => {
    const isChecked = Boolean(state.checklist[item.id]);
    const row = document.createElement("label");
    row.className = `checklist-row ${isChecked ? "checked" : ""}`;
    row.innerHTML = `
      <input type="checkbox" data-checklist-id="${item.id}" ${isChecked ? "checked" : ""} />
      <span>${pick(item, "text")}</span>
    `;
    elements.preExamChecklistContainer.appendChild(row);
  });
  renderChecklistScore();

  // 版本分歧对照表
  elements.divergenceTableBody.innerHTML = "";
  versionDivergence.forEach((v) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${pick(v, "topic")}</strong></td>
      <td><code>${pick(v, "examGuide")}</code></td>
      <td><code>${pick(v, "currentDocs")}</code></td>
      <td>${pick(v, "strategy")}</td>
    `;
    elements.divergenceTableBody.appendChild(tr);
  });

  // 明确不考列表
  elements.outOfScopeListContainer.innerHTML = "";
  outOfScopeList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = typeof item === "object" ? (isEn ? item.en : item.zh) : item;
    elements.outOfScopeListContainer.appendChild(li);
  });

  // 资源链接
  renderResourceLinks(elements.officialResourcesContainer, studyResources.official);
  renderResourceLinks(elements.communityResourcesContainer, studyResources.community);
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
    if (state.plan === btn.dataset.plan) return;
    state.plan = btn.dataset.plan;
    saveState();
    renderAll();
    showToast(t("toast_plan_switched", { n: state.plan }), "[PLAN]");
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
  const idx = Number(checkbox.dataset.dayIndex);
  const planDay = idx + 1;

  if (checkbox.checked) {
    state.days[state.plan][idx] = true;
    // 自动添加打卡记录（同一天同一计划日只记一条）
    const today = todayString();
    if (!findCheckin(state.plan, planDay, today)) {
      const dayItem = studyPlans[state.plan][idx];
      state.checkins.unshift({
        id: newId(),
        date: today,
        minutes: dayItem?.minutes || 120,
        plan: state.plan,
        planDay,
        note: t("auto_checkin_note", { n: planDay, title: pick(dayItem, "title") }),
        auto: true,
      });
    }
    playChime(true);
    showToast(t("toast_day_checked", { n: planDay, s: calculateStreak() }), "[CHECK-IN]");
  } else {
    // 取消完成：同步移除该计划日的打卡记录，避免连胜与总次数虚高
    const related = state.checkins.filter((c) => checkinBelongsTo(c, state.plan, planDay));
    const hasUserNotes = related.some((c) => !c.auto && c.note.trim() !== "");
    if (hasUserNotes && !confirm(t("confirm_uncheck_day", { n: planDay, c: related.length }))) {
      checkbox.checked = true;
      return;
    }
    state.days[state.plan][idx] = false;
    state.checkins = state.checkins.filter((c) => !related.includes(c));
  }

  saveState();
  renderAll();
});

// 点击卡片上的"写今日打卡心得"
elements.dailyCardsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-log-day]");
  if (!btn) return;
  openCheckinModal(Number(btn.dataset.logDay));
});

// 今日行动一键打卡
elements.todayCheckinBtn.addEventListener("click", () => {
  const nextIdx = getNextUnfinishedDayIndex();
  if (nextIdx === -1) {
    showToast(t("toast_all_done"), "[DONE]");
    return;
  }
  openCheckinModal(nextIdx + 1);
});

// 打卡弹窗：若同一日期 + 计划日已有记录，则预填并在提交时更新该记录
function fillCheckinFormFromExisting() {
  const planDay = Number(elements.checkinDayIndex.value) + 1;
  const existing = findCheckin(state.plan, planDay, elements.checkinDate.value);
  elements.checkinDuration.value = String(existing?.minutes || studyPlans[state.plan][planDay - 1]?.minutes || 120);
  elements.checkinNote.value = existing && !existing.auto ? existing.note : "";
}

function openCheckinModal(defaultDay = 1) {
  elements.checkinDate.value = todayString();

  // 填充下拉选项
  elements.checkinDayIndex.innerHTML = "";
  studyPlans[state.plan].forEach((d, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = `Day ${idx + 1} · ${pick(d, "title")}`;
    if (idx + 1 === defaultDay) opt.selected = true;
    elements.checkinDayIndex.appendChild(opt);
  });

  fillCheckinFormFromExisting();
  openModal(elements.checkinModalOverlay, elements.checkinNote);
}

elements.checkinDate.addEventListener("change", fillCheckinFormFromExisting);
elements.checkinDayIndex.addEventListener("change", fillCheckinFormFromExisting);

elements.closeCheckinModalBtn.addEventListener("click", () => closeModal(elements.checkinModalOverlay));
elements.cancelCheckinModalBtn.addEventListener("click", () => closeModal(elements.checkinModalOverlay));
elements.addNewCheckinNoteBtn.addEventListener("click", () => {
  const nextIdx = getNextUnfinishedDayIndex();
  openCheckinModal(nextIdx === -1 ? 1 : nextIdx + 1);
});

// 提交打卡表单
elements.checkinModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateVal = asDate(elements.checkinDate.value, todayString());
  const durationVal = asNumber(elements.checkinDuration.value, 1, 1440, 120);
  const dayIdx = Number(elements.checkinDayIndex.value);
  const planDay = dayIdx + 1;
  const noteVal = elements.checkinNote.value.trim();

  // 标记该天计划完成
  state.days[state.plan][dayIdx] = true;

  // 写入打卡记录：同一日期 + 计划日只保留一条
  const existing = findCheckin(state.plan, planDay, dateVal);
  if (existing) {
    existing.minutes = durationVal;
    existing.plan = state.plan;
    if (noteVal || !existing.auto) {
      existing.note = noteVal;
      existing.auto = false;
    }
  } else {
    state.checkins.unshift({
      id: newId(),
      date: dateVal,
      minutes: durationVal,
      plan: state.plan,
      planDay,
      note: noteVal,
      auto: false,
    });
  }

  saveState();
  closeModal(elements.checkinModalOverlay);
  playChime(true);
  showToast(t("toast_checkin_saved", { s: calculateStreak() }), "[CHECK-IN]");
  renderAll();
});

// 考点阶段变更
elements.domainsAccordionContainer.addEventListener("change", (e) => {
  const sel = e.target.closest("[data-topic-code]");
  if (!sel) return;
  const code = sel.dataset.topicCode;
  state.topics[code] = Number(sel.value);
  saveState();
  renderHero(); // 快速更新环状图与统计

  // 更新卡片自身进度条
  const domain = domains.find((d) => d.topics.some((topic) => topic.code === code));
  const fill = sel.closest(".domain-accordion-card")?.querySelector(".domain-bar-fill");
  if (domain && fill) fill.style.width = `${Math.round(domainProgress(domain) * 100)}%`;
});

// 手风琴折叠展开
elements.domainsAccordionContainer.addEventListener("click", (e) => {
  const header = e.target.closest("[data-domain-toggle]");
  if (!header) return;
  header.closest(".domain-accordion-card")?.classList.toggle("is-open");
});

// 考点搜索与过滤
elements.topicSearchInput.addEventListener("input", (e) => {
  ui.searchKeyword = e.target.value;
  renderBlueprint();
});

elements.stageFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    elements.stageFilterBtns.forEach((b) => b.classList.toggle("active", b === btn));
    ui.activeStageFilter = btn.dataset.filterStage;
    renderBlueprint();
  });
});

// 复制 AI 刷题 Prompt
elements.copyAiPromptBtn.addEventListener("click", async () => {
  const promptToCopy = state.lang === "en" ? aiCoachPromptEn : aiCoachPrompt;
  try {
    await navigator.clipboard.writeText(promptToCopy);
  } catch (err) {
    // 降级方案（file:// 等非安全上下文）
    const ta = document.createElement("textarea");
    ta.value = promptToCopy;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  playChime(true);
  showToast(t("toast_prompt_copied"), "[PROMPT]");
});

// 提交 Mock 记录
elements.mockEntryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.mocks.unshift({
    id: newId(),
    date: asDate(elements.mockDate.value, todayString()),
    correct: asNumber(elements.mockCorrect.value, 0, 60, 0),
    minutes: asNumber(elements.mockMinutes.value, 0, 600, 0),
    weakestDomain: elements.mockWeakest.value,
    source: elements.mockSource.value.trim(),
    notes: elements.mockNotes.value.trim(),
  });

  saveState();
  elements.mockEntryForm.reset();
  elements.mockDate.value = todayString();
  playChime(true);
  showToast(t("toast_mock_saved"), "[MOCK]");
  renderHero();
  renderMockAndMistakes();
});

// 删除 Mock 记录
elements.mockHistoryList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delete-mock]");
  if (!btn) return;
  const id = btn.dataset.deleteMock;
  if (!confirm(t("confirm_delete_mock"))) return;
  state.mocks = state.mocks.filter((m) => m.id !== id);
  saveState();
  renderHero();
  renderMockAndMistakes();
});

// 错因筛选
elements.errorCatFilterContainer.addEventListener("click", (e) => {
  const pill = e.target.closest("[data-cat]");
  if (!pill) return;
  ui.activeErrorCat = pill.dataset.cat;
  renderMockAndMistakes();
});

// 打开添加错题弹窗
elements.openAddMistakeModalBtn.addEventListener("click", () => {
  // 填充 Domain 考点选项
  elements.mistakeDomain.innerHTML = "";
  domains.forEach((dom) => {
    dom.topics.forEach((topic) => {
      const opt = document.createElement("option");
      opt.value = `${dom.code} - ${topic.code}`;
      opt.textContent = `${topic.code} ${pick(topic, "title")} (${dom.code})`;
      elements.mistakeDomain.appendChild(opt);
    });
  });

  // 填充 9 大错因选项
  elements.mistakeErrorCategory.innerHTML = "";
  errorCategories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.code;
    opt.textContent = `${errorCategoryName(cat)} - ${pick(cat, "desc")}`;
    elements.mistakeErrorCategory.appendChild(opt);
  });

  elements.mistakeModalForm.reset();
  openModal(elements.mistakeModalOverlay);
});

elements.closeMistakeModalBtn.addEventListener("click", () => closeModal(elements.mistakeModalOverlay));
elements.cancelMistakeModalBtn.addEventListener("click", () => closeModal(elements.mistakeModalOverlay));

// 提交错题表单
elements.mistakeModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskCode = elements.mistakeDomain.value;
  state.mistakes.unshift({
    id: newId(),
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
  closeModal(elements.mistakeModalOverlay);
  playChime(true);
  showToast(t("toast_mistake_saved"), "[MISTAKE]");
  renderMockAndMistakes();
});

// 删除错题
elements.mistakesListContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delete-mistake]");
  if (!btn) return;
  const id = btn.dataset.deleteMistake;
  if (!confirm(t("confirm_delete_mistake"))) return;
  state.mistakes = state.mistakes.filter((m) => m.id !== id);
  saveState();
  renderMockAndMistakes();
});

// 考前 10 项确认清单勾选
elements.preExamChecklistContainer.addEventListener("change", (e) => {
  const checkbox = e.target.closest("[data-checklist-id]");
  if (!checkbox) return;
  state.checklist[checkbox.dataset.checklistId] = checkbox.checked;
  saveState();
  renderChecklistScore();
  checkbox.closest(".checklist-row")?.classList.toggle("checked", checkbox.checked);
});

// 设置目标考期
elements.setExamDateBtn.addEventListener("click", () => {
  elements.examDateInput.value = state.examDate || todayString();
  openModal(elements.examDateModalOverlay, elements.examDateInput);
});

elements.closeExamDateModalBtn.addEventListener("click", () => closeModal(elements.examDateModalOverlay));

elements.clearExamDateBtn.addEventListener("click", () => {
  state.examDate = "";
  saveState();
  renderHero();
  closeModal(elements.examDateModalOverlay);
  showToast(t("toast_exam_date_cleared"), "[DATE]");
});

elements.examDateModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = elements.examDateInput.value.trim();
  if (!DATE_RE.test(value)) {
    alert(t("alert_bad_date"));
    return;
  }
  state.examDate = value;
  saveState();
  renderHero();
  closeModal(elements.examDateModalOverlay);
  showToast(t("toast_exam_date_set", { d: value }), "[DATE]");
});

// 导出进度 JSON
elements.exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.href = url;
  downloadAnchor.download = `ccar-f-study-progress-${todayString()}.json`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(t("toast_export_success"), "[EXPORT]");
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
      if (!isPlainObject(imported)) throw new Error("Format error");
      state = sanitizeState(imported);
      saveState();
      updateUILanguage();
      renderAll();
      showToast(t("toast_import_success"), "[IMPORT]");
    } catch (err) {
      alert(t("alert_import_failed"));
    } finally {
      elements.importFileInput.value = "";
    }
  };
  reader.readAsText(file);
});

// 重置全部数据
elements.resetBtn.addEventListener("click", () => {
  if (!confirm(t("confirm_reset"))) return;
  state = { ...structuredClone(defaultState), lang: state.lang };
  saveState();
  renderAll();
  showToast(t("toast_reset_success"), "[RESET]");
});

// ================= 专注番茄钟引擎 =================
// 以结束时间戳计时：后台标签页的 setInterval 会被浏览器限流，逐秒递减会越走越慢
let pomodoroTimer = null;
let pomodoroTotalSecs = 25 * 60;
let pomodoroRemainingSecs = 25 * 60;
let pomodoroEndAt = 0;
let pomodoroPhase = "ready"; // ready | running | paused | finished

function updatePomodoroDisplay() {
  const m = Math.floor(pomodoroRemainingSecs / 60);
  const s = pomodoroRemainingSecs % 60;
  elements.pomodoroClockDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function renderPomodoroState() {
  elements.pomodoroStateText.textContent = t(`pomo_${pomodoroPhase}`);
  elements.pomodoroStartBtn.disabled = pomodoroPhase === "running";
  elements.pomodoroPauseBtn.disabled = pomodoroPhase !== "running";
  elements.pomodoroStartBtn.textContent = t(pomodoroPhase === "paused" ? "pomo_btn_resume" : "pomo_btn_start");
}

function setPomodoroPhase(phase) {
  pomodoroPhase = phase;
  renderPomodoroState();
}

function finishPomodoro() {
  clearInterval(pomodoroTimer);
  pomodoroRemainingSecs = 0;
  updatePomodoroDisplay();
  setPomodoroPhase("finished");
  playChime(true);

  const focusMinutes = Math.round(pomodoroTotalSecs / 60);
  showToast(t("toast_focus_done", { n: focusMinutes }), "[FOCUS]");

  // 询问是否记录为打卡
  setTimeout(() => {
    if (confirm(t("confirm_log_focus", { n: focusMinutes }))) {
      closeModal(elements.pomodoroOverlay);
      const nextIdx = getNextUnfinishedDayIndex();
      openCheckinModal(nextIdx !== -1 ? nextIdx + 1 : 1);
      elements.checkinDuration.value = String(focusMinutes);
    }
  }, 300);
}

function tickPomodoro() {
  pomodoroRemainingSecs = Math.max(0, Math.ceil((pomodoroEndAt - Date.now()) / 1000));
  updatePomodoroDisplay();
  if (pomodoroRemainingSecs === 0) finishPomodoro();
}

function startPomodoro() {
  if (pomodoroPhase === "running") return;
  if (pomodoroRemainingSecs === 0) pomodoroRemainingSecs = pomodoroTotalSecs;
  pomodoroEndAt = Date.now() + pomodoroRemainingSecs * 1000;
  setPomodoroPhase("running");
  clearInterval(pomodoroTimer);
  pomodoroTimer = setInterval(tickPomodoro, 250);
}

function pausePomodoro() {
  if (pomodoroPhase !== "running") return;
  clearInterval(pomodoroTimer);
  tickPomodoro();
  if (pomodoroPhase === "running") setPomodoroPhase("paused");
}

function resetPomodoro() {
  clearInterval(pomodoroTimer);
  pomodoroRemainingSecs = pomodoroTotalSecs;
  setPomodoroPhase("ready");
  updatePomodoroDisplay();
}

elements.openPomodoroBtn.addEventListener("click", () => {
  openModal(elements.pomodoroOverlay, elements.pomodoroStartBtn);
});
elements.todayStudyFocusBtn.addEventListener("click", () => {
  openModal(elements.pomodoroOverlay, elements.pomodoroPauseBtn);
  resetPomodoro();
  startPomodoro();
  elements.pomodoroPauseBtn.focus();
});
elements.closePomodoroModalBtn.addEventListener("click", () => closeModal(elements.pomodoroOverlay));

elements.pomodoroPresetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    elements.pomodoroPresetBtns.forEach((b) => b.classList.toggle("active", b === btn));
    pomodoroTotalSecs = Number(btn.dataset.mins) * 60;
    resetPomodoro();
  });
});

elements.pomodoroStartBtn.addEventListener("click", startPomodoro);
elements.pomodoroPauseBtn.addEventListener("click", pausePomodoro);
elements.pomodoroResetBtn.addEventListener("click", resetPomodoro);

// 绑定语言切换按钮
elements.langBtnZh?.addEventListener("click", () => setLanguage("zh"));
elements.langBtnEn?.addEventListener("click", () => setLanguage("en"));

// ================= 初始化启动 =================
function init() {
  updateUILanguage();
  elements.mockDate.value = todayString();
  renderAll();
}

init();
