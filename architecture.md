Architecture Document
Fishing Log & Stats Dashboard
Version: 1.1
Date: 2026-04-29
Author: Generated with Claude (Anthropic)
Phase: System & UI Design

1. Architecture Overview
The Fishing Log & Stats Dashboard is a client-side single-page application (SPA) built with React. There is no backend server for the MVP. All data is stored in the browser via localStorage. This decision prioritizes:

Zero infrastructure cost
Instant deployment (Cloudflare Pages)
No authentication complexity
Full offline capability

2. Tech Stack
LayerTechnologyRationaleFrameworkReact 18 (Vite)Component model fits UI complexity; Vite gives fast dev experienceStylingTailwind CSSUtility-first; fast to build responsive layouts without custom CSS filesState ManagementZustandLightweight, minimal boilerplate vs Redux; persists easily to localStorageChartsRechartsReact-native charting library; composable, responsiveRoutingReact Router v6Simple client-side routing between 3 viewsData LayerlocalStorage (via Zustand persist middleware)No backend needed for MVP; sufficient for typical data volumesBuild ToolViteFast HMR, simple config, easy deploymentDeploymentCloudflare PagesFree, Git-connected, global CDN, fast cold starts
3. Application Structure
fishing-log/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Layout.jsx
│   │   ├── catches/
│   │   │   ├── CatchForm.jsx
│   │   │   ├── CatchList.jsx
│   │   │   └── CatchCard.jsx
│   │   ├── dashboard/
│   │   │   ├── StatsSummary.jsx
│   │   │   ├── CatchesOverTime.jsx
│   │   │   └── SpeciesChart.jsx
│   │   └── bests/
│   │       └── PersonalBests.jsx
│   ├── store/
│   │   └── useCatchStore.js
│   ├── utils/
│   │   ├── statsHelpers.js
│   │   └── formatters.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── CatchLog.jsx
│   │   └── PersonalBests.jsx
│   ├── App.jsx
│   └── main.jsx
├── architecture.md
├── requirements.md
├── security.md
├── claude.md
├── plan.md
└── README.md
4. Data Model
All data lives in a single localStorage key: fishing-log-storage
Catch Object
json{
  "id": "uuid-v4",
  "species": "Largemouth Bass",
  "weight": 4.2,
  "weightUnit": "lbs",
  "date": "2026-04-15",
  "bait": "Plastic worm",
  "location": "Lake Norman",
  "weather": "Sunny",
  "notes": "Caught near the dock at sunrise",
  "createdAt": "2026-04-15T08:32:00Z",
  "updatedAt": "2026-04-15T08:32:00Z"
}
5. State Management
Zustand with the persist middleware handles all state.
jsconst useCatchStore = create(
  persist(
    (set) => ({
      catches: [],
      addCatch: (catchData) => set(state => ({
        catches: [...state.catches, { ...catchData, id: uuid() }]
      })),
      updateCatch: (id, updates) => set(state => ({
        catches: state.catches.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteCatch: (id) => set(state => ({
        catches: state.catches.filter(c => c.id !== id)
      })),
    }),
    { name: 'fishing-log-storage' }
  )
)
6. Routing
RoutePageDescription/DashboardStats summary + charts/logCatch LogFull catch history + add/edit form/bestsPersonal BestsBest catch per species
7. Key Architecture Decisions
Decision 1: No Backend
Choice: localStorage only
Rationale: MVP scope; eliminates auth, hosting costs, and API complexity. Post-MVP can migrate to Supabase or Firebase with minimal refactoring.
Decision 2: Zustand over Redux
Choice: Zustand
Rationale: One main data entity (catches). Redux boilerplate is overkill. Zustand persist middleware handles localStorage sync in 2 lines.
Decision 3: Recharts over D3
Choice: Recharts
Rationale: D3 is powerful but complex for the charts needed. Recharts wraps D3 in React-friendly components and is responsive out of the box.
Decision 4: Tailwind CSS over custom CSS
Choice: Tailwind
Rationale: Speeds up responsive layout development. Avoids CSS file sprawl for a project of this size.
Decision 5: Cloudflare Pages over Vercel
Choice: Cloudflare Pages
Rationale: Free tier is generous, global CDN, Git-connected CI/CD. Project owner preference — overriding initial AI suggestion.
8. Scalability Considerations

The Zustand store can be swapped for an API-backed store with minimal component changes
Components are decoupled from data — they receive data as props or read from the store
Adding authentication later means wrapping the router in an auth provider, not refactoring components

9. Deployment
Target: Cloudflare Pages
Build command: npm run build
Output directory: dist/
Environment variables: None required for MVP
Deployment Steps

Push repository to GitHub (must be public)
Go to pages.cloudflare.com
Click Create a project → Connect to Git
Select your fishing-log repository
Set build command: npm run build
Set output directory: dist
Click Save and Deploy

Cloudflare Pages will automatically redeploy on every push to main.

This document was generated with Claude (Anthropic) as part of the AI-assisted SDLC process. Deployment method updated by project owner (Cloudflare Pages replacing Vercel). Version bumped from 1.0 to 1.1.