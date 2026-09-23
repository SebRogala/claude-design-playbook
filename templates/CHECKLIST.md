# CHECKLIST.md — acceptance contract for <PROJECT>

Tick a box ONLY when it's true in your implementation AND matches the reference PNG in every
theme in scope (`AGENT.md`, top). Unticked = not done. Don't advance with open boxes on the
current screen.

## ⛔ MUST NOT DROP — the edge cases that get silently skipped
> Enumerate the buried cases for THIS design. Delete the examples that don't apply; add yours.
- [ ] Null / empty state renders gracefully (never an error/crash).
- [ ] Error / cancelled / pending / substitute variants each render with their correct treatment.
- [ ] Conditional affordance hides entirely when its data is missing — **no layout gap**.
- [ ] Locale pluralization correct (e.g. 1 / 2–4 / 5+ forms).
- [ ] Config-driven 1..N UI collapses correctly when N = 1.
- [ ] Every theme in scope renders for every screen; contrast meets the accessibility bar.
- [ ] Touch targets ≥ <NN>px.
- [ ] Tokens only — zero raw hex / palette colors bypassing the token layer.
- [ ] All copy in <locale>, matching the reference exactly.

## Shared components
- [ ] <component> …

## <Screen 1>
- [ ] <tickable, testable line> …

## <Screen 2>
- [ ] …
