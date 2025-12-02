# Room 3: Stack Navigation on Mobile

## Problem
The navigation links stay horizontal even on small screens where they become cramped.

## Task
Edit `styles.css` to add a media query that changes the navigation to stack vertically on screens 600px or smaller.

## Success Condition
When the browser window is 600px wide or less, the `.navigation` must have `flex-direction: column`.

## What You Can Edit
- `styles.css` only

## Hint
```css
@media (max-width: 600px) {
    .navigation {
        flex-direction: column;
    }
}
```

## Common Mistakes
- Putting the media query inside the existing `.navigation` rule
- Using `display: block` instead of keeping flexbox with column direction
- Forgetting that flexbox is already enabled on `.navigation`
- Using wrong breakpoint value
