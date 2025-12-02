# Room 1: Connect Labels to Inputs

## Problem
The form labels are not properly connected to their inputs, which hurts accessibility and usability.

## Task
Edit `index.html` to add the `for` attribute to each `<label>` element, matching the corresponding input's `id`.

## Success Condition
All three labels must have a `for` attribute that matches an existing input `id`.

## What You Can Edit
- `index.html` only

## Hint
Change `<label>Username</label>` to `<label for="username">Username</label>`

Do the same for email and password.

## Common Mistakes
- Misspelling the id value in the for attribute
- Using different case (for="Username" won't match id="username")
- Forgetting quotes around the attribute value
- Using `for` without the equals sign
