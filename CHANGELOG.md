# Changelog

All notable changes to the grepTools project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-05-31

### Added
*   **Core UI Dashboard**: Implemented landing dashboard with dark theme layout using vanilla HSL tokens, Framer Motion transitions, and background particle animation effects.
*   **Fuzzy Command Palette**: Added Spotlight-style command search (`Cmd+K` or `Ctrl+K`) supporting keyboard layout navigation (Arrow Keys + Enter) and search suggestion indexing.
*   **JSON Formatter & Validator**: Added formatting, indentation (2-space), minification, regex token coloring, syntax error alerts with line/column markers, and keyboard shortkeys (`Ctrl+Enter` / `Ctrl+Shift+M`).
*   **Base64 Encoder/Decoder**: Added bidirectional UTF-8 safe base64 encoding and decoding using URL byte code conversion utilities.
*   **URL Encoder/Decoder**: Added URL percent encoding and decoding with real-time encoding diagnostics.
*   **UUID Generator**: Added bulk UUID v4 generator (up to 100 random tokens) with standard fallback generator configurations and clipboard copy utilities.
*   **Unix Timestamp Converter**: Added epoch date-time converter (seconds/milliseconds support), current digital timestamp tracker, and "Use Now" action bindings.
*   **SEO System**: Configured sitemaps generator script (`sitemap.ts`), OpenGraph configurations, canonical links mapping, and JSON-LD FAQ page metadata.
*   **Consent Mode Analytics**: Added user consent banner mapping tracking triggers to local storage consent options (GTag Consent defaults to `denied`).
*   **Layout Utilities**: Created shared structural shells (`ToolShell`), status indicator panel wrappers (`EditorPanel`), and Ad slots (`AdSlot`).
*   **Legal Compliance Pages**: Created standard content pages for Privacy Policy, Terms of Service, Cookies Policy, About us details, and Contact.
