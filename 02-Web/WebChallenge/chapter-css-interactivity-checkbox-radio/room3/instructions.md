# Room 3: CSS-Only Tabs

## Problem
All tab panels are visible at once. Only the panel for the selected tab should show.

## Task
Edit `styles.css` to:
1. Hide all `.tab-panel` elements by default
2. Show the correct panel when its corresponding radio button is checked

## Success Condition
- When tab1 is checked, only panel1 is visible
- When tab2 is checked, only panel2 is visible
- When tab3 is checked, only panel3 is visible

## What You Can Edit
- `styles.css` only

## Hint
```css
.tab-panel {
    display: none;
}

#tab1:checked ~ .tab-panels #panel1 {
    display: block;
}

#tab2:checked ~ .tab-panels #panel2 {
    display: block;
}

#tab3:checked ~ .tab-panels #panel3 {
    display: block;
}
```

## Common Mistakes
- Forgetting to hide panels by default
- Not understanding the descendant selector within sibling selector
- Using wrong IDs for tabs or panels
- Forgetting that radio buttons need same `name` to work as a group
