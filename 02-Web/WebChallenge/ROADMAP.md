You are a CLI code generator that scaffolds a complete “CSS Challenge Rooms” learning project for HTML and CSS students.

## Goal

Create an interactive, file-based learning game where each “room” is a small HTML+CSS challenge.  
Students must edit the provided HTML/CSS to “solve” the room (e.g., align elements, fix layout, add responsiveness, etc.).

Organize the project into chapters that match the following learning progression:

1. html
2. css-basic
3. flex-layout
4. mobile-responsive
5. animations
6. css-advanced
7. forms
8. css-interactivity-checkbox-radio

Each chapter must contain AT LEAST 5 rooms (room1, room2, room3, room4, room5).  
More rooms are allowed, but never fewer than 5 per chapter.

## Project structure

The root folder of the project MUST be:

02-Web/WebChallenge/

Generate a folder structure like:

02-Web/
└─ WebChallenge/
    ├─ README.md
    ├─ instructor-guide.md
    ├─ progress.html
    ├─ progress.js
    ├─ chapter-html/
    │  ├─ room1/
    │  │  ├─ index.html
    │  │  ├─ styles.css
    │  │  └─ instructions.md
    │  ├─ room2/
    │  └─ ...
    ├─ chapter-css-basic/
    │  ├─ room1/
    │  └─ ...
    ├─ chapter-flex-layout/
    │  ├─ room1/
    │  └─ ...
    ├─ chapter-mobile-responsive/
    │  ├─ room1/
    │  └─ ...
    ├─ chapter-animations/
    │  ├─ room1/
    │  └─ ...
    ├─ chapter-css-advanced/
    │  ├─ room1/
    │  └─ ...
    ├─ chapter-forms/
    │  ├─ room1/
    │  └─ ...
    └─ chapter-css-interactivity-checkbox-radio/
        ├─ room1/
        └─ ...

You are allowed to adjust exact filenames, but keep the hierarchy clear:
- one folder per chapter
- one folder per room
- each room has at least: index.html, styles.css, instructions.md

## General design rules

- All HTML and CSS must be valid, clean and easy to read.
- Use minimal comments in code, only where absolutely necessary. Comments must be in English.
- Use simple, neutral styling (no heavy design systems).
- Avoid JavaScript except when absolutely required (most challenges should be HTML+CSS only).
- Every room must be solvable only by editing the files inside that room’s folder.
- Difficulty should increase gradually inside each chapter (room1 easiest, room5 hardest).

## Score, progress, and browser persistence

The game MUST include a very simple progress/score system that is stored in the browser so that students can resume where they left off.

Requirements:

- Use `localStorage` to store progress, under a single key such as `"webChallengeProgress"`.
- Store, at minimum:
  - which rooms are completed (per chapter and room),
  - and a simple score (for example: 1 point per completed room, or similar).
- Represent the progress as a JSON-serializable object, e.g.:

  {
    "chapter-html": { "room1": true, "room2": false, ... },
    "chapter-css-basic": { "room1": true, ... },
    ...
    "score": 7
  }

- Create a shared `progress.js` file at the root of `02-Web/WebChallenge/` that exposes small helper functions, for example:
  - `markRoomCompleted(chapterId, roomId)`
  - `isRoomCompleted(chapterId, roomId)`
  - `getTotalScore()`
  - `getRoomProgress(chapterId)`
- Each room’s `index.html` should:
  - include `progress.js` via a relative `<script>` tag,
  - call `markRoomCompleted("<chapter-id>", "<room-id>")` **only when the success condition is met**.
- Because these are mostly HTML+CSS challenges, you may use minimal JavaScript inside each room to detect success and update progress. Keep this JS as small as possible and only for:
  - checking if the DOM/CSS state matches the target condition,
  - calling the progress helper functions.

The exact success detection mechanism can be simple, for example:
- checking the presence of a specific CSS class on an element,
- checking a computed style value (e.g. `display: flex` or `justify-content: space-between`),
- checking if a certain element is visible.

Do NOT over-engineer this logic; prioritize clarity and ease of understanding for students.

### Progress overview page

- Implement a `progress.html` page at the root (`02-Web/WebChallenge/progress.html`).
- This page must:
  - load `progress.js`,
  - show a list of all chapters and rooms,
  - indicate which rooms are completed (e.g. ✅/❌),
  - display the total score and percentage of completion.
- This page will be the main “dashboard” for students to see their overall progress and resume their session.

## Content of each room

For EACH room, provide:

1. **index.html**
   - A small, self-contained page.
   - Includes the broken or incomplete layout/state that the student must fix.
   - Links to `styles.css` using a relative path.
   - Contains a small visible message area where success can be visually checked (for example a “door” div, a “Level completed!” message that only appears if styles are correct, or a clearly visible target layout).

