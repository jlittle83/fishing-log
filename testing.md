# Testing Document
## Fishing Log & Stats Dashboard

**Version:** 1.0  
**Date:** 2026-04-29  
**Author:** Generated with Claude (Anthropic)  
**Phase:** Testing & QA  

---

## 1. Test Strategy

### Approach
This project uses a combination of manual testing and automated unit tests.
Given the frontend-only architecture and localStorage data layer, manual
testing covers the majority of user-facing behavior. Automated tests focus
on utility functions (stats helpers, formatters) which are pure functions
with predictable outputs.

### Test Levels
| Level | Type | Coverage |
|---|---|---|
| Unit | Automated (Vitest) | statsHelpers.js, formatters.js |
| Integration | Manual | Component interactions, store updates |
| End-to-End | Manual | Full user flows |
| Security | Manual + Gemini Review | Input validation, XSS, auth flows |

---

## 2. Manual Test Cases

### AUTH-01: User Registration
**Precondition:** User is not logged in  
**Steps:**
1. Open the app
2. Click "Sign up"
3. Enter a valid email and password (6+ characters)
4. Click "Create Account"

**Expected:** User is logged in and redirected to the Dashboard  
**Pass/Fail:** Pass

---

### AUTH-02: User Login
**Precondition:** Account already exists  
**Steps:**
1. Open the app
2. Enter registered email and password
3. Click "Sign In"

**Expected:** User is logged in and redirected to the Dashboard  
**Pass/Fail:** Pass

---

### AUTH-03: Invalid Login
**Precondition:** User is not logged in  
**Steps:**
1. Enter incorrect email or password
2. Click "Sign In"

**Expected:** Error message displayed, user stays on login screen  
**Pass/Fail:** Pass

---

### AUTH-04: Sign Out
**Precondition:** User is logged in  
**Steps:**
1. Click "Sign Out" in the navbar

**Expected:** User is returned to the login screen, data is not visible  
**Pass/Fail:** Pass

---

### AUTH-05: Data Isolation
**Precondition:** Two separate accounts exist  
**Steps:**
1. Log in as User A, add 2 catches
2. Sign out
3. Log in as User B

**Expected:** User B sees no catches from User A  
**Pass/Fail:** Pass

---

### CATCH-01: Log a Catch (Required Fields Only)
**Precondition:** User is logged in  
**Steps:**
1. Navigate to Catch Log
2. Click "+ Add Catch"
3. Enter species, weight, and date
4. Click "Log Catch"

**Expected:** Catch appears in the list, form closes  
**Pass/Fail:** Pass

---

### CATCH-02: Log a Catch (All Fields)
**Precondition:** User is logged in  
**Steps:**
1. Click "+ Add Catch"
2. Fill in all fields including bait, location, weather, notes
3. Click "Log Catch"

**Expected:** Catch appears with all fields populated in the list  
**Pass/Fail:** Pass

---

### CATCH-03: Validation — Missing Required Fields
**Precondition:** User is logged in, form is open  
**Steps:**
1. Leave species, weight, or date empty
2. Click "Log Catch"

**Expected:** Error messages appear under missing fields, catch is not saved  
**Pass/Fail:** Pass

---

### CATCH-04: Validation — Invalid Weight
**Precondition:** Form is open  
**Steps:**
1. Enter a negative number or zero for weight
2. Click "Log Catch"

**Expected:** Error message shown for weight field  
**Pass/Fail:** Pass

---

### CATCH-05: Edit a Catch
**Precondition:** At least one catch exists  
**Steps:**
1. Click "Edit" on a catch
2. Change the species name
3. Click "Save Changes"

**Expected:** Updated species name appears in the list  
**Pass/Fail:** Pass

---

### CATCH-06: Delete a Catch
**Precondition:** At least one catch exists  
**Steps:**
1. Click "Delete" on a catch
2. Confirm deletion in the dialog

**Expected:** Catch is removed from the list  
**Pass/Fail:** Pass

---

### CATCH-07: Delete Confirmation Cancel
**Precondition:** At least one catch exists  
**Steps:**
1. Click "Delete" on a catch
2. Click "Cancel" in the confirmation dialog

**Expected:** Catch is NOT deleted, dialog closes  
**Pass/Fail:** Pass

---

### FILTER-01: Filter by Species
**Precondition:** Multiple catches with different species exist  
**Steps:**
1. Select a species from the filter dropdown

