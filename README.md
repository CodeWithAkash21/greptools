# grepTools

grepTools is a fast, privacy-first, client-side developer utility platform. Built with Next.js 14, TypeScript, and Tailwind CSS, it offers developers a suite of lightweight, browser-based utilities with zero server-side storage, zero tracking bloat, and instantaneous client-side calculations.

All inputs, calculations, and conversions are handled locally inside the browser. Your access tokens, JSON structures, URL strings, and configuration payloads never traverse the network.

---

## Key Features

*   **⚡ 100% Client-Side Processing**: Zero server-side execution. Core calculations leverage native browser APIs (such as the standard JavaScript Web Cryptography API) to run locally, eliminating server latency and data exposure.
*   **🔒 Privacy-First Design**: Tool inputs are processed locally in your browser and are not intentionally transmitted to our servers.
*   **🚀 Clean, Minimalist UI/UX**: Designed with dark-mode aesthetic principles, featuring smooth Framer Motion micro-animations, Spotter-style command palettes, and custom line/character counters.
*   **📈 Fully SEO-Optimized**: Comprehensive JSON-LD structured schemas, FAQ integration, canonical linking, and page-specific semantic hierarchies for search engines.
*   **🔌 Zero Configuration Consent**: Privacy-law compliant analytics loading that defaults to "denied" consent until explicitly accepted.

---

## Technology Stack

*   **Core**: [Next.js 14.2](https://nextjs.org/) (App Router)
*   **UI Library**: [React 18](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) & custom HSL design tokens in `src/app/globals.css`
*   **Animations**: [Framer Motion v12](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## Project Structure

```text
d:/Greptools.dev/
├── src/
│   ├── app/                    # Next.js App Router Pages and Layouts
│   │   ├── about/              # About grepTools
│   │   ├── contact/            # Contact form
│   │   ├── cookies/            # Cookies policy page
│   │   ├── privacy/            # Privacy policy page
│   │   ├── terms/              # Terms of service page
│   │   ├── tools/              # Utility router directories
│   │   │   ├── base64-encoder/
│   │   │   ├── json-formatter/
│   │   │   ├── unix-timestamp-converter/
│   │   │   ├── url-encoder/
│   │   │   └── uuid-generator/
│   │   ├── globals.css         # Custom stylesheet and design tokens
│   │   ├── layout.tsx          # Root Layout & script tags
│   │   └── page.tsx            # Hero Landing Page
│   └── components/
│       ├── ads/                # AdSense AdSlot wrapper
│       ├── home/               # Landing sections (CommandBar, FAQ, Stats)
│       ├── layout/             # Sticky Header
│       ├── legal/              # Cookie banner and GA loader
│       ├── site/               # Site-wide components (Breadcrumb, CopyButton)
│       └── tools/              # Core tool panels
```

---

## Getting Started

### Prerequisites

*   **Node.js**: `18.x` or higher (recommended: LTS version)
*   **npm**: `10.x` or higher

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/greptools.git
    cd greptools
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure the environment variables:
    Create a `.env.local` in the project root:
    ```env
    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
    ```

### Running Locally

To start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run static lint analysis:
```bash
npm run lint
```

### Production Build

Compile and bundle the project:
```bash
npm run build
```

Start the built application locally:
```bash
npm run start
```

---

## Implemented Tools

1.  **JSON Formatter & Validator**: Format, minifies, and validates JSON with syntax highlighting and precise error line pointers.
2.  **Base64 Encoder/Decoder**: Encode and decode text to Base64 using Unicode-safe character mapping.
3.  **URL Encoder/Decoder**: URL-percent encode query strings and paths with real-time validation checks.
4.  **UUID Generator**: Instantly generate random UUID v4 identifiers in bulk.
5.  **Unix Timestamp Converter**: Bidirectional conversion between Epoch seconds/milliseconds and human-readable UTC dates.

---

## Project Roadmap

*   [ ] **JWT Debugger**: Client-side JSON Web Token parser and header/payload validation.
*   [ ] **Regex Tester**: Real-time regular expression tester with sub-string match coloring.
*   [ ] **Markdown Editor & Live Preview**: Responsive Markdown parser with side-by-side output.
*   [ ] **Cron expression Generator**: Interactive cron scheduler with human-readable explanations.
*   [ ] **Hash/HMAC Generator**: Cryptographic hash calculations (SHA-256, SHA-512, MD5) using Web Crypto.

---

## Contributing

We welcome contributions to grepTools! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for code styling guidelines, component standards, and instructions for creating new tools.

---

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## Contact

For bug reports, feature requests, or queries, please open an issue in this repository or contact the maintainer at `support@greptools.dev`.
