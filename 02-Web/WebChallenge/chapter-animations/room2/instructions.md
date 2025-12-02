# Room 2: Scale on Hover

## Problem
The card only changes background color on hover. We want it to grow slightly with a smooth animation.

## Task
Edit `styles.css` to:
1. Add a `transition` property to `.hover-card`
2. Add `transform: scale(1.1)` to `.hover-card:hover`

## Success Condition
- `.hover-card` must have a transition defined
- `.hover-card:hover` must include `transform: scale()` with a value greater than 1

## What You Can Edit
- `styles.css` only

## Hint
```css
.hover-card {
    transition: transform 0.3s ease;
}

.hover-card:hover {
    transform: scale(1.1);
}
```

## Common Mistakes
- Forgetting to add transition to the base state
- Using `scale` without `transform:` prefix
- Using values less than 1 (makes it shrink instead of grow)
- Adding transition only to the hover state
