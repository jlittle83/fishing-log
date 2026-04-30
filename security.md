# Security Document
## Fishing Log & Stats Dashboard

**Version:** 1.0  
**Date:** 2026-04-29  
**Author:** Generated with Claude (Anthropic)  
**Phase:** System & UI Design  

---

## 1. Security Context

The Fishing Log & Stats Dashboard is a **client-side only** web application with no backend server, no database, no authentication, and no network API calls. This significantly limits the attack surface compared to a full-stack application.

This document identifies the relevant security considerations for this architecture and how each is addressed.

---

## 2. Threat Model

| Threat | Relevance | Severity |
|---|---|---|
| SQL Injection | Not applicable — no database | N/A |
| Authentication bypass | Not applicable — no auth | N/A |
| Cross-Site Scripting (XSS) | Applicable — user input rendered in UI | Medium |
| Cross-Site Request Forgery (CSRF) | Not applicable — no server requests | N/A |
| Data breach via API | Not applicable — no API | N/A |
| localStorage data exposure | Applicable — data stored client-side | Low |
| Malicious dependencies | Applicable — third party packages used | Medium |
| Man-in-the-middle (MITM) | Applicable — mitigated by HTTPS | Low |

---

## 3. Security Controls

### 3.1 Cross-Site Scripting (XSS)
**Risk:** User-entered data (species names, notes, location) rendered in the UI could contain malicious scripts.

**Mitigation:**
- React escapes all rendered values by default — `{}` interpolation is safe
- `dangerouslySetInnerHTML` is not used anywhere in the application
- All user input is stored as plain strings and rendered via React's virtual DOM

**Status:** ✅ Handled by React's default behavior

---

### 3.2 Input Validation
**Risk:** Malformed or unexpected input (e.g., negative weights, extremely long strings) could break charts or stats calculations.

**Mitigation:**
- Required fields validated before form submission
- Weight field restricted to positive numeric values
- Date field uses a date picker (structured input)
- String fields have maxLength constraints on inputs
- Stats helper functions handle empty arrays and null values gracefully

**Status:** ✅ Enforced at the form level

---

### 3.3 localStorage Data Exposure
**Risk:** Data stored in localStorage is accessible to any JavaScript running on the same origin. It is not encrypted.

**Mitigation:**
- The application stores only fishing catch data — no personally identifiable information (PII), no passwords, no financial data
- localStorage is appropriate for this data sensitivity level
- Users are implicitly aware their data is local to their device

**Limitation:** If a malicious browser extension or XSS attack runs on the same origin, localStorage data could be read. This is an accepted risk given the low sensitivity of the data.

**Status:** ⚠️ Accepted risk — data sensitivity is low

---

### 3.4 Dependency Security
**Risk:** Third-party npm packages may contain known vulnerabilities.

**Mitigation:**
- Run `npm audit` before deployment to check for known CVEs
- Dependencies pinned to specific versions in `package.json`
- Only well-maintained, widely used packages selected (React, Zustand, Recharts, React Router)

**Commands:**
```bash
npm audit
npm audit fix
```

**Status:** ✅ Monitored via npm audit

---

### 3.5 HTTPS Enforcement
**Risk:** Data transmitted over HTTP could be intercepted.

**Mitigation:**
- Cloudflare Pages serves all content over HTTPS automatically
- No configuration required — enforced at the CDN level

**Status:** ✅ Handled by Cloudflare Pages

---

### 3.6 No Sensitive Data Transmission
**Risk:** Sensitive data sent over the network could be intercepted.

**Mitigation:**
- The application makes no network requests in the MVP
- All data stays in the user's browser (localStorage)
- No analytics, tracking, or third-party scripts included

**Status:** ✅ Not applicable for MVP

---

## 4. Security Checklist (Pre-Deployment)

- [ ] Run `npm audit` and resolve high/critical vulnerabilities
- [ ] Confirm `dangerouslySetInnerHTML` is not used anywhere
- [ ] Confirm all form inputs have validation and maxLength
- [ ] Confirm app is served over HTTPS on Cloudflare Pages
- [ ] Confirm no API keys or secrets are hardcoded in source code
- [ ] Confirm no sensitive user data is stored in localStorage

---

## 5. Future Security Considerations

If the app is extended with a backend or authentication in a future version, the following will need to be addressed:

- JWT token storage (avoid localStorage for auth tokens — use httpOnly cookies)
- API input sanitization server-side
- Rate limiting on auth endpoints
- CORS policy configuration
- Environment variable management (never commit secrets to GitHub)

---

## 6. Gemini Code Review

This application's code will be submitted to Google Gemini for an independent security and code quality review. Findings and responses will be documented in `prompts/05-security-review-gemini.md`.

---

*This document was generated with Claude (Anthropic) as part of the AI-assisted SDLC process.*