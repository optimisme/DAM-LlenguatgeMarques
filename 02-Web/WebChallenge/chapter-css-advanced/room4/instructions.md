# Room 4: Create a Gradient

## Problem
The banner has a solid background color. We want a gradient for a more modern look.

## Task
Edit `styles.css` to change the `.banner` background from a solid color to a gradient using `linear-gradient()`.

## Success Condition
The `.banner` background-image must contain a gradient.

## What You Can Edit
- `styles.css` only

## Hint
```css
.banner {
    background: linear-gradient(135deg, #1a3a5c, #00d9ff);
}
```

Other gradient examples:
- `linear-gradient(to right, #00ff88, #00d9ff)`
- `linear-gradient(180deg, #1a1a2e, #1a3a5c)`

## Common Mistakes
- Using `background-color` instead of `background` (gradients are images, not colors)
- Forgetting the direction/angle parameter
- Not separating colors with commas
- Using invalid color values
