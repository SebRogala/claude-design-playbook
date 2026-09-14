# claude-design-playbook

Central playbook for design work with Claude. One source of truth, pulled fresh each session,
so nothing depends on remembering which local file was which.

> **Naming.** "ClaudeDesign" in these docs is the *design-partner role* — a Claude project running
> this playbook on Claude Design canvases (`.dc.html`). It is not an Anthropic product, and this
> repo is not affiliated with Anthropic.

The core idea: **keep two things separate.**
- **Producing** a design (the everyday work) — light context.
- **Handing off** to a coding agent (a distinct, later job) — heavy context, loaded only when asked.

And give every project **its own persistent brain** so work survives across sessions.

---

## Repo contents
| File | Role | When it's read |
|---|---|---|
| `INTAKE.md` | How to **brief** ClaudeDesign — the UI-task input contract + template (normative) | Writing a task |
| `skills/prepare-ui-task/` | Claude Code skill that assembles that task from a tracker ticket | Writing a task |
| `CLAUDE.template.md` | Per-project **pointer** → drop in as `CLAUDE.md` | Auto-loaded every session |
| `PROJECT.template.md` | Per-project **living brain** → drop in as `PROJECT.md` | Read/updated every session |
| `PRODUCE.md` | Design-production conventions | While designing |
| `HANDOFF.md` | Full 1:1 agent-handoff playbook | **Only** when a handoff is requested |
| `templates/` | Blank skeletons: handoff (`AGENT.md`, `CHECKLIST.md`, `fixtures.json`, `reference_screens/INDEX.md`) + the project map (`Index.dc.html`) | Handoff time; `Index.dc.html` once there are ≥2 views |

---

## Initializing a new project (do this once, at the start)

**Step 1 — Add the two brain files to the project root.**
- Copy `CLAUDE.template.md` → **`CLAUDE.md`** (the pointer to this repo + project specifics).
- Copy `PROJECT.template.md` → **`PROJECT.md`** (what this project is + decisions log).

**Step 2 — Wire the design context.** Attach or link the real design system / tokens /
components (e.g. the brand's GitHub repo). **If there's no design context, stop and ask for it
— never mock from scratch.**

**Step 3 — Fill in the specifics.** In `CLAUDE.md`, complete the "Project specifics" block
(product, source of truth, locale/themes/platforms, hard constraints). In `PROJECT.md`, fill
"What we're designing" + "Design context".

**Step 4 — Agree scope before building.** Ask focused up-front questions (fidelity, option
count, which variations to explore). Write the **screen inventory** into `PROJECT.md`.

**Step 5 — Commit the system.** Decide type, color tones, spacing/radius, and shared
components up front; record them in `PROJECT.md`.

Now design. The assistant follows `PRODUCE.md`, shows early milestones, iterates, and logs
decisions into `PROJECT.md` as it goes.

### Kickoff checklist
- [ ] `CLAUDE.md` + `PROJECT.md` in the project root.
- [ ] Design context wired (tokens/components attached or linked).
- [ ] Scope + screen inventory agreed and written into `PROJECT.md`.
- [ ] Design system committed (type, color, spacing, shared components).
- [ ] Producing ≠ handing off — don't touch `HANDOFF.md` until a handoff is requested.

---

## Two modes

**Produce** (default): follow `PRODUCE.md`. Get context → ask questions → commit a system →
build the artifact → show early → iterate → offer a self-contained HTML export. Keep the heavy
handoff machinery out of context.

**Handoff** (on request only): when the user explicitly asks to hand off to a coding agent,
**then** read `HANDOFF.md` and copy the `templates/` skeletons in. It produces a
`handoffs/<slug>/` package (`AGENT.md`, `CHECKLIST.md`, `fixtures.json`,
`reference_screens/`, `README.md`) that an agent can implement 1:1, frontend-only, unattended.

---

## How the assistant uses this repo
At session start it reads `CLAUDE.md` (in the project), which points here. During design it
pulls `PRODUCE.md`; at handoff time it pulls `HANDOFF.md` + `templates/`. It **reads** this
repo but **cannot commit** to it.

## Updating the playbook
When we improve a file, the assistant edits it in the working project and hands it back — **you
commit it here.** Next session, every project picks up the change automatically.

## License
MIT — see `LICENSE`.
