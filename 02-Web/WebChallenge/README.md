# CSS Challenge Rooms

Welcome to **CSS Challenge Rooms** - an interactive learning game where you solve HTML and CSS puzzles to progress through different "rooms" and chapters.

## How to Play

1. **Open a room**: Navigate to any chapter folder (e.g., `chapter-html/room1/`) and open `index.html` in your browser.

2. **Read the instructions**: Each room has an `instructions.md` file explaining what you need to fix or complete.

3. **Edit the files**: Modify `styles.css` (and sometimes `index.html`) to solve the challenge.

4. **Check your progress**: When you solve a room correctly, a success message will appear and your progress is saved automatically.

5. **Track your progress**: Open `progress.html` in your browser to see all completed rooms and your total score.

## Project Structure

```
WebChallenge/
├── progress.html      # Your progress dashboard
├── progress.js        # Progress tracking system
├── chapter-html/      # Chapter 1: HTML fundamentals
├── chapter-css-basic/ # Chapter 2: CSS basics
├── chapter-flex-layout/      # Chapter 3: Flexbox layouts
├── chapter-mobile-responsive/ # Chapter 4: Responsive design
├── chapter-animations/       # Chapter 5: CSS animations
├── chapter-css-advanced/     # Chapter 6: Advanced CSS
├── chapter-forms/            # Chapter 7: HTML forms
└── chapter-css-interactivity-checkbox-radio/ # Chapter 8: CSS interactivity
```

## Chapters Overview

| Chapter | Topic | Skills |
|---------|-------|--------|
| 1 | HTML | Tags, semantic structure, nesting |
| 2 | CSS Basic | Selectors, colors, box model |
| 3 | Flex Layout | Flexbox, alignment, distribution |
| 4 | Mobile Responsive | Media queries, relative units |
| 5 | Animations | Transitions, keyframes |
| 6 | CSS Advanced | Pseudo-elements, variables, gradients |
| 7 | Forms | Form elements, labels, accessibility |
| 8 | CSS Interactivity | Checkbox/radio tricks, CSS-only toggles |

## Tips

- Start with Chapter 1, Room 1 if you're a beginner
- Each room builds on previous knowledge
- Difficulty increases within each chapter (room1 = easiest, room5 = hardest)
- Use browser DevTools (F12) to inspect elements and test CSS changes
- Your progress is saved in your browser - you can close and return later

## Resetting Progress

To reset your progress, open the browser console (F12 > Console) and run:

```javascript
localStorage.removeItem('webChallengeProgress');
location.reload();
```

Good luck and have fun learning!
