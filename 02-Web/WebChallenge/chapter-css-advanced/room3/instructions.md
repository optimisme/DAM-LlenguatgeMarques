# Room 3: Use CSS Variables

## Problem
The themed box uses CSS variables but the `--accent-color` variable is not defined, so it falls back to gray.

## Task
Edit `styles.css` to define the `--accent-color` CSS variable in the `:root` selector with a green color value.

## Success Condition
The `--accent-color` variable must be defined in `:root` with a greenish color value.

## What You Can Edit
- `styles.css` only

## Hint
```css
:root {
    --accent-color: #00ff88;
}
```

## Common Mistakes
- Forgetting the double dash `--` prefix for custom properties
- Defining the variable outside of `:root` (scope issues)
- Using `$accent-color` (that's Sass syntax, not CSS)
- Forgetting the semicolon after the value
