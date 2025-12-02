# Room 5: Master Challenge

## Problem
The achievement card needs three advanced CSS features: a CSS variable, a gradient, and a pseudo-element.

## Task
Edit `styles.css` to:
1. Define `--primary` CSS variable in `:root`
2. Add a gradient background to `.achievement-card`
3. Add a `::before` pseudo-element with star content to `.achievement-card`

## Success Condition
All three requirements must be met:
- `--primary` variable defined in `:root`
- `.achievement-card` has a gradient background
- `.achievement-card::before` has content (not empty/none)

## What You Can Edit
- `styles.css` only

## Hint
```css
:root {
    --primary: #00ff88;
}

.achievement-card {
    background: linear-gradient(135deg, #1a3a5c, #2a4a6c);
}

.achievement-card::before {
    content: "⭐ ";
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
}
```

## Common Mistakes
- Forgetting any of the three requirements
- Not using the correct selector for ::before
- Defining the variable but not using `var(--primary)` anywhere
- Gradient not using correct syntax