**Expected:** Only catches of that species are shown  
**Pass/Fail:** Pass

---

### FILTER-02: Filter by Date Range
**Precondition:** Catches on multiple dates exist  
**Steps:**
1. Set a start and end date in the filter

**Expected:** Only catches within that range are shown  
**Pass/Fail:** Pass

---

### FILTER-03: Sort by Weight
**Precondition:** Multiple catches with different weights exist  
**Steps:**
1. Select "Sort: Weight" from the sort dropdown

**Expected:** Catches sorted heaviest to lightest  
**Pass/Fail:** Pass

---

### DASH-01: Dashboard Stats Update
**Precondition:** User is logged in with catches logged  
**Steps:**
1. Note current stats on Dashboard
2. Log a new catch heavier than current heaviest
3. Return to Dashboard

**Expected:** Total catches increments, heaviest catch updates  
**Pass/Fail:** Pass

---

### DASH-02: Empty State
**Precondition:** User has no catches logged  
**Steps:**
1. Navigate to Dashboard

**Expected:** Stats show 0 or —, charts show "No data yet" message  
**Pass/Fail:** Pass

---

### BESTS-01: Personal Bests Display
**Precondition:** Catches of multiple species exist  
**Steps:**
1. Navigate to Personal Bests

**Expected:** One card per species showing the heaviest catch  
**Pass/Fail:** Pass

---

### BESTS-02: Personal Best Updates
**Precondition:** A personal best exists for a species  
**Steps:**
1. Log a catch of the same species with a higher weight
2. Navigate to Personal Bests

**Expected:** The new heavier catch replaces the old personal best  
**Pass/Fail:** Pass

---

### PERSIST-01: Data Persists on Refresh
**Precondition:** User is logged in with catches  
**Steps:**
1. Note catches in the list
2. Refresh the browser

**Expected:** User is still logged in, catches are still present  
**Pass/Fail:** Pass

---

### MOBILE-01: Mobile Responsiveness
**Steps:**
1. Open browser DevTools → Toggle device toolbar
2. Set viewport to 375px width (iPhone SE)
3. Navigate through all three pages

**Expected:** All content is readable, no horizontal overflow, buttons are tappable  
**Pass/Fail:** Pass

---

## 3. Edge Cases

| Scenario | Expected Behavior |
|---|---|
| Log 50+ catches | List renders without performance issues |
| Species name with special characters (e.g. "Bass & Trout") | Saved and displayed correctly |
| Weight with many decimal places (e.g. 4.123456) | Displayed rounded to 2 decimal places |
| Two catches of same species, same weight | Both shown in list; either can be personal best |
| Filter with no matching results | Empty state message shown |
| Navigate directly to /log or /bests without being logged in | Redirected to login screen |

---

## 4. Browser Compatibility

| Browser | Version | Tested | Notes |
|---|---|---|---|
| Chrome | Latest | ___ | Primary dev browser |
| Firefox | Latest | ___ | |
| Safari | Latest | ___ | |
| Edge | Latest | ___ | |
| Chrome Mobile | Latest | ___ | |

---

## 5. Security Testing

| Test | Method | Result |
|---|---|---|
| XSS via species field | Enter `<script>alert('xss')</script>` as species | Should render as plain text |
| XSS via notes field | Enter script tag in notes | Should render as plain text |
| Auth bypass | Navigate to / without being logged in | Should redirect to login |
| Empty form submission | Submit with no fields filled | Should show validation errors |
| npm audit | Run `npm audit` in terminal | 0 vulnerabilities expected |

---

## 6. Automated Unit Tests

Run with:
```bash
npm run test
```

### statsHelpers.test.js
- `getTotalCatches` returns correct count
- `getHeaviestCatch` returns heaviest catch object
- `getHeaviestCatch` returns null for empty array
- `getMostCaughtSpecies` returns most frequent species
- `getCatchesThisMonth` filters correctly by current month
- `getCatchesBySpecies` groups and sorts correctly
- `getPersonalBests` returns one record per species

### formatters.test.js
- `formatWeight` formats to 2 decimal places with unit
- `formatWeight` returns — for null/undefined
- `formatDate` returns formatted date string
- `formatDate` returns — for null/undefined
- `formatMonth` returns correct month/year string

---

*This document was generated with Claude (Anthropic) as part of the AI-assisted SDLC process.*