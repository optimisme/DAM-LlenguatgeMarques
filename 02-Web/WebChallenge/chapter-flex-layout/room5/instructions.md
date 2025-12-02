# Room 5: Create a Sidebar Layout

## Problem
The sidebar and content are stacking vertically. We need a classic two-column layout with sidebar on the left.

## Task
Edit `styles.css` to create a sidebar layout:
1. Add `display: flex;` to `.layout`
2. Add `width: 200px;` (or similar) to `.sidebar`
3. Add `flex: 1;` to `.content`

## Success Condition
- `.layout` must have `display: flex`
- `.sidebar` must have a width of at least 150px
- `.content` must have `flex-grow: 1` (or `flex: 1`)

## What You Can Edit
- `styles.css` only

## Hint
```css
.layout { display: flex; }
.sidebar { width: 200px; }
.content { flex: 1; }
```

## Common Mistakes
- Forgetting `display: flex` on the container
- Using percentage width on sidebar without considering flex behavior
- Using `flex-grow` on sidebar instead of content
- Not understanding that `flex: 1` is shorthand for `flex-grow: 1`
