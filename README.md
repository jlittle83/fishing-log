# FishLog 🎣
### A Fishing Catch Log & Stats Dashboard

A responsive web application for anglers to log catches, track personal bests,
and visualize fishing trends over time. Built as part of an AI-assisted SDLC
project demonstrating intentional use of multiple AI tools across all phases
of software development.

**Live Demo:** [your-cloudflare-url-here]  
**GitHub:** [your-repo-url-here]

---

## Project Overview

FishLog allows users to:
- Log catches with species, weight, date, bait, location, weather, and notes
- View a stats dashboard with charts and summary cards
- Track personal bests per species
- Filter and sort catch history
- Sign in with Firebase Authentication — each user has private data

---

## Architecture Summary

FishLog is a **frontend-only single-page application** built with React.
There is no backend server. All catch data is stored in the browser via
localStorage, scoped to each authenticated user.

```
Browser
  └── React (Vite)
        ├── Zustand (state + localStorage persistence)
        ├── Firebase Auth (user authentication)
        ├── Recharts (data visualization)
        └── React Router (client-side routing)
```

Three pages: **Dashboard** → **Catch Log** → **Personal Bests**

Full architecture details: [`architecture.md`](./architecture.md)

---

## AI Models and Tools Used

| Tool | Phase | Role |
|---|---|---|
| **ChatGPT (GPT-4o)** | Project Planning | Generated the initial Software Development Plan (SDP) |
| **Claude (Anthropic)** | Requirements, Architecture, Code, Docs | Primary engineering collaborator across all SDLC phases |
| **Google Gemini** | Testing & Code Review | Independent code review and security analysis |

### Division of Responsibilities

**ChatGPT** owned the planning phase. It produced the initial SDP including
scope, personas, constraints, risks, and development phases. This artifact
was then critically reviewed, simplified, and revised before being used to
guide the rest of the project.

**Claude** was the primary collaborator for everything after planning —
requirements engineering, architecture decisions, all source code, and all
documentation. Prompts were structured with full context and specific
deliverables to produce consistent, maintainable output.

**Gemini** conducted an independent code review after implementation was
complete. Its findings were critically evaluated — some implemented, some
rejected — and fully documented in the prompts log.

---

## AI Engineering Analysis

### Strengths of AI Tools Used

**Claude — Code Generation**
Produced production-quality boilerplate consistently. Zustand store setup,
React Router configuration, and Tailwind component structure were correct
on the first attempt. Long-context reasoning kept decisions consistent
across a multi-session project.

**ChatGPT — Structured Planning**
Strong at producing well-organized documents with tables, risks, and phases.
The SDP was genuinely useful as a starting point even though significant
parts were revised.

**Gemini — Code Review**
Identified two real bugs Claude missed: a cross-user localStorage data leak
on logout, and an Invalid Date crash risk in the stats helpers. Having a
second AI review the first AI's code produced real value.

### Limitations Encountered

**Claude — Proactive Risk Warning**
Claude did not warn about Firebase API key exposure before the user pasted
the config into chat. The warning came after exposure, not before. A
production-grade collaborator would have flagged this proactively.

**Claude — Auth Architecture**
Initially recommended "no auth for MVP." This was reasonable for simplicity
but underestimated how fundamentally auth changes the app's value. The
project owner overrode this correctly.

**Claude — localStorage Security**
Did not proactively flag the cross-user data leak when designing the
auth + localStorage architecture. Gemini caught this in code review.

**Gemini — Context Awareness**
Applied Firestore best practices (serverTimestamp, per-user storage keys)
to a localStorage app. About half of its suggestions were not applicable
to our architecture. Critical evaluation was essential.

**ChatGPT — Scope Calibration**
Produced an 8-12 week SDP for a team of 1-3 engineers. Required significant
revision for a solo developer with a tighter scope.

### Tradeoffs Encountered

| Decision | Tradeoff |
|---|---|
| localStorage over Firestore | Zero infrastructure cost vs. no cross-device sync |
| Zustand over Redux | Less boilerplate vs. less ecosystem tooling |
| No backend for MVP | Faster development vs. limited scalability |
| Firebase Auth | Real user isolation vs. vendor lock-in |
| Recharts over D3 | Easier React integration vs. less customization |

### Prompting Strategies That Worked

- Providing full context upfront (stack, constraints, prior decisions)
- Asking for structured output with specific sections and numbering
- Generating one file at a time to allow review between steps
- Asking for rationale alongside code ("explain why X over Y")
- Referencing prior artifacts ("based on the architecture.md, generate...")

