# PRODUCE.md — design-production conventions (light; safe to know during design)

How to produce the design artifact itself. This is the everyday mode. The handoff package is
a SEPARATE job — see `HANDOFF.md`, and don't touch it until a handoff is explicitly requested.

## When handed a task (triage before building)
When the user pastes a task description (per `INTAKE.md`), **do this before designing** — don't
start mocking on an incomplete brief:
1. **Check completeness** against the `INTAKE.md` contract: surface/audience; the view(s) +
   purpose; the **spec verbatim** (status enums, defaults/derived states, edge cases, state
   machine); design-system pointer; interactions/API; constraints; deliverable expectations
   (fidelity, variations + axis, themes, handoff wanted?).
2. **Fill what you can yourself — read the connected repo.** GitHub access is read-only but real:
   pull tokens/components from the design-system repo, and study existing patterns the task
   references (how similar forms/modals are built, working-hours/slot conventions, how selects
   source their data). Don't ask the user for anything you can read.
3. **Ask only for what you genuinely can't obtain** — missing spec fields, ambiguous scope, and
   any field the spec omits but the UI plausibly needs (flag it, don't silently invent — e.g. "the
   field list has no title; workshops may need one — confirm or I'll show it marked 'do potwierdzenia'").
4. **Discuss the key decisions up front** — the variation axis, notable edge cases, and open
   questions — and confirm direction with the user.
5. **Then design.** (Not before; a wrong assumption pasted into 3 mockups costs more than one question.)

## Before starting
- **Get design context first.** A design system, UI kit, codebase, brand, or reference is
  required — mocking from scratch is a last resort. If none is attached, ask for one.
- **Ask for the source ticket / spec, and use it verbatim.** When the task comes from a tracker
  (Jira/YouTrack/Linear), have the user paste the ticket text — I can't reach private trackers,
  but pasted specs are gold: they pin the data model, states, and edge cases (e.g. "unmarked =
  derived-absent, never stored") so the design reflects reality instead of a guess. Design the
  view directly from the ticket; don't route through a coding-agent handoff first.
- **Ask focused questions up front** when scope, audience, fidelity, option-count, or visual
  direction are ambiguous. One good round beats guessing.
- **Use the token/component layer** of the brand — never raw hex that bypasses it. If a needed
  color/token is missing, invent a clearly-flagged candidate and call it out.

## Fixing an existing screen ("this looks weird")
- **Diagnosis is part of the job.** "It looks weird / off" is a valid brief — don't ask the user
  to pre-solve it. Read the real source if available, then enumerate the concrete failures
  (e.g. "4 unlabeled grey icons, no semantic color, default state reads as alarm") before
  redesigning. Name the root cause; the fix follows from it.
- **Multi-surface? Check mechanical compatibility.** If the product has more than one surface
  (e.g. admin CRM + end-user PWA) touching the same domain, verify they share one model —
  same status enum, same default semantics, same API-shaped actions. Flag drift explicitly and
  align them; two surfaces that disagree on the data model aren't one product.

## While building
- Establish a small system (type pairing, 1–2 background tones, spacing/radius scale) and apply
  it consistently. Introduce variety with intent, not noise.
- Both light and dark if the product needs it. Respect accessibility (contrast, ≥44px touch).
- Placeholders beat bad guesses — use labelled placeholders for missing assets/imagery.
- No filler content or data slop. Every element earns its place. Ask before adding material.
- Keep the design in as few files as sensible; add screens/variations to the existing artifact
  rather than forking into many files. Present options clearly labelled on a neutral canvas.

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
  template's job). Create it once there are ≥2 views; **update it whenever a view is added or
  renamed**, and keep it in sync with PROJECT.md's screen inventory. Why it looks the way it does:
  - **Text-forward cards, no preview thumbnails.** Real screenshots go stale and add capture cost;
    hand-drawn wireframe minis add clutter without value. The bold view name sits first, at a fixed
    position, so the eye lands in the same spot every row.
  - **Hierarchy: Area ▸ Module ▸ views**, derived from the breadcrumb (area = first segment, module
    = second; two-segment paths render flat). This is what keeps a 50+-view product navigable
    instead of one flat wall.

## Delivering a production milestone
- Show the artifact early, iterate, and verify it renders cleanly.
- Offer a downloadable self-contained HTML version.
- Keep summaries short: what changed, caveats, next steps. Flag scope-reversals explicitly.

## When the user asks to hand off
Switch modes: NOW read `HANDOFF.md` (+ `templates/`) from the playbook repo and follow it.
That's when the checklist / fixtures / reference-screens machinery comes in — not before.
