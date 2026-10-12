# LOCAL.md — Designer in Claude Code (the local path)

> **Pilot.** Piloted in two projects, October 2026. This file lists only what changes when
> Designer runs as a Claude Code session in the app repo; where it is silent, the rest of the
> playbook applies unchanged. Its overrides win over the files they name. The web path (a Claude
> Design project, README Door 2a) stays as documented. Once the pilot questions at the end are
> answered, the overrides get folded into the files they name.

## Why there are two paths
The standalone Claude Design at claude.ai/design closes on 2026-12-14 (Anthropic's migration
article, 17440474). Claude Design now runs inside Claude (web) and inside Claude Code (`/design`,
Claude Code v2.1.265 or later). The canvas is the same in both: `.dc.html` artboards on a
pan/zoom canvas, editable by hand in the browser. What changes is the container. A Claude Code
canvas is an Artifact: no project, no project chat, no project files, and artifacts cannot be
grouped into folders. The app repo takes the project's place.

## Layout in the app repo
```
design/
  CLAUDE.md                      CLAUDE.template.md, filled in
  PROJECT.md                     PROJECT.template.md, filled in; holds each canvas URL
  tasks/<slug>.intake.md         the brief: INTAKE.md's task template, filled in
  canvas/<canvas-slug>/project/  the canvas source: canvas.json + *.dc.html + theme.css, committed
  system/components.md           the component inventory: name, board, variants (greenfield)
  reference/                     reference assets the boards use (see What goes in git)
  handoffs/<slug>/               handoff packages + handoffs/README.md
```
`<canvas-slug>`: one canvas per module, the HANDOFF.md slug of the brief's breadcrumb down to the
module it adds or changes, without the ticket id (`desktop-app--reports--monthly-summary`).
A later brief under the same module reuses that canvas as a new page.
- **App-wide UI** (top bar, sidebar, global navigation) gets one canvas per surface,
  `<surface>--shell` (`desktop-app--shell`). A module brief that turns out to change it mocks the
  change there, not on the module's canvas. (Observed in one project: a top-bar change came up
  mid-brief, had no home and went on the module canvas.)
- **One canvas can feed several packages**, one per ticket (observed: a new page and an app-wide top-bar change). Their
  build sources share one `Handoff · build sources` page, and each package's README names the
  others.

## What goes in git
The design is product and gets committed. Its inputs and working notes may hold private tracker
text or third parties' data, so the repo's visibility decides where they go. Record it in
`design/CLAUDE.md` → Project specifics as `Repo visibility: public | private` (check with
`gh repo view --json visibility`).

| Path | Private repo | Public repo |
|---|---|---|
| `design/CLAUDE.md`, `design/PROJECT.md` | commit | commit |
| `design/canvas/` | commit | commit |
| `design/handoffs/` | commit | commit |
| `design/tasks/` (briefs: verbatim tracker text) | commit | gitignore |
| `design/pilot-notes.md` (playbook misfits) | gitignore | gitignore |
| `design/system/` | commit | commit |
| `design/reference/` (art, scans, logos the boards use) | commit if owned or licensed and free of personal data, else move to `design/private/` | same |
| `design/private/` (raw screenshots, attachments, capture plans, anything with personal data) | gitignore | gitignore |

