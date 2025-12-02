# Room 3: Center the Key

## Problem
The key icon is positioned at the top of its container. It should be vertically centered.

## Task
Edit `styles.css` to:
1. Add `display: flex;` to `.key-box`
2. Change `align-items: flex-start;` to `align-items: center;`

## Success Condition
The `.key-box` must have both:
- `display: flex`
- `align-items: center`

## What You Can Edit
- `styles.css` only

## Hint
The container already has `justify-content: center` for horizontal centering. You need `display: flex` to enable flexbox, and `align-items: center` for vertical centering.

## Common Mistakes
- Forgetting to add `display: flex` first
- Using `justify-content` instead of `align-items` for vertical centering
- Using `vertical-align` which doesn't work with flexbox
- Applying properties to the key instead of the container
