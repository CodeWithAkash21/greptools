# Developer Tools Specifications

This document catalogs the functional details, configurations, use cases, inputs, and search keywords for every tool currently implemented in grepTools.

---

## 1. JSON Formatter & Validator

*   **Path**: `/tools/json-formatter`
*   **Component**: [JsonFormatter.tsx](file:///d:/Greptools.dev/src/components/tools/JsonFormatter.tsx)

### Functional Purpose
Format unreadable, minified, or disorganized JSON data into structured, indented (2-space) blocks. Identifies syntax errors (missing brackets, trailing commas, single-quoted keys) with precise line and column markers. Can also compress JSON into a single line.

### Inputs & Outputs
*   **Input**: Raw string containing standard JSON notation.
*   **Output**: Formatted/minified JSON text decorated with custom HSL token elements for syntax coloring (`.token-key`, `.token-string`, `.token-boolean`, `.token-null`, `.token-number`).

### Real-World Use Cases
*   Beautifying nested logs collected from application servers.
*   Minifying payload configurations before sending requests in REST clients.
*   Checking the validity of custom JSON configuration files.

### Target SEO Keywords
*   `json formatter`, `json validator`, `json beautifier`, `validate json online`, `minify json`

### Related Tools
*   Base64 Encoder/Decoder, URL Encoder/Decoder, UUID Generator, Unix Timestamp Converter

---

## 2. Base64 Encoder/Decoder

*   **Path**: `/tools/base64-encoder`
*   **Component**: [Base64Tool.tsx](file:///d:/Greptools.dev/src/components/tools/Base64Tool.tsx)

### Functional Purpose
Allows bidirectional conversion of text payloads to and from standard Base64 encoding. Built using Unicode-safe URI conversions (`encodeURIComponent` & `decodeURIComponent`) to ensure that non-ASCII symbols, accents, or emojis do not cause encoding errors.

### Inputs & Outputs
*   **Input**: 
    *   *Encode Mode*: Raw plain text string (UTF-8).
    *   *Decode Mode*: Standard ASCII Base64 encoded string.
*   **Output**: Base64 encoded result or plain decoded string.

### Real-World Use Cases
*   Encoding credentials for Basic Authentication headers.
*   Decoding encoded tokens from webhook headers or payload parameters.
*   Converting raw string blocks into text-safe transfer representations.

### Target SEO Keywords
*   `base64 encoder`, `base64 decoder`, `decode base64 online`, `base64 text converter`, `utf8 base64`

### Related Tools
*   URL Encoder/Decoder, JSON Formatter & Validator, UUID Generator

---

## 3. URL Encoder/Decoder

*   **Path**: `/tools/url-encoder`
*   **Component**: [UrlEncoderTool.tsx](file:///d:/Greptools.dev/src/components/tools/UrlEncoderTool.tsx)

### Functional Purpose
Bidirectional transformation of strings to standard URL percent-encoded format. Ensures that URL queries, paths, and values comply with query specifications without breaking browser parser systems.

### Inputs & Outputs
*   **Input**: Plain URL strings, special characters, or percent-encoded variables.
*   **Output**: Standard URL-safe percent-encoded strings.

### Real-World Use Cases
*   Encoding special search characters (e.g. `spaces`, `&`, `?`, `=`) for query string values.
*   Decoding query string arguments extracted from browser addresses or API call links.

### Target SEO Keywords
*   `url encoder`, `url decoder`, `percent encoding`, `decode url query online`, `urlsafe encoder`

### Related Tools
*   Base64 Encoder/Decoder, JSON Formatter & Validator

---

## 4. UUID Generator

*   **Path**: `/tools/uuid-generator`
*   **Component**: [UuidGeneratorTool.tsx](file:///d:/Greptools.dev/src/components/tools/UuidGeneratorTool.tsx)

### Functional Purpose
Generates cryptographically secure v4 Universally Unique Identifiers (UUIDs). Uses the native browser Web Cryptography API (`crypto.randomUUID`) to generate random values, with a mathematical RFC4122 v4 generator fallback if the browser lacks Crypto API support.

### Inputs & Outputs
*   **Input**: Numeric count (between 1 and 100).
*   **Output**: A list of randomly generated UUID strings with individual copy triggers.

### Real-World Use Cases
*   Generating primary key IDs for mock SQL database fixtures.
*   Creating unique event correlation IDs for application log tracking.
*   Generating transaction test identifiers for API development.

### Target SEO Keywords
*   `uuid generator`, `random uuid v4`, `generate guid online`, `bulk uuid generator`, `random id generator`

### Related Tools
*   Unix Timestamp Converter, JSON Formatter & Validator, UUID Generator

---

## 5. Unix Timestamp Converter

*   **Path**: `/tools/unix-timestamp-converter`
*   **Component**: [UnixTimestampTool.tsx](file:///d:/Greptools.dev/src/components/tools/UnixTimestampTool.tsx)

### Functional Purpose
Provides real-time conversions between Unix Epoch timestamps (in seconds or milliseconds) and human-readable UTC date-time string representations. Features a live epoch clock that updates every second.

### Inputs & Outputs
*   **Input**:
    *   *Epoch conversion*: Numeric timestamp value (e.g. `1718444400`).
    *   *Date conversion*: ISO-8601 or standard date-time string (e.g. `2024-06-15T12:00:00Z`).
*   **Output**: Human-readable UTC date string or numeric Unix epoch value.

### Real-World Use Cases
*   Translating epoch values extracted from SQL databases or logs into readable times.
*   Calculating exact timestamps for time-limited authentication tokens or cookie expiries.
*   Checking the current Unix epoch time in seconds or milliseconds.

### Target SEO Keywords
*   `unix timestamp converter`, `epoch converter`, `unix time converter`, `convert epoch to date`, `current unix epoch`

### Related Tools
*   UUID Generator, JSON Formatter & Validator