### Prompting Strategies That Failed

- Asking for deployment instructions without specifying Cloudflare Pages
  vs Workers — produced generic Vercel-style instructions
- Asking to "add authentication" without specifying Firebase — required
  follow-up clarification

---

## Engineering Reflection

### What AI Improved

- **Speed** — Documentation that would take hours was produced in minutes
- **Consistency** — Decisions made in planning carried through to code
- **Coverage** — Security document, test cases, and architecture diagrams
  were produced that might have been skipped under time pressure
- **Code quality** — Boilerplate was correct and followed modern React patterns

### What AI Degraded or Risked

- **Security awareness** — The API key exposure and localStorage leak were
  both missed by Claude and required human intervention or Gemini review
- **Scope calibration** — AI tends to suggest more complexity than necessary
  (full backend, Redux, useMemo everywhere). Engineering judgment was needed
  to push back
- **False confidence** — AI-generated code that compiles is not necessarily
  correct. The cross-user data leak would have shipped undetected without
  the Gemini review

### What I Would Do Differently Without AI

Without AI, this project would have taken significantly longer and would
likely have had a narrower scope — fewer documentation artifacts, simpler
architecture, and probably plain HTML/CSS instead of React. The tradeoff
would have been slower delivery but potentially fewer hidden assumptions
in the code, since every line would have been written with full understanding.

### Evidence of Not Blindly Trusting AI

- Overrode Claude's "no auth" recommendation → added Firebase Authentication
- Rejected Gemini's O(n) optimization suggestion → premature for this scale
- Rejected Gemini's per-user localStorage keys → too complex for MVP
- Rejected Gemini's serverTimestamp suggestion → not applicable without Firestore
- Rotated Firebase API key after Claude failed to warn about exposure risk
- Revised ChatGPT's 8-12 week team SDP → 2-3 week solo plan
- Changed deployment from Vercel (Claude's suggestion) → Cloudflare Pages

---

## Repository Structure

```
fishing-log/                  ← GitHub repo root
  fishing-log/                ← Vite React application
    src/
      components/
        auth/                 ← Login component
        bests/                ← Personal bests component
        catches/              ← CatchForm, CatchList
        dashboard/            ← StatsSummary, charts
        layout/               ← Navbar, Layout
      pages/                  ← Dashboard, CatchLog, PersonalBests
      store/                  ← Zustand stores (catch, auth)
      utils/                  ← statsHelpers, formatters
  prompts/                    ← AI interaction logs
    01-sdp-chatgpt.md
    02-requirements-claude.md
    03-architecture-claude.md
    04-security-claude.md
    05-firebase-auth-override.md
    06-code-review-gemini.md
  screenshots/                ← App screenshots
  architecture.md             ← Architecture decisions
  claude.md                   ← Claude interaction notes
  plan.md                     ← Software Development Plan
  requirements.md             ← Personas, user stories, FR/NFR
  security.md                 ← Threat model and controls
  testing.md                  ← Manual test cases and strategy
  README.md                   ← This file
```

---

## Supporting Documents

| Document | Description |
|---|---|
| [`plan.md`](./plan.md) | Software Development Plan (revised from ChatGPT original) |
| [`requirements.md`](./requirements.md) | Personas, user stories, functional & non-functional requirements |
| [`architecture.md`](./architecture.md) | Tech stack, data model, routing, architecture decisions |
| [`security.md`](./security.md) | Threat model, security controls, pre-deployment checklist |
| [`testing.md`](./testing.md) | Manual test cases, edge cases, browser compatibility |
| [`claude.md`](./claude.md) | Claude interaction notes, prompting strategy, reflection |
| [`prompts/`](./prompts/) | Full AI interaction logs for all phases |

---

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS**
- **Zustand** (state management + localStorage persistence)
- **Firebase Authentication**
- **Recharts** (data visualization)
- **React Router v6**
- **Cloudflare Pages** (deployment)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/fishing-log.git
cd fishing-log/fishing-log

# Install dependencies
npm install

# Add environment variables
# Create a .env file with your Firebase config:
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# VITE_FIREBASE_PROJECT_ID=...
# VITE_FIREBASE_STORAGE_BUCKET=...
# VITE_FIREBASE_MESSAGING_SENDER_ID=...
# VITE_FIREBASE_APP_ID=...

# Start development server
npm run dev
```

---

*Built with Claude (Anthropic), ChatGPT (GPT-4o), and Google Gemini as part
of an AI-assisted SDLC project.*