Tool: Claude (Anthropic)
Phase: Implementation
Date: 2026-04-29
Context
The original architecture document (v1.0) explicitly listed authentication as
out of scope for the MVP. The SDP revision also removed auth to simplify the
stack. This entry documents the decision to override that and add Firebase
Authentication.
Original AI Recommendation
Claude and the revised SDP both recommended no authentication for MVP:

"No auth for MVP — adds complexity without demo value"
"Single user per device is sufficient"
Listed under Out of Scope in both plan.md and requirements.md

Project Owner Override
After the core app was built and functional, the project owner decided to add
Firebase Authentication for the following reasons:

Each user should have their own private catch data
Without auth, anyone on the same device shares the same localStorage data
Firebase Auth is free and integrates cleanly with React
Adds meaningful real-world complexity to the project
Demonstrates ability to extend a working system without breaking it

Prompt Used
"I would like to add authentication using Firebase so that every user has
their unique data for the website"
What Claude Did

Advised using npm over script tags for a Vite/React project
Generated firebase.js initialization file
Flagged API key exposure risk immediately and guided rotation
Added .env environment variable setup
Generated useAuthStore.js (Zustand auth state)
Generated Login.jsx (sign in / sign up form)
Updated useCatchStore.js to scope catches by userId
Updated App.jsx with protected routes and loading state
Updated Navbar.jsx with user email display and sign out button
Updated all dashboard and list components to filter by user.uid

What I Kept

Full Firebase Auth integration as described
Environment variable approach for API key security
userId scoping on all catch data

What I Changed

Deployment target noted for Cloudflare Pages environment variables
(will need to add VITE_ vars in Cloudflare Pages dashboard settings)

What I Rejected

Nothing — implementation matched the requirement

Where AI Fell Short

Did not proactively warn about the API key exposure risk before I pasted
the config into chat. Claude caught it after the fact and guided the fix,
but a more proactive warning earlier would have been better.

Critical Reflection
This override was the right call. The original "no auth" decision was made
to simplify the MVP, but auth fundamentally changes the app from a single-user
tool to a proper multi-user web application. The addition required updating
nearly every component to filter by userId — a good example of how an
architectural decision (auth vs no auth) cascades through the entire codebase.
Firebase was the right choice here: free tier, easy React integration, and
email/password auth requires minimal configuration. The tradeoff is vendor
lock-in to Google's ecosystem, which is acceptable for an MVP.