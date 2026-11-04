# PRODUCE.md — design-production conventions (light; safe to know during design)

How to produce the design artifact itself. This is the everyday mode. The handoff package is
a SEPARATE job — see `HANDOFF.md`, and don't touch it until a handoff is explicitly requested.

## When handed a task (triage before building)
When the user pastes a task description (per `INTAKE.md`), **do this before designing** — don't
start mocking on an incomplete brief:
1. **Check completeness** against `INTAKE.md` → What a good UI design task MUST contain.
2. **Fill what you can yourself — read the connected repo.** GitHub access is read-only but real:
   pull tokens/components from the design-system repo, and study existing patterns the task
   references (how similar forms/modals are built, working-hours/slot conventions, how selects
   source their data). Don't ask the user for anything you can read.
3. **Check the spec's checkable facts** (costs, colours, pool membership, limits) against the
   repo or a named external source before designing. A wrong fact goes back to the user as a ticket
   correction, not into the boards. (Observed in one project: a wrong currency colour in the ticket
   flipped the headline verdict for two of three families until the owner caught it on day 2.)
4. **Follow `INTAKE.md` → What a good UI design task MUST contain for missing fields.**
   Flag ambiguous scope and UI needs the spec does not address as open questions; don't silently
   invent them.
5. **Discuss the key decisions up front** — the variation axis, notable edge cases, and open
   questions — and confirm direction with the user.
6. **Then design.** (Not before; a wrong assumption pasted into 3 mockups costs more than one question.)

## Before starting
- **Get design context first.** A design system, UI kit, codebase, brand, or reference is
  required — mocking from scratch is a last resort. If none is attached, ask for one. The one
  exception: the brief's design-system field says `none — greenfield` → run **Greenfield:
  directions first** (below) before any screen.
