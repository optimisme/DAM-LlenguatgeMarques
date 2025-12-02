# Instructor Guide - CSS Challenge Rooms

## Overview

This project contains 8 chapters with 5 rooms each (40 challenges total). Each room is a self-contained HTML+CSS puzzle that students solve by editing the provided files.

## Chapter Progression

### Chapter 1: HTML (`chapter-html/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Fix broken document structure | Close tags properly, move content into `<main>` |
| room2 | Create proper list structure | Wrap items in `<ul>` and `<li>` tags |
| room3 | Add correct links | Use `<a href="">` with proper text |
| room4 | Semantic HTML structure | Use header, nav, main, footer correctly |
| room5 | Images and alt text | Add `<img>` with src and alt attributes |

### Chapter 2: CSS Basic (`chapter-css-basic/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Apply background color | Use `background-color` on correct selector |
| room2 | Fix selectors | Use class and ID selectors correctly |
| room3 | Box model spacing | Adjust margin and padding values |
| room4 | Border styling | Apply border properties |
| room5 | Typography and colors | Font-size, color, font-family |

### Chapter 3: Flex Layout (`chapter-flex-layout/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Basic flex container | Add `display: flex` to container |
| room2 | Horizontal alignment | Use `justify-content` |
| room3 | Vertical centering | Use `align-items: center` |
| room4 | Flex direction | Use `flex-direction: column` |
| room5 | Complete flex layout | Combine multiple flex properties |

### Chapter 4: Mobile Responsive (`chapter-mobile-responsive/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Basic media query | Add `@media (max-width: 600px)` |
| room2 | Relative units | Convert px to %, em, rem |
| room3 | Responsive navigation | Stack nav items on mobile |
| room4 | Fluid typography | Use vw units or clamp() |
| room5 | Complete responsive layout | Multiple breakpoints |

### Chapter 5: Animations (`chapter-animations/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Basic transition | Add `transition` property |
| room2 | Hover effects | Combine :hover with transition |
| room3 | Keyframe animation | Define @keyframes |
| room4 | Infinite animation | Use `animation-iteration-count: infinite` |
| room5 | Complex animation | Multiple keyframes, timing functions |

### Chapter 6: CSS Advanced (`chapter-css-advanced/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Pseudo-elements | Use ::before or ::after |
| room2 | nth-child selector | Target specific children |
| room3 | CSS variables | Define and use --custom-property |
| room4 | Gradients | Use linear-gradient() |
| room5 | Combined techniques | Variables + pseudo-elements + gradients |

### Chapter 7: Forms (`chapter-forms/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Label association | Add `for` attribute matching input `id` |
| room2 | Input types | Use correct type attributes |
| room3 | Form layout | Style form with CSS |
| room4 | Focus states | Add :focus styles |
| room5 | Complete accessible form | All accessibility requirements |

### Chapter 8: CSS Interactivity (`chapter-css-interactivity-checkbox-radio/`)

| Room | Goal | Solution Hint |
|------|------|---------------|
| room1 | Checkbox toggle | Use :checked pseudo-class |
| room2 | Show/hide content | :checked + sibling selector |
| room3 | Radio button tabs | Multiple radios controlling visibility |
| room4 | CSS accordion | :checked with max-height |
| room5 | Complex toggle system | Multiple interactive elements |

## Teaching Tips

1. **Let students struggle**: Don't give solutions too quickly. The learning happens in the problem-solving process.

2. **Use DevTools**: Encourage students to use browser developer tools to experiment with CSS before editing files.

3. **Review together**: After most students complete a room, review the solution as a class.

4. **Pair programming**: Have students work in pairs for harder rooms.

5. **Progress tracking**: Use `progress.html` to monitor class progress.

## Solution Files

Each room may contain:
- `solution.css` - The working solution
- `solution-notes.md` - Explanation of the solution

These are for instructor reference. Remove them before distributing to students if you want to prevent cheating.

## Customization

Feel free to:
- Add more rooms to any chapter
- Modify difficulty by editing initial CSS
- Add hints to `instructions.md` files
- Create your own chapters following the same structure

## Common Student Issues

1. **Browser caching**: Students may need to hard-refresh (Ctrl+Shift+R) to see CSS changes
2. **File paths**: Ensure students are editing the correct files
3. **Typos**: CSS is case-sensitive and requires exact syntax
4. **Specificity**: Later rooms may require understanding of selector specificity
