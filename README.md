# DSA Visualizer

> **Learn Data Structures & Algorithms through beautiful, step-by-step interactive visualizations.**  
> Watch every comparison, swap, and pointer move in real time — no theory overload, just clarity.

---

## 🚀 Live Demo

> Run locally with `npm run dev` — see [Getting Started](#-getting-started) below.

---

## ✨ Features

- 📊 **Sorting Visualizer** — step-by-step bar chart animation with real pixel-height bars proportional to values
- 🔍 **Searching Visualizer** — animated bar chart with target highlighting, eliminated bars, and Binary Search range bracket
- ⏯ **Playback Controls** — Play, Pause, Reset, and adjustable animation speed
- 🎲 **Array Controls** — randomize, set custom size (4–20), or manually add numbers
- 💻 **Code Panel** — live pseudocode with active-line highlighting synced to the animation
- 📐 **Complexity Cards** — Best / Average / Worst time complexity + Space complexity for every algorithm
- 🎨 **Color-coded states** — each bar is colored by its current role (comparing, swapping, pivot, sorted, found, eliminated)
- 📱 **Responsive layout** — works on desktop and mobile with a tab switcher (Visualizer / Code)

---

## 🧮 Algorithms Implemented

### Sorting
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |

### Searching
| Algorithm | Best | Average | Worst | Space | Requires Sorted |
|-----------|------|---------|-------|-------|-----------------|
| Linear Search | O(1) | O(n) | O(n) | O(1) | ❌ |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) | ✅ |

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── common/           # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CTAButton.jsx
│   │   ├── ColorButton.jsx
│   │   └── HighlightedText.jsx
│   └── core/
│       ├── Sorting/
│       │   ├── Visualizer.jsx     # Bar chart + progress + legend
│       │   ├── ControlPanel.jsx   # Algorithm selector, array controls, playback
│       │   └── CodePanel.jsx      # Complexity cards + live code viewer
│       └── Searching/
│           ├── Visualizer.jsx     # Bar chart + target banner + range bracket
│           ├── ControlPanel.jsx   # Algorithm selector, target input, playback
│           └── CodePanel.jsx      # Complexity cards + live code viewer
├── pages/
│   ├── Home.jsx
│   ├── Algorithms.jsx
│   ├── Sorting.jsx        # Sorting page — orchestrates frames + playback engine
│   ├── Searching.jsx      # Searching page — orchestrates frames + playback engine
│   └── About.jsx
├── utils/
│   ├── sortingAlgorithms.js    # Frame generators: bubble, selection, insertion, merge, quick
│   └── searchingAlgorithms.js  # Frame generators: linear, binary
└── data/
    ├── algocategory.js     # Algorithm category cards data
    └── navbar.js           # Navbar links data
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | ^19 | UI framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | ^7 | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5 | Icon library |

---

## 📦 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Code-Ashish-kumar/DSA_Visualizer.git

# 2. Navigate into the project
cd DSA_Visualizer

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## 🖥 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with project intro and CTAs |
| `/algorithms` | Algorithms | Category cards for all algorithm types |
| `/algorithms/sorting` | Sorting | Full sorting visualizer |
| `/algorithms/search` | Searching | Full searching visualizer |
| `/about` | About | About page |

---

## 🎮 How to Use the Visualizer

1. **Pick an algorithm** from the left panel
2. **Customize the array** — randomize, resize (4–20 elements), or add your own numbers
3. **Set a target** *(Searching only)* — type any number and press Enter
4. **Adjust speed** — drag the speed slider (50ms – 1000ms per step)
5. **Press Play** — watch the animation step through every operation
6. **Pause / Reset** at any time
7. **Switch to Code tab** — see the pseudocode with active-line highlighting

---

## 📁 How Frame Generation Works

Every algorithm produces an array of **frames** before playback starts. Each frame is a snapshot:

```js
// Sorting frame
{ array, comparing: [i, j], swapping: [i, j], sorted: [...], pivot: i }

// Searching frame
{ array, target, current, found, eliminated: [...], low, high, mid }
```

The page component ticks through frames on a `setInterval` (controlled by the speed slider), passing the current frame down to the `Visualizer` component for rendering.

---

## 🤝 Contributing

Contributions are welcome! To add a new algorithm:

1. Add a frame-generator function in `src/utils/sortingAlgorithms.js` or `searchingAlgorithms.js`
2. Register it in the `ALGORITHMS` / `SEARCH_ALGORITHMS` export object with name, complexity, description, and code string
3. The UI picks it up automatically — no other changes needed

---

## 📄 License

This project is open source and free to use for learning purposes.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Code-Ashish-kumar">Ashish Kumar</a>
</div>
