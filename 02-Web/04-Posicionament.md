# CSS: Posicionament

## Introducció al posicionament

El **posicionament CSS** serveix per organitzar i distribuir els elements d’una pàgina web.

- **Flux normal**: per defecte, els elements HTML es col·loquen un sota l’altre (els de bloc) o un al costat de l’altre (els de línia).
- Amb tècniques de posicionament, podem **trencar aquest flux** i col·locar els elements de manera més flexible, com centrar-los, apilar-los, o fer graelles.

---

## Elements de bloc i elements de línia

- **Elements de bloc**: ocupen tot l’ample disponible i comencen en una línia nova.  
  Exemples: `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`.

- **Elements de línia**: només ocupen l’espai del contingut i poden aparèixer un al costat de l’altre.  
  Exemples: `<span>`, `<a>`, `<strong>`, `<em>`.

📌 **Nota**: Amb CSS es pot canviar el comportament amb la propietat [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display).

---

## Propietat `display`

La propietat [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) permet definir com es mostra un element:

- `block` → l’element es mostra com de bloc (ocupa tota l’amplada).
- `inline` → l’element es mostra com de línia (només ocupa el contingut).
- `inline-block` → barreja: es comporta com a línia però permet definir amplada i alçada.
- `none` → l’element no es mostra (s’amaga de la pàgina).

**Exemple-00**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-00/index.html"

---

## Posicionament bàsic

La propietat [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) permet moure elements de manera controlada:

- `static` → (per defecte) segueix el flux normal.  
- `relative` → l’element es mou respecte la seva posició original.  
- `absolute` → es mou respecte al contenidor **posicionat** (no respecte a la pàgina sencera).  
- `fixed` → queda fixat respecte a la pantalla, encara que fem scroll.  
- `sticky` → combina `relative` i `fixed`, queda enganxat a un punt quan fem scroll.

📌 Per moure elements posicionats fem servir les propietats: [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/top), [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/left), [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/right), [`bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom).

**Exemple-01**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-01/index.html"

**Exemple-02**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-02/index.html"

---

## Posicionament amb "auto-center" amb `auto` i `max-width`

Una tècnica habitual és centrar un contenidor amb amplada fixa, com els blocs de tipus **blog**.

D'aquesta tècnica se'n diu **"auto-center"**

- Definim una amplada màxima amb [`max-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width).
- Fem servir [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin): auto; perquè es centri horitzontalment.

**Exemple-03**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-03/index.html"

---

## Posicionament amb Flexbox

**Flexbox** és un sistema de posicionament **unidimensional** (fila o columna).

- El contenidor ha de tenir [`display: flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
- Direcció principal: [`flex-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction): row | column.
- Alineació horitzontal: [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content): start | center | space-between | space-around | space-evenly.
- Alineació vertical: [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items): start | center | stretch | end.

📌 Flexbox és ideal per menús, barres de navegació i distribucions simples.

[Documentació flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)


[Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

**Exemple-04**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-04/index.html"

---

## Posicionament amb Grid

**Grid** és un sistema de posicionament **bidimensional** (files i columnes).

- El contenidor ha de tenir [`display: grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
- Definir columnes: [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns): 1fr 1fr;  
- Definir files: [`grid-template-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows): auto auto;  
- Separació entre elements: [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap): 10px;  
- Posicionar elements: [`grid-column`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column): 1 / 3; [`grid-row`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row): 2;

📌 Grid és ideal per dissenys complexos amb diverses files i columnes.

**Exemple-05**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-05/index.html"

---

## Comparació ràpida: Flex vs Grid

- **Flex**: millor per distribuir elements en **una sola direcció** (fila o columna).  
- **Grid**: millor per estructures en **dues direccions** (files i columnes).

---

## Propietat `z-index`

Quan dos o més elements ocupen la mateixa àrea a la pantalla, el navegador ha de decidir **quin es mostra a sobre de l’altre**.  
Aquest ordre s’anomena **ordre de pintat** (*stacking order*).  

Per defecte:
1. Els elements **segueixen l’ordre del codi HTML**: el que està escrit més tard “pinta per sobre”.
2. Quan fem servir **posicionament** (`relative`, `absolute`, `fixed`, `sticky`) podem controlar encara més l’ordre amb la propietat [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index).

La propietat [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) indica la **profunditat** de l’element respecte als altres.  
És com si els elements estiguessin en diferents “capas” (eixos Z, cap a dins/fora de la pantalla).

- **Valor positiu** → l’element es mostra per sobre d’altres amb valor inferior.  
- **Valor negatiu** → l’element es mostra per sota.  
- **Valor per defecte** → `auto`, i segueix l’ordre natural del codi.  

```css
.capadalt {
  position: absolute;
  z-index: 10;  /* es mostra per sobre */
}

.capabaix {
  position: absolute;
  z-index: -1;  /* queda per sota de tot */
}

### Propietat "opacity"

**Nota**: La propietat **opacity** permet definir quan de transperent és un element. 

- 0.0 totalment transparent
- 1.0 totalment opac

## Resum i bones pràctiques

- Fer servir **Flexbox** per menús, barres de navegació i distribucions simples.  
- Fer servir **Grid** per a la maqueta general de la pàgina.  
- Recordar que els elements **block** i **inline** són la base, i amb `display` podem transformar-los.  
- Usar `max-width` i `margin: auto;` per centrar contenidors.  
- Tenir present la jerarquia: **block** i **inline** → **display** → **position** → **flex/grid**.

**Exemple-06**: Obrir amb "Show preview" la pàgina "02-Web/04-Posicionament/exemple-06/index.html"