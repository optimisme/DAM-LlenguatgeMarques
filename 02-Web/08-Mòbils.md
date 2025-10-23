# Mobils

Les pàgines web s'han d'adaptar a diferents dispositius. Algunes tècniques amb *"Flex"* ens ajuden (com *wrap*), però no són suficients.

L'objectiu és aprofitar el codi **HTML**, i tot el codi **CSS** possible.

## Mobile first

Moltes empresses començen desenvolupant primer la versió de mòbil, i afegint funcionalitats més tard a la versió d'escriptori.

## @media

Quan volem aplicar un estil especific segons una mida de pantalla, fem servir *@media*

```html
/* Estils que només s'apliquen a "Escriptori" */
@media (min-width: 768px) {
  body {
    background: #48a4ffff; 
  }

  p {
    font-size: 1.125rem;
    max-width: 700px;
  }
}

/* Estils que només s'apliquen a "Mòbil" */
@media (max-width: 768px) {
  body {
    background: #a2ff17ff;
  }

  p {
    font-size: 1.125rem;
    max-width: 700px;
  }
}
```

Exemple-00: Obrir amb "Show preview" la pàgina "02-Web/08-Mòbils/exemple-00/index.html"

## Simulació al navegador

*Chrome* permet simular una pàgina web com si es tractés d'un telèfon mòbil (no tots els paràmetres, però significatius)

<center>
<img src="./assets/exemple15.png" style="width: 90%; max-width: 400px">
</center>

## Meta *viewport*

Un dels camps **"meta"** configurables, és el **"viewport"** que impedeix el **"zoom"** en navegadors mòbils, això és interessant per controlar la interactivitat a la nostra pàgina.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

## Canviar *"rows"* per *"colums"*

Sovint, adaptar a mòbil és tant senzill com canviar files per columnes, o afegir *wrap*:

```css
/* Base: mòbil (columnes apilades) */
.row-to-col {
  display: flex;
  flex-direction: column;   /* stack */
  gap: 1rem;
}

/* Desktop, a partir de 768px: disposem en fila */
@media (min-width: 768px) {
  .row-to-col {
    flex-direction: row;    /* row */
    align-items: center;    /* opcional */
  }
}

/* Variants útils */
.row-to-col .wrap { flex-wrap: wrap; }  /* permet saltar de línia en desktop */
.row-to-col > * { flex: 1 1 0; }       /* repartiment d'ample */
```

```html
<div class="row-to-col">
  <div class="card">A</div>
  <div class="card">B</div>
  <div class="card">C</div>
</div>

<div class="row-to-col wrap">
  <div class="card">A</div>
  <div class="card">B</div>
  <div class="card">C</div>
  <div class="card">D</div>
  <div class="card">E</div>
</div>
```

Exemple-01: Obrir amb "Show preview" la pàgina "02-Web/08-Mòbils/exemple-01/index.html"

## Marges i *autocenter*

Vigila si fas servir *autocenter*, has de decidir si vols que a la versió mòbil toqui (o no) els limits laterals de la pantalla:

```css
.autocenter {
  max-width: 800px;
  margin: auto;
  padding: 0 5px;
}

/* més marge a mòbil */
@media (max-width: 768px) {
  .autocenter {
    padding: 0 25px;
  }
}
```

Exemple-02: Obrir amb "Show preview" la pàgina "02-Web/08-Mòbils/exemple-02/index.html"

## Unitats fluïdes

Per adaptar millor el disseny a diferents pantalles, en lloc de mides fixes (px), és recomanable fer servir unitats relatives o fluïdes.

| Unitat | Depèn de… | Exemple | Ús recomanat |
|:-------|:-----------|:--------|:-------------|
| `%` | el contenidor pare | `width: 80%;` | amplades relatives |
| `em` | la mida de la lletra del **pare** | `margin: 2em;` | espais interns i marges |
| `rem` | la mida de la lletra de l’**arrel (html)** | `font-size: 1.2rem;` | tipografia coherent a tota la pàgina |
| `vw`, `vh` | amplada / alçada de la **finestra del navegador** | `width: 100vw; height: 100vh;` | seccions a pantalla completa |
| `vmin`, `vmax` | el valor més petit / gran de `vw` o `vh` | `font-size: 3vmin;` | tipografia fluïda amb relació de pantalla |
| `clamp()` | combina un **mínim**, **preferit** i **màxim** | `font-size: clamp(1rem, 2vw, 2rem);` | textos i elements que creixen de forma suau |


```css
html {
  font-size: 16px;  /* 1rem = 16px */
}

h1 {
  /* Tipografia fluïda: mai més petita d’1.2rem, mai més gran de 2rem */
  font-size: clamp(1.2rem, 4vw + 0.5rem, 2rem);
}

section {
  width: min(90%, 800px); /* ocupa el 90% fins a un màxim de 800px */
  margin: auto;
  padding: 2rem;
}

p {
  margin-bottom: 1.5em; /* depèn de la mida de la lletra del paràgraf */
}
```