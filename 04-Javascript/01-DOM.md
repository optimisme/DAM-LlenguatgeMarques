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

## Exemple senzill

HTML:

```html
<h1 id="title">Hola!</h1>
```

JavaScript:

```javascript
let element = document.getElementById("title")
element.textContent = "Bon dia!"
```

✅ Això canvia el text del títol directament a la pàgina.

---

## Exemple amb un botó

HTML:

```html
<button id="btn">Clica’m</button>
<p id="msg"></p>
```

JavaScript:

```javascript
let button = document.getElementById("btn")

button.addEventListener("click", function () {
  document.getElementById("msg").textContent = "Has clicat el botó!"
})
```

Aquí JavaScript interactua amb el DOM per reaccionar a l’usuari.
