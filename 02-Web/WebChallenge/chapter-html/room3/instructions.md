# Room 3: Create Navigation Links

## Problem
The navigation contains span elements instead of proper anchor links.

## Task
Edit `index.html` to replace the `<span>` elements with proper `<a>` anchor tags that have `href` attributes.

## Success Condition
- At least 3 `<a>` elements must exist inside the `.navigation` element
- Each `<a>` must have an `href` attribute (can be "#" for placeholder)
- Each `<a>` must have visible text content

## What You Can Edit
- `index.html` only

## Hint
Replace `<span class="nav-item">Home</span>` with `<a href="#">Home</a>`

## Common Mistakes
- Forgetting the `href` attribute
- Leaving the span tags and adding `<a>` inside them (works but messy)
- Using `link` instead of `a` (there is no `<link>` content tag)
- Empty anchor text
