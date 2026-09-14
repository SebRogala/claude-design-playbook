# AGENT.md — autonomous build protocol for <PROJECT>

You are implementing <PROJECT> **as the real, shipped application** in the target codebase —
**the final product, with data mocked as the only difference.**

Read `README.md` first (full spec), then follow THIS protocol.

## 0. Deliverable shape (read this first — it defines "done")
Ship the **final application**, indistinguishable from the shipped product except that data is
mocked. Concretely that means:
- **Real route/URL** the view will actually live at (not a `/design/` or preview path).
- **Real module placement** in the codebase, **real app layout/shell** (the actual nav, header,
  chrome), **real navigation** in and out of the view.
- **Real app components & conventions** — the existing Button, Input, Select, Modal, etc. Never
  re-style or hand-roll what the app already has a component for.
- **Data mocked at the real seam** — pass mock values through the *same* controller→template (or
  props) boundary that real data will use, so going live = **swap the data source only**, no
  re-layout. Do NOT build a backend, auth, or real persistence.
- **Scope boundary — STOP at the seam.** The mock is a hardcoded fixture (array/JSON/in-memory
  stub) placed *at* the controller→template boundary. Do **NOT** build anything on the data side of
  that seam: no entities/models, migrations, repositories, API endpoints, services, DTOs, query
  layer, DI/wiring, or schema. Backend architecture is a **separate task** — if a screen seems to
  need it, stub the value and note it in `NOTES.md`; never implement it. Touch only view/template,
  component, client controller (Stimulus/JS), route registration, and the fixture that feeds them.
- The **reference PNGs define visual fidelity, they are NOT the delivery format.**

**Anti-patterns (do NOT do these):** a preview/gallery page; a device-bezel/phone-frame mockup;
light+dark shown side-by-side *in the app*; a standalone demo page instead of the real route;
bespoke re-styling where a real app component exists. Those belong to the design prototype, not
your implementation.

## 1. Non-negotiables
- **1:1 with `reference_screens/`** (grouped per app/surface) for *visual fidelity* — match
  layout, spacing, color, copy, both themes. When unsure, open the standalone HTML and look.
  **"1:1" means visual fidelity ONLY — it is NOT a licence to copy the prototype's DOM,
  inline styles, device frame, or dual-theme scaffolding.** Reproduce what the screen *looks
  like* using the real app's shell, components, and tokens; never transcribe the prototype's
  markup. Verbatim structural copy is the drift this protocol exists to prevent.
- **Use the design tokens, never raw colors.** <where tokens come from>
- **All UI copy in <locale>**, exactly as in the reference.
- **Use the codebase's existing patterns/components.** If greenfield, pick one stack, stay in it.
- **Do NOT drop CHECKLIST.md → "MUST NOT DROP".** Those edge cases are required.
- **Do NOT add features** beyond the listed screens. Log ideas in `NOTES.md`; don't build them.
- Any affordance the reference implies (password show/hide, clear button, validation states) must
  use a **real app icon/component** — never an improvised or missing asset. If unspecified, use
  the app's standard and note it; don't invent a broken one.

> _Origin anecdote (the second flip): told to implement "1:1", an agent shipped the real PWA route
> with the prototype's two theme chromes side by side inside it — the design canvas transcribed into
> production. First flip: a preview instead of the app. Second flip: the app wearing the preview.
> §0 and the first rule above exist so neither recurs._

## 2. Enumerate before building (the completeness contract)
Before writing any screen, produce `INVENTORY.md`: a countable checklist of every
**screen × state × affordance** the delivery must contain, mined from `CHECKLIST.md`
(incl. MUST-NOT-DROP) and *every* `reference_screens/` PNG — not just the happy-path
screens. Enumerate the states explicitly: empty, loading, error, validation, success,
disabled, and each interactive affordance (show/hide, clear, expand, select, toggle).
"Done" is measured against this inventory, **not** against a visual glance — a screen that
renders but omits its error / empty / validation states is **not** done. Those omitted
states are exactly where behavior gets silently dropped. Keep the inventory ticked in
lockstep with the build loop.

> _Origin anecdote: the first uninstructed redesign attempt (HTML in, "let's redesign"
> out, no brief) silently dropped ~30% of the functionality. This contract exists so that
> can't recur — the number is the baseline it prevents, not a rate to expect under it._

## 3. The build loop (per screen, in order)
```
for each screen in IMPLEMENTATION ORDER:
  1. Read this screen's CHECKLIST.md section.
  2. Study reference_screens/<App>/<screen>.png (+ dark variant) for visual fidelity.
  3. Build it at its REAL route, in the REAL app shell, with REAL components; mock data via
     the real controller→template seam (fixtures.json).
  4. Render in the running app and SCREENSHOT (light + dark).
  5. COMPARE to the reference; list diffs; fix; re-render until it matches.
  6. Tick every CHECKLIST box for this screen.
  7. Commit. Then next screen.
```
May not declare a screen done with any box unticked or any visible diff. Unresolvable →
`NOTES.md`, never silently skipped.

## 4. Implementation order (smallest blast radius first)
1. Tokens + theme switch (verify a swatch page in both themes)
2. Shared components
3. …screens, one per task…  <list them>
4. Full pass — run the whole CHECKLIST end to end in both themes.
5. **Adversarial completeness pass** — a reviewer that did NOT build the screens audits the
   delivery against `INVENTORY.md` + every reference PNG, asking only *"what is missing?"*
   (unbuilt state, dropped affordance, unmatched reference, unticked box). Its findings are
   the next build round. The builder never signs off its own coverage — self-review is where
   dropped behavior hides.

## 5. Reference index
See `reference_screens/INDEX.md` for file → screen/state mapping and how to reach interactive states.

## 6. Data rules
Consume `fixtures.json` exactly. Do not invent, rename, or widen fields. Honor `_note` keys.
Pin formats (<money/date formats>).

The mock's **field shape is a contract**: name and structure each value the way the real
backend will emit it, because "swap the data source only" holds *only* if the shape matches.
Where the eventual shape is uncertain, record the assumed shape per screen in `NOTES.md` as a
requirement the later backend task must honor — never silently pick a convenient shape that
the template would then have to be re-plumbed away from.

## 7. Definition of done
- [ ] Every screen implemented **at its real route, in the real app shell, with real components**,
      and committed. No preview/gallery/bezel page anywhere.
- [ ] Going live = **swap the data source only** — no re-layout needed (mock data sits at the real
      controller→template seam).
- [ ] **No backend built.** Nothing on the data side of the seam — no entities, migrations,
      repositories, endpoints, services, DTOs, or schema. Backend is a separate task; unmet needs
      are stubbed + noted in NOTES.md, not implemented.
- [ ] Every CHECKLIST box ticked (or blockers logged in NOTES.md).
- [ ] `INVENTORY.md` fully ticked, and an **adversarial completeness pass** (by a non-builder)
      found nothing missing vs the inventory + reference PNGs.
- [ ] Mock field shapes recorded in NOTES.md as the seam contract for the backend task.
- [ ] Light + dark verified; accessibility bar met; min touch target met.
- [ ] Tokens only; all copy in <locale>; no invented features; no widened data.
- [ ] No improvised/broken icons or assets — every affordance uses a real app component.
- [ ] NOTES.md summarizes decisions made + anything to flag to a human.
