# Installation Guide

Follow this guide to set up your local development environment, configure environment variables, run tests, compile production builds, and deploy the grepTools platform.

---

## 1. Prerequisites

### Node.js Engine
grepTools requires **Node.js LTS** (version `18.x` or `20.x`). Avoid legacy versions (`<16.x`) as they do not support several global Next.js compiling dependencies.

To verify your Node.js version:
```bash
node -v
```

### Package Manager
The project uses **npm** for package management, and dependencies are locked using `package-lock.json`. 

Verify npm version:
```bash
npm -v
```

---

## 2. Local Environment Setup

### Step 1: Clone the Repository
Clone the codebase to your local directory:
```bash
git clone https://github.com/your-username/greptools.git
cd greptools
```

### Step 2: Install Project Dependencies
Run npm install in the root folder to download and resolve node modules:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a file named `.env.local` in the project root:
```env
# Google Analytics Measurement ID (Leave blank to disable tracking)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 3. Running grepTools Locally

### Starting the Development Server
Run the local dev command. Next.js starts compilation on hot-reload mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage dashboard.

### Linting and Code Validation
Before committing files, execute the Next.js static lint tool to check TypeScript formatting and code syntax correctness:
```bash
npm run lint
```

---

## 4. Production Compilation

To generate a optimized web bundle and verify build stability:

### Step 1: Build the Bundle
Run the build script, compiling pages, styles, and assets:
```bash
npm run build
```

### Step 2: Test the Production Build
Run the built server locally to test production behaviors (e.g., headers, layouts, caching):
```bash
npm run start
```

---

## 5. Deployment to Vercel

grepTools is optimized for immediate deployment on the Vercel platform.

### Deployment via Vercel CLI (Recommended)
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in and initialize deployment inside the project root:
   ```bash
   vercel
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```

### Deployment via GitHub Integration
1. Push your local repository to GitHub/GitLab.
2. Link the repository inside the Vercel dashboard.
3. Configure the build settings (Vercel automatically detects Next.js):
   * **Build Command**: `npm run build`
   * **Output Directory**: `.next`
   * **Install Command**: `npm install`
4. Set Environment Variables:
   * Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   * Value: `G-XXXXXXXXXX`
5. Click **Deploy**.

---

## 6. Troubleshooting & Common Issues

### Issue 1: Node Version Incompatibility
**Error Message**: `Next.js requires a Node.js version of >=18.17.0`
* **Resolution**: Use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to upgrade Node.js.
  ```bash
  nvm install 20
  nvm use 20
  ```

### Issue 2: Next.js Cache Issues
**Symptom**: Local edits do not render or build compilation fails on stale cache entries.
* **Resolution**: Delete the `.next` and `node_modules` folders, re-install, and restart the compiler:
  ```bash
  rm -rf .next node_modules
  npm install
  npm run dev
  ```

### Issue 3: Hydration Error
**Error Message**: `Text content did not match. Server: "..." Client: "..."`
* **Resolution**: Ensure client components that depend on local state (such as the live current timestamp or cookie state) use React's `useEffect` hook to defer client rendering, or disable hydration warnings using the `suppressHydrationWarning` property on elements.
