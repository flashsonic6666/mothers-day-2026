# Making Mom 🍲

An interactive page where you drag personality traits into a pot to "cook up" Mom.

## How to run it

Just open `index.html` in any web browser. Double-click it. That's it.

> **Note:** Some browsers block local images when you open `index.html` directly via the `file://` protocol. If the pot doesn't show up, either:
> - **Easy:** Drag `index.html` into a Chrome or Firefox window (usually works fine).
> - **Bulletproof:** Run a quick local server. In Terminal, `cd` into this folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000` in your browser.

## File structure

```
making-mom/
├── index.html        ← the whole app (HTML + CSS + JS, all in one file)
├── README.md         ← you're reading it
└── images/
    ├── pot.png       ← the cooking pot (REPLACE THIS WITH YOUR DRAWING)
    └── mom.png       ← optional Mom portrait shown on the reveal screen
```

## How to use your own drawings

### Replacing the pot

1. Draw a pot. Any program — Procreate, Figma, Photoshop, paper + photo, whatever.
2. Save it as **`pot.png`** (transparent background is best so the bubbles look right).
3. Drop it into the `images/` folder, overwriting the existing `pot.png`.
4. Reload the page.

**Tips for the pot drawing:**
- **Square aspect ratio** (e.g. 800×800 or 1000×1000) works best — the slot is square.
- **Transparent PNG** lets bubbles rise convincingly out of the top.
- The "liquid color tint" effect in the original is a soft glowing oval near the middle of the pot. If your pot has its opening somewhere different, see "Adjusting the liquid tint" below.

### Adding a Mom portrait to the reveal screen (optional)

1. Draw your mom (or a fun caricature).
2. Save as **`mom.png`** in the `images/` folder.
3. It'll automatically appear at the top of the reveal screen.

If you don't add one, the reveal screen just skips it gracefully — no broken image icon.

### Adjusting the liquid tint

The colored glow that shifts each time you add an ingredient is positioned at the middle of the pot opening. If your pot drawing has its opening higher or lower, edit this line in `index.html` (search for `.pot-tint`):

```css
background: radial-gradient(ellipse 30% 8% at 50% 48%, var(--burgundy) 0%, transparent 70%);
```

The `at 50% 48%` part is the position (x%, y%). Change `48%` to wherever the pot's opening is in your image. The `30% 8%` is the size of the glow oval (width, height).

If you don't want the tint at all, just delete the `.pot-tint` div in the HTML, or set `opacity: 0` on `.pot-tint` in the CSS.

## Other tweaks

- **Change the trait list** — edit the `ingredients` array near the top of the `<script>` in `index.html`.
- **Change the spice list** — edit the `spices` array right below it.
- **Change quips** — each ingredient/spice has a `quip` field; that's what the pot "says."
- **Change colors** — edit the CSS variables at the very top of the `<style>` block (`--burgundy`, `--cream`, etc.)

Have fun. 🍲
