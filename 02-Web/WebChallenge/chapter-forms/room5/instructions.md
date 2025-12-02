# Room 5: Accessible Form Challenge

## Problem
The registration form has multiple accessibility issues that need to be fixed.

## Task
Edit `index.html` to fix all issues:
1. Add `for` attribute to all labels matching input ids
2. Change email input to `type="email"`
3. Change password input to `type="password"`
4. Add `required` attribute to all inputs

## Success Condition
- All labels have `for` attributes pointing to their inputs
- Email input has `type="email"`
- Password input has `type="password"`
- All three inputs have the `required` attribute

## What You Can Edit
- `index.html` only

## Hint
```html
<label for="reg-name">Name</label>
<input type="text" id="reg-name" name="name" required>

<label for="reg-email">Email</label>
<input type="email" id="reg-email" name="email" required>

<label for="reg-password">Password</label>
<input type="password" id="reg-password" name="password" required>
```

## Common Mistakes
- Forgetting one of the `for` attributes
- Missing `required` on one field
- Using `required="true"` (just `required` is correct)
- Misspelling attribute names
