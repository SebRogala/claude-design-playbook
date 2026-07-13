# INTAKE.md — how to brief ClaudeDesign (the UI-task input contract)

## Who ClaudeDesign is
A design partner that turns a product spec into high-fidelity, **token-accurate HTML mockups**
(light/dark, real states, correct locale copy), then — on request — into a **1:1 agent-ready
implementation handoff** (`handoffs/<breadcrumb path>/`). It works from *context + spec + design-
system tokens*; it does not guess. Give it those three and it designs the view directly (no
coding-agent round-trip needed first).

## The loop
```
YouTrack ticket ──paste──▶ ClaudeDesign ──designs──▶ mockups (you review/iterate)
                                        └──on request──▶ handoff package
                                                          │
                            attach handoff to the SAME ticket ──▶ coding agent implements
                                                                  (from ticket + handoff, 1:1)
```

## What ClaudeDesign can and can't access (affects what a task must include)
- **GitHub — read only.** If the design-system repo is connected, ClaudeDesign reads tokens,
  components, and source **directly from GitHub** — so a task can just *point* at the repo/path
  (e.g. `SebRogala/Cresco → assets/styles/app.css`) instead of pasting token values. It cannot
  **commit or push** — you commit its returned files and attach the handoff to the ticket.
- **Private trackers (YouTrack/Jira) — no access.** ClaudeDesign cannot reach them. The **spec
  must be pasted as text** (this is the one field that always comes verbatim in the ticket body).
- **Screenshots/images — yes**, if attached to the message (needed for redesigns).

## What a good UI design task MUST contain
Claude Code should assemble a ticket with these fields before handing it to ClaudeDesign. Missing
fields = ClaudeDesign will ask, so fill them up front.

1. **Surface & audience** — which app/area (admin CRM / parent PWA / instructor PWA / …), who
   uses it, platform (desktop/mobile), themes (light/dark/both), locale (e.g. Polish).
2. **The view(s) to design** — each view's **full breadcrumb path** (`Area → Section → … → View`,
   e.g. `Admin CRM → Harmonogram → Wydarzenie → Utwórz jednorazowe`) + its purpose/goal. Use the
   path, not a bare name — single names collide fast across a growing product; the path also
   becomes the frame's `data-screen-label` and its entry in the project Index. If it's a redesign,
   say so and **attach a screenshot** of the current state.
3. **The spec, verbatim** — the domain model that governs the UI: entities, **status enums**,
   **defaults & derived states** (e.g. "unmarked = ABSENT, never stored"), edge cases
   (null instructor, cancelled, make-up, demo…), and any state machine. Copy the real ticket
   text; do not paraphrase away the edge cases — they're what makes the design correct.
   **This is the field ClaudeDesign can't fetch itself — always paste it.**
4. **Design-system source** — where tokens/components live (repo + path, e.g.
   `SebRogala/Cresco → assets/styles/app.css`, components in `templates/components/`). ClaudeDesign
   **reads these from GitHub directly** if the repo is connected — a path is enough, no need to
   paste values. Rule: token/component layer only, never raw hex.
5. **Interactions & data** — expected behaviors (optimistic save, bulk actions, redirects…),
   and API shapes if the UI consumes them (endpoint + method + what each action does).
6. **Constraints** — accessibility bar (e.g. WCAG AA), min touch target, framing (PWA/no chrome),
   and explicit **out-of-scope** items.
7. **Deliverable expectations** — fidelity (hi-fi), how many **variations/options** to explore
   and along which axis, dark/light, and **whether a handoff package is wanted** (and for which
   coding stack, e.g. Twig + Stimulus).
   - **When a handoff IS wanted, its implementation deliverable is the REAL app, data mocked** —
     the view at its real route, in the real app shell, using real app components, differing from
     production only in that mock data sits at the real controller→template seam (going live =
     swap the source). NOT a preview page, device-bezel mockup, or in-app light/dark side-by-side
     — those are the design prototype, not the implementation. (Enforced by `AGENT.md` §0.)
     **Boundary: this builds only up to the controller→template seam (mock fixture there) — never
     the backend behind it (entities, migrations, repos, endpoints, services, schema). Backend
     wiring is a separate task, not part of the design-handoff implementation.**

## Ready-to-fill YouTrack task template
Paste this into the ticket description and fill the blanks:

```md
### UI design task — <view name>

**Surface / audience:** <app/area> · <who uses it> · <desktop|mobile> · <light|dark|both> · <locale>
**View(s):** <breadcrumb path — e.g. Admin CRM → Harmonogram → Wydarzenie → Utwórz jednorazowe> · <purpose>   (redesign? <yes/no — attach screenshot>)

**Spec (verbatim — do not paraphrase edge cases):**
<paste the domain model: entities, status enum, defaults/derived states, edge cases, state machine>

**Design system:** <repo + path to tokens>; components: <path>. Tokens only, no raw hex.

**Interactions / API:** <behaviors: optimistic save, bulk, cancelled read-only, …>
<endpoints the UI calls: METHOD path — what it does>

**Constraints:** <a11y> · <min touch target> · <framing> · out-of-scope: <…>

**Deliverable:** hi-fi mockup · variations: <N, axis> · <light/dark> · handoff wanted: <yes/no — stack>
```

## Claude Code skill wiring ("prepare UI task")
Give Claude Code an instruction like:
> **When I say "prepare UI task": ** produce a YouTrack ticket description using the template in
> `INTAKE.md`. Pull the domain spec from the linked YouTrack issue(s) verbatim (status enums,
> defaults/derived states, edge cases — never drop them). Fill the design-system path from the
> project's known tokens repo. Leave a screenshot slot if it's a redesign. Output the filled
> template so I can paste it to ClaudeDesign. After ClaudeDesign returns a
> `handoffs/<breadcrumb path>/` package, attach it to the same ticket for implementation.

## Why this shape
ClaudeDesign's output quality tracks its input directly: the sharpest results this project has
produced came from pasting the real ticket (data model + edge cases pinned). The intake template
guarantees those arrive every time. Tokens/components it can read from GitHub itself — so the
**one thing that must always be pasted is the tracker spec**. Attaching the handoff back to the
ticket means the coding agent implements from one self-contained source of truth.
