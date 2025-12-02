# Room 4: CSS Accordion

## Problem
All accordion sections are expanded. Only the selected section should be open.

## Task
Edit `styles.css` to:
1. Set `.accordion-content` to have `max-height: 0` and `overflow: hidden` by default
2. When the radio is checked, set `max-height: 200px` on the adjacent content

## Success Condition
- Only one accordion section is expanded at a time
- When a radio is checked, its content shows
- When a radio is not checked, its content is hidden

## What You Can Edit
- `styles.css` only

## Hint
```css
.accordion-content {
    max-height: 0;
    overflow: hidden;
}

.accordion-radio:checked + .accordion-header + .accordion-content {
    max-height: 200px;
}
```

Note: We use `+` (adjacent sibling) twice because the structure is:
radio → header → content

## Common Mistakes
- Using `display: none` instead of `max-height` (no smooth animation)
- Using wrong selector combination (need two adjacent selectors)
- Forgetting `overflow: hidden` on the content
- Setting max-height too small for content to display
