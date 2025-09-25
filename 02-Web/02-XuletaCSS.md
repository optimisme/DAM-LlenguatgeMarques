## Display

[display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)  
Com es mostra l'element en el flux del document.

- **block**: L’element ocupa tot l’ample disponible i comença en una línia nova.  
- **inline**: L’element ocupa només l’ample del seu contingut i no força salt de línia.  
- **inline-block**: Es col·loca en línia però permet alçada i amplada pròpies.  
- **none**: L’element desapareix del flux i no ocupa espai.  
- **flex**: Converteix l’element en un contenidor flexible.  
- **grid**: Converteix l’element en un contenidor de graella.  

---

### Flexbox

Propietats principals quan s’utilitza `display: flex`.

- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction): Direcció dels ítems (`row`, `row-reverse`, `column`, `column-reverse`).  
- [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items): Alineació vertical dels ítems dins del contenidor (`flex-start`, `flex-end`, `center`, `stretch`, `baseline`).  
- [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content): Alineació horitzontal dels ítems (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`).  
- [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap): Controla si els ítems es col·loquen en una sola línia o poden fer salt (`nowrap`, `wrap`, `wrap-reverse`).  
- [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content): Alineació vertical de les línies quan hi ha múltiples files (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch`).  

---

### Grid

Propietats principals quan s’utilitza `display: grid`.

- [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows): Defineix el nombre i mida de les files.  
- [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns): Defineix el nombre i mida de les columnes.  
- [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content): Alineació horitzontal de tota la graella dins del contenidor.  
- [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items): Alineació vertical de les cel·les dins de cada fila.  
- [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content): Alineació vertical de tota la graella dins del contenidor.  


---

## Position & Layering

Propietats per controlar la posició i l’ordre dels elements.

- [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position):  
  Defineix el mode de posicionament.  
  - **static**: Per defecte, segueix el flux normal.  
  - **relative**: Relatiu a la seva posició original.  
  - **absolute**: Relatiu al primer contenidor amb posició no estàtica.  
  - **fixed**: Relatiu a la finestra (viewport), no es mou en fer scroll.  
  - **sticky**: Barreja `relative` i `fixed`, es queda fix quan es fa scroll dins del seu contenidor.  

