# Validació de documents JSON amb JSON Schema

## Què és JSON Schema

**JSON Schema** és un estàndard que permet **descriure l’estructura, el contingut i les regles** que ha de complir un document JSON.

Amb JSON Schema podem definir:
- quins camps són obligatoris
- quin tipus de dades té cada camp
- valors permesos
- restriccions de format

---

## Per a què serveix la validació

La validació permet assegurar que:
- els documents JSON tenen la **forma correcta**
- les dades compleixen les **regles esperades**
- es poden **intercanviar dades amb seguretat** entre sistemes

És especialment important en:
- APIs
- fitxers de configuració
- importació i exportació de dades
- comunicació entre aplicacions

---

## Conceptes bàsics de JSON Schema

Un esquema JSON és també un document JSON.

Elements habituals:
- `type`
- `properties`
- `required`
- `items`
- `enum`
- `minimum`, `maximum`
- `format`

---

## Exemple bàsic d’esquema

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}
```

Aquest esquema indica:
- el document ha de ser un objecte
- `name` és obligatori *(required)* i és una cadena de text
- `age` és opcional i ha de ser un nombre enter positiu

---

## Tipus de dades en JSON Schema

| Tipus | Descripció |
|-----|-----------|
| `object` | Objecte amb propietats |
| `array` | Llista de valors |
| `string` | Cadena de text |
| `number` | Nombre |
| `integer` | Nombre enter |
| `boolean` | Valor lògic |
| `null` | Valor nul |

---

## Validació d’objectes

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["id", "email"]
}
```

---

## Validació d’arrays

```json
{
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

👉 Aquest esquema obliga que **tots els elements de l’array siguin del mateix tipus** *(integer)*.

---

## Arrays amb estructura comuna

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "product": { "type": "string" },
      "qty": { "type": "integer", "minimum": 1 }
    },
    "required": ["product", "qty"]
  }
}
```

---

## Valors permesos (`enum`)

```json
{
  "type": "string",
  "enum": ["pending", "paid", "cancelled"]
}
```

---

## Formats habituals

```json
{
  "type": "string",
  "format": "email"
}
```

Altres formats habituals:
- `date`
- `date-time`
- `uri`
- `ipv4`
- `ipv6`

---

## Eina de validació: Ajv

**Ajv** (*Another JSON Schema Validator*) és una llibreria molt utilitzada en Node.js per validar documents JSON.

Característiques:

- molt ràpida
- compatible amb diferents versions de JSON Schema
- mostra errors detallats

### Exemple de validació amb Ajv

Per fer una validació:

```bash
./validate.sh schema.json data.json
```

---

## Bones pràctiques

- Validar sempre abans de processar dades
- Mantenir els esquemes versionats
- Utilitzar arrays homogenis
- Documentar els esquemes
- Separar dades i validació
