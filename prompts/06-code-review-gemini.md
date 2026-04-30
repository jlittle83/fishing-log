---

## Round 2 Review — Full Codebase (statsHelpers.js included)
**Date:** 2026-04-30

### Additional Findings

#### What Gemini Got Right ✅

**Invalid Date crash in statsHelpers — VALID & FIXED**
If c.date is undefined or malformed, new Date(undefined) returns Invalid Date.
Calling .getMonth() on that throws a runtime error and crashes the UI.
Fix implemented: added isValidDate() guard function, applied to 
getCatchesThisMonth and getCatchesOverTime.

**Bridging Auth and Store via onAuthStateChanged — VALID & FIXED**
Calling clearStore() directly inside onAuthStateChanged when user is null is
cleaner than doing it only in the logout action. Covers edge cases like token
expiry and session timeout, not just manual logout.
Fix implemented: updated useAuthStore.js to call 
useCatchStore.getState().clearStore() inside onAuthStateChanged when user is null.

#### What We Pushed Back On ⚠️

**useMemo for stats helpers — REJECTED**
Gemini recommended wrapping all stats helper calls in useMemo to prevent 
recalculation on every render. For a fishing log with typical data volumes,
this is premature optimization that adds complexity without meaningful benefit.

**Per-user localStorage keys — REJECTED**
Gemini suggested using userId as part of the persist storage key for full
data isolation. While clever, this requires dynamic store initialization per
user — significant complexity not warranted for this MVP. Current approach
(filter by userId in components) is simpler and sufficient.

### Additional Changes Made

| Change | Reason | File |
|---|---|---|
| Added isValidDate() guard | Prevent Invalid Date runtime crash | statsHelpers.js |
| Applied date guard to getCatchesThisMonth | Defensive programming | statsHelpers.js |
| Applied date guard to getCatchesOverTime | Defensive programming | statsHelpers.js |
| clearStore called in onAuthStateChanged | Covers all logout scenarios | useAuthStore.js |