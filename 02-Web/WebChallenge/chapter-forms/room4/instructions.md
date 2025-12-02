# Room 4: Style Focus States

## Problem
The input removes the default focus outline but doesn't provide a visible alternative, hurting accessibility.

## Task
Edit `styles.css` to add a visible focus indicator to `.focus-input:focus` using `border-color`, `box-shadow`, or `outline`.

## Success Condition
The `.focus-input:focus` rule must have a visible `border-color`, `box-shadow`, or `outline` defined.

## What You Can Edit
- `styles.css` only

## Hint
```css
.focus-input:focus {
    outline: none;
    border-color: #00d9ff;
    box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.3);
}
```

## Common Mistakes
- Only removing the outline without adding an alternative
- Using colors too similar to the background
- Setting `outline: none` without any replacement (accessibility issue)
- Using `:focus` on the wrong selector