- [top](https://developer.mozilla.org/en-US/docs/Web/CSS/top), [right](https://developer.mozilla.org/en-US/docs/Web/CSS/right), [bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom), [left](https://developer.mozilla.org/en-US/docs/Web/CSS/left):  
  Defineixen el desplaçament de l’element segons el valor de `position`.  

- [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index):  
  Controla la profunditat dels elements (ordre de superposició). Valors més alts apareixen a sobre.  

- [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float):  
  Mou l’element cap a l’esquerra o la dreta i fa que el text o altres elements l’envoltin.  

- [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear):  
  Indica per quin costat no es poden col·locar elements flotants (`left`, `right`, `both`).  


---

## Margin

[margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)  
Espai buit exterior que separa l'element dels elements veïns.

- **margin-top**: Espai superior.
- **margin-right**: Espai a la dreta.
- **margin-bottom**: Espai inferior.
- **margin-left**: Espai a l’esquerra.
- **margin**: Shorthand per establir tots els marges a la vegada.
- **auto**: Valor especial, sovint per centrar elements horitzontalment.

---

## Border

[border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)  
Línia que envolta l’element entre el `padding` i el `margin`.

- **border-width**: Gruix de la línia.
- **border-style**: Estil de la línia (`solid`, `dashed`, `dotted`, etc.).
- **border-color**: Color de la línia.
- **border**: Shorthand per establir totes les propietats alhora.
- **border-top / border-right / border-bottom / border-left**: Control individual de cada costat.
- **border-radius**: Arrodoneix les cantonades.

---

## Border-radius

[border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)  
Arrodoneix les cantonades de l’element.

- **Valor únic**: Totes les cantonades iguals.
- **Dos valors**: Primer (top-left i bottom-right), segon (top-right i bottom-left).
- **Tres valors**: Primer (top-left), segon (top-right i bottom-left), tercer (bottom-right).
- **Quatre valors**: En ordre (top-left, top-right, bottom-right, bottom-left).
- **%**: Permet fer cercles o el·lipses quan el valor és la meitat de l’ample i l’altura.

---

## Padding

[padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)  
Espai interior entre el contingut de l’element i el seu `border`.

- **padding-top**: Espai superior.
- **padding-right**: Espai a la dreta.
- **padding-bottom**: Espai inferior.
- **padding-left**: Espai a l’esquerra.
- **padding**: Shorthand per establir tots els valors a la vegada.

---

## Size

Propietats per controlar la mida dels elements.

- [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing):  
  Com es calcula l’ample i l’altura de l’element.  
  - **content-box**: Només inclou el contingut.  
  - **border-box**: Inclou contingut + `padding` + `border`.

- [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width): Amplada de l’element.  
- [min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width): Amplada mínima.  
- [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width): Amplada màxima.  
- [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height): Altura de l’element.  
- [min-height](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height): Altura mínima.  
- [max-height](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height): Altura màxima.  

---

## Overflow

[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)  
Controla què passa quan el contingut sobrepassa la mida definida de l’element.

- **visible**: El contingut que sobrepassa és visible.
- **hidden**: El contingut que sobrepassa queda amagat.
- **scroll**: Mostra barres de desplaçament sempre.
- **auto**: Mostra barres de desplaçament només si cal.

- [overflow-x](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x): Controla el desbordament horitzontal.  
- [overflow-y](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y): Controla el desbordament vertical.  

---

## Shadows

Permeten afegir ombres a elements i text.

- [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow): Ombra de la caixa de l’element.  
- [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow): Ombra del text.  

---

## Background

[background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)  
Defineix el fons d’un element.

- **background-color**: Color de fons.  
- **linear-gradient()**: Degradat lineal.  
- **radial-gradient()**: Degradat radial.  
- **background-image**: Imatge de fons.  
- **background-repeat**: Controla la repetició de la imatge.  
- **background-size**: Escala la imatge (`auto`, `cover`, `contain`).  
- **background-position**: Posició dins de l’element.  
- **background-attachment**: Com es desplaça la imatge (`scroll`, `fixed`, `local`).  
- **background**: Shorthand per establir diverses propietats alhora.  

## Opacity

Controla la visibilitat i la transparència dels elements.

- [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility):  
  - **visible**: L’element es mostra normalment.  
  - **hidden**: L’element ocupa espai però no es veu.  
  - **collapse**: Per taules, oculta files/columnes sense deixar espai.  

- [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity):  
  Defineix la transparència de l’element (valor entre 0 i 1).  
  - **0**: Completament transparent.  
  - **1**: Completament opac.  

---

## Cursor

Controla el cursor i la interacció amb l’element.

- [cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor):  
  Canvia l’aspecte del cursor (ex. `default`, `pointer`, `text`, `move`, `wait`, etc.).  

- [pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events):  
  Controla si l’element pot rebre esdeveniments del ratolí.  
  - **auto**: Comportament normal.  
  - **none**: L’element ignora els esdeveniments.  

---

## Typography

Propietats per definir l’aparença del text.

- [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family): Tipus de lletra.  
- [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight): Gruix de la lletra.  
- [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size): Mida de la lletra.  
- [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color): Color del text.  
- [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): Alineació horitzontal (`left`, `right`, `center`, `justify`).  
- [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style): Estil (`normal`, `italic`, `oblique`).  
- [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform): Transformació (`uppercase`, `lowercase`, `capitalize`).  
- [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration): Decoració (`underline`, `line-through`, `overline`).  

---

## Text-shadows

Permeten afegir ombres al text.

- [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow):  
  Defineix una o més ombres al text (posició X, posició Y, difuminat i color).  

---

## Paragraph

Propietats que afecten el comportament i format del paràgraf.

- [user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select): Controla si el text es pot seleccionar.  
- [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing): Espai entre lletres.  
- [word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing): Espai entre paraules.  
- [line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height): Alçada de la línia.  
- [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction): Direcció del text (`ltr`, `rtl`).  
- [text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent): Sagnat de la primera línia.  
- [text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow): Com es mostra el text desbordat (`clip`, `ellipsis`).  
- [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break): Controla el trencament de paraules llargues.  
- [overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap): Permet dividir paraules per evitar desbordament.  
- [white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space): Controla com s’interpreten espais i salts de línia.  
- [writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode): Orientació del text (`horizontal-tb`, `vertical-rl`, `vertical-lr`).  

---

## Columns

Propietats per dividir el contingut en columnes.

- [column-count](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count): Nombre de columnes.  
- [column-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width): Amplada mínima de cada columna.  
- [column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap): Espai entre columnes.  
- [column-rule-style](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style): Estil de la línia entre columnes.  
- [column-rule-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width): Gruix de la línia entre columnes.  
- [column-rule-color](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-color): Color de la línia entre columnes.  
- [column-span](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span): Controla si un element ocupa més d’una columna.  
