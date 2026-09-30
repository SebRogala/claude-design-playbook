---
name: prepare-ui-task
description: >-
  Assemble a complete, design-ready UI task from a YouTrack/Jira/Linear ticket before handing it
  to Designer (a Claude Design project at claude.ai/design, not Claude Code's own design tooling —
  the HTML-mockup design partner; see the playbook README). Use when the user says
  "prepare UI task", "make a design task", "hand this to design", or pastes a ticket meant to
  become a UI design.
  Produces a single self-contained task block the user pastes into Designer.
---

# Prepare UI task (for Designer)

Turn a raw ticket into a task Designer can design from directly — no back-and-forth.
Designer works from **context + spec + design-system tokens** and does not guess; this skill
makes sure all three arrive, then emits one clean, pasteable task block.

## The contract is `INTAKE.md` — read it first, every run
`INTAKE.md` in the playbook repo is normative: what Designer can and can't access, the seven
required fields, and the task template this skill emits. Locate it, in order:
1. `../../INTAKE.md` relative to this file's **real path** (resolve the symlink first, e.g. with
   `realpath` — the skill is installed as a symlink into a clone of the playbook).
2. `gh api repos/<owner>/claude-design-playbook/contents/INTAKE.md --jq .content | base64 -d` —
   `<owner>` is the user's fork, else `SebRogala` (needs the user's `gh` login).
3. Neither reachable → say so and stop. Do not reconstruct the contract from memory.

## Procedure
1. **Read `INTAKE.md`** (above).
2. **Fill every field you can yourself** from the ticket, the repo, and its README. Design-system
   pointer = repo + path; Designer reads GitHub, so point, don't paste values.
3. **Pull the spec verbatim** from the linked ticket(s), with whatever tracker access this session
   has — none → ask the user to paste the ticket text: entities, status enums, defaults/derived
   states, edge cases, state machine. Never paraphrase edge cases away — this is the one field
   Designer cannot fetch itself.
4. **Ask the user only for what you genuinely can't obtain.** If the spec omits a field the UI
   plausibly needs, **flag it under "Open questions"** — never silently invent it.
5. **Emit `INTAKE.md`'s task template, filled**, as one block the user pastes into Designer
   and into the ticket.

## After Designer returns
On request it produces a 1:1 handoff under `handoffs/<slug>/`. Attach that folder to the **same
ticket** so the coding agent implements from one self-contained source of truth.
