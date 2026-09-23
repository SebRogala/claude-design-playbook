# HANDOFF.md — the 1:1 agent-handoff playbook (read this ONLY at handoff time)

> Read this when the user asks to hand off to a coding agent — not during design. Blank
> skeletons for each artifact are in `templates/`; copy them in and fill them out.

**Goal:** a package a coding agent can implement faithfully and unattended. What it must produce —
the real app at its real route, mock data at the controller→template seam, nothing built behind the
seam, no preview/bezel/side-by-side pages — is defined **once, in `templates/AGENT.md` §0**
(normative); this file is about producing the package that enforces it. Prose specs get satisficed —
agents build the happy path, invent simpler data, drop buried edge cases, and ship previews instead
of the real view. What prevents that: a **checkable contract + ground-truth images + a forced
self-verify loop + small scoped per-screen tasks + an explicit deliverable-shape rule (`AGENT.md` §0).**

Produce ALL of the following in `handoffs/<slug>/` — keep every handoff under a single top-level
`handoffs/` folder (so they don't clutter the project root), one subfolder per handoff.

**Directory slug — filesystem-safe, derived from the breadcrumb:** lowercase, ASCII only (strip
diacritics), spaces → `-`, path segments joined by `--`, ticket id prefixed when there is one.
`Admin CRM → Harmonogram → Wydarzenie → Obecność` + `CRE-42` →
`handoffs/cre-42--admin-crm--harmonogram--wydarzenie--obecnosc/`. A multi-view package slugs the
surface(s) covered instead (`handoffs/parent-pwa--instructor-pwa/`). The human-readable breadcrumb
(with `→` and diacritics) goes in the package `README.md` heading and in the `handoffs/README.md`
index table — never in the directory name (arrows, spaces, parens and diacritics break shells,
URLs, zips and Windows). Maintain that `handoffs/README.md` table indexing them:

### 1. `AGENT.md` — the operating protocol
- A **per-screen build loop**, stated as the agent's required process:
  `read this screen's checklist → study its reference PNG (each theme in scope) → implement with the
  fixtures + token layer → render → screenshot → compare to the reference, list diffs, fix,
  repeat until it matches → tick every checklist box → commit → next screen.`
- **Implementation order**, smallest blast radius first: tokens+theme → shared components →
  screens one at a time → full pass.
- **Rule:** may NOT declare a screen done while any checklist box is unticked or any visible
  diff remains; unresolved blockers go in `NOTES.md`, never silently skipped.
- **Stack rule:** use the codebase's existing patterns/components; if greenfield, pick one
  stack and stay in it. Frontend look only unless told otherwise — wire to fixtures, not a backend.
- A **definition of done** for the whole job + "no invented features / no widened data".

### 2. `CHECKLIST.md` — binary acceptance contract
- Open with a **"⛔ MUST NOT DROP"** block listing the edge cases agents skip. Enumerate them
  explicitly for THIS design — e.g. null/empty states, error/cancelled/pending variants,
  conditional affordances that must hide cleanly (no layout gap), locale pluralization,
  config-driven 1..N UI that collapses at N=1, every theme in scope, accessibility bar, tokens-only,
  exact localized copy.
- Then a per-screen section of tickable, testable lines. Unticked = not done.

### 3. `fixtures.json` — exact mock data
- The real sample data the screens render. Add `_note` keys on the records that carry edge
  cases. State plainly: **"do not invent, rename, or widen fields."** Pin formats (money,
  dates, etc.).

### 4. `reference_screens/` — the 1:1 ground truth
- A PNG **per screen AND per important state** (include every theme in scope, every
  status/variant, and desktop if applicable). Plus an `INDEX.md` mapping `file → screen/state` and
  how to reach interactive states in the stripped prototype (§6). These images are what "looks
  1:1" is measured against.
- **Group by app/surface** when there's more than one app (e.g. `reference_screens/<App A>/`,
  `reference_screens/<App B>/`).
- **Recapture immediately before handing off.** Designs keep moving after capture; a set that is
  a week old will disagree with the prototype on row counts, copy and chrome, and "1:1" then means
  "1:1 with something that no longer exists". Note the capture date in `INDEX.md` and check it
  against the design file's last change.
- **⚠ Capture full frames at true aspect ratio — never raw viewport screenshots.** A plain
  screenshot crops to the preview viewport: tall scrolling screens get cut off at the bottom,
  the aspect ratio is wrong, and there's dead margin/neighbor frames at the edges. That makes
  the "ground truth" useless. Instead, capture each frame **in isolation** at its natural
  device width (e.g. 390–412px phone) and its **full content height**:
  - Render one frame alone on a plain background (clone it into a fixed overlay; strip box-shadow).
  - If the frame is taller than the capture viewport, capture it in **vertical tiles**
    (translateY by a stride slightly less than the captured height so tiles overlap) and
    **stitch** them into one image with a canvas. Overlap avoids seams; the canvas height =
    the frame's true height.
  - Calibrate the css→pixel scale once (drop a known-size marker rect, measure it) so crops
    are exact; then crop each tile to the frame's width and stitch.
  - Desktop frames wider than the viewport: scale down to fit width (single tile), keep ratio.
  - **Wide scrolling tables** (columns overflow the frame): also capture the **table element
    itself** at its full content width, as its own reference PNG next to the frame capture —
    otherwise the scrolled-off columns appear in no reference.
  - **Always eyeball the bottom of each tall frame** to confirm the last element (bottom nav,
    final list row, footer) is present — that's the part naive captures silently drop.
  - Keep intermediate tiles in a temp folder and delete it when done; ship only the stitched PNGs.