Public repo, gitignored paths: the tracker ticket stays the source of the spec, so a lost brief can
be rebuilt from it. Files that are committed cite the ticket id and state the decision; they never
paste tracker text or third parties' personal data. Domain data a third party supplied for the
product to ship (observed: a community member's game-log statistics, which the page displays) is product and may
be committed. `fixtures.json`'s reserved-domain rule (HANDOFF.md §3)
applies regardless.

Entries for the app repo's `.gitignore` (public repo; a private repo drops the first line):
```
# Design inputs and working notes (claude-design-playbook LOCAL.md → What goes in git)
/design/tasks/
/design/pilot-notes.md
/design/private/
```

## Three sessions
Keep them separate, so the adversarial completeness pass (`templates/AGENT.md` §4.5) is still
done by an agent that did not build the design.
1. **App session** — where scope is discussed. Writes the brief to `design/tasks/<slug>.intake.md`
   and hands the user the Designer's first prompt, verbatim, from below
   (`skills/prepare-ui-task/` step 5). Owns the app's spec documents and the ticket: spec changes
   decided while designing are written back here (or by the implementer, `templates/AGENT.md` §0b).
2. **Designer session** — a new Claude Code session at the app repo root. First prompt:
   `/design You are Designer. Read design/CLAUDE.md and follow it; the brief is design/tasks/<slug>.intake.md.`
   **First run in a repo** (no `design/CLAUDE.md` yet):
   `/design You are Designer. Read <playbook clone>/README.md (Door 2b) and LOCAL.md and set up design/ as they say; the brief is design/tasks/<slug>.intake.md.`
   Designer then creates `design/CLAUDE.md` and `design/PROJECT.md` from the templates, records the
   repo visibility, and adds the `.gitignore` entries (What goes in git) before anything else in
   `design/` is written. A bare `/design <brief>` loads only the Design type and skips the playbook
   (observed in one project: day 1 ran with no `PROJECT.md`, decisions log or token spine).
   The Designer writes only under `design/`. Changes it thinks the app spec or this playbook need
   go to the user (spec) or `design/pilot-notes.md` (playbook), never into those files directly.
3. **Implementer session** — a new session per handoff, pointed at `design/handoffs/<slug>/AGENT.md`.

**A repo with no commits or no remote.** Visibility is `private — no remote yet` until a remote
exists; re-check it then. Ask the user once which branch the first commit goes on, and record the
answer in `design/CLAUDE.md`.

## Overrides, by file
**README Door 2a, step 1** — copy the templates into `design/`, not a project root. In
`design/CLAUDE.md`, the playbook source is this repo's local clone path, read fresh.

**INTAKE.md, "What Designer can and can't access"**
- Designer reads the app repo directly. The design-system field is still a path; no GitHub
  connection is needed.
- Tracker access is whatever the Designer session has. The spec is still copied **verbatim** into
  the brief, so the brief stays the one self-contained source.
- The brief is a file in `design/tasks/`, not pasted text. Screenshots are files in the repo, or
  attached to the session.

**PRODUCE.md**
- **One canvas per module** (Layout), with one canvas page per brief or round (a canvas holds up
  to 40 pages and 512 files). Record each canvas URL in `PROJECT.md` → File map. A later brief for
  the same module revises that canvas by its URL; it never starts a second one.
- **No `Index.dc.html`.** Canvas pages plus `handoffs/README.md` cover navigation within a canvas,
  and `PROJECT.md` → File map lists the canvases (observed in one project: the owner navigated by page
  and never asked for an index).
- **The design system is the repo's own.** The tokens and components the brief points at are the
  design system. A Design System artifact is neither required nor created, so the Design type
  reporting "no design system" is expected and is not PRODUCE.md's "no design context → ask".
- **Canvas source lives in the repo.** Publish with the Artifact `root` set to
  `design/canvas/<canvas-slug>`, not the scratchpad. This overrides the Design type's own
  "scratch only, never commit" line. Commit after each round when the user answers yes to an
  explicit "commit this round?"; approving the design alone is not a yes to the commit.
  The user's hand edits in the browser exist only on the canvas, so `read` each changed artboard
  back into the same path before committing. The canvas is the live copy; git is the version
  history Claude Design does not have yet.
- **Labels and rationale.** The Design type puts rationale and option notes in the reply, never on
  an artboard. Direction and variant labels (Greenfield: directions first) go in each board's
  `title`, which the canvas shows in the frame's name strip.
- **Verification: render every round.** The playbook asks for it, which overrides the Design
  type's "never verify unless asked". Before presenting a round, capture the changed boards with
  the capture tool (Capturing reference PNGs) and read the PNGs back. Observed in one project: with
  the user as the only reviewer, day 1's visual bugs were all found by the owner; the first local
  render caught six more at once. Computed figures are checked too (PRODUCE.md → While building).
- **Shared components are real files.** Shared styles go in `project/theme.css`, linked from each
  board; the component inventory is `design/system/components.md`. A token whose value is a canvas
  upload (`url(/_blob/<id>)`) works only on the canvas: the handoff's token table gives the repo
  path of the source file instead.
- **Recreated app chrome keeps the app's glyphs.** The Design type bans emoji; when PRODUCE.md's
  app-chrome rule recreates existing UI that uses emoji, the recreation keeps them.
- **No standalone export.** `<Name>-standalone.html` is not produced; the canvas link and its
  per-artboard PNG/PDF export cover click-through for humans.

**HANDOFF.md**
- The package goes to `design/handoffs/<slug>/` and is committed. §7's download card and
  `<product>-handoff--<slug>.zip` are dropped; registering on the Index stays.
- **§6 stripped prototype** — make it an artboard on a `handoff` page of the same canvas, named
  `<Screen>-prototype.dc.html`, so it renders where the user can see it. The package points at
  its file under `design/canvas/<canvas-slug>/project/` and at the canvas URL; no copy, no
  `support.js` beside it. In `templates/AGENT.md` §0b, §1 and §3, write the prototype's path as
  `design/canvas/<canvas-slug>/project/<Screen>-prototype.dc.html (canvas: <URL>, page Handoff ·
  build sources)` and drop the `support.js` mention.
- **§4 reference PNGs** are captured by the session (Capturing reference PNGs, below). A handoff is
  something the user asked for, so the Design type's "never render unless asked" does not apply.
  §4's overlay, tiling and stitching steps are web-canvas workarounds; the local capture takes a
  full-height frame in one shot. §4's other rules (every state, every theme, recapture before
  handing off, eyeball the bottom edge) stand.

