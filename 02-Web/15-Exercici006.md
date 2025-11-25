# Exercici006: Formularis + Interactivitat amb CSS (sense JS)

Maqueta un mini-lloc web centrat en **formularis personalitzats** i **interactivitat amb CSS** utilitzant només HTML + CSS, sense JavaScript.

## 📁 Estructura del projecte

```
exercici-006/
├─ assets/
│  ├─ img/          
│  └─ media/        
├─ index.html        (Part 1 · Formulari i validació)
├─ interaccio.html   (Part 2 · Interactivitat amb CSS)
└─ estils.css
```

# 🧩 Part 1 — Formulari i validació (index.html)

Objectiu: **personalitzar un formulari amb CSS**, entendre bé **radio vs checkbox**, treballar **:focus**, **:valid / :invalid**, **pattern (RegEx)** i la **transició animada quan un element rep focus**.

## 🎯 Contingut mínim del formulari

Inclou com a mínim aquests camps:

- Nom complet (text, amb `pattern` + `title`)
- Correu electrònic (`type="email"`, `required`)
- Telèfon (`type="tel"` amb `pattern`)
- Edat (`type="number"` amb `min`, `max`, `step`)
- Data de naixement (`type="date"`)
- Franja horària (`type="time"` o `datetime-local`)
- Color preferit (`type="color"`)
- Control lliscant (`type="range"`)
- Aficions (checkbox múltiple)
- Nivell d’estudis (radio)
- País (`<select> + <option>`)
- Comentaris (`<textarea>`)
- Enviar i esborrar (`submit` i `reset`)

## 🎨 Personalització amb CSS

Al fitxer `estils.css`, fes com a mínim:

### ✔️ Inputs personalitzats per:
- text  
- email  
- tel  
- number  
- date, time  
- color  
- range  
- checkbox, radio  
- textarea  
- select  

### ✔️ Estats visuals personalitzats
- `:focus` amb **transició animada obligatòria**  
- `:valid` i `:invalid`  
- `:required`  
- Bordes, ombres i colors personalitzats

### ✔️ Checkbox vs Radio
- Diferenciació visual clara
- Possibilitat d'amagar l’input i dibuixar un check personalitzat amb pseudoelements

### ✔️ Validacions amb RegEx
- Mínim **dos inputs** amb pattern + title explicatiu

---

# 🧩 Part 2 — Interactivitat amb CSS (interaccio.html)

Objectiu: crear interacció **sense JavaScript**, utilitzant inputs (`checkbox` / `radio`), `<label>` i selectors CSS avançats, incloent **:has() amb un id global de pàgina**.

Cada pàgina ha de tenir un id al `<body>`:
```html
<body id="pagina-interaccio">
```

## 🔧 Components mínims

### 1️⃣ Botó alternador (toggle)

Basat en un `input type="checkbox"` **amagat**, + `<label>`:

- Estat OFF i ON
- Canvi de color i posició del knob
- Animació/transition
- Ús del selector:

```css
#pagina-interaccio:has(#wifi:checked) .toggle { … }
```

### 2️⃣ Pestanyes CSS (tabs)

- `input type="radio"` amagats (`name="tab"`).
- `<label>` com a botons.
- Continguts `.content-1`, `.content-2`…
- Només mostra el contingut de la pestanya activa:

```css
#pagina-interaccio:has(#tab1:checked) .content-1 { display:block; }
#pagina-interaccio:has(#tab2:checked) .content-2 { display:block; }
```

La resta, `display: none`.

### 3️⃣ Component extra d’interacció (tria 1)

Has d’implementar **un** dels següents:

- Carousel amb radio buttons  
- Flip card controlada per checkbox/radio  
- Panell d’opcions on cada radio mostra un bloc diferent  

Tots han de funcionar amb:

- `:checked`
- `<label for="...">`
- Selectors de germà `~` o `+`
- El **body amb id** per utilitzar `#pagina-interaccio:has(...)`

---

# 📐 Requeriments generals del projecte

- Layout principal amb **Flexbox** (no Grid).
- Navbar senzilla amb enllaços:
  - index.html (formulari)
  - interaccio.html (interactivitat)
- Mínim **5 elements amb transition** (hover, focus, checked…)
- Mínim **3 camps amb validació visual**
- **Sense JavaScript**
- Layout **responsiu** (usable en mòbil)

---

# 📤 Entrega

1. Crea un repositori a GitHub anomenat:

```
DAM1M04-Exercici006
```

2. Puja-hi tota la pràctica  
3. Envia l’enllaç del repositori al Moodle
