# Room 2: Space Between Items

## Problem
The flex items are all bunched up on the left side of the container. They should be spread out evenly.

## Task
Edit `styles.css` to change the `justify-content` property on `.container` to distribute the items.

## Success Condition
The `.container` must have `justify-content` set to one of:
- `space-between` (equal space between items, no space at edges)
- `space-around` (equal space around each item)
- `space-evenly` (equal space everywhere)

## What You Can Edit
- `styles.css` only

## Hint
Change `justify-content: flex-start;` to `justify-content: space-between;`

## Common Mistakes
- Using `align-items` instead of `justify-content`
- Misspelling `space-between` (e.g., `spacebetween`)
- Using `center` which groups items in the middle
- Applying the property to items instead of the container
