# PROJECT.md — living project brain for <PROJECT>

> Keep this in the project root next to CLAUDE.md. It's the durable memory of what this
> project is and every decision made — update it as you go so any future session (or agent)
> can pick up cold. CLAUDE.md points at the shared playbook; THIS file holds project truth.

## What we're designing
- **Surface(s):** _which app/area (e.g. Admin CRM — Students, Groups, Schedule)._
- **Audience & goal:** _who uses it, what it must achieve._
- **Platforms / themes / locale:** _desktop/mobile; light/dark; language._

## Design context (source of truth)
- **Design system / tokens:** _repo + path (e.g. <org>/<design-system-repo> → path/to/tokens.css)._
- **Component vocabulary:** _where components live; which ones to reuse._
- **Reference material:** _screenshots, existing screens, briefs attached to the project._
- **Rule:** use the token/component layer; never raw hex. Flag any new token candidate.

## Design system decisions (the committed system)
- **Type:** _pairing + scale._
- **Color/background tones, accents:** _…_
- **Layout / density / spacing / radius:** _…_
- **Shared components built:** _list as they're created._

## Screen inventory (the plan + status) — mirrors the Index page
| # | Page path (breadcrumb) | Status | File / frame id | Notes |
|---|---|---|---|---|
| 1 | _Admin CRM → Harmonogram → Wydarzenie → Utwórz jednorazowe_ | todo / in-progress / done | _<File>.dc.html #frame_ | _…_ |

> **Page path, not bare names.** Every view is identified by its full breadcrumb
> (`Area → Section → … → View`) — single names collide fast in a growing product. Use the same
> path as the frame's `data-screen-label` and in the Index.

## File map
- **Index (the map of all views):** _`Index.dc.html`_ — one card per view with its breadcrumb
  path, status, and a link to its file/frame. Start from the playbook's `templates/Index.dc.html`
  and edit its `VIEWS` array; keep it updated as views land.
- **View files:** _one `.dc.html` per real view name (e.g. `Attendance.dc.html`)._
- **Standalone export:** _<Name>-standalone.html_
- **Handoff (when built):** _handoffs/<slug>/ — slug of the view's breadcrumb (single view) or of the surface(s) covered (multi-view), ticket id prefixed; rule in HANDOFF.md_

## Decisions log (append-only — date + decision + why)
- _YYYY-MM-DD — decision — rationale / who asked._

## Open questions / to confirm
- _…_
