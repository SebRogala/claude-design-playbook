---
name: prepare-ui-task
description: >-
  Assemble a complete, design-ready UI task from a YouTrack/Jira/Linear ticket before handing it
  to ClaudeDesign (the HTML-mockup design partner). Use when the user says "prepare UI task",
  "make a design task", "hand this to design", or pastes a ticket meant to become a UI design.
  Produces a single self-contained task block the user pastes into ClaudeDesign.
---

# Prepare UI task (for ClaudeDesign)

Turn a raw ticket into a task ClaudeDesign can design from directly — no back-and-forth. The whole
point: ClaudeDesign works from **context + spec + design-system tokens** and does not guess. Your
job here is to make sure all three are present, then emit one clean, pasteable task block.

## What ClaudeDesign can/can't access (drives what the task must carry)
- **GitHub — read only.** If the design-system repo is connected, ClaudeDesign reads tokens,
  components, and existing source patterns *directly*. So the task only needs to **point** at the
  repo/path (e.g. `SebRogala/Cresco → assets/styles/app.css`), not paste values. It cannot commit/push.
- **Private trackers — no access.** ClaudeDesign cannot open YouTrack/Jira. The **spec must be
  pasted verbatim** — this is the one field it can never fetch itself.
- **Images — only if attached.** For a redesign, attach a screenshot of the current screen.

## Required fields (assemble all of these; ask the user only for what's genuinely missing)
1. **Surface & audience** — which app/area, who uses it, platform (desktop/mobile), themes
   (light/dark/both), locale.
2. **View(s) — by full breadcrumb path** (`Area → Section → … → View`, e.g.
   `Admin CRM → Harmonogram → Wydarzenie → Utwórz jednorazowe`), plus each view's purpose. Use the
   path, not a bare name — it becomes the view's `data-screen-label` and Index entry. Redesign? say so + attach screenshot.
3. **The spec, verbatim** — the domain model that governs the UI: entities, **status enums**,
   **defaults & derived states** (e.g. "unmarked = ABSENT, never stored"), edge cases (null
   instructor, cancelled, make-up, demo, offline…), any state machine. Copy the real ticket text;
   do NOT paraphrase away edge cases — they are what make the design correct.
4. **Design-system pointer** — repo + path for tokens/components (ClaudeDesign reads it from
   GitHub). Rule: token/component layer only, never raw hex.
5. **Interactions / API shapes** — endpoints, optimistic/rollback behavior, auth/scoping, if relevant.
6. **Constraints** — accessibility bar, min touch target, PWA framing, out-of-scope items.
7. **Deliverable expectations** — fidelity, how many variations + on which axis (flow / visuals /
   interaction / copy), themes to show, and **whether an agent handoff is wanted** at the end.

## Missing-field rule
Fill what you can from the repo/README yourself. Ask the user only for what you truly can't obtain
— above all the **verbatim spec**. If the spec omits a field the UI plausibly needs (e.g. no title
on an entity that needs a human label), **flag it as an open question** in the task; never silently invent it.

## Output — emit exactly this block for the user to paste into ClaudeDesign
```
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

## Constraints
<a11y, ≥44px touch, PWA framing, out-of-scope>

## Deliverable
Fidelity: hi-fi. Variations: <N, on which axis>. Themes: <…>. Handoff wanted: <yes/no>.

## Open questions (flag, don't invent)
<anything the spec omits but the UI needs>
```

## After ClaudeDesign returns
On request it produces a 1:1 handoff under `handoffs/<breadcrumb path>/`. Attach that folder to the
**same ticket** so the coding agent implements from one self-contained source of truth.
