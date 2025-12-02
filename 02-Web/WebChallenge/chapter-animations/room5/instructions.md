# Room 5: Animated Loading Spinner

## Problem
The loader circle is static. It should spin continuously to indicate loading.

## Task
Edit `styles.css` to:
1. Create a `@keyframes spin` animation that rotates from 0deg to 360deg
2. Apply the animation to `.loader` with linear timing and infinite iteration

## Success Condition
The `.loader` must have:
- An animation name applied (not `none`)
- A duration set
- Infinite iteration

## What You Can Edit
- `styles.css` only

## Hint
```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader {
    animation: spin 1s linear infinite;
}
```

## Common Mistakes
- Using `ease` instead of `linear` (causes uneven spinning)
- Forgetting `deg` units on rotate values
- Not using 360deg for full rotation
- Making the animation too slow or too fast