### 5. `README.md` — the full spec (self-sufficient)
- Tokens, per-screen layout/components/copy, interactions & state, data shapes,
  glossary, constraints, and a list of **open decisions** the implementer must resolve
  (anything you had to guess, new token candidates awaiting approval, integration choices).
- **Tokens:** list them with values until they exist in the app codebase. Once an earlier package
  has put them there, point at the app's token file (the one `AGENT.md` §1 names) and list only the
  tokens this package introduces — never copy the full table; per-package copies drift.
- **`## Spec changes vs <TICKET>`** — where the *final* design departs from the ticket, mined at
  handoff time (decisions churn while designing; only the final state counts). Get the *what* by
  comparing the final design against the ticket's spec — fields, states, rules, copy, scope — since
  the thread may not hold decisions from earlier sessions; then take the *why* from the design
  thread and `PROJECT.md`'s decisions log, or write "why: not recorded" rather than invent one.
  One entry per change: *ticket said X → build Y*, why. `CHECKLIST.md`, `fixtures.json` and the
  reference PNGs must already show Y. With none, write **"None — the ticket is current."** so an
  empty section can't be mistaken for a missing one. These are *decided*, unlike open decisions;
  `templates/AGENT.md` §0b says how the agent uses them.
- **Mark the open-decisions list as questions, not requirements** — "do not invent answers".
  Unmarked, it reads like a spec section and gets satisficed like one.
- Keep the *reasoning* behind non-obvious rules ("destructive actions are never one-click —
  deliberate, for the older user"). An agent that knows why makes better calls where the spec is
  thin. `templates/AGENT.md` §0b is what makes keeping it safe.

### 6. The scope fence — ship a stripped prototype, not the design document
The working design file accumulates things that are **reasoning, not product**: discarded options
and variant comparisons, turn/option badges and captions, and a token/swatch panel. An agent told
"implement 1:1" can reasonably build them.

So, at handoff time:
- **Produce `<Screen>-prototype.<ext>`** — the screen alone, scaffolding stripped: no option
  badges, no variant sections, no token panel, no design commentary. **This is the build source.**
  Name it with a hyphen, never brackets — brackets get stripped on save, and the docs then point at
  a file that doesn't exist. It is not self-contained: ship its `support.js` beside it (fonts and
  icons still load from the network).
- The stripped prototype is **not** the standalone export (`<Name>-standalone.html`, one offline
  file with everything inlined). The standalone is for humans — client, reviewers — to click
  through; the prototype is for the agent. Never ship the standalone as the build source.
- Ship the full design document beside it only if provenance matters, labelled
  **"provenance only — do not build from it"** in the package `README.md`.
- `templates/AGENT.md` **§0b** carries the file-by-file classification (product / ground truth /
  contract / reasoning / agent output) and the reading rule for prose. Keep §0b filled in per
  package — it is the fence that makes a mixed-prose `README.md` safe.

**Then:** copy the stripped prototype + its `support.js` (plus the full document, if shipped per §6)
into the folder, and **always do both of these together**:
1. **Present the folder for download in chat** (a download card) — do this *every* time a handoff
   is created OR re-generated, so the user never has to scroll back through the thread to find the
   latest copy. Re-presenting is cheap; a stale/lost download is not.
2. **Register it on the Index page, if `Index.dc.html` exists** (it is created at ≥2 views; with
   a single view the `handoffs/README.md` table is the index). Set `handoff: { dir, date }` on
   that view's entry in the `VIEWS` array of `Index.dc.html` (`dir` = the slug under `handoffs/`,
   `date` = today) so the card shows a Handoff chip linking to the package README. Refresh `date`
   whenever the handoff is regenerated. This is how the user answers "do I have a recent handoff,
   and where is it?" without digging.

> Note: a link inside the Index (an HTML page) can *open* the handoff README, but it cannot trigger
> the chat download card — only the assistant can. That's why step 1 (re-present in chat) is
> mandatory alongside step 2 (link in Index), not a substitute for it.

### How the user runs the resulting package
Point the agent at the folder with one instruction:
> "Read `AGENT.md` and follow it exactly. Implement the frontend 1:1 against
> `reference_screens/` using `fixtures.json`. Do not stop until every `CHECKLIST.md` box
> passes; log anything you can't resolve in `NOTES.md`."

Resolve open token/spec decisions before the agent starts.
