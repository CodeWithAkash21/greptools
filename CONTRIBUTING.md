# Contributing to grepTools

Thank you for your interest in contributing to grepTools! We welcome community contributions to expand our suite of browser-based utilities.

To maintain performance, code quality, and consistency across grepTools, please read and follow these contribution guidelines.

---

## 1. Development Workflow

1.  **Fork the Repository**: Create a personal fork on GitHub.
2.  **Clone Locally**:
    ```bash
    git clone https://github.com/your-username/greptools.git
    cd greptools
    ```
3.  **Create a Feature Branch**: Use our standard branch naming convention (see below).
4.  **Install & Start Dev Server**:
    ```bash
    npm install
    npm run dev
    ```
5.  **Develop & Test**: Implement changes, verify UI responsiveness, and run checks.
6.  **Commit & Push**: Follow commit message styles and push branch updates to your fork.
7.  **Submit a Pull Request**: Target the main repository's `main` branch.

---

## 2. Coding & Design Standards

To ensure grepTools is clean and fast, please write code that adheres to these specifications:

### Component Guidelines
*   **100% Client-Side Processing**: Utility logic must process user payloads entirely within the visitor's browser. Server-side APIs or telemetry trackers for tool inputs are strictly prohibited.
*   **Reuse Core Components**:
    *   Wrap tool layouts inside `ToolShell`.
    *   Use `EditorPanel` for standard dual-pane input/output structures.
    *   Use `CopyButton` for clipboard actions.
    *   Use `ErrorBanner` for formatting syntax/validation errors.
*   **Tailwind CSS Integration**: Use Tailwind classes for general padding, flexboxes, and responsive grids. Ensure custom themes refer to HSL color tokens (e.g. `var(--brand-blue)`) defined in `src/app/globals.css`.

### TypeScript Standards
*   Declare interfaces and types explicitly for component parameters.
*   Do not disable TypeScript checks or use `any` types.
*   Handle errors gracefully. Use try/catch blocks and display clear error context to the user.

### SEO & Webmaster Specifications
*   Every page router file must define metadata configurations (page titles, alternates, OpenGraph cards, Twitter cards).
*   Structure a rich JSON-LD FAQPage scheme for the tool page to enable Google search result rich snippets.
*   Ensure interactive elements have unique and descriptive DOM `id` and `aria-label` tags for screen readers and end-to-end tests.

---

## 3. Tool Creation Checklist

When implementing a new utility page, ensure you complete the following steps:
1.  [ ] Created routing folder `src/app/tools/my-new-tool/page.tsx`.
2.  [ ] Added metadata object with descriptive title and search keywords in the routing page.
3.  [ ] Configured JSON-LD FAQ Schema object inside the routing page.
4.  [ ] Created core implementation component `src/components/tools/MyNewTool.tsx`.
5.  [ ] Wrapped the component inside the `ToolShell` layout wrapper in the routing page.
6.  [ ] Reused `EditorPanel` or structured display grids with clear character/line statistics.
7.  [ ] Validated layout responsiveness across mobile, tablet, and widescreen monitors.
8.  [ ] Ran `npm run lint` and resolved all static syntax and compiler warnings.
9.  [ ] Ran `npm run build` locally to confirm the production bundle compiles successfully.

---

## 4. Git Standards & PR Review Process

### Branch Naming Conventions
Match branch prefixes to the nature of your changes:
*   `feature/` — Implementing a new utility tool or feature component (e.g. `feature/jwt-debugger`).
*   `fix/` — Fixing bugs, layout issues, or compiler warnings (e.g. `fix/b64-utf8-emoji`).
*   `docs/` — Documentation updates, readmes, and manuals (e.g. `docs/seo-sitemaps`).
*   `refactor/` — Reorganizing layouts or upgrading frameworks without changing functionality.

### Commit Message Styles
We follow the conventional commit structure. Messages should be concise, written in the present tense, and lowercase:
*   `feat: add md5 hash generator tool`
*   `fix: resolve epoch millis rounding issue`
*   `docs: update vercel deployment guidelines`
*   `style: improve command bar mobile transition`

### Pull Request Process
1.  Target the `main` branch of the upstream repository.
2.  Describe your changes in detail in the PR description, referencing any relevant issues.
3.  Ensure the Next.js production build compiles successfully and `npm run lint` passes before submitting.
4.  Maintain documentation integrity. Update corresponding files in the `/docs` folder if you change configurations or tool capabilities.
