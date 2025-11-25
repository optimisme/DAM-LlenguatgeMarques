# Exercici005:  

Maqueta un mini-lloc web de 3 pàgines que demostri, a cada vista, els conceptes de la teoria: Transicions, Animacions, Tipografia (Google Fonts) i Material Icons.

## Estructura del projecte
```text
exercici-005/
├─ assets/
│  ├─ img/          (imatges lliures, mockups)
│  └─ media/        (vídeos curts, si en fas servir)
├─ index.html       (Pàgina 1 · Transicions)
├─ galeria.html     (Pàgina 2 · Animacions)
├─ guia-estil.html  (Pàgina 3 · Fonts + Material Icons)
└─ estils.css
```

## Línia visual comuna a totes les pàgines:

- Paleta i espais coherents a totes les pàgines.
- **Navbar** present a totes les pàgines amb enllaços interns (Home, Galeria, Guia d’estil).
- Navbar **sticky** amb efecte glass/frosted (blur) i hover states als enllaços.
- **Google Fonts**: incorpora com a mínim dues famílies (una per títols i una per text) amb pesos variables.
- **Material Icons**: fes servir la família Outlined en botons i enllaços d’acció.
- **Responsive**: breakpoint mínim a 768px (versió PC i mòbil)

Restriccions:

- Disseny amb Flexbox (no GRID).
- Res de JS; tot amb CSS.

### Pàgina 1 — “Transicions” (index.html)

Objectiu: practicar **transicions** CSS i timing-functions.

Contingut mínim:

- Hero amb títol gran (Google Font) i subtítol; botó amb icona (Material Icons).
- **Secció “Targetes interactives”** (mínim 3 targetes en fila). Cadascuna:
    - Canvi de color, ombra i escala al :hover.
    - Canvi de foto amb una transició
    - Exemple amb diferents transition-timing-function (linear, ease, ease-in, ease-out, ease-in-out).
- **Menú secundari** (només estil, sense JS) on cada opció té transició de color i letter-spacing.

### Pàgina 2 — “Animacions” (galeria.html)

Objectiu: practicar **@keyframes** i variacions (direcció, delay, iteracions).

Contingut mínim:

- **Loader** pur CSS (rotació, pulse o bounce).
- **Peça animada principal**: un bloc que combini transform + opacity + canvis de color en una seqüència de fotogrames (ex. bounceAndSpin).
- **Scroll-reveal**: 2–3 blocs que apareguin amb desplaçament fent servir animation-timeline: view() i animation-range.
    - **Fallback obligatori**: @supports not (animation-timeline: view()) → aplica una animació o estat alternatiu.
- **Control de repeticions**: almenys una animació amb alternate i una amb infinite.

### Pàgina 3 — “Guia d’estil” (guia-estil.html)

Objectiu: treballar **tipografia i Material Icons**.

Contingut mínim:

- **Mostrari de fonts**: títols H1–H3 i paràgrafs amb:
    - font-family, font-weight (mínim 3 pesos), line-height, letter-spacing.
    - Exemple d’alineació a baseline: posa icones i text en línia i comprova’n l’alineació.
- **Escala tipogràfica** (rem-based) i exemples d’accessibilitat (contrast, mida mínima).
- **Material Icons**:
    - Mostrari amb diferents mides i pesos variables (opsz, wght, FILL), indicant a la llegenda què canvia.
    - Botons i links amb icona + text, amb transició d’estat hover.
- **Colors**: taula curta amb el mateix color expressat en HEX, RGB, HSL i una versió amb alpha.

## Requeriments generals

- **Flexbox** per al layout principal (no GRID).
- Navbar **sticky** amb efecte glass (blur) i estat actiu a l’enllaç de la pàgina actual.
- **Google Fonts i Material Icons** carregats adequadament (amb preconnect).
- **Transicions**: com a mínim 5 elements interactius amb transició (botons, targetes, enllaços, icones).
- **Animacions**: com a mínim 3 animacions diferents amb @keyframes (una d’elles controlada per scroll amb animation-timeline + @supports fallback).
- **Responsive**: breakpoint mínim a 768px (versió PC i mòbil)

## Entrega

Entrega l'exercici com un nou repositori a GitHub anomenat DAM1M04-Exercici005, i l'enllaç del repositori GitHub anterior a l'espai d'entrega del Moodle de l'assignatura