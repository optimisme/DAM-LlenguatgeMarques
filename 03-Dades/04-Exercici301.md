# Exercici301: Plantilles

En aquest exercici crearàs un petit servidor web amb **Node.js + Express + Handlebars (HBS)** que genera **dues pàgines HTML** a partir de **dades JSON**, fent servir:

- dades provinents de **3 fitxers `.json`**
- **bucles** (`each`)
- **condicions** (`if`, `unless`)
- **helpers** (comparació **menor o igual**)

---

## Objectiu

Construir un projecte que:

1. Serveixi una pàgina **`index.html`** (ruta `/`) generada amb una plantilla i dades d’**un sol arxiu JSON**.
2. Serveixi una segona pàgina (ruta `/informe`) generada amb una altra plantilla i dades **combinades de 3 arxius JSON**.
3. Tinguin un header amb el menú per canviar a cada una de les pàgines, comú i definit a partir d'un parcial
---

## Estructura de carpetes obligatòria

Crea el projecte amb aquesta estructura:

```
DAM1M04-Exercici301/
├── package.json
├── public/
│   └── estils.css
└── server/
    ├── app.js
    ├── data/
    │   ├── site.json
    │   ├── cities.json
    │   └── countries.json
    └── views/
        ├── partials
        │   └── header.hbs
        ├── index.hbs
        └── informe.hbs
```

---

## Dades proporcionades (has de crear aquests 3 fitxers)

### 1) `server/data/site.json` (dades per a la pàgina principal)
```json
{
  "title": "Guia ràpida de ciutats",
  "subtitle": "Exemple de plantilles HBS amb dades JSON",
  "notice": "Aquesta pàgina usa dades d’un sol fitxer JSON.",
  "showWarning": true
}
```

### 2) `server/data/cities.json` (llista de ciutats)
```json
{
  "cities": [
    { "name": "Barcelona", "country": "ES", "population": 1620000, "coastal": true },
    { "name": "Madrid", "country": "ES", "population": 3223000, "coastal": false },
    { "name": "València", "country": "ES", "population": 792000, "coastal": true },
    { "name": "Paris", "country": "FR", "population": 2148000, "coastal": false },
    { "name": "Lisboa", "country": "PT", "population": 545000, "coastal": true }
  ]
}
```

### 3) `server/data/countries.json` (diccionari de països)
```json
{
  "countries": {
    "ES": "Espanya",
    "FR": "França",
    "PT": "Portugal"
  }
}
```

---

## Tasques a implementar

### A) Servidor i dependències
1. Inicialitza el projecte amb npm.
2. Amb el mateix **package.json** dels exemples, instal·la les dependències:

```bash
npm install
```

### B) Ruta `/` (pàgina principal)
- Ruta: `GET /`
- Plantilla: `server/views/index.hbs`
- Dades: **només** `server/data/site.json`
- Ha de mostrar:
  - `title`
  - `subtitle`
  - un missatge de `notice`
- Ha d’incloure una **condició**:
  - si `showWarning` és `true`, mostra un avís (un text o un bloc HTML)
  - si és `false`, no el mostris

### C) Ruta `/informe` (pàgina amb 3 JSON)
- Ruta: `GET /informe`
- Plantilla: `server/views/informe.hbs`
- Dades: combinació de:
  - `site.json` (per reutilitzar `title` o `subtitle` si vols)
  - `cities.json`
  - `countries.json`
- Ha de mostrar:
  - una llista (`ul` o taula) de ciutats (ús obligatori de **`each`**)
  - per a cada ciutat:
    - nom de ciutat
    - nom complet del país (usant `lookup` amb el diccionari `countries`)
    - població

#### Condicions obligatòries dins del bucle
A la plantilla `informe.hbs` cal que hi hagi, com a mínim:

1. Un distintiu si la ciutat és costanera:
   - si `coastal` és `true` → mostra “🌊 Costanera”
   - si `coastal` és `false` → mostra “Interior”

2. Un text quan la població no existeix (opcional, però si ho fas, posa com a mínim una ciutat amb `population` absent o `null`).

### D) Helper obligatori: **menor o igual** (`lte`)
A `server/app.js` has de registrar un helper anomenat **`lte`** que retorni `true` si:

```
a <= b
```

Després, a la plantilla `informe.hbs`, fes-lo servir per marcar les ciutats “petites” segons un llindar (exemple: 800000):

- Si `population <= 800000` → mostra “Petita”
- Si no → mostra “Gran”

> El llindar (800000) l’esculls tu, però ha d’existir i s’ha de fer servir.

---

## Requisits mínims de les plantilles

### `partials/header.hbs`
- Capçalera comú amb el menú per canviar de pàgina

### `index.hbs`
- variables simples (`{{title}}`, `{{subtitle}}`)
- un `if` (o `unless`)

### `informe.hbs`
- `each` per recórrer ciutats
- `lookup` per convertir el codi de país en nom complet
- `if/else` per costanera/interior
- ús del helper `lte`

---

## Estil i presentació
- Crea `public/estils.css` i enllaça’l perquè les dues pàgines es vegin correctament.
- Afegeix com a mínim:
  - una font base
  - un color o estil per a destacats (`strong`, `.badge`, etc.)

---

## Comprovacions que has de poder fer
- `npm run dev` (o el script que defineixis) engega el servidor
- `http://localhost:3000/` mostra la pàgina principal
- `http://localhost:3000/informe` mostra la pàgina amb dades combinades
- El helper `lte` funciona i afecta el resultat visual

---

## Entrega

Entrega l’exercici com un nou repositori a GitHub anomenat:

`DAM1M04-Exercici301`

I puja l’enllaç del repositori a l’espai d’entrega del Moodle de l’assignatura.
