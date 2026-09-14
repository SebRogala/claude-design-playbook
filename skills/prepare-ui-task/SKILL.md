---
name: prepare-ui-task
description: >-
  Assemble a complete, design-ready UI task from a YouTrack/Jira/Linear ticket before handing it
  to ClaudeDesign (the HTML-mockup design partner). Use when the user says "prepare UI task",
  "make a design task", "hand this to design", or pastes a ticket meant to become a UI design.
  Produces a single self-contained task block the user pastes into ClaudeDesign.
---

# Prepare UI task (for ClaudeDesign)

Turn a raw ticket into a task ClaudeDesign can design from directly — no back-and-forth.
ClaudeDesign works from **context + spec + design-system tokens** and does not guess; this skill
makes sure all three arrive, then emits one clean, pasteable task block.

## The contract is `INTAKE.md` — read it first, every run
`INTAKE.md` in the playbook repo is normative: what ClaudeDesign can and can't access, the seven
required fields, and the task template this skill emits. Locate it, in order:
1. `../../INTAKE.md` relative to this file (skill installed as a symlink into a clone of the playbook).
2. `gh api repos/SebRogala/claude-design-playbook/contents/INTAKE.md --jq .content | base64 -d`
   (works whether the repo is private or public, using the user's `gh` login).
3. Neither reachable → say so and stop. Do not reconstruct the contract from memory.

## Procedure
1. **Read `INTAKE.md`** (above).
2. **Fill every field you can yourself** from the ticket, the repo, and its README. Design-system
   pointer = repo + path; ClaudeDesign reads GitHub, so point, don't paste values.
3. **Pull the spec verbatim** from the linked ticket(s): entities, status enums, defaults/derived
   states, edge cases, state machine. Never paraphrase edge cases away — this is the one field
   ClaudeDesign cannot fetch itself.
4. **Ask the user only for what you genuinely can't obtain.** If the spec omits a field the UI
   plausibly needs, **flag it under "Open questions"** — never silently invent it.
5. **Emit `INTAKE.md`'s task template, filled**, as one block the user pastes into ClaudeDesign
   and into the ticket.

## After ClaudeDesign returns
On request it produces a 1:1 handoff under `handoffs/<slug>/`. Attach that folder to the **same
ticket** so the coding agent implements from one self-contained source of truth.
