# Room 5: The Final Lock

## Problem
The door should only unlock (turn green) when ALL THREE switches are in the ON position.

## Task
Edit `styles.css` to add a CSS rule that changes the `.final-door` background to green only when all three switch inputs are checked.

## Success Condition
The `.final-door` must turn green (#00ff88) only when all three switches (#switch1, #switch2, #switch3) are checked.

## What You Can Edit
- `styles.css` only

## Hint
Since all inputs are siblings of `.final-door`, you can chain them:

```css
#switch1:checked ~ #switch2:checked ~ #switch3:checked ~ .final-door {
    background-color: #00ff88;
}
```

This selector only matches when ALL conditions are true.

## Common Mistakes
- Only checking one or two switches instead of all three
- Using AND logic incorrectly (CSS uses chained selectors)
- Forgetting that the general sibling selector (~) looks for elements that come AFTER
- Order matters: switch1 must come before switch2 in the HTML for this to work
