# Requirements Document
## Fishing Log & Stats Dashboard

**Version:** 1.0  
**Date:** 2026-04-29  
**Author:** Generated with Claude (Anthropic)  
**Phase:** Requirements Engineering  

---

## 1. Personas

### Persona 1 — Casual Casey
- **Age:** 34
- **Background:** Fishes on weekends a few times a month, mostly for relaxation
- **Goals:** Remembers memorable catches, tracks personal bests, keeps a simple journal
- **Frustrations:** Doesn't want to fill out long forms; wants to log a catch in under a minute
- **Tech comfort:** Moderate — uses smartphone apps daily
- **Key need:** Speed and simplicity above all else

---

### Persona 2 — Data-Driven Dana
- **Age:** 27
- **Background:** Fishes 3–4 times per week, treats it competitively
- **Goals:** Spots patterns in catches (best time of day, best bait per species), tracks improvement over time
- **Frustrations:** Existing apps don't show trends well; data is locked behind subscriptions
- **Tech comfort:** High — comfortable with dashboards and data tools
- **Key need:** Rich stats, filtering, and clear visualizations

---

### Persona 3 — Tournament Terry
- **Age:** 45
- **Background:** Enters local fishing tournaments 6–8 times per year
- **Goals:** Quickly reviews personal bests before a tournament, tracks which species he's caught where
- **Frustrations:** Has to scroll through old photos to find records; no quick summary view
- **Tech comfort:** Moderate
- **Key need:** Fast access to personal bests and location history

---

## 2. User Stories

### Catch Logging
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-01 | Casual Casey | Log a catch with species, weight, date, and bait in under 60 seconds | I don't lose momentum while fishing | High |
| US-02 | Data-Driven Dana | Add optional fields (weather, water temp, time of day, notes) | I can correlate conditions with catch success | Medium |
| US-03 | Any user | Edit or delete a logged catch | I can correct mistakes | High |
| US-04 | Any user | Upload or attach a photo to a catch | I can remember the moment visually | Low |
| US-05 | Any user | Enter a location by typing a place name or dropping a pin | I know where I caught it later | Medium |

### Dashboard & Stats
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-06 | Data-Driven Dana | See total catches, average weight, and most caught species on a summary dashboard | I get a quick overview of my performance | High |
| US-07 | Data-Driven Dana | View a line chart of catches over time (by week or month) | I can see my fishing frequency trends | High |
| US-08 | Data-Driven Dana | View a bar chart of catches by species | I know which fish I catch most | High |
| US-09 | Tournament Terry | See my personal best (heaviest catch) per species and overall | I can reference records quickly | High |
| US-10 | Any user | See my catch history in a sortable, filterable list | I can find specific catches quickly | Medium |

### Filtering & Search
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-11 | Any user | Filter catches by species | I can focus on one type of fish | Medium |
| US-12 | Any user | Filter catches by date range | I can review a specific trip or season | Medium |
| US-13 | Any user | Filter catches by location | I can see performance at a specific spot | Low |
| US-14 | Any user | Sort my catch list by weight, date, or species | I can find records or recent logs easily | Medium |

### General / UX
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-15 | Casual Casey | Use the app on my phone and desktop | I can log in the field and review at home | High |
| US-16 | Any user | Have my data persist between sessions | I don't lose my history | High |
| US-17 | Any user | Navigate between log, dashboard, and personal bests with one click | The app feels fast and intuitive | High |

---

## 3. Functional Requirements

### FR-01: Catch Logging
- The system shall provide a form to log a catch with the following fields:
  - Species (text input with autocomplete suggestions) — **required**
  - Weight (numeric input, lbs or kg toggle) — **required**
  - Date (date picker, defaults to today) — **required**
  - Bait/lure used (text input) — optional
  - Location (text input) — optional
  - Weather conditions (text or dropdown) — optional
  - Notes (free text area) — optional
- The system shall validate required fields before saving
- The system shall allow editing any previously logged catch
- The system shall allow deleting a catch with a confirmation prompt

### FR-02: Catch List
- The system shall display all logged catches in a list/table view
- Each row shall show: species, weight, date, location (if entered), bait
- The list shall support sorting by: date (default), weight, species
- The list shall support filtering by: species, date range

### FR-03: Dashboard
- The system shall display a summary panel including:
  - Total number of catches
  - Heaviest catch overall (species + weight)
  - Most caught species
  - Catches logged this month
- The system shall display a line/area chart: catches per week or month over time
- The system shall display a bar chart: catch count by species

### FR-04: Personal Bests
- The system shall calculate and display the heaviest catch per species
- The system shall display overall heaviest catch
- Personal bests shall update automatically when a new catch is logged

### FR-05: Data Persistence
- All catch data shall be stored in the browser's localStorage for MVP
- Data shall persist across page reloads and browser sessions

---

## 4. Non-Functional Requirements

### NFR-01: Performance
- The catch log form shall be interactive within 1 second of page load
- The dashboard charts shall render within 2 seconds of navigation
- Filter/sort operations shall complete within 200ms

### NFR-02: Usability
- The app shall be fully usable on screens 375px wide and above (mobile-first)
- Core user flows (log a catch, view dashboard) shall require no more than 2 taps/clicks from the home screen
- The catch form shall be completable in under 60 seconds for required fields only

### NFR-03: Reliability
- Data stored in localStorage shall not be lost on normal browser close/reopen
- The app shall handle empty states gracefully (no catches yet, no data for charts)

### NFR-04: Compatibility
- The app shall function correctly in Chrome, Firefox, and Safari (latest 2 versions)
- The app shall not require any installation or account creation for MVP

### NFR-05: Accessibility
- All form inputs shall have associated labels
- Color shall not be the only means of conveying information in charts
- Minimum touch target size of 44x44px on mobile

---

## 5. Out of Scope (MVP)

The following are explicitly excluded from the initial build:

- User authentication / accounts
- Cloud sync or multi-device sync
- Social features (sharing, leaderboards)
- Photo attachments
- Map-based location entry
- Weather API integration
- Export to CSV
- Offline PWA mode

These may be revisited in a post-MVP phase.

---

## 6. Assumptions

- A single user per device (no multi-user support)
- localStorage provides sufficient capacity (~5MB) for typical angler data volumes
- Users will enter weight in their preferred unit manually (no GPS or sensor input)
- The app will be accessed primarily via a web browser

---

## 7. Constraints

- No backend server for MVP — frontend only
- Must be buildable as a single React application
- No paid APIs or services
- Must be deployable to GitHub Pages or Vercel for free

---

*This document was generated with Claude (Anthropic) as part of the AI-assisted SDLC process. Reviewed and approved by project owner before implementation.*