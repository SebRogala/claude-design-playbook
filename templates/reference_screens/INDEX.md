# Reference screens — index

Ground-truth renders at **true frame aspect ratio** (full frame, no crop, no margin). The
implementation must match these — layout, spacing, color (tokens), copy, every theme in scope.
Group into one subfolder per app/surface.

- **Phone screens:** <device width> px wide × natural height.
- **Desktop screens:** <W × H>.
- **Captured:** <YYYY-MM-DD> — recapture if the design file changed after this date.

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
Open `../<Screen>-prototype.<ext>` in a browser for live, full-size screens and to reach interactive
states (theme toggle, switchers, sheets, etc.). It needs `../support.js` beside it and network
access for fonts/icons.
