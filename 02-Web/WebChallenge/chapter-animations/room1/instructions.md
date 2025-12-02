# Room 1: Smooth Color Transition

## Problem
The button changes color instantly when hovered. We want a smooth, gradual transition.

## Task
Edit `styles.css` to add a `transition` property to the `.magic-button` class.

## Success Condition
The `.magic-button` must have a transition property defined (not `none`).

## What You Can Edit
- `styles.css` only

## Hint
Add `transition: background-color 0.3s ease;` to the `.magic-button` rule.

You can also use the shorthand `transition: all 0.3s;` to animate all changing properties.

## Common Mistakes
- Adding transition to the :hover state instead of the base state
- Using `animation` instead of `transition`
- Forgetting the duration (e.g., just `transition: background-color`)
- Using milliseconds without `ms` (use `300ms` or `0.3s`)
