# Room 2: Fix the Selectors

## Problem
All three doors are highlighted green, but only the correct door (Door B) should be highlighted.

## Task
Edit `styles.css` to change the selector so that only the door with class `correct` or id `door-correct` gets the green background.

## Success Condition
- The door with class `correct` must have a green background
- The other two doors must NOT have a green background

## What You Can Edit
- `styles.css` only

## Hint
Change `.door` to `.correct` or `#door-correct` in the second rule that sets `background-color: #00ff88;`

## Common Mistakes
- Forgetting the dot (.) for class selectors
- Forgetting the hash (#) for ID selectors
- Deleting the entire rule instead of fixing the selector
- Adding a new rule without removing the old one (CSS cascade issues)
