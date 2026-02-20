# Exercici400: Sliding Puzzle 

<center>
<img src="./assets/sliding-puzzle.png" style="width: 90%; max-width: 250px">
</center>

En aquest exercici crearàs un **sliding puzzle** amb JavaScript. El joc mostra una imatge dividida en peces i una **casella buida**. L’objectiu és **ordenar les peces** fins reconstruir la imatge original.

> **Base**: fes servir la idea de *"03-Exemple"* de la fitxa que es desplaça per posicions.

## Objectiu del joc

* Tens una graella de **3x3** amb **8 peces** i **1 espai buit**.
* L’usuari pot clicar una peça.
* La peça **només es pot moure** si està **just al costat** (amunt/avall/esquerra/dreta) de la casella buida.
* La casella escollida es mou cap a l'espai buit
* El joc s’acaba quan les peces estan **ordenades**.

---

## Estructura mínima del projecte

Crea els següents arxius a la carpeta "public" del servidor:

```
index.html
estils.css
script.js
```

---

## Requisits obligatoris

### Interfície

* Un tauler en forma de graella 3x3.
* Les peces han de tenir un aspecte clar, ha de ser una **imatge** retallada en 8 arxius *".png"*
* La casella buida.
* Un comptador de moviments que s'han fet des que ha començat la partida (última barreja).
* Un botó **Reset** que:

  * Reiniciï el puzle en un estat barrejat
  * Situa la peça buida també en una posició aleatòria
  * Posa el comptador de moviments a 0

> **Nota**: L'animació ha de ser suau i feta amb *"transform/translate"*.

### Funcionament

* Clic a una peça:

  * Si és adjacent al *buit* → es mou cap al *buit*
  * Si no ho és → no passa res

* Detecció de “puzle resolt”:

  * Quan està resolt, mostra un missatge a la pàgina dient que està resolt i el número de moviments que ha calgut per acabar.

---

## Com s’ha de muntar la lògica amb un array de dues dimensions

El puzle s’ha de controlar amb una **matriu (array 2D)** que representi el tauler:

* `0` representa la **casella buida**
* la resta són les peces (1..8)

### Representació recomanada (2D)

Exemple d’estat resolt (3x3):

```js
const tauler = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];
```

Exemple d’estat barrejat:

```js
const tauler = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 5, 8]
];
```

> Important: `numFiles` i `numColumnes` han de coincidir amb la mida de la matriu.

---

### Com saber on és el buit

Com que és 2D, es busca amb dos bucles:

* recorre `fila` i `columna`
* quan `tauler[fila][columna] === 0`, has trobat el buit

Exemple d’idea (sense entrar a detalls d’implementació):

* `posicioBuit.fila`
* `posicioBuit.columna`

---

### Com saber si una peça és adjacent al buit

Amb coordenades (fila/columna), una peça és movible si està **just al costat** del buit:

* mateixa fila i columna ±1
* o mateixa columna i fila ±1

Regla curta (distància Manhattan):

* és legal si `abs(df) + abs(dc) === 1`

On:

* `df = filaPeca - filaBuit`
* `dc = columnaPeca - columnaBuit`

---

### Com fer el moviment

Quan l’usuari clica una casella `(fila, columna)`:

1. Mira on és el buit `(filaBuit, columnaBuit)`
2. Si és adjacent:

   * intercanvia els dos valors a la matriu:
     * `tauler[fila][columna]` ↔ `tauler[filaBuit][columnaBuit]`
   * incrementa el comptador de moviments
   * actualitza la UI (mou les fitxes al DOM)

---

### Com “pintar” el tauler al DOM (estil de l’exemple)

Muntatge típic, coherent amb l’exemple:

* a `init()` crees els `div.casella` amb dos bucles `fila/columna`
* a cada casella li assignes:

  * `addEventListener("click", () => clicCasella(fila, columna))`
  * posició visual amb:

    * `style.left = ...`
    * `style.top = ...`

Per a les fitxes (números o tros d’imatge):

* cada fitxa es col·loca amb **`transform: translate(...)`** segons:

  * `x = columna * midaCasella`
  * `y = fila * midaCasella`

* així tens animació suau amb `transition: transform ...` (com a l’exemple)

---

### Com comprovar si està resolt

Compara el tauler actual amb l’estat resolt esperat:

```js
const resolt = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];
```

Pots fer-ho recorrent totes les files i columnes i comprovant que:

* `tauler[fila][columna] === resolt[fila][columna]` per a totes les posicions

Quan està resolt:

* mostra un missatge (i moviments totals)

---

## Comprovacions que has de poder fer

* Obrir `index.html` i jugar sense errors de consola.
* El botó **Reset** sempre deixa:

  * 8 peces + 1 buit
  * un estat jugable

* Les peces només es mouen si toca.
* Quan es completa, es mostra un missatge.

---

## Entrega

Entrega l’exercici com un nou repositori a GitHub anomenat:

`DAM1M04-Exercici400`

I puja l’enllaç del repositori a l’espai d’entrega del Moodle.

Hauràs d'ensenyar l'exercici funcionant al Proxmox el dia de l'entrega presencial.
