# Room 1: Fix the Document Structure

## Problem
The door message is placed outside the `<main>` element. For proper semantic HTML structure, it should be inside.

## Task
Edit `index.html` to move the door message paragraph inside the `<main>` element.

## Success Condition
The element with `id="door-message"` must be a child (direct or nested) of the `<main>` element.

## What You Can Edit
- `index.html` only

## Hint
Cut the `<p id="door-message">` line and paste it between the opening `<main>` and closing `</main>` tags.

## Common Mistakes
- Forgetting to close tags properly after moving elements
- Accidentally deleting the id attribute
- Placing the paragraph after the closing `</main>` tag instead of before
- Breaking the nesting structure of other elements
