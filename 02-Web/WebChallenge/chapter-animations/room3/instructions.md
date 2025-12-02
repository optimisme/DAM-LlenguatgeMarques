# Room 3: Create a Keyframe Animation

## Problem
The key icon is static. We want it to float up and down continuously.

## Task
Edit `styles.css` to:
1. Define a `@keyframes` animation called `float`
2. Apply the animation to `.key-icon`

## Success Condition
The `.key-icon` must have an animation applied with a name (not `none`) and a duration.

## What You Can Edit
- `styles.css` only

## Hint
```css
@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.key-icon {
    animation: float 2s ease-in-out infinite;
}
```

## Common Mistakes
- Forgetting to reference the keyframe name in the animation property
- Using `@keyframe` instead of `@keyframes` (must be plural)
- Not setting a duration in the animation property
- Forgetting `infinite` if you want continuous animation
