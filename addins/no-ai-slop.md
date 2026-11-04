# No AI slop — design add-in

Apply this file when the brief's `Add-ins:` field lists `no-ai-slop` (`INTAKE.md` → Task
template). Read Settings, then work in three steps, in order.

## Settings
- **Spacing** — the brief picks one level; the default is `balanced`.

  | Level | Section padding, desktop / phone | Body line-height |
  |---|---|---|
  | `compact` | ≈ 48 / 32 px | 1.45 |
  | `balanced` | ≈ 96 / 64 px | 1.6 |
  | `airy` | ≈ 160 / 96 px | 1.75 |

- **Taste profile** — if the operator supplies a taste profile, apply it. A taste profile overrides
  Settings and the Slop-check list. It cannot override the three honesty rules (facts from the
  brief, labelled placeholders, sourced numbers) or any PRODUCE.md rule. The honesty rules are
  PRODUCE.md's placeholder, sample-data and no-filler rules.

## 1. Derive first (before drawing)
Write a 6-line design rationale. Each line names a choice and the fact about this customer, the brand's
character, region or owner that decides it; a line without such a fact is unfinished. Derive from who
buys and how the brand behaves, not from the tools of the trade.
1. **Type** — 1–2 families and a scale, chosen for what the customer must read and where.
2. **Palette** — 4–6 named roles (ground, text, dominant, accent, state) from the brand's character,
   place or existing brand.
3. **Layout lead** — the first screen shows the one thing only this business offers.
4. **Spacing** — the brief's spacing level (Settings) and a 4–6 step scale that reaches its section padding.
5. **Imagery** — what real photos or drawings show, and who supplies them.
6. **Voice** — how the owner talks to customers, in one sample sentence.

Escape the new defaults too: Space Grotesk, cream + terracotta, graphite + one bright tool-accent and zero-radius
broadsheet grids are what an avoid-list breeds. Any choice is a default when its reason would fit another
business. Inter, a gradient or a card passes when its line names the reason. A reason names a fact about the customer ("modern" and "clean" name none).

## 2. Build
Build from the rationale: a structured layout in which every screen carries information (real content or navigation to it in the first viewport). Cards, section labels and numbered blocks are structure, not slop, when they give rhythm.
Take facts and numbers from the brief, per PRODUCE.md → Sample data and Placeholders (review, rating,
client name, logo and claim included). Label missing facts (`[review — from owner]`, `[years trading]`).
A labelled placeholder is not filler.

## 3. Slop check (after drawing)
Walk this list as a checklist on the draft; it is a check, not a generator. A hit is a listed
pattern no rationale line justifies. Fix every hit, then list each fix: pattern, where, replacement.
Tells compound, so a page with 3 or more hits needs a redesign, not a patch.

### Typography
- Use the rationale's families and scale throughout. Counters: system-default font picked by habit.
- Keep mono for code and data, and headings in solid colour. Counters: mono as decoration, gradient text.
- Set body text at the spacing level's line-height. Counters: one browser-default line-height everywhere.
### Colour
- Hold one dominant colour and one sharp accent. Counters: purple→blue gradients, indigo-500, timid even palettes.
- Tint the near-black and near-white toward the palette. Counters: pure #000 / #fff.
- On dark grounds, save saturation for the key action. Counters: neon glow.
### Layout
- Open with the product-specific lead from line 3. Counters: hero + pill badge + 3 cards + CTA.
- Show real information, or clear navigation to it, on every screen. Counters: decoration that delays information.
- Left-align body text, and change the block pattern between neighbouring sections. Counters: everything centred, the same card or grid pattern 3+ sections in a row.
- Space every gap from the rationale's scale. Counters: one padding value everywhere.
- Use a table for tabular data. Counters: nested cards, tabular data split into cards.
### Components
- Assign radius, shadow and blur by hierarchy. Counters: rounded-2xl + soft shadow on every box, glassmorphism as texture.
- Give each view one primary button. Counters: competing filled CTAs.
- Add an icon only where it speeds recognition. Counters: emoji bullets, icon on every line.
- Number blocks only when they form a real sequence. Counters: "01 / 02 / 03" on unordered items, a one-sided accent border.
- Let the heading and content speak for a section; a line under a heading must add information the heading lacks. Ship without explanatory captions, and ask the owner once per site whether they want them; log the answer in `PROJECT.md`'s decisions log. App screens follow PRODUCE.md → Element grammar for captions. Counters: captions or helper text saying what a section or element is or does.
- Draw real focus, error and validation states. Counters: happy-path-only forms.
### Imagery and copy
- Show the business's real work, place or people, with alt text that describes them. Counters: blobs, flat illustrations, stock "diverse team", empty alt.
- Draw motifs from the brand's character. Counters: literal props of the client's trade (tools, measuring instruments, technical drawings).
- Write a headline only this business could use, and a subtitle that adds a fact. Counters: "Elevate your …", "Solutions for every need", a subtitle restating the headline.
- Label each button with its outcome ("Call for a quote"). Counters: "Get Started", "Learn more".
### Motion and data
- Keep motion to one entrance transition of 300 ms or less per element; reveal content only when it stays readable before and during the reveal. Counters: content hidden, blurred or faded until scroll, decorative effects, bounce easing, `transition: all`.
- Show each number with its source and context (PRODUCE.md → Check computed figures), or delete it. Counters: invented stats, count-up counters, fake testimonials.
