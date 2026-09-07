# Barnyard Toys

Tap-anywhere toys for toddlers, drawn entirely with Canvas 2D vector paths and
sound synthesized live in the Web Audio API. No build step, no dependencies, no
network requests. Open `index.html` and pick a toy.

**Live:** https://joshuablotter.github.io/chicken-yard/

![Chicken Yard](screenshot.jpg)

Opening the app shows a simple two-button chooser (`index.html`):

- **🐔 Chicken Yard** → [`chicken-yard.html`](chicken-yard.html)
- **🦆 Duck Pond** → [`duck-pond.html`](duck-pond.html)

Each toy is a single self-contained file. No score, no goal, no way to get
stuck — just a living scene that rewards every touch.

## Chicken Yard

A backyard chicken run.

- **Tap open ground** — scatter feed; the flock runs over and pecks it up.
- **Drag a finger** — leave a trail of feed the birds chase.
- **Tap a bird** — it flaps and squawks; its neighbors startle and scatter.
- **Tap the nest box lid** — a hen lays an egg. Hens also lay on their own now and then.
- **Tap the water trough** — ripples spread and the ducks come dip their bills.
- **Tap the sky** — a distant flock arcs across the horizon.

## Duck Pond

A small farm pond whose surface is a **real height-field wave simulation** —
ripples spread, overlap, and interfere like actual water, and everything
floating (ducks, ducklings, lily pads, peas, the log) bobs and tilts by reading
the local wave height. A drake, three hens, and five ducklings that trail a hen
in a wobbly line share the water.

- **Tap the water** — a wave spreads out; the two nearest ducks come investigate.
- **Drag a finger** — carve a wake; the ducklings follow the finger.
- **Tap a duck** — it flaps, quacks, and shakes; tap it again as it settles and it dabbles bottom-up.
- **Tap the grassy bank** — a handful of peas drops in and every duck converges to eat.
- **Tap the reeds** — a frog hops out to a lily pad, or a dragonfly lifts off (alternating).
- **Tap a lily pad** — it dips and springs back, throwing a ring of ripples.

## Install it as an app

It's a PWA, so you can add it to a phone or tablet home screen and it launches
fullscreen (no browser bar) and runs offline once opened once.

- **iPhone / iPad (Safari):** open the live link, tap **Share → Add to Home
  Screen**. Launch it from the new icon and hold the device **landscape**.
  (iOS doesn't let web apps lock orientation, so it won't auto-rotate — but the
  scenes letterbox cleanly in portrait too.)
- **Android (Chrome):** open the link, then **⋮ menu → Install app / Add to
  Home screen**. Android honors the landscape hint.

## Tuning

Every tunable number lives in the `CONFIG` object at the top of each toy's
script (counts, speeds, feed amounts, volume, palette).

For **Duck Pond**, the three values that control the feel of the water are, in
order: `waterDamping` (how long ripples live), `tapImpulse` (how big a tap
splashes), and `wakeStrength` (how strongly a swimming duck's wake pushes the
surface). If the water sim ever chugs on an older tablet, drop `gridW`/`gridH`
from 160×90 to 120×68.
