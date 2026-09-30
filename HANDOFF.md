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
- **Scope in outcomes, not code layers.** Keep §0's STOP line as the template words it: it fences
  what makes data real (schema, persistence, real queries, integrations). Add no layer names
  ("no DTOs", "no query layer", "no services") — the design side cannot see the codebase's
  architecture gates (observed in one project: the typed boundary the codebase's gates required
  was exactly what the handoff had forbidden, and the build stopped for a ruling).
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
  cases. State plainly: **"do not invent or widen fields."** Pin formats (money,
  dates, etc.). Name each field for its meaning and let nesting follow the data, not a guessed
  backend: where the codebase already has a type for an entity, the implementer maps onto it
  (`templates/AGENT.md` §6).
- **Declare the owner of every field** in a top-level `_owners` map: which part of the system
  produces it — the module/service/entity that stores it, `derived: <formula>`, `session`, or
  `config`; an owner the brief does not give is `unknown` and goes under README § Open
  decisions, never guessed. Group fields by owner at the top level where the screen joins
  several. The implementer puts one fixture source behind each owner (`templates/AGENT.md` §6);
  one mixed file makes "swap the data source only" false.
- **Invent personal data on reserved domains.** Names, phone numbers and addresses are made up,
  and every e-mail uses an RFC 2606 domain as a `<name>.example.com` subdomain, so no fixture
  address can reach a real mailbox or a real company. Keep the long and edge-case values the
  render needs; only the domain changes (`dzial.zakupow@hurtownia-budowlana.example.com`, not a
  real provider such as `wp.pl`). Real providers and plausible company domains may belong to
  someone even when the local part is invented. The rule covers staff and consultant e-mails and
  the client's own company domain too, not just customers.

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
    otherwise the scrolled-off columns appear in no reference. Row menus and cell popovers that
    open in scrolled-off columns are captured on the table element at full width too — a frame
    capture clips them.
  - **Always eyeball the bottom of each tall frame** to confirm the last element (bottom nav,
    final list row, footer) is present — that's the part naive captures silently drop.
  - Keep intermediate tiles in a temp folder and delete it when done; ship only the stitched PNGs.

### 5. `README.md` — the full spec (self-sufficient)
Skeleton: `templates/README.md`.
- **Open with `## What's in this package`**, right after the title and version line: one line per
  file giving its role — build source, provenance only, spec, acceptance contract, data, ground
  truth (with the PNG count), implementer's protocol, runtime — then the one-line instruction to
  give the agent (below, "How the user runs the resulting package"). Someone who opens only the
  README knows what they received.
- Tokens, per-screen layout/components/copy, interactions & state, data shapes,
  glossary, constraints, and a list of **open decisions** the implementer must resolve
  (anything you had to guess, new token candidates awaiting approval, integration choices).
- **Tokens:** list them with values until they exist in the app codebase. Once an earlier package
  has put them there, point at the app's token file (the one `AGENT.md` §1 names) and list only the
  tokens this package introduces — never copy the full table; per-package copies drift.
- **`## Spec changes vs ticket`** — where the *final* design departs from the ticket, mined at
  handoff time (decisions churn while designing; only the final state counts). Get the *what* by
  comparing the final design against the ticket spec as pasted in the intake brief — fields,
  states, rules, copy, scope — since the thread may not hold decisions from earlier sessions; then
  take the *why* from the design thread and `PROJECT.md`'s decisions log, or write "why: not
  recorded" rather than invent one.
  First line under the heading: the source compared against — ticket id + intake brief path — so
  the agent can check it. Then one entry per change: *ticket said X → build Y*, why. `CHECKLIST.md`, `fixtures.json` and the
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

### 7. Pre-ship checks — catch contradictions inside the package
Purpose: the package is written across many sessions, and its parts drift apart — prose against
prototype, fixtures against the spec, the index against the files. Each check below compares two
parts of the package (or the package against the brief) and passes only when they agree. Run
all of them on the finished folder; fix the package, not the check. (Observed in one project:
every item here failed at least once in a single package, and each failure cost the build a
refusal, an amendment or a ruling.)
1. **Fixtures against the spec's identity rules.** Every identity key the spec defines (login
   e-mail, tax id, account number) maps to one entity with one set of attributes — never one
   e-mail with two different phones.
