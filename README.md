# FinCalc — Smart Finance Calculators

A production-ready React + Vite + Tailwind CSS finance calculator website with SEO, AdSense, and PDF export support.

## 🚀 Features

- ✅ Simple Interest Calculator
- ✅ Compound Interest Calculator (with yearly growth chart)
- ✅ EMI Calculator (with amortization table)
- ✅ Dark mode (persisted in localStorage)
- ✅ PDF export with jsPDF
- ✅ Copy result to clipboard
- ✅ Share result (Web Share API)
- ✅ Last calculation saved in localStorage
- ✅ Animated number counters
- ✅ Responsive/mobile-first design
- ✅ Google AdSense placeholders
- ✅ SEO-ready (meta, sitemap.xml, robots.txt, canonical URLs)
- ✅ Glassmorphism design

---

## 📁 Folder Structure

```
fincalc/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AdBanner.jsx          ← Replace with real AdSense code
│   │   ├── InputField.jsx
│   │   ├── ResultCard.jsx
│   │   ├── ActionButtons.jsx
│   │   ├── PageHeader.jsx
│   │   └── SEOMeta.jsx
│   ├── hooks/
│   │   ├── useDarkMode.js
│   │   ├── useLocalStorage.js
│   │   └── useAnimatedNumber.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SimpleInterest.jsx
│   │   ├── CompoundInterest.jsx
│   │   ├── EMICalculator.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── pdfExport.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🛠️ Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**

### vercel.json (optional — for SPA routing)

Create `vercel.json` in root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 💰 Google AdSense Setup

1. Sign up at [adsense.google.com](https://adsense.google.com)
2. Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. Add AdSense script to `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. Replace placeholder in `src/components/AdBanner.jsx` with your ad unit code

---

## 🔍 SEO Configuration

Update these files with your actual domain:

- `index.html` — og:url, canonical
- `public/sitemap.xml` — All `<loc>` URLs
- `public/robots.txt` — Sitemap URL
- Each page's `SEOMeta` component — canonical prop

---

## 🎨 Customization

### Change currency symbol
Edit `src/utils/formatters.js` — change `'INR'` to your currency and symbol.

### Add more calculators
1. Create `src/pages/YourCalculator.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navbar.jsx`
4. Add to Home page CALCULATORS array

### Change colors
Edit `tailwind.config.js` theme section and `src/index.css` CSS variables.
