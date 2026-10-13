# Shoal

Conduct a 3D school of fish with your bare hand. Your webcam feed becomes a live water surface; your fingertip is the current.

## Gestures

| Gesture | Effect |
| --- | --- |
| Point (index finger) | The school builds and follows your fingertip; the water ripples |
| Pinch (thumb + index) | The school draws tight, then relaxes on release |
| Open palm (hold) | The school dissolves into glowing dust. Relax your hand to bring it back |
| No hand | The school swims an idle loop |

No camera? Use mouse mode: hold click to pinch, hold Space for open palm, H toggles the hand.

## Interface

- Intro guide with camera or mouse start (reopen anytime with **Guide**)
- Live gesture indicator, hold-progress ring at your fingertip, status line
- Fish count slider, water on/off, fullscreen
- Keys: `R` water, `+`/`-` fish count, `D` debug overlay

## Run

```bash
npm install
npm run dev      # open the printed URL, allow camera
npm run build    # production build in dist/
```

`npm install` copies the MediaPipe WASM and downloads the hand model into `public/`. If the download fails, the app loads the model from Google's CDN at runtime. Camera access needs `localhost` or HTTPS.

## Structure

```
index.html            page + UI markup
src/main.js           render loop, ripples, wiring
src/ui.js             HUD / intro controller
src/style.css         design tokens and layout
src/handTracking.js   MediaPipe + mouse fallback
src/gestures.js       gesture classifier
src/stateMachine.js   choreography states
src/curveController.js, fishSchool.js, fishGeometry.js, water.js, util.js
scripts/setup.mjs     post-install asset fetch
```
