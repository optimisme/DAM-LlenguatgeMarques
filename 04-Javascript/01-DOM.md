<div style="display: flex; width: 100%;">
    <div style="flex: 1; padding: 0px;">
        <p>© Albert Palacios Jiménez, 2024</p>
    </div>
    <div style="flex: 1; padding: 0px; text-align: right;">
        <img src="./assets/ieti.png" height="32" alt="Logo de IETI" style="max-height: 32px;">
    </div>
</div>
<br/>

# DOM (Document Object Model)

El **DOM** (*Document Object Model*) és la manera com el navegador representa una pàgina web per dins.

Quan carregues un fitxer HTML, el navegador no el tracta com un simple text, sinó que el converteix en una estructura d’objectes que JavaScript pot llegir i modificar.

👉 El **DOM** és el **pont** entre HTML i JavaScript.

## El DOM com un arbre

El navegador organitza tots els elements HTML en forma d’arbre:

```html
<body>
  <h1>Títol</h1>
  <p>Un paràgraf</p>
</body>
```

Es representa així:

```text
* document
  └── body
  ├── h1
  └── p
```

Cada etiqueta és un **node** (un objecte) dins del DOM.

## Per què serveix?

El DOM permet que JavaScript pugui:

* trobar elements de la pàgina
* canviar text o estils
* afegir o eliminar elements
* respondre a clics i accions de l’usuari

## JavaScript a les pàgines web

Per incloure codi **JavaScript** a les pàgines web, es fa servir l'element `<Script>`

```html
<script type="text/JavaScript" src="script.js"></script>
```

> **Nota**: Es pot posar codi directament a dins del cos de l'element, però és més recomanable fer-ho en un arxiu amb l'atribut *"src"*.

## Referència a elements

Per poder modificar els elements del DOM, hem d'obtenir una referència. Hi ha diverses maneres:

**.querySelector** permet obtenir la referència amb el mateix format que es defineixen les classes CSS

```html
  <div id="hola">...</div>
  <div class="segon">2n</div>
```

```javascript
  var refHola = document.querySelector("#hola")
  var refSegon = document.querySelector(".segon")
```

**.getElementById** permet obtenir la referència a partir de l'identificador de l'element

```html
  <div id="nom">Toni</div>
  <div id="cognom">Amorós</div>
```

```javascript
  var refNom = document.getElementById("nom")
  var refCog = document.getElementById("cognom")
```

## Contingut dels elements

Hi ha diverses maneres de canviar el contingut dels elements:

**textContent**: Permet veure i/o modificar el text dins d'un element

```html
  <div id="nom">Toni</div>
```

```javascript
  var refNom = document.getElementById("nom")
  var textNom = refNom.textContent
  // Ara "textNom" conté el valor "Toni"
```
