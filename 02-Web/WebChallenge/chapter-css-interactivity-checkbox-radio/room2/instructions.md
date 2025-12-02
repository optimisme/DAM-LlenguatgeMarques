# Room 2: Show Hidden Content

## Problem
The secret box is always visible. It should be hidden by default and shown only when the checkbox is checked.

## Task
Edit `styles.css` to:
1. Hide `.secret-box` by default with `display: none`
2. Show `.secret-box` when the checkbox is checked with `display: block`

## Success Condition
- `.secret-box` is hidden when checkbox is unchecked
- `.secret-box` is visible when checkbox is checked

## What You Can Edit
- `styles.css` only

## Hint
```css
.secret-box {
    display: none;
    /* other styles... */
}

.reveal-checkbox:checked ~ .secret-box {
    display: block;
}
```

## Common Mistakes
- Using `visibility: hidden` instead of `display: none`
- Forgetting to add the :checked rule
- Wrong sibling selector syntax
- Not understanding that sibling selectors require elements at the same level
