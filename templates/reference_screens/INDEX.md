# Reference screens — index

Ground-truth renders at **true frame aspect ratio** (full frame, no crop, no margin). The
implementation must match these — layout, spacing, color (tokens), copy, both themes.
Group into one subfolder per app/surface.

- **Phone screens:** <device width> px wide × natural height.
- **Desktop screens:** <W × H>.

## `<App A>/`
| File | Screen / state | What to match |
|---|---|---|
| `01-<name>.png` | <screen> | <key elements / which edge case it demonstrates> |
| `02-<name>.png` | … | … |

## `<App B>/`
| File | Screen / state | What to match |
|---|---|---|
| `01-<name>.png` | … | … |

## Inspecting beyond the PNGs
Open `../<standalone>.html` in a browser for live, full-size screens and to reach interactive
states (theme toggle, switchers, sheets, etc.).
