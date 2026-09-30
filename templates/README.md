# <Breadcrumb, e.g. Admin CRM → Harmonogram → Wydarzenie → Obecność>

**Handoff <version> — <YYYY-MM-DD>**

## What's in this package
- `<Screen>-prototype.<ext>` — build source.
- `support.js` — runtime for the prototype (fonts and icons load from the network).
- `<Screen>.<ext>` — provenance only — do not build from it. _(Delete this line if not shipped.)_
- `README.md` — spec (this file).
- `CHECKLIST.md` — acceptance contract.
- `fixtures.json` — data.
- `reference_screens/` — ground truth, <N> PNGs (index: `reference_screens/INDEX.md`).
- `AGENT.md` — implementer's protocol; read first.

Give the agent: _"Read `AGENT.md` and follow it exactly. Implement the frontend 1:1 against
`reference_screens/` using `fixtures.json`. Do not stop until every `CHECKLIST.md` box passes; log
anything you can't resolve in `NOTES.md`."_

## Spec changes vs ticket
_(Restyling a screen already in the app: `## Spec changes vs current app` — `HANDOFF.md`.)_
Compared against: <ticket id> + <intake brief path>  _(restyle: <template file> @ <ref>)_
- <ticket said X> → **build <Y>**. Why: <reason | not recorded>.

_(None → "None — the ticket is current.")_

## Tokens
<values until they exist in the app codebase; then a pointer to the app's token file + new tokens only>

## Screens
### <Screen>
<layout, components, copy>

## Interactions & state
<behaviour per affordance>

## Data shapes
<see `fixtures.json`; formats, owners>

## Assets
<fonts/icons: exact version, every weight and style loaded — must match the prototype's `<link>` / `@import`>

## Glossary
<term — meaning>

## Constraints
<a11y bar, touch floor, themes in scope, out of scope>

## Open decisions — questions, not requirements; do not invent answers
- <question> — interim behaviour: <…>
