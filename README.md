# DST Icon Design Game

An interactive DST and InnoLab workshop application rewritten as a modern React SPA using TypeScript and Vite. Participants design and showcase mobile application icons for the MyDST app ecosystem, choosing from preset symbols or creating custom touch drawings, detailing feature concepts, and viewing them live on the community Gallery Wall.

## Features

- **Workshop Onboarding & Sign-In**: Age and gender demographics capture with responsive split-screen branding on desktop and touch-friendly mobile stacking.
- **Icon Builder**:
  - **Live Icon Preview**: Real-time rendering of chosen background colors, symbol configurations, or touch drawings with label text.
  - **DST Palette**: 10 brand colors curated for the DST design system.
  - **Symbol Library**: 16 telecom and lifestyle icons (Calls, WiFi, Stream, Bill Pay, e-Wallet, Usage, Rewards, Roaming, QR Pay, Security, Family, Messages, HomeFi, GreenDST, Ideas, Support). Supports up to 4 simultaneous symbols in responsive 2x2 grid layout.
  - **Freehand Canvas**: High-DPI canvas supporting pointer events (touch, mouse, stylus) with pen, eraser, black and white ink options, and smooth quadratic Bezier curve interpolation.
  - **Icon Name**: Real-time counter and validation.
- **Feature Description**: Structured prompts capturing the feature function and problem solved for MyDST subscribers.
- **Confirmation & Celebration**: Pop-in animated feedback badge, full preview, and confetti burst.
- **Gallery Wall**:
  - Real-time showcase of submitted icons synced via `localStorage` and `BroadcastChannel`.
  - Filter by All, Symbols, or Freehand Drawings.
  - Search filter by title or description text.
  - Detailed modal view with author demographics and timestamps.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite (listening on `0.0.0.0:3000`)
- **Styling**: Signal Design System CSS tokens & Poppins typography
- **Storage & Sync**: `localStorage` + `BroadcastChannel`
