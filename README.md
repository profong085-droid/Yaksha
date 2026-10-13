# ⚡ Yaksha Sports — Creative Football Jersey E-Commerce

<p align="center">
  <img src="public/LOGO%20YAK%20web.png" alt="Yaksha Sports Logo" width="220" />
</p>

<p align="center">
  <strong>A premium, modern e-commerce web application inspired by creative football jersey culture.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#customization">Customization</a>
</p>

---

## ✨ Features

- **🏆 Dynamic Hero Showcase**: High-impact campaign banner with smooth auto-sliding, touch swipe support, backdrop-blur navigation arrows, and live progress indicators.
- **👕 Rich Product Carousel & Grid**:
  - Instant lookbook hover preview on jersey cards (switches to model photos on hover).
  - Quick options selector with intuitive drawer checkout.
- **🔍 Full Product Detail Page (PDP)**:
  - Multi-angle gallery with floating `‹` and `›` circular navigation buttons.
  - Interactive thumbnail switcher.
  - Cross-product header navigation (`‹ Previous product` / `Next product ›`).
  - Size selection (`XS` through `4XL`), quantity selector, and accordion product guides.
- **🛍️ Slide-Over Shopping Drawer**: Live bag counter, instant quantity adjustment, subtotal calculations, and responsive slide-out cart panel.
- **💳 Multi-Provider Payment Support**:
  - Global providers: **Visa**, **Mastercard**, **PayPal**, **Klarna**, **Apple Pay**.
  - Local banking integration: **ABA Bank** and **ACLEDA Bank**.
- **💬 Social Channels & Contact Us**: Dedicated quick-access buttons for **Facebook**, **TikTok**, and **Telegram**.
- **⚡ Supercharged Performance**: Built on Vite with Tailwind CSS v4 for lightning-fast loads and smooth 60fps micro-animations.

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` & custom modular CSS tokens
- **Typography**: [Google Fonts](https://fonts.google.com/) (Montserrat & Red Hat Display)
- **Package Management**: [pnpm](https://pnpm.io/) / [npm](https://www.npmjs.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or `npm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/profong085-droid/Yaksha.git
   cd Yaksha
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or: npm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   # or: npm run dev
   ```

   The app will run locally at `http://localhost:8443` (or the port specified in your environment).

4. **Build for production:**
   ```bash
   pnpm build
   # or: npm run build
   ```

---

## 📁 Project Structure

```text
├── public/                     # Static media assets & product imagery
│   ├── LOGO YAK web.png        # Official brand logo
│   └── products/               # High-res product photographs & posters
│       └── yaksha-sirrush/     # Yaksha Sports Sirrush Special Jersey assets
├── src/
│   ├── App.tsx                 # Core application shell & homepage layout
│   ├── Pages.tsx               # Product detail pages, collections & catalog views
│   ├── BrandPages.tsx          # Editorial brand stories & lookbooks
│   ├── PaymentIcons.tsx        # SVG payment badges (Visa, Mastercard, ABA, ACLEDA...)
│   ├── store.tsx               # Cart state management, slug utilities & catalog types
│   ├── catalog.json            # Product catalog database
│   ├── content.json            # Homepage hero slides, featured items & brand clubs
│   ├── index.css               # Global CSS & Tailwind CSS v4 imports
│   ├── reference.css           # Custom layout & interactive widget styling
│   └── main.tsx                # React application entrypoint
├── index.html                  # HTML entrypoint
├── vite.config.ts              # Vite configuration
└── package.json                # Project dependencies and scripts
```

---

## 🎨 Branding & Products

### Featured Product
- **Yaksha Sports Sirrush Special Jersey**: Deep imperial maroon jersey adorned with golden dragon motifs, traditional circular emblems, and structured collar detailing.
- Available across sizes `XS` through `4XL`.

---

## 📄 License

This project is created for demonstration and portfolio purposes. All design patterns and brand assets belong to their respective creators.