- **Ask for the source ticket / spec, and use it verbatim.** When the task comes from a tracker
  (Jira/YouTrack/Linear), have the user paste the ticket text — I can't reach private trackers,
  but pasted specs are gold: they pin the data model, states, and edge cases (e.g. "unmarked =
  derived-absent, never stored") so the design reflects reality instead of a guess. Design the
  view directly from the ticket; don't route through a coding-agent handoff first.
- **Ask focused questions up front** when scope, audience, fidelity, option-count, or visual
  direction are ambiguous. One good round beats guessing.
- **Use the token/component layer** of the brand — never raw hex that bypasses it. If a needed
  color/token is missing, invent a clearly-flagged candidate and call it out.

## Design System lifecycle
- **Build a Design System artifact in the project's first Designer round**, from the code's
  tokens and shared components: Artifact `quickstart`, the "Design System" type, `from-code.md`.
  Keep the code's token names and values. In later rounds, read that artifact and the current
  code before designing; re-sync the artifact from code when they differ. Record the artifact
  URL, token-file path and token-export path in `PROJECT.md` → File map.
- **Keep token values in one home: the code's token file** (for example, `tokens.css`). The
  Design System and its token export mirror that file; they never become a second authority.
  For greenfield work without code tokens yet, record the picked spine as proposed values until
  the first handoff establishes the code's token file; then re-sync the artifact from it.
- **Design component and token changes in Design**, marking proposed changes with a usage note
  saying what changes and why. Carry them to code through `HANDOFF.md` §5 → Token and component
  changes; use that flow to re-sync the Design System after implementation.

## Component reuse (every element is a shared component from its first appearance)
- **Make each UI element a shared component the first time it appears.** The first board that
  needs a button, field, badge, row or container adds it to the Design System as the single source,
  marked `new` with a usage note (kind, variants, states), and records it in the inventory
  (`PROJECT.md` → Design system decisions → Shared components built; on the Claude Code path
  `design/system/components.md`). Every later use reuses it; no board draws that element freehand
  or restyles it. Add components when a board needs them, not ahead of need.
- **Containers are components too:** page shell, panel/section, card, modal/dialog, drawer, tab
  bar, toolbar, list/table with its paginator, empty state. Compose each board from them; most of
  a screen is components and custom markup is the exception.
- **Look up before drawing:** check the inventory and the code's shared components. Reuse a
  match; extend it with a variant when the need is a different look; add a new component only
  when none fits.
- **Record a custom one-off in `PROJECT.md` → Standing waivers and exceptions before drawing it:**
  the element, the shared component it could not extend, and the owner's approval. "Quick to
  draw", "used once" and "hard to fit" explain effort, not need, so extend the component. An
  element without the entry is a shared component.
- **The code owns the components.** The Design System mirrors the code's shared components
  (lifecycle above). A component new in Design is proposed there, marked `new`, and travels to
  code through `HANDOFF.md` §5 → Token and component changes, which names where it lands.

## Greenfield: directions first
Applies when the brief says `none — greenfield`: there is no system to follow yet, so establish one
before building screens.
1. **Vehicle:** the first briefed view — the densest one if the brief has several; it sets the
   scale. Use its real spec and data, so directions are judged on the product, not a mood board.
2. **Directions:** about 3 whole-system directions of that view, side by side on one canvas,
   each labelled. Each is a coherent system — type pairing, neutrals + accents, density,
   spacing/radius, component feel — and they differ on the system, not on layout details.
3. **Rounds until the user picks.** Refine, combine or replace directions on feedback. Expect
   several rounds (observed: from one to about nine). The user's pick ends this phase — don't
   converge on your own.
4. **Commit the pick** as the token spine and record it in `PROJECT.md` → Design system decisions
   (picked direction and why; rejected ones, one line each). The vehicle view, rebuilt on the
   spine, is the first screen; continue per "While building".

## Fixing an existing screen ("this looks weird")
- **Diagnosis is part of the job.** "It looks weird / off" is a valid brief — don't ask the user
  to pre-solve it. Read the real source if available, then enumerate the concrete failures
  (e.g. "4 unlabeled grey icons, no semantic color, default state reads as alarm") before
  redesigning. Name the root cause; the fix follows from it.
- **Treat "the whole app is hard to read" as a system brief.** Diagnose across
  screens into a short failure list (e.g. labels, chips and buttons share one style; text under
  12px; no screen says what it is for), fix it in the design system first, then redraw the key
  screens on it. (Observed in one project: the Operator said "labels and buttons feel like the
  same"; the cause was one mono 10.5px uppercase style shared by four roles.)
- **Multi-surface? Check mechanical compatibility.** If the product has more than one surface
  (e.g. admin CRM + end-user PWA) touching the same domain, verify they share one model —
  same status enum, same default semantics, same API-shaped actions. Flag drift explicitly and
  align them; two surfaces that disagree on the data model aren't one product.

## While building
- **Greenfield:** the **token spine** (type, neutrals, 1–2 accents, spacing/radius/density) is the
  direction picked in "Greenfield: directions first", and ships *with* the first screen, together
  with that screen's components per "Component reuse". With an existing design system, use its
  tokens/components instead. Either way, apply the system consistently; introduce variety with
  intent, not noise.
- Both light and dark if the product needs it. Respect accessibility (contrast, the project's
  touch-target floor — ≥44px on touch devices).
- **Measure contrast with a script every round,** for every text token on every ground it
  sits on, and for control borders and focus rings on their grounds (3:1, WCAG 1.4.11). Convert
  OKLCH or HSL to sRGB luminance; do not judge by eye. (Observed in one project: an estimate called
  a legacy muted token failing; measured, it passed at 6.0:1, and the change only added a
  deviation, while the real failure, control borders at 1.5:1, went unnoticed.)
- Placeholders beat bad guesses — use labelled placeholders for missing assets/imagery.
- **Sample data from the real source when one exists.** The brief's fixture-data field names it
  (`INTAKE.md` field 5); real values make boards credible from round 1 and become the handoff's
  `fixtures.json`. Invent data only when the field says there is none.
- **Use app-repo code as a real source too:** API types, seeded definitions and
  catalogs give ids, enums, field names and outcome names. Read them before drawing and use
  them verbatim; a column or field the API type lacks is an open question, not a board element.
  Missing facts are `[placeholder]`s. (Observed in one project: step ids, roles and outcomes
  came from the server's catalog; an invented "Entry" column was caught only against the
  API's summary type.)
- **Check computed figures.** When a board shows derived numbers (EV, totals, rates), run the
  calculation on the fixture data outside the canvas and compare. A rendering check does not
  catch a wrong formula.
- **App chrome is recreated 1:1 from the app's source, or left out.** Sidebar, top bar and nav on
  a board either match the source exactly (labels, icons, order) or are absent; never an
  approximation. (Observed in one project: an approximated sidebar drew "why isn't this the real
  app?" twice and cost a full chrome rebuild.)
- **Data tables in `.dc.html`:** test `<sc-for>` inside `<tbody>` on one board before relying on
  it. Observed both ways: one project saw the rows moved out of the table by the HTML parser,
  another (runtime contract 0.2.47) saw them render. If they move, build the table as CSS grid
  with ARIA table roles, and state in the handoff that the app uses a real `<table>`.
- **`{{hole}}` text renders inside a `<span>`,** so a descendant rule such as `.badge span {}`
  restyles it too. Scope such rules to a class. (Observed three times in one project, first as a
  9px level badge.)
- **One shared sample dataset from round 1.** Every board takes its records from the same dataset
  (one file in the canvas folder, or one section of `PROJECT.md`), so counts, names and totals
  agree across boards. It grows into the handoff's `fixtures.json`. (Observed in one project: each
  board hard-coded its own data and they disagreed until the handoff reconciliation.)
- **Every result list gets the shared Pagination component by default.** A screen or board that
  lists results (search hits, a catalog, a records table) places the Design System's `Pagination`
  below the list, its total taken from the shared sample dataset. The component is added on first
  appearance per "Component reuse"; a board never redraws it. Leave it out only when the brief or
  `PROJECT.md` says so.
- **An owner's sketch that replaces the briefed variants** becomes a new round (page) with its own
  board. Record in `PROJECT.md`'s decisions log which variants it retires; retired boards stay on
  their page with "(retired)" in their title.
- No filler content or data slop. Every element earns its place. Ask before adding material.
  When the user rejects one instance of a pattern (a helper line, an explanatory caption), remove
  every instance across all boards in the same round, and log the rule in `PROJECT.md`.
- Keep the design in as few files as sensible; add screens/variations to the existing artifact
  rather than forking into many files. Present options clearly labelled on a neutral canvas.

## Element grammar (one look per role)
Give each element role one distinct look. Follow the default [Design System lifecycle](#design-system-lifecycle):
build the Design System from the code's tokens and shared components. Write the table into the
design system's README and check every board against it.

| Role | Look |
|---|---|
| Do (button) | a box: fill or border, sentence case; ghost buttons keep a border |
| Go (link) | underlined accent text, no box |
| Name (label) | plain muted text, no box; uppercase only for group labels over a block |
| State (badge) | a tinted pill, no border, no hover, no pointer |
| Id | mono, exactly as stored |

- Reserve hover states for buttons, links, inputs and selectable cards.
- Give buttons a fill or border per the role table above. (Observed in one project: ghost buttons rendered as
  plain text and repeated the owner's complaint until the render check caught them.)
- Give each screen a one-line purpose caption under its title ("Step graphs the run engine
  executes for this project."): what it is for, not how to use it. This is not onboarding copy.
- Set a text-size floor for dense desktop tools (11px) and a row and control height in the token
  spine (`row-h`, `control-md`, `control-sm`), so density is one decision, not per board.

## Surface & field-control patterns (which container a view lives in)
Decide a view's **surface** by the weight and linkability of the task — not by habit. Getting this
right is what keeps a growing product feeling like one product.
- **Modal** — one focused task, ≈one screen of fields (≤ ~8 inputs, no tabbed sub-sections),
  launched in-context from a row/detail, no deep-link need, no nested nav. (create/edit a record,
  send, confirm, register a value.)
- **Drawer** — same profile, but the underlying list/detail should stay visible (quick peek + edit,
  repeated edits across rows), or the form is slightly longer than a modal holds.
- **Full page / route** — multi-step wizard, deep-linkable/bookmarkable/shareable views, dashboards
  and heavy tables, or anything that spawns its own sub-navigation.
- **Anti-pattern to fix on contact:** a short create/edit form shipped as its own route with a
  "← back" link — that's a modal wearing a page.

Field controls:
- **2–6 short mutually-exclusive options → visible selector** (segmented control or tile row), not a
  dropdown: no wasted click, and the choice can drive dependent fields live. Real `<select>` only
  past ~7 options or long labels.
- **Dependent fields react immediately** to the selection — hide what doesn't apply rather than
  leaving it ambiguously enabled.

Rollout: apply these **when you touch a view** (strangler pattern) — never a big-bang sweep of the
whole product. Writing the rule down stops new drift; the back-catalogue catches up as views are
worked on. Record per-project surface decisions and any offenders-to-convert in `PROJECT.md`, and
keep a portable copy of the rule the app repo can adopt.

## Naming & the view Index (keep the product navigable)
- **Name every view by its full breadcrumb path**, not a bare word: `Area → Section → … → View`
  (e.g. `Admin CRM → Harmonogram → Wydarzenie → Utwórz jednorazowe`). Put that path on the frame
  as `data-screen-label`, use it in the file's heading, and as the view's id everywhere. Single
  names ("Attendance", "Event") collide and get lost as the product grows.
- **Maintain an Index page** — a project map: `Index.dc.html`, one card per view, the entry point
  a new session or teammate opens first. Start from `templates/Index.dc.html` (data-driven: edit its
  `VIEWS` array — one entry per view with path, status, file, note, handoff; the layout is the
  template's job). Create it once there are ≥2 views, carrying every existing handoff over from
  `handoffs/README.md` as `handoff: { dir, date }`; **update it whenever a view is added or
  renamed**, and keep it in sync with PROJECT.md's screen inventory. Why it looks the way it does:
  - **Text-forward cards, no preview thumbnails.** Real screenshots go stale and add capture cost;
    hand-drawn wireframe minis add clutter without value. The bold view name sits first, at a fixed
    position, so the eye lands in the same spot every row.
  - **Hierarchy: Area ▸ Module ▸ views**, derived from the breadcrumb (area = first segment, module
    = second; two-segment paths render flat). This is what keeps a 50+-view product navigable
    instead of one flat wall.

## Delivering a production milestone
- Show the artifact early, iterate, and verify it renders cleanly.
- Offer a downloadable standalone export — `<Name>-standalone.html`, one offline file with
  everything inlined, for humans to click through. It is not a handoff's build source.
- Keep summaries short: what changed, caveats, next steps. Flag scope-reversals explicitly.

## When the user asks to hand off
Switch modes: NOW read `HANDOFF.md` (+ `templates/`) from the playbook repo and follow it.
That's when the checklist / fixtures / reference-screens machinery comes in — not before.
