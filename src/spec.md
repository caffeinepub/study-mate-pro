# Specification

## Summary
**Goal:** Fix the current deployment/build failure so the project builds and deploys successfully without errors.

**Planned changes:**
- Reproduce the current deployment/build failure and resolve the underlying build/compile errors blocking deploy.
- Fix Motoko compilation/deployment issues in `backend/main.mo`, including invalid/missing imports and ensuring all frontend-referenced actor methods exist under the single-actor architecture.
- Fix frontend production build blockers so the React+TypeScript app compiles successfully (including code importing generated backend actor types), with no TypeScript/Vite/Tailwind config build-stopping errors.
- Add a lightweight regression-prevention check (and in-repo documentation) for a repeatable local verification step that compiles/builds backend and frontend to catch the failure before deployment.

**User-visible outcome:** A clean build/deploy completes successfully, and a documented verification step exists to prevent the same deployment/build failure from recurring.
