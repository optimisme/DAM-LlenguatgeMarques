# Exercici400: Sliding Puzzle 

<center>
<img src="./assets/sliding-puzzle.png" style="width: 90%; max-width: 250px">
</center>

En aquest exercici crearàs un **sliding puzzle** amb JavaScript. El joc mostra una imatge dividida en peces i una **casella buida**. L’objectiu és **ordenar les peces** fins reconstruir la imatge original.

> **Base**: fes servir la idea de *"03-Exemple"* de la fitxa que es desplaça per posicions, però ara amb **diverses peces**, una **casella buida** i moviments **validats**.

## Objectiu del joc

* Tens una graella de **3x3** amb **8 peces** i **1 espai buit**.
* L’usuari pot clicar una peça.
* La peça **només es pot moure** si està **just al costat** (amunt/avall/esquerra/dreta) de la casella buida.
* La casella escollida es mou cap a l'espai buit
* El joc s’acaba quan les peces estan **ordenades**.

---

## Estructura mínima del projecte

Crea el projecte amb aquesta estructura:

```
DAM1M04-Exercici400/
├── index.html
├── estils.css
└── script.js
```

---

## Requisits obligatoris

### Interfície

* Un tauler en forma de graella (3x3 recomanat).
* Les peces han de tenir un aspecte clar:

  * o bé una **imatge** tallada (recomanat)
  * o bé números (mínim acceptat)

* Una casella buida **visible** (pot ser un “forat” o una casella sense fons).

* Un botó **Reset** que:

  * reiniciï el puzle en un estat barrejat
  * mantingui sempre **1 buit**

* Animació suau del moviment (per exemple amb `transition` i `ease`).

### Funcionament

* Clic a una peça:

  * si és adjacent al buit → es mou
  * si no ho és → no passa res

* Detecció de “puzle resolt”:

  * quan està resolt, mostra un missatge (`alert` o text a la pàgina).

---

## Com s’ha de muntar la lògica amb un array JavaScript

El puzle s’ha de controlar amb **un array** que representi el tauler.

### Representació recomanada (1D)

Per una graella 3x3, tens 9 posicions. Fes un array de 9 elements:

* `0` representa la **casella buida**
* la resta són les peces (1..8)

Exemple d’estat resolt:

```js
// 3x3 (posicions 0..8)
[1, 2, 3,
 4, 5, 6,
 7, 8, 0]
```

Exemple d’estat barrejat:

```js
[1, 2, 3,
 4, 0, 6,
 7, 5, 8]
```

### Com saber on és el buit

* Cerca l’índex on hi ha `0` amb `indexOf(0)`.

### Com saber si una peça és adjacent al buit

Treballant amb índexs (0..8):

* calcula **fila** i **columna**:

  * `fila = Math.floor(index / mida)`
  * `columna = index % mida`

Una peça és movible si:

* està a la mateixa fila i columna ±1
* o a la mateixa columna i fila ±1

En resum, el moviment és legal si:

* `abs(fila1 - fila2) + abs(col1 - col2) === 1`

### Com fer el moviment

Si la peça és adjacent:

* intercanvia els dos valors dins l’array (la peça i el `0`)
* després “pinta” el tauler al DOM (actualitza la UI)

### Com comprovar si està resolt

Compara l’array actual amb l’estat resolt:

```js
[1,2,3,4,5,6,7,8,0]
```

---

## Muntatge del tauler al DOM

* El tauler HTML pot contenir 9 `div` (caselles).
* Cada casella mostra:

  * o un número
  * o un “tros” de la imatge (via `background-position`)

* En clicar una casella:

  * obtens l’índex clicat
  * intentes moure segons la lògica de l’array
  * repintes

---

## Extra opcional (per nota alta)

* Botó “Barreja” que faci un shuffle vàlid.
* Comptador de moviments.
* Temporitzador.
* Escollir imatge amb un "<option>" (2-3 opcions).

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
