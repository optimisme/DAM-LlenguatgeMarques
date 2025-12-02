# Room 1: Your First Media Query

## Problem
The box doesn't change appearance on smaller screens. We need to add responsive styles.

## Task
Edit `styles.css` to add a media query that changes the `.responsive-box` background color to green (`#00ff88`) when the screen is 600px or smaller.

## Success Condition
When the browser window is 600px wide or less, the `.responsive-box` must have a green background color.

## What You Can Edit
- `styles.css` only

## Hint
Add this at the end of the CSS file:
```css
@media (max-width: 600px) {
    .responsive-box {
        background-color: #00ff88;
    }
}
```

## Common Mistakes
- Forgetting the parentheses around `(max-width: 600px)`
- Using `@media-query` instead of `@media`
- Putting the media query inside another rule
- Missing the curly braces structure