**skills/prepare-ui-task/** — when the app repo has a `design/` folder, write the filled template
to `design/tasks/<slug>.intake.md` instead of only printing it.

## Capturing reference PNGs
`tools/capture-canvas.mjs` renders the canvas's boards in headless Chrome and saves full-height
PNGs. It needs Chrome and Node 22 or later. Run it from a staging folder in the scratchpad, never
from the repo.
1. **Stage the boards.** Make an empty `site/` and copy every file of
   `design/canvas/<canvas-slug>/project/` except `canvas.json` into it (boards and shared CSS).
2. **Stage the runtime.** Artifact `read`, `url` = the canvas, `path` = `artifact-type/dc-runtime.js`;
   copy the saved file to `site/support.js`.
3. **Stage the uploads.** For each `/_blob/<id>` the boards reference, put the file at
   `site/_blob/<id>`: the local source file when you know which upload it was, else Artifact `list`
   with `scope: "assets"`, then `read` with `path` = the id. The tool refuses to run while any id is
   missing.
4. **One copy per prop state.** For a board driven by a `data-props` enum, write one copy per state
   with the state set as the `"default"` inside `data-props`. The runtime passes that default as
   the prop, so changing only the `this.props.x ?? '<value>'` fallback has no effect.
5. **Write a plan**, a JSON array with one entry per PNG: `{"file", "out", "width", "h"?,
   "transparent"?, "actions"?, "measure"?}`. `actions` are JS expressions that must return `true`
   (e.g. click the tab whose text starts with a family name). Leave `h` unset for the full content
   height. `transparent: true` gives an alpha background (icon assets).
6. **Run** `node tools/capture-canvas.mjs --site <site> --out <dir> --plan <plan.json>` (options:
   `--chrome`, `--timezone <IANA zone>` to match the fixture's time format, `--port`/`--cdp-port`,
   which default to OS-picked free ports). Exit 2 means an action failed or a `{{hole}}` rendered
   unfilled; the log names the PNG. Chrome needs to write its profile and open local ports, which
   Claude Code's sandbox can block: observed working with `TMPDIR` pointed at the scratchpad's
   parent in one project and, in another, only with the sandbox disabled for the command.
7. **Read every PNG back** before copying it into `handoffs/<slug>/reference_screens/`: bottom
   edge present, no trailing blank space, no placeholder text. After a prototype change, re-stage
   that board and rerun only its entries.

Keep project plans next to the brief's other private material (`design/private/`). Observed in
one project: the tool's output matched the committed references byte for byte.

## Pilot questions
Answered from the two pilots (October 2026) where they showed; the rest wait for a second brief or the implementer run.
1. Does the Designer session follow `design/CLAUDE.md` from the first prompt alone?
   Answer: not tested yet. Both pilots were first runs (prompt pointed at Door 2b); the first-run setup worked. Needs a second brief in the same repo.
2. Does `/design` publish from `root` = `design/canvas/<canvas-slug>`, or insist on the scratchpad?
   Answer: from the repo: four publishes from `design/canvas/<canvas-slug>`, no refusal.
3. Is the per-artboard preview delay acceptable compared with the standalone canvas?
   Answer:
4. Do the user's hand edits read back into the repo cleanly?
   Answer: not tested; neither pilot had hand edits. Twice the canvas reported a newer version this session had not published, with every board byte-identical to the repo copy; the source of those versions is unknown, and each cost a read-and-compare.
5. Does the canvas `pages` feature make `Index.dc.html` redundant?
   Answer: yes for one canvas (three pages plus `handoffs/README.md`). Across canvases, `PROJECT.md` → File map does the job; untested past one canvas.
6. Reference PNGs (HANDOFF.md §4): canvas PNG export by hand, or captured by the session?
   Answer: captured by the session; now Capturing reference PNGs above.
7. Is the slimmed handoff enough for the implementer session?
   Answer: yes. The implementer read the prototype from `design/canvas/…` in its
   worktree; nobody opened the canvas URL. Costs came from content, not the pointer: `AGENT.md`
   ranked the prototype as a fallback (fixed in `templates/AGENT.md` §1, §3), and the package
   changed after the build started (HANDOFF.md → Changing a package after the build started).
