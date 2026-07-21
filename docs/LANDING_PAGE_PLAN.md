# LANDING PAGE PLAN — LAMIM

This document outlines the visual structure, technical architecture, animation choreography, component decomposition, and accessibility plans for the Lamim Landing Page.

---

## 1. FOLDER ARCHITECTURE

The landing page is placed in a completely isolated, standalone directory inside the repository to avoid breaking or polluting the core PWA code:

```
landing-page/
├── index.html                  # Landing page main entrypoint
├── css/
│   ├── layout.css              # Main structural styles & grid grids
│   ├── theme.css               # Color tokens, fonts, glassmorphism utilities
│   └── animations.css          # Custom hardware-accelerated keyframe systems
├── js/
│   ├── main.js                 # Smooth scroll, menu toggle, active section tracking
│   ├── animations.js           # ScrollObserver, stagger reveals, mouse-glow tracking
│   └── emulator.js             # Interactive mini-dashboard emulation (live preview)
└── assets/
    └── [optimized local SVGs for icons, mockups, etc.]
```

---

## 2. DESIGN RATIONALE

### Visual Aesthetic (Modern Dark / Cinema Mobile / Bento Grid)
* **Depth & Layering**: Frosted glass panels over a deep obsidian backdrop (`#05060a` with sub-layers of `#0d0f17`).
* **Calibrated Warmth & Glow**: Slow-moving glowing radial gradients (aurora effect) that dynamically shift in response to user scroll.
* **Apple-Inspired Micro-Motion**: Springs and decays instead of linear transitions, emphasizing natural movement.
* **Clean Typographic Scale**: Oversized headers (64px+) using *Inter Tight*, paired with geometric body text (16px, 1.6 line height) to match premium landing pages like Stripe, Linear, and Vercel.

---

## 3. COMPONENT MAP

| Component Name | Visual Style | Interactivity | Purpose |
|---|---|---|---|
| **Sticky Navigation** | Blurred translucent frosted-glass bar | Dynamic shrink on scroll, active indicator | User navigation across sections, app boot CTA |
| **Cinematic Hero** | Large-scale heading, ambient glow | Interactive 3D device mockup, mouse glow | Emotional anchor, immediate high-end product impression |
| **Interactive Emulator** | Mini dashboard with prayer log nodes | Interactive tap logs, real-time liquid fills | Show-and-tell, lets users "feel" the core mechanic |
| **Privacy Wall** | Monolith card, lock icon | Scroll-activated lens flare | Secure position: "Zero servers. Zero data leakage." |
| **Bento Showcase** | Multi-column grid, modular heights | Card tilt, staggered reveal, custom glows | Feature tour: Salah Tracker, Dhikr, Gym, Finance |
| **Spiritual Rank Slider** | Progress track, glowing rank badge | Drag or tap slider to cycle through titles | Explains the SHS ranking engine visually |
| **Auto-Install Card** | Modern step-by-step PWA card | Browser-specific tab switching | Direct installation instructions for iOS and Android |
| **World-Class Footer** | Sleek footer with subtle columns | Hover glow links | Privacy disclosures, sitemap, repo connection |

---

## 4. ANIMATION STRATEGY

To maintain smooth performance (60fps/120fps) on both mobile and desktop:
* **Hardware-Accelerated Transitions**: We only animate `transform` and `opacity`. No animating `width`, `height`, `margin`, or `top/left` properties.
* **Scroll-Driven Stagger**: Uses a high-performance, native `IntersectionObserver` in JavaScript to attach a `.revealed` class, triggering GPU-bound transition cascades.
* **Mouse Radial Tracking**: Coordinates `mousemove` events to calculate offsets and update a local CSS custom property `--mouse-x` and `--mouse-y` for premium card spotlight glows.
* **Liquid Fills**: Transition heights of SVG layers using `cubic-bezier(0.16, 1, 0.3, 1)` for organic rising animations.

---

## 5. SEO STRATEGY

* **Semantic Tagging**: Extensive use of `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` rather than general `<div>` layouts.
* **Metadata Integrity**: OpenGraph and Twitter Card tags with specific images (using the 512x512 icon) and deep indexing keywords.
* **Structured Data**: Inlines JSON-LD web application scheme for Rich Snippet verification.

---

## 6. RESPONSIVE STRATEGY

* **Mobile-First Layouts**: Media queries stack from base mobile viewports (`320px`, `375px`, `425px`) upwards to large displays (`1440px`, `1920px`).
* **Flex Grids**: Grid layouts use `grid-template-columns: repeat(auto-fit, minmax(...))` so panels wrap cleanly with zero overlapping text.
* **Safe-Touch Target Padding**: Touch points are styled with a minimum target size of `44x44px` on mobile, separated by comfortable spacing.

---

## 7. ACCESSIBILITY (A11Y) REPORT

* **High-Contrast Typography**: Colors are calibrated to meet WCAG AA contrast ratios (minimum 4.5:1 ratio for body text, 3:1 for large display elements).
* **Keyboard Navigation**: Nav items, buttons, and slider controls support full tab-focus with customized, high-visibility focus-rings (`outline: 2px solid var(--color-primary)`).
* **Prefers-Reduced-Motion**: A comprehensive CSS media query overrides all scale, translate, blur, and speed animations when requested by the operating system, snapping states instantly.
