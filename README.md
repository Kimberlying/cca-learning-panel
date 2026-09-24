# Claude Certified Architect - Foundations (CCAR-F) Study Dashboard

[English] | [中文版](README_zh.md)

A privacy-first, zero-backend, interactive study companion and mastery tracker designed specifically for the **Anthropic Claude Certified Architect - Foundations (`CCAR-F`)** certification exam.

Based on the official **Anthropic Exam Guide v1.0**, this dashboard provides a comprehensive preparation cockpit: domain-weighted mastery tracking, dual-track sprint schedules (7-day crash & 14-day comprehensive), a 30-task statement knowledge base with anti-patterns, a 10-step decision tree, mock exam diagnostics, a pomodoro focus timer, and AI coach prompt integration.

---

## Privacy & Local Data Architecture

- **100% Client-Side & Serverless**: Runs completely inside your web browser. No accounts, cookies, telemetry, or external database connections. The only network request is loading web fonts from Google Fonts; offline, the page falls back to system fonts.
- **Local Storage (`localStorage`)**: Your check-ins, study minutes, custom exam date, mock exam scores, and reflection notes are stored exclusively on your device under `cca-study-companion-v2`.
- **Zero Data Leakage on GitHub**: Pushing this repository to GitHub or hosting it on GitHub Pages publishes only the static application code. Your personal study logs, notes, and local files will never be uploaded.
- **Portability**: Includes one-click **Export JSON** and **Import JSON** capabilities for seamless multi-device backup and migration.

---

## Key Features

### 1. Weighted Mastery Progress Ring
- Real-time calculation using official Anthropic Domain weightings:
  - **Domain 1**: Agentic Architecture & Orchestration (27%)
  - **Domain 2**: Tool Design & MCP Integration (18%)
  - **Domain 3**: Claude Code Configuration & Workflows (20%)
  - **Domain 4**: Prompt Engineering & Structured Output (20%)
  - **Domain 5**: Context Management & Reliability (15%)

### 2. Dual-Track Daily Study Plan
- Switch between **7-Day Sprint** (intensive 90-120 min/day) and **14-Day Steady** (structured 45-60 min/day) roadmaps.
- Each daily card contains target objectives, hands-on tasks, and mandatory deliverables.
- Habit-forming check-in dot matrix, consecutive streak counter, and daily reflection notebook.

### 3. Integrated Pomodoro Focus Engine
- Preset timers: **25 min** (Standard Focus), **50 min** (Deep Dive), and **15 min** (Rapid Recall).
- Zero-external-dependency sound synthesis via native Web Audio API.
- Automatically records cumulative study duration to your daily log upon session completion.

### 4. 30 Task Statements Deep Knowledge Base
- Structured breakdown across all 5 exam domains.
- Each task card includes:
  - **Core Principles**: Architectural best practices and design rationales.
  - **Anti-Patterns**: Frequent pitfalls, wrong assumptions, and trap choices.
  - **Evidence Required**: Concrete implementation proofs needed to validate mastery.
- Instant search filter for fast lookup (e.g., `hooks`, `stop_reason`, `batch`, `mcp`, `sampling`).
- 4-stage mastery progress tracking: `0. Not Started`, `1. Concept Understood`, `2. Practice Done`, `3. Question Verified`.

### 5. 10-Step Decision Compass & Scenario Matrix
- **10-Step Decision Tree**: Clear elimination heuristics for ambiguous exam questions (e.g., deterministic vs non-deterministic tasks, tool routing error recovery, empty results vs timeout handling).
- **10 High-Frequency Trap Comparisons**: Critical distinction pairs (e.g., Prefill vs Prompt, Batch API vs Streaming, Subagent vs Workflow).
- **6 Official Exam Scenarios**: Architecture blueprints for Customer Support, Code Generation, Research Analysis, Document Processing, Multimodal Inspection, and Data Extraction.
- **AI Coach System Prompt**: Copy-ready prompt configured for Claude or ChatGPT to conduct realistic 1-on-1 scenario roleplay questions.

