# Room 5: Responsive Card Grid

## Problem
The three-column card grid looks cramped on mobile devices. Cards should stack vertically on small screens.

## Task
Edit `styles.css` to add a media query that makes cards stack vertically on screens 600px or smaller.

## Success Condition
When the browser window is 600px wide or less, cards must either:
- Stack vertically (flex-direction: column), OR
- Each card takes full width (100%)

## What You Can Edit
- `styles.css` only

## Hint
Option 1 - Change direction:
```css
@media (max-width: 600px) {
    .card-grid {
        flex-direction: column;
    }
}
```

Option 2 - Change card width:
```css
@media (max-width: 600px) {
    .card {
        flex: none;
        width: 100%;
    }
}
```

## Common Mistakes
- Only changing the container without affecting card behavior
- Using `flex-wrap: wrap` alone (cards may still appear side by side)
- Setting width on grid instead of cards
- Not testing at actual mobile widths
