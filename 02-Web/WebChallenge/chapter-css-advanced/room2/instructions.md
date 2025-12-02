# Room 2: Highlight Every Other Row

## Problem
All table rows have the same background color. We want alternating colors for better readability.

## Task
Edit `styles.css` to use `:nth-child()` selector to give even or odd rows a different background color.

## Success Condition
Table rows must have alternating background colors (row 1 and 3 same, row 2 and 4 same, but 1 different from 2).

## What You Can Edit
- `styles.css` only

## Hint
```css
.data-table tr:nth-child(even) {
    background-color: #0f0f23;
}
```

Or target odd rows:
```css
.data-table tr:nth-child(odd) {
    background-color: #2a4a6c;
}
```

## Common Mistakes
- Forgetting to include `.data-table` before `tr`
- Using `nth-child` without the colon
- Using quotes around `even` or `odd`
- Targeting `td` instead of `tr`
