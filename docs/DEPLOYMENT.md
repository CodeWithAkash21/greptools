# Deployment Playbook

This document describes the steps required to deploy the grepTools platform to production, map custom domains, configure Google Analytics, and prepare the site for AdSense monetization.

---

## 1. Hosting Setup on Vercel

Vercel provides native compilation, static page optimizations, and low-latency edge deliveries for Next.js applications.

### Setup Integration Pipeline
1.  Navigate to the [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
2.  Import your GitHub repository.
3.  Configure Project Settings:
    *   **Framework Preset**: Select `Next.js`.
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `.next`
4.  Configure Environment Variables:
    *   Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your Google Analytics key.
5.  Click **Deploy**.

---

## 2. Domain & DNS Configuration

To map `greptools.dev` to your Vercel deployment:

1.  In your Vercel project, go to **Settings** > **Domains**.
2.  Add both `greptools.dev` and `www.greptools.dev`. Vercel automatically configures a redirect from the `www` subdomain to your root domain.
3.  Log in to your domain registrar (e.g. Namecheap, GoDaddy) and add the following DNS records:

| Record Type | Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` (Vercel IP) | Default (or 3600) |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Default (or 3600) |

4.  Wait for DNS propagation. Vercel will automatically provision and renew a free Let's Encrypt SSL certificate once DNS records are active.

---

## 3. Analytics & Cookie Consent Integration

grepTools uses Google Analytics 4 (GA4) with a privacy-compliant, user-controlled consent mechanism:

1.  Create a GA4 property in the [Google Analytics Console](https://analytics.google.com/).
2.  Create a Web Data Stream and copy the **Measurement ID** (e.g. `G-XXXXXXXXXX`).
3.  Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your Vercel environment settings.
4.  **Operational Verification**:
    *   On page mount, grepTools loads the analytics script via `AnalyticsLoader.tsx` with all consent flags set to `denied`.
    *   Confirm that no tracking requests are sent to Google servers prior to clicking **Accept** on the cookie banner.
    *   Accepting the banner triggers `gtag('consent', 'update', { ... })` and logs GA sessions.

---

## 4. Google AdSense Integration

To prepare grepTools for AdSense approval:

1.  **Ads.txt Setup**: Create `public/ads.txt` detailing your publisher code to certify monetization authorization:
    ```text
    google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
    ```
2.  **Layout Placeholders**: The `AdSlot.tsx` component is configured with standard sizes (90px height for top banners, 250px height for inline content), fitting AdSense ads seamlessly into your layout.
3.  **Privacy Policy Compliance**: Ensure the `/privacy` page clearly describes third-party advertising operations and browser cookie collection. This is a strict requirement for AdSense approval.

---

## 5. Production Pre-Flight Checklist

Ensure you complete these checks before launching updates to production:

*   [ ] Checked that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Vercel production environment variables.
*   [ ] Confirmed that all tools pass client-side console evaluations.
*   [ ] Confirmed that `sitemap.xml` generates correctly.
*   [ ] Validated that legal pages (Privacy, Terms, Cookies) load without links crashing.
*   [ ] Confirmed that consent banner actions set the corresponding values in browser `localStorage`.
*   [ ] Verified that the site responsive grid functions correctly on mobile screens.