2. **Fixtures against their own format pins.** Every value has the form `_formats` (or the
   top-level `_note`) pins for it — a pinned scale of 2 decimals means every money value carries
   2 decimals. Pin thousands grouping explicitly ("always grouped", or not): some locales skip it
   for 4-digit numbers by default (Polish: `2770,40 zł` vs `2 770,40 zł`), so the prototype, the
   fixture note and the app's money component can silently disagree. The prototype renders
   exactly what the pin states.
3. **Counts against records.** Every count or total the screen shows is derivable from the
   records, or the fixture labels it a separate server figure with its own `_note`.
4. **Screen state against the references.** Page size, selected ids, active view and filters in
   `fixtures.json` equal what the reference PNGs and `reference_screens/INDEX.md` show.
5. **Copy against fields.** Copy that names data — a search placeholder ("search by order,
   customer, tracking number"), a column, an empty-state hint — names fields the fixture
   carries, and UI the brief does not list carries the brief's to-confirm marking. A named field
   the data lacks is an open decision in README, with the interim behaviour.
6. **Tokens against the prototype.** Grep the stripped prototype for the values it renders
   (radii, font weights, border/bar/rule widths, fixed heights). Each one is in the README token
   table, or the prototype changes to the nearest token before capture. No token is a range
   (`11–13` cannot be reconciled to one rendered value), and `README.md` and `CHECKLIST.md`
   quote the same value for the same thing.
7. **Assets against the prototype.** Each external asset in README § Assets matches the
   prototype's `<link>` / `@import` tags: exact version, every weight and style loaded. A claim
   that the target codebase already has an asset is checked in that codebase, or removed.
8. **References against the index and §4.** Every file in `reference_screens/` is a PNG at the
   frame width `INDEX.md` states (`file reference_screens/*` shows type and size), has exactly
   one row in the `INDEX.md` table, and has a unique prefix; the capture date passes §4's
   recapture rule; "how to reach" points at the stripped prototype (§6), never at the
   provenance-only design document.
9. **Prototype state against the references.** Row striping, selection and counts stay correct
   under every filter the references show. (Observed in one project: stripes were keyed to the
   unfiltered index, so filtered rows striped wrongly.)

**Then,** with every §7 check passing, copy the stripped prototype + its `support.js` (plus the
full document, if shipped per §6) into the folder, and **always do both of these together**:
1. **Present the folder for download in chat** (a download card) — do this *every* time a handoff
   is created OR re-generated, so the user never has to scroll back through the thread to find the
   latest copy. Re-presenting is cheap; a stale/lost download is not.
   **Also deliver it as a named archive**, `<product>-handoff--<slug>.zip`, holding one top-level
   folder of the same name; re-pack it every time the package is regenerated. A downloaded folder
   takes the Claude Design *project* name, not the folder name (observed in one project: a project
   auto-named from its first chat message shipped every handoff as `<that sentence>.zip`).
2. **Register it on the Index page, if `Index.dc.html` exists** (it is created at ≥2 views; with
   a single view the `handoffs/README.md` table is the index). Set `handoff: { dir, date }` on
   that view's entry in the `VIEWS` array of `Index.dc.html` (`dir` = the slug under `handoffs/`,
   `date` = today) so the card shows a Handoff chip linking to the package README. Refresh `date`
   whenever the handoff is regenerated. This is how the user answers "do I have a recent handoff,
   and where is it?" without digging.

> Note: a link inside the Index (an HTML page) can *open* the handoff README, but it cannot trigger
> the chat download card — only the assistant can. That's why step 1 (re-present in chat) is
> mandatory alongside step 2 (link in Index), not a substitute for it.

### Restyling a screen that already exists in the app
- **`## Spec changes vs ticket` becomes `## Spec changes vs current app`**, compared against the
  implemented template/route — its first line names the file and the ref. Same *X → Y*, why
  format. `AGENT.md` §0b's row and ticket paragraph follow the rename.
- **`AGENT.md` §0 keeps its restyle bullet:** edit the existing template in place, at the existing
  route — no new route, no second template. Keep existing behaviour and tests; update only the
  assertions that check changed copy.
- Observed in one project: an admin login built without a design shipped a misspelled error
  message. Catching that is what this package type is for.

### How the user runs the resulting package
Point the agent at the folder with one instruction:
> "Read `AGENT.md` and follow it exactly. Implement the frontend 1:1 against
> `reference_screens/` using `fixtures.json`. Do not stop until every `CHECKLIST.md` box
> passes; log anything you can't resolve in `NOTES.md`."

Resolve open token/spec decisions before the agent starts.
