# Plantilles Handlebars (HBS)

## Què són les plantilles?

Les plantilles **Handlebars (`.hbs`)** són fitxers HTML amb una sintaxi especial que permet **inserir dades dinàmiques** dins del document.

Aquestes dades normalment provenen de:

- fitxers **JSON**
- bases de dades
- objectes creats al **servidor Node.js**

Les plantilles tenen un objectiu molt concret:

> **Mostrar dades en format HTML**

No estan pensades per calcular ni modificar dades.

El resultat final sempre és:

```
Plantilla .hbs + dades → HTML pur
```

Aquest HTML és el que el servidor envia al navegador.

---

# Flux general de funcionament

Quan un usuari accedeix a una pàgina web amb plantilles Handlebars, passa el següent:

1. El navegador demana una URL al servidor  
2. El servidor executa una ruta (`app.get`)
3. El servidor carrega dades (per exemple un `.json`)
4. El servidor envia aquestes dades a una plantilla `.hbs`
5. Handlebars genera l'HTML final
6. El servidor envia aquest HTML al navegador

```
Browser → Node.js → dades JSON → plantilla HBS → HTML
```

---

# Estructura típica del projecte

Un projecte senzill amb Handlebars sol tenir aquesta estructura:

```
projecte
│
├── app.js
│
├── data
│   └── animals.json
│
├── views
│   ├── animals.hbs
│   └── partials
│       ├── header.hbs
│       └── footer.hbs
│
└── public
    └── estils.css
```

---

# Com es carreguen dades JSON

En Node.js és molt habitual guardar dades en fitxers `.json`.

Exemple de fitxer:

`data/animals.json`

```json
{
  "animals": [
    { "name": "Tigre", "continent": "Àsia" },
    { "name": "Elefant", "continent": "Àfrica" },
    { "name": "Cangur", "continent": "Austràlia" }
  ]
}
```

Aquest fitxer es pot carregar des del servidor amb `fs`.

---

# Exemple complet de servidor `app.js`

```javascript
const express = require('express')
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = 3000

// Disable cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
  next()
})

// Continguts estàtics
app.use(express.static('public'))

// Configuració Handlebars
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Registrar helpers
hbs.registerHelper('gt', (a, b) => a > b)

// Ruta
app.get('/animals', (req, res) => {

  // Llegir fitxer JSON
  const file = path.join(__dirname, 'data', 'animals.json')
  const json = JSON.parse(fs.readFileSync(file, 'utf8'))

  // Aplicar dades a la plantilla
  res.render('animals', json)

})

// Iniciar servidor
const httpServer = app.listen(port, () => {
  console.log(`http://localhost:${port}`)
  console.log(`http://localhost:${port}/animals`)
})

// Tancar correctament
process.on('SIGINT', () => {
  httpServer.close()
  process.exit(0)
})
```

---

# Què fa `app.get`

Defineix la funció que s'executa quan l'usuari demana una URL:

A l'exemple, quan es demana '/animals':

```text
http://localhost:3000/animals
```

S'executa la funció que es defineix amb:

```javascript
app.get('/animals', (req, res) => {

}
```

Aquesta funció:

- Llegeix les dades dels `.json``
- Construeix un nou objecte amb totes les dades
- Renderitza la pàgina fent servir la plantilla `.hbs`
- Retorna el resultat al client

```javascript
app.get('/animals', (req, res) => { // A la ruta URL /animals

  const file = path.join(__dirname, 'data', 'animals.json'); // Llegim el fitxer JSON
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  res.render('animals', json);                              // renderitza la plantilla animals.hbs i retorna el resultat (res.)
});
```


# Què fa `res.render()`

La funció **`render()`** és la que connecta les dades amb la plantilla.

```
res.render(plantilla, dades)
```

Exemple:

```javascript
res.render('animals', json)
```

Significa:

- carregar `views/animals.hbs`
- injectar les dades de `json`
- generar HTML

---

# Variables

Les variables permeten mostrar valors del JSON.

Sintaxi:

```
{{variable}}
```

Exemple de JSON:

```json
{
  "name": "Barcelona",
  "population": 1620000
}
```

Plantilla:

```hbs
<p>Ciutat: {{name}}</p>
<p>Població: {{population}}</p>
```

Resultat HTML:

```html
<p>Ciutat: Barcelona</p>
<p>Població: 1620000</p>
```

Si una clau no existeix **no apareix res i no hi ha error**.

---

# Llistes (`each`)

Permet recórrer una col·lecció de dades.

```
{{#each animals}}
  <p>{{name}}</p>
{{/each}}
```

Si el JSON és:

```json
{
  "animals": [
    {"name": "Tigre"},
    {"name": "Elefant"},
    {"name": "Cangur"}
  ]
}
```

El resultat serà:

```
Tigre
Elefant
Cangur
```

---

# Context dins d'un `each`

Quan s'entra dins d'un `each`, el context canvia.

Si cal accedir a un nivell superior s'utilitza:

```
../
```

---

# Condicionals

## `if`

Mostra el bloc si la clau existeix i té valor.

```hbs
{{#if population}}
  <span>{{population}} habitants</span>
{{/if}}
```

---

## `if / else`

```hbs
{{#if capital}}
  <strong>Capital</strong>
{{else}}
  Ciutat no capital
{{/if}}
```

---

## `unless`

És el contrari d'`if`.

```hbs
{{#unless population}}
  <em>Població desconeguda</em>
{{/unless}}
```

---

# Helpers

Els helpers permeten ampliar Handlebars.

Es defineixen al servidor.

```javascript
hbs.registerHelper('gt', (a, b) => a > b)
```

Ús a la plantilla:

```hbs
{{#if (gt population 1000000)}}
  Ciutat gran
{{/if}}
```

---

# Partials

Els **partials** permeten reutilitzar fragments de pàgines.

Exemples habituals:

- header
- menú
- footer

Primer cal registrar-los al servidor.

```javascript
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
```

Estructura:

```
views
 └── partials
     ├── header.hbs
     └── footer.hbs
```

Exemple de parcial `footer.hbs`:

```hbs
<footer>
  <p>&copy; {{common.year}}</p>
</footer>
```

Per utilitzar-lo dins una plantilla:

```
{{> footer}}
```

---

# Limitacions intencionades de Handlebars

Les plantilles **no estan pensades per fer lògica complexa**.

No poden:

- llegir fitxers
- consultar bases de dades
- ordenar dades
- modificar dades
- fer càlculs complexos

Aquestes tasques s'han de fer **abans**, al servidor (`app.js`).

Les plantilles només **mostren dades**.

---

# Resum

Flux complet:

```
JSON → Node.js → res.render() → plantilla HBS → HTML → navegador
```

Responsabilitats:

| Component | Funció |
|-----------|--------|
| JSON | dades |
| Node.js | preparar dades |
| Handlebars | mostrar dades |
| HTML | resultat final |