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

Per incloure codi **JavaScript** a les pàgines web, es fa servir l'element `<script>`

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

## Contingut de text dels elements

Hi ha diverses maneres de canviar el contingut dels elements, per canviar el text:

**textContent**: Permet veure i/o modificar el text dins d'un element

```html
  <div id="nom">Toni</div>
```

```javascript
  var refNom = document.getElementById("nom")
  var textNom = refNom.textContent
  // Ara "textNom" conté el valor "Toni"
```

## Estils 'style' dels elements

Es pot canviar l'estil dels elements des de JavaScript amb una referència a l'element i la propietat *".style"*


> **Nota**: Això és com modificar l'element *"style"* de l'element, és per aquest motiu que no es recomana fer servir mai *"style"*, perquè així quan hi ha modificacions sabem que venen de JavaScript.

```html
<div id="txtCol" style="color:blue;">Color del text</div>
```

```javascript
function textColor(value) {
    var ref =  document.querySelector("#txtCol")
    ref.style.color = value;
}
```

Quan un estil té un nom compost, per exemple **"background-color"** es passa a notació *"CamelCase".

```javascript
function backColor(value) {
    var ref =  document.querySelector("#bckCol")
    ref.style.backgroundColor = value;
}
```

## Estils 'class' dels elements

També es poden modificar els estils que hi ha definits en un element, això és útil per canviar-los l'estil o afegir/treure classes

```javascript
// Si un element té la classe "menu"
ref.classList.contains("menu")

// Afegir una classe al 'class' d'un element anomenada "fonsGroc"
ref.classList.add("fonsGroc")

// Treure una classe del 'class' d'un element anomenada "lletresGrans"
ref.classList.remove("lletresGrans")

// Si l'element té la classe "animacio" la treu
// Si l'element no té la classe "animacio" l'afegeix
ref.classList.toggle("animacio")
```

## Modificar variables del CSS

Per modificar el valor d'una variable CSS

```css
:root {
  --color-principal: LightSalmon;
}
```

Com que no es pot accedir al css ":root" modifiquem *"document.documentElement"*

```javascript
document.documentElement.style.setProperty('--color-principal', 'cyan')
```

## Manipular l'estructura del DOM