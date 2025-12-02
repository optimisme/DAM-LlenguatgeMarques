# Room 1: Add Decorative Icons

## Problem
Completed tasks should have a checkmark icon before them, but we don't want to modify the HTML.

## Task
Edit `styles.css` to add a `::before` pseudo-element to `.completed` items that displays a checkmark.

## Success Condition
The `.completed::before` pseudo-element must have a `content` property with a value (not `none` or empty).

## What You Can Edit
- `styles.css` only

## Hint
```css
.completed::before {
    content: "✓ ";
}
```

You can also use Unicode: `content: "\2713 ";`

## Common Mistakes
- Using `:before` instead of `::before` (single colon works but is outdated)
- Forgetting the `content` property (pseudo-elements won't appear without it)
- Using `content` without quotes around the value
- Targeting the wrong selector (e.g., `li::before` instead of `.completed::before`)
