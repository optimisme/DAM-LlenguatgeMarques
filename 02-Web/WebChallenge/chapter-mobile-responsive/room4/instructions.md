# Room 4: Responsive Text Size

## Problem
The heading is too large on small screens, causing text to wrap awkwardly or overflow.

## Task
Edit `styles.css` to add a media query that reduces the `.responsive-heading` font size on screens 600px or smaller.

## Success Condition
When the browser window is 600px wide or less, the `.responsive-heading` must have a font-size of 28px or smaller.

## What You Can Edit
- `styles.css` only

## Hint
```css
@media (max-width: 600px) {
    .responsive-heading {
        font-size: 24px;
    }
}
```

## Common Mistakes
- Using rem/em units inconsistently with px
- Making the text too small to read
- Forgetting to target the correct class
- Using `text-size` instead of `font-size`
