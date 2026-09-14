# CLAUDE.md — drop this in a new project's root and fill in the specifics

> This is a POINTER file. It keeps context light: full handoff instructions live in the
> playbook repo and are read **only when a handoff is requested**, not during design.

## Playbook source
Central repo: **github.com/<YOU>/claude-design-playbook** (read fresh; don't rely on memory).
- When I **paste a task** → triage it first per `PRODUCE.md` ("When handed a task"): check it
  against `INTAKE.md`, read the connected repo yourself for anything readable (tokens, components,
  existing patterns), ask me only for what you genuinely can't obtain, and discuss the key design
  decisions — then design.
- While **producing** design work → follow `PRODUCE.md` from that repo.
- Only when I explicitly ask to **hand off to a coding agent** → read `HANDOFF.md` (and the
  `templates/`) from that repo and follow it exactly. Do **not** pull `HANDOFF.md` before then.

## Project specifics (fill these in)
- **Product:** _what it is, who uses it._
- **Design source of truth:** _the design file(s) in this project._
- **Brand tokens / design system:** _where colors, type, components come from. Rule: use the
  token/component layer, never raw hex that bypasses it._
- **Language / locale, themes, platforms:** _e.g. Polish; light+dark; mobile + desktop._
- **Hard constraints:** _accessibility bar, min touch target, framing, out-of-scope items._

## Working style
Move fast; ask focused questions up front only when scope is genuinely ambiguous; flag
scope-reversals explicitly; deliver downloadable self-contained HTML; keep summaries short.
