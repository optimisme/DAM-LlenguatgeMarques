# Room 4: Pulsing Button

## Problem
The button is static and doesn't draw attention. We want it to pulse with a glowing effect.

## Task
Edit `styles.css` to:
1. Create a `@keyframes pulse` animation that changes `box-shadow`
2. Apply the animation to `.pulse-button` with `infinite` iteration

## Success Condition
The `.pulse-button` must have:
- An animation name applied (not `none`)
- Animation iteration count set to `infinite`

## What You Can Edit
- `styles.css` only

## Hint
```css
@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
    }
    50% {
        box-shadow: 0 0 20px 10px rgba(0, 255, 136, 0.3);
    }
}

.pulse-button {
    animation: pulse 1.5s ease-in-out infinite;
}
```

## Common Mistakes
- Forgetting the `infinite` keyword
- Not including the animation name
- Using `animation-iteration-count` as a separate property but forgetting it
- Making the pulse too fast or too slow (aim for 1-2 seconds)
