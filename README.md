# <img src="https://raw.githubusercontent.com/ankurdotio/mac-os/8ac7211021508f06721efd855966ad8a74a0f681/public/navbar-icons/apple.svg" alt="Apple" width="40" style="vertical-align:middle" /> macOS Clone — Frontend UI

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A professional, modular, and pixel-perfect macOS-style desktop environment.** Experience the fluidity of macOS directly in your browser. Built for high performance and visual fidelity.

[**Live Demo**](https://simerdeep-portfolio.vercel.app/) • [**Report Bug**](https://github.com/SimerdeepSingh4/mac-os/issues) • [**Request Feature**](https://github.com/SimerdeepSingh4/mac-os/issues)

</div>

---

## 🚀 Experience the Magic

High-fidelity macOS UI implemented with React and Vite, emphasizing subtle interactions and polished visuals — Dock magnification and bounce, Spotlight search, glass-like Control Center, and fluid, draggable windows.

### ✨ Key Features

* **⚡ Smooth Dock:** Dynamic icon scaling, magnification effects, and active state indicators.
* **🔍 Spotlight Search:** Global command palette for quick app launching and navigation.
* **🪟 Advanced Windowing:** Draggable, resizable, and stackable window management powered by `react-rnd`.
* **🎛️ Control Center:** Real-time volume and brightness sliders with interactive toggles.
* **🖼️ Personalization:** Integrated Wallpaper Picker with persistence via `localStorage`.
* **🖱️ Context Intelligence:** Desktop-wide custom right-click menus for quick actions.
* **📱 Built-in Apps:** GitHub Feed, CLI Emulator, Notes, and a mock Spotify integration.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Component-based UI and state management. |
| **Build Tool** | **Vite** | Ultra-fast development and optimized bundling. |
| **Styling** | **SCSS** | Modular styles with glassmorphism and animations. |
| **Interactions** | **React-Rnd** | Industry-standard dragging and resizing logic. |
| **Storage** | **Web Storage** | Seamless persistence for user preferences. |

---

## 💻 Getting Started

### 1. Clone & Install
```bash
git clone [https://github.com/SimerdeepSingh4/mac-os.git](https://github.com/SimerdeepSingh4/mac-os.git)
cd mac-os
npm install
```
### 2. Launch Development
```bash
npm run dev
```
### 3. Production Build
```bash
npm run build
npm run preview
```
## 📂 Project Architecture

```Plaintext
src/
├── 🧠 context/      # Global state for UI behaviors
├── 🎨 assets/       # Global styles and static JSON data
├── 🧩 components/   # Atomic UI units
│   ├── 📦 windows/  # Specialized App window logic
│   ├── 🍏 Nav.jsx   # Global Menu Bar
│   └── 🌊 Dock.jsx  # Interactive App Launcher
└── 🚀 App.jsx       # Core lifecycle and window manager
```
---
## 🙋‍♂️ Author

**Simerdeep Singh Gandhi**

- Portfolio: [https://simerdeep-portfolio.vercel.app/](https://simerdeep-portfolio.vercel.app/)
- GitHub: [@SimerdeepSingh4](https://github.com/SimerdeepSingh4)
- LinkedIn: [Simerdeep Singh Gandhi](https://www.linkedin.com/in/simerdeep-singh-gandhi/)

---

## ✨ Show Your Support

Give a ⭐️ if this project helped you!