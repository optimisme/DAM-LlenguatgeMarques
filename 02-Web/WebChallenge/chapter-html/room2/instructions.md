# Room 2: Create a Proper List

## Problem
The inventory items are displayed as plain text. They need to be wrapped in proper HTML list elements.

## Task
Edit `index.html` to wrap the inventory items in an unordered list (`<ul>`) with each item in a list item (`<li>`).

## Success Condition
- A `<ul>` element must exist inside the `.inventory` div
- The `<ul>` must contain at least 5 `<li>` elements

## What You Can Edit
- `index.html` only

## Hint
The structure should look like:
```html
<ul>
    <li>Key</li>
    <li>Torch</li>
    ...
</ul>
```

## Common Mistakes
- Forgetting to close `</li>` tags
- Placing items outside the `<ul>` element
- Using `<ol>` instead of `<ul>` (ordered vs unordered)
- Nesting `<ul>` inside individual `<li>` tags incorrectly