2. **styles.css**
   - Contains initial, intentionally incomplete or incorrect CSS.
   - The student must edit this file to solve the challenge.
   - Use only what has been covered in or before the chapter of that room (e.g. do not use Flexbox inside the “html” or “css-basic” chapter).
   - Keep the file small and focused on the exact skills of the room.

3. **instructions.md**
   - SHORT, clear instructions for the student:
     - What the current problem is.
     - What they are allowed to change (HTML only, CSS only, or both).
     - What visual or structural condition defines “success”.
   - Use simple English, 5–10 lines per room.
   - Include a short “Hint” section and a short “Common mistakes” bullet list (2–4 bullets).

Optionally, you may also add:

- `solution.css` or `solution-notes.md` inside each room (for instructors), but keep them clearly separated from student files.

## Chapter-specific requirements

### 1) chapter-html (HTML fundamentals)
Rooms should focus on:
- Correct use of basic tags: headings, paragraphs, lists, links, images.
- Semantic structure: header, nav, main, footer, article, section.
- Fixing broken nesting and missing closing tags.
- Adding proper alt text to images.
- Building a simple navigation between fictional pages.

Example room ideas:
- Fix a broken document structure so the “door” message appears inside `<main>`.
- Add missing `<ul>/<li>` so a list renders correctly.
- Add a link with correct href and text to “unlock” the next clue.

### 2) chapter-css-basic
Rooms should focus on:
- Selectors (element, class, id).
- Basic properties: color, background, font-size, margin, padding, border.
- Box model and simple layout using margin/padding.
- Simple hover effect without transitions.

Example room ideas:
- Change the background of a specific box to reveal a hidden message.
- Fix selectors so only certain elements are styled.
- Adjust margins/padding to match a given layout description.

### 3) chapter-flex-layout
Rooms should focus on:
- `display: flex`
- `flex-direction`, `justify-content`, `align-items`, `gap`.
- Horizontal and vertical centering.
- Simple multi-column layouts with Flexbox.

Example room ideas:
- Align three doors in a row and center them using Flexbox.
- Use `justify-content: space-between;` to correctly place items.
- Create a sidebar + content layout using Flexbox only.

### 4) chapter-mobile-responsive
Rooms should focus on:
- Media queries.
- Relative units (%, em, rem, vw, vh).
- Responsive navigation (e.g. stacked on mobile, horizontal on desktop).
- Making text and boxes adjust cleanly.

Example room ideas:
- At widths below 600px, stack content vertically; above 600px, show columns.
- Adjust font sizes and padding for mobile readability.
- Hide/show a small hint box depending on screen width.

### 5) chapter-animations
Rooms should focus on:
- `transition` for hover and focus.
- `@keyframes` animations.
- Simple infinite animations (e.g. blinking light, floating key).
- Timing functions and delays.

Example room ideas:
- Animate a “key” icon to move towards the door when hovered.
- Make a button “pulse” until it is clicked (or hovered).
- Create a simple looping glow effect on the correct answer.

### 6) chapter-css-advanced
Rooms should focus on:
- Pseudo-classes and pseudo-elements (`:hover`, `:focus`, `:nth-child`, `::before`, `::after`).
- Advanced selectors (descendant, child, sibling).
- Gradients, shadows, clip-path (optional but encouraged).
- Simple CSS variables.

Example room ideas:
- Use `::before` to render a decorative icon that appears only on correct items.
- Use `:nth-child` to highlight specific doors or tiles.
- Use CSS variables to control a theme color that “unlocks” the room when changed.

### 7) chapter-forms
Rooms should focus on:
- Basic form elements: input, textarea, select, button.
- Labels and accessibility attributes.
- Basic layout of a form with CSS.
- Focus styles and error/success styling (pure CSS).

Example room ideas:
- Ensure all inputs have correct `<label>` and `for` attributes.
- Style a form so that focused input is clearly highlighted.
- Show an “approved” visual state if correct classes are applied to the form container.

### 8) chapter-css-interactivity-checkbox-radio
Rooms should focus on:
- Using `:checked` on checkbox and radio inputs.
- Showing/hiding content with `display`, `opacity`, or `max-height`.
- Building CSS-only toggles, tabs, or simple accordions.
- Combining `:checked` with sibling selectors.

Example room ideas:
- A locked door that only appears when a certain checkbox is checked.
- Multiple radio buttons that reveal different “rooms” or clues.
- A CSS-only accordion where only one section may be expanded at a time.

## README and instructor guide

- `README.md`: explain to students how to navigate the project, how to open rooms, and how to edit files.
- `instructor-guide.md`: list all chapters and rooms, the main learning goal of each room, and a short note about the intended solution.

## Output format

As a CLI agent, your task is to:

1. Print the complete folder and file structure you will create, rooted at `02-Web/WebChallenge/`.
2. Then output the full contents of ALL generated files (HTML, CSS, and Markdown, plus any JS files).
3. Ensure everything is self-contained so a teacher can copy the project into a folder and start using it with students.
