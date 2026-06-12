# AI Usage Declaration

This document declares the use of AI tools in the development of the **Astrologer CRM** project.

## AI Tools Used
- **Antigravity (by Google DeepMind)**: Assisted in codebase analysis, fixing dependency issues, configuring the Vite build setup, database seeding verification, and project documentation.

## Scope of AI Assistance
1. **Debugging and Troubleshooting**:
   - Diagnosed and resolved the `Uncaught ReferenceError: React is not defined` error by creating the missing `vite.config.js` and integrating `@vitejs/plugin-react` to use Vite's automatic JSX runtime.
   - Identified port conflicts (`EADDRINUSE`) on Port `5000` and assisted in clean process management and database re-seeding.
2. **Setup and Validation**:
   - Assisting in testing build processes (`npm run build`) and verifying MongoDB connection scripts.
3. **Documentation**:
   - Generated structuring for project notes, video presentation walkthroughs, and submission readiness checklists.

## Human Ownership and Verification
All code, architecture diagrams, configurations, database seed routines, and application flows were verified, executed, and tested locally. The final deployment, run logic, and code changes are fully understood and owned by the developer.
