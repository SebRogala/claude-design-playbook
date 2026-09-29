# INTAKE.md — how to brief ClaudeDesign (the UI-task input contract)

> **Normative.** The access constraints, the required fields, and the task template below are
> defined here and nowhere else. `skills/prepare-ui-task/` reads this file at run time; `PRODUCE.md`
> triages incoming tasks against it. Change the contract here.

## Who ClaudeDesign is
A design partner that turns a product spec into high-fidelity, **token-accurate HTML mockups**
(light/dark, real states, correct locale copy), then — on request — into a **1:1 agent-ready
implementation handoff** (`handoffs/<slug>/`). It works from *context + spec + design-system
tokens*; it does not guess. Give it those three and it designs the view directly (no coding-agent
round-trip needed first).

## The loop
```
YouTrack ticket ──paste──▶ ClaudeDesign ──designs──▶ mockups (you review/iterate)
                                        └──on request──▶ handoff package
                                                          │
                            attach handoff to the SAME ticket ──▶ coding agent implements
                                                                  (from ticket + handoff, 1:1;
                                                                   handoff's spec changes win)
```

## What ClaudeDesign can and can't access (affects what a task must include)
- **GitHub — read only.** If the design-system repo is connected, ClaudeDesign reads tokens,
  components, and source **directly from GitHub** — so a task can just *point* at the repo/path
  (e.g. `<org>/<design-system-repo> → path/to/tokens.css`) instead of pasting token values. It
  cannot **commit or push** — you commit its returned files and attach the handoff to the ticket.
- **Private trackers (YouTrack/Jira) — no access.** ClaudeDesign cannot reach them. The **spec
  must be pasted as text** (this is the one field that always comes verbatim in the ticket body).
- **Screenshots/images — yes**, if attached to the message (needed for redesigns).

## What a good UI design task MUST contain
Assemble a task with these fields before handing it to ClaudeDesign. Missing fields = ClaudeDesign
will ask, so fill them up front.

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
   `<org>/<design-system-repo> → path/to/tokens.css`, components in `<path>`). ClaudeDesign
   **reads these from GitHub directly** if the repo is connected — a path is enough, no need to
   paste values. Rule: token/component layer only, never raw hex.
5. **Interactions & data** — expected behaviors (optimistic save, bulk actions, redirects…),
   and API shapes if the UI consumes them (endpoint + method + what each action does).
   When a view shows data from **more than one owner** (module, service, bounded context), name
   the owner of each data area: the handoff's `fixtures.json` declares an owner per field
   (`HANDOFF.md` §3), and without this input it can only write `unknown`.
6. **Constraints** — accessibility bar (e.g. WCAG AA), min touch target, framing (PWA/no chrome),
   and explicit **out-of-scope** items.
7. **Deliverable expectations** — fidelity (hi-fi), how many **variations/options** to explore
   and along which axis, dark/light, and **whether a handoff package is wanted** (and for which
   coding stack, e.g. Twig + Stimulus).
   - **When a handoff IS wanted, its implementation is the real app with mocked data** — the view
     at its real route, in the real shell, with real components; the only difference from
     production is a fixture at the controller→template seam, and nothing is built behind that
     seam. The deliverable-shape rule is `templates/AGENT.md` §0 (normative).

## Task template
The one block to fill — paste it into ClaudeDesign, and into the ticket so the coding agent later
implements from the same text. `prepare-ui-task` emits it filled.

```md
# UI design task: <breadcrumb path>

**Surface / audience:** …
**Platform / themes / locale:** …
**View(s):** <breadcrumb path> · <purpose>   (redesign? <yes/no — screenshot attached>)

## Spec (verbatim from <TICKET-ID>)
<pasted ticket text — entities, enums, defaults/derived, edge cases, state machine>

## Design system
<repo → path for tokens + components>   (tokens/components only, no raw hex)

## Interactions / API
<endpoints, optimistic behavior, auth/scoping — if any>
<data owners, when the view joins several: data area → module/service>

## Constraints
<a11y, ≥44px touch, PWA framing, out-of-scope>

## Deliverable
Fidelity: hi-fi. Variations: <N, on which axis>. Themes: <…>. Handoff wanted: <yes/no — stack>.

## Open questions (flag, don't invent)
<anything the spec omits but the UI needs>
```

## Claude Code skill
`skills/prepare-ui-task/` assembles this task from a tracker ticket. Install it into the app
project (`.claude/skills/prepare-ui-task` — a symlink into a clone of this repo keeps it current),
then say **"prepare UI task"**. It reads this file for the contract; see its `SKILL.md` for how it
locates it.

## Why this shape
ClaudeDesign's output quality tracks its input directly: the sharpest results this project has
produced came from pasting the real ticket (data model + edge cases pinned). The intake template
guarantees those arrive every time. Tokens/components it can read from GitHub itself — so the
**one thing that must always be pasted is the tracker spec**. Attaching the handoff back to the
ticket means the coding agent implements from one self-contained source of truth — once the
handoff's spec changes (decided during design, `HANDOFF.md` §5) are written back into it.
