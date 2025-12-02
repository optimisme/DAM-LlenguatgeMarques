# Room 1: Basic Checkbox Toggle

## Problem
The door should turn green when the checkbox is checked, but currently nothing happens.

## Task
Edit `styles.css` to add a rule that changes the `.door` background color when the checkbox is checked.

## Success Condition
When `.toggle-checkbox` is checked, the `.door` element must have a green background color.

## What You Can Edit
- `styles.css` only

## Hint
Use the `:checked` pseudo-class with the general sibling selector (`~`):

```css
.toggle-checkbox:checked ~ .door {
    background-color: #00ff88;
}
```

The `~` selector targets siblings that come after the element.

## Common Mistakes
- Using a child selector (>) instead of sibling (~)
- Forgetting that :checked only works on checkbox/radio inputs
- Targeting the wrong elements
- Using adjacent sibling (+) when general sibling (~) is needed
