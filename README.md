# claude-design-playbook

Playbook for producing UI designs with Claude Design and handing them to a coding agent for a 1:1
implementation. Two different agents read it for two different jobs — find your door below.

> **Naming.** "ClaudeDesign" in these docs is the *design-partner role* — a Claude project running
> this playbook on Claude Design canvases (`.dc.html`). It is not an Anthropic product, and this
> repo is not affiliated with Anthropic.

## What Claude Design is (if this session has never seen it)
Claude Design is Anthropic's design canvas: Claude authors screens as `.dc.html` artboards
(HTML that runs with a small `support.js` runtime, one per frame) laid out on a pan/zoom canvas; a
human refines them visually; the canvas exports PNG/PDF. In this playbook the Claude project running on that canvas is called
**ClaudeDesign** — the design partner. It can read a connected GitHub repo (tokens, components,
existing patterns) but cannot commit, cannot reach private trackers, and sees images only when
attached. Those limits decide what a brief must carry.

## Door 1 — you are the app-project agent (Claude Code, where scope is being discussed)
Your deliverable is the **brief**: one pasteable task block ClaudeDesign can design from without a
follow-up question.
1. Read `INTAKE.md` — the contract: what ClaudeDesign can access, the seven required fields, the
   task template.
2. Fill the template. Spec **verbatim** from the ticket (enums, defaults, edge cases); design
   system as repo + path, not pasted values; anything the spec omits goes under *Open questions*,
   never invented.
3. Hand the block to the user. They paste it into ClaudeDesign and into the ticket.

`skills/prepare-ui-task/` does steps 1–3 as a Claude Code skill when installed. Later, when a
handoff package comes back under `handoffs/<slug>/`, it is attached to the same ticket and the
coding agent follows its `AGENT.md`.

## Door 2 — you are ClaudeDesign (a new Claude Design project)
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
| `INTAKE.md` | The UI-task input contract + template (normative) | App-project agent, writing the brief; ClaudeDesign, triaging it |
| `skills/prepare-ui-task/` | Claude Code skill that assembles the brief from a tracker ticket | App-project agent |
| `CLAUDE.template.md` | Per-project pointer → drop in as `CLAUDE.md` | ClaudeDesign, auto-loaded every session |
| `PROJECT.template.md` | Per-project living brain → drop in as `PROJECT.md` | ClaudeDesign, read/updated every session |
| `PRODUCE.md` | Design-production conventions | ClaudeDesign, while designing |
| `HANDOFF.md` | The 1:1 agent-handoff playbook | ClaudeDesign, **only** when a handoff is requested |
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
controller→template seam (`templates/AGENT.md` §0); an enumerated screen × state × affordance
inventory plus an adversarial completeness pass by a non-builder; and reference PNGs as ground
truth rather than as the delivery format.

## License
MIT — see `LICENSE`.
