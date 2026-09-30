# Claude Design Playbook

Playbook for producing UI designs with Claude Design and handing them to a coding agent for a 1:1
implementation. Two different agents read it for two different jobs — find your door below.

Only the design side is tied to a vendor (Claude Design). The coding side is vendor-agnostic: the
brief contract and the handoff package are plain Markdown, JSON and PNGs that any coding agent able
to read files can follow. It has been tested with Claude Code.

> **Unofficial.** Claude and Claude Design are products of Anthropic. This repo is an independent
> playbook, not affiliated with or endorsed by Anthropic. **Designer** in these docs is a Claude
> Design project ([claude.ai/design](https://claude.ai/design) — not Claude Code's own design
> tooling) running this playbook — the design partner.

## For humans: how it's used
1. **Start a new Claude Design project and point it at this playbook first.** Designer copies the
   project files in and wires up the design context (Door 2 below) before any design work.
2. **Send the brief.** In the app's own coding-agent session (on your machine), have the agent
   prepare the intake per `INTAKE.md` — the `prepare-ui-task` skill does it — and paste the
   result into Designer.
3. **Design together.** Iterate on the canvas until you're happy with it.
4. **Ask for the handoff.** Designer packages it per `HANDOFF.md`; give the package to the coding agent
   in the app project, which implements it 1:1 following its `AGENT.md`.

Prerequisites: Claude Design access, a coding agent in the app repo (any vendor),
and the app or design-system repo on GitHub so Designer can read its tokens and components. To adapt the
playbook, fork it and point Designer and the skill at your fork.

## What Claude Design is (if this session has never seen it)
*As observed in September 2026 — the product changes; verify against the current one.*
Claude Design is Anthropic's design canvas, a separate product at
[claude.ai/design](https://claude.ai/design) — not the design tooling inside Claude Code
(Artifact design systems, the `artifact-design` skill, `/design`). Claude authors screens as
`.dc.html` artboards (HTML that runs with a small `support.js` runtime, one per frame) laid out on
a pan/zoom canvas; a human refines them visually; the canvas exports PNG/PDF. In this playbook the
Claude Design project running on that canvas is called **Designer** — the design partner. It can
read a connected GitHub repo (tokens, components, existing patterns) but cannot commit, cannot reach private trackers, and sees images only when
attached. Those limits decide what a brief must carry.

## Door 1 — you are the app-project agent (the coding agent where scope is being discussed)
Your deliverable is the **brief**: one pasteable task block Designer can design from without a
follow-up question.
1. Read `INTAKE.md` — the contract: what Designer can access, the seven required fields, the
   task template.
2. Fill the template. Spec **verbatim** from the ticket (enums, defaults, edge cases); design
   system as repo + path, not pasted values; anything the spec omits goes under *Open questions*,
   never invented.
3. Hand the block to the user. They paste it into Designer and into the ticket.

`skills/prepare-ui-task/` does steps 1–3 as an agent skill (`SKILL.md` format) when installed;
without it, follow the steps by hand. Later, when a
handoff package comes back under `handoffs/<slug>/`, it is attached to the same ticket and the
coding agent follows its `AGENT.md`.

## Door 2 — you are Designer (a new Claude Design project)
1. Copy `CLAUDE.template.md` → **`CLAUDE.md`** and `PROJECT.template.md` → **`PROJECT.md`** into
   the project root. Fill "Project specifics" from the brief — surface, locale, themes, tokens
   repo, constraints are all in it.
2. Wire the design context: attach or link the design-system repo the brief points at. **No design
   context → stop and ask; never mock from scratch.**
3. Triage the brief per `PRODUCE.md` ("When handed a task"), agree scope, write the screen
   inventory into `PROJECT.md`, then design — token spine committed with the first screen, shared
   components extracted once two screens exist (`PRODUCE.md` → While building). Log decisions
   into `PROJECT.md` as you go.
4. Read `HANDOFF.md` and `templates/` **only** when the user asks for a handoff.

You read this repo; you cannot commit to it. Improvements to a playbook file are edited in the
working project and handed back — the user commits them here.

### Kickoff checklist
- [ ] `CLAUDE.md` + `PROJECT.md` in the project root, specifics filled from the brief.
- [ ] Design context wired (tokens/components attached or linked).
- [ ] Scope + screen inventory agreed and written into `PROJECT.md`.
- [ ] Token spine committed with the first screen; shared components extracted at two screens.
- [ ] Producing ≠ handing off — `HANDOFF.md` untouched until a handoff is requested.

## Repo contents
| File | Role | Who reads it, when |
|---|---|---|
| `INTAKE.md` | The UI-task input contract + template (normative) | App-project agent, writing the brief; Designer, triaging it |
| `skills/prepare-ui-task/` | Optional agent skill that assembles the brief from a tracker ticket | App-project agent |
| `CLAUDE.template.md` | Per-project pointer → drop in as `CLAUDE.md` | Designer, auto-loaded every session |
| `PROJECT.template.md` | Per-project living brain → drop in as `PROJECT.md` | Designer, read/updated every session |
| `PRODUCE.md` | Design-production conventions | Designer, while designing |
| `HANDOFF.md` | The 1:1 agent-handoff playbook | Designer, **only** when a handoff is requested |
| `templates/` | Skeletons: handoff (`AGENT.md`, `README.md`, `CHECKLIST.md`, `fixtures.json`, `reference_screens/INDEX.md`) + the project map (`Index.dc.html`) | Handoff time; `Index.dc.html` once there are ≥2 views |

The core idea is to **keep two things separate**: producing a design (everyday, light context) and
handing off to a coding agent (a later, distinct job with heavy context, loaded only when asked) —
and to give every project its own persistent brain so work survives across sessions.

## Why it exists
Two failures this playbook was built against:
- Told "let's redesign" with no brief, an agent silently dropped roughly a third of the screen's
  functionality — nothing enumerated, so nothing was missed *visibly*.
- Told "implement 1:1", an agent shipped the real PWA route with the prototype's two theme chromes
  side by side inside it. First a preview instead of the app; then the app wearing the preview.

The countermeasures, in the order they bite: a briefing contract so the spec arrives verbatim
(`INTAKE.md`); a deliverable-shape rule that defines "done" as the real app with mocked data at the
real data seam (`templates/AGENT.md` §0); an enumerated screen × state × affordance
inventory plus an adversarial completeness pass by a non-builder; and reference PNGs as ground
truth rather than as the delivery format.

## License
MIT — see `LICENSE`.