### 6. Mock Exam Tracker & 9-Cause Error Taxonomy
- Track 60-question / 120-minute practice exam scores and domain breakdowns.
- Automated readiness indicator: ready once two mock scores reach >= 80%. For each mock, also log your weakest domain and review it until no domain is below ~75%.
- Categorize mistakes by **9 Root Cause Archetypes**:
  - `criteria`: Misread acceptance criteria
  - `determinism`: Chose LLM when deterministic code was required
  - `tool-routing`: Flawed tool parameter or schema design
  - `overengineering`: Excessively complex multi-agent architecture
  - `error-recovery`: Missing retry, backoff, or fallback logic
  - `context`: Token budget overflow or context window misuse
  - `scope`: Out-of-scope design choice
  - `sla`: Latency, streaming, or cost boundary violation
  - `question-limit`: Misinterpreted question constraint or negative wording

### 7. Pre-Flight Checklist & Resource Matrix
- 10-item pre-exam confirmation checklist with persistent state.
- Version evolution guide highlighting official Exam Guide baseline vs latest SDK updates.
- Explicit "Out-of-Scope" filter to avoid wasted study time on non-tested areas.
- Curated reference links to official Anthropic documentation and community study materials.

---

## Getting Started

### Option 1: Direct File Launch (No Installation Required)

Double-click `index.html` in your file explorer, or run in your terminal:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Lightweight Local HTTP Server

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

### Option 3: Deploy to GitHub Pages (Free Hosting)

1. Push this folder to your GitHub repository.
2. Go to **Settings** -> **Pages** in your GitHub repository.
3. Under **Branch**, select `main` (or `master`), root folder `/`, and click **Save**.
4. Your personal online study dashboard will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## File Structure

```text
.
├── index.html        # Main dashboard interface
├── styles.css        # Base layout, typography, and Sakura Chroma theme tokens
├── panels.css        # Specific module panels (Mastery, Pomodoro, 30 Tasks, Compass, Mock)
├── responsive.css    # Mobile and tablet responsive adaptations
├── data.js           # Static exam syllabus, 30 task statements, 6 scenarios & decision rules
├── app.js            # Client-side state machine, localStorage sync, pomodoro engine, and UI handlers
├── README.md         # English documentation
├── README_zh.md      # Chinese documentation
├── LICENSE           # MIT open source license
└── .gitignore        # Git ignore rules for clean repository state
```

---

## Tech Stack & Design

- **Architecture**: Plain Vanilla JavaScript (ES6+), HTML5, CSS3.
- **Dependencies**: Zero external npm packages, zero framework bloat, zero build steps.
- **Design Aesthetic**: Retro Japanese Cassette ("Sakura Chroma") theme featuring warm pale ivory washi canvas (`#FAF6EE`), deep espresso ink (`#3A2516`), vermilion accents (`#E5392A`), honey amber (`#F0BC2A`), and terracotta highlights (`#D96B27`).
- **Typography & Clean UI**: Strictly zero emojis across the interface for a focused, distraction-free study environment.

---

## Disclaimer & Compliance

- **Non-Affiliation**: This project is an independent study and preparation companion built by an independent developer based strictly on publicly available examination outlines and technical documentation. It is not affiliated with, sponsored by, endorsed by, or officially connected to Anthropic PBC in any way.
- **Exam Security & Zero Dumps**: This repository strictly honors Anthropic's Certification Candidate Agreement and non-disclosure terms. It contains zero confidential test questions, brain dumps, or live exam screenshots. All conceptual decompositions, architectural decision trees, and scenario blueprints are synthesized purely from public guidelines and general software engineering practices.
- **Trademark Notice**: "Claude" and "Anthropic" are trademarks or registered trademarks of Anthropic PBC. All other product names, logos, and brands referenced herein are property of their respective owners. Their inclusion is solely for identification and educational reference purposes.

---

## License

This project is open-source software licensed under the [MIT License](LICENSE). You are free to use, modify, adapt, and distribute it for personal study, academic research, or educational purposes.
