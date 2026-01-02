# El format JSON

## Què és el format JSON

**JSON** (*JavaScript Object Notation*) és un format lleuger d’intercanvi de dades basat en text.  

S’utilitza per representar informació estructurada de manera **simple, llegible i independent del llenguatge de programació**.

Tot i que prové de JavaScript, JSON és un estàndard utilitzat per pràcticament tots els llenguatges i sistemes actuals, especialment en **APIs, fitxers de configuració i intercanvi de dades**.

---

## Característiques del format JSON

- És un **format de text pla**.
- És **fàcil de llegir** per persones i màquines.
- Té una **estructura jeràrquica**.
- No admet comentaris.
- Utilitza **claus i valors**.
- Les claus sempre són **cadenes de text** entre cometes dobles.
- És **independent de la plataforma i del llenguatge**.
- Molt utilitzat en serveis web i aplicacions modernes.

---

## Estructura bàsica

Un document JSON està format per:
- **Objectes**
- **Arrays**
- **Valors**

Exemple bàsic:

```json
{
  "name": "Anna",
  "age": 20,
  "active": true
}
```

---

## Tipus de dades en JSON

### 1. Objecte (`object`)
Col·lecció de parelles **clau: valor**.

```json
{
  "id": 1,
  "title": "Producte"
}
```

#### Objectes dins d’objectes
JSON permet **composar objectes dins d’altres objectes**, creant estructures jeràrquiques.

```json
{
  "user": {
    "name": "Joan",
    "address": {
      "city": "Barcelona",
      "zip": "08001"
    }
  }
}
```

---

### 2. Array (`array`)
Llista ordenada de valors.

```json
{
  "colors": ["red", "green", "blue"]
}
```

#### Arrays amb múltiples tipus
- **No és obligatori** que tots els elements siguin del mateix tipus.
- JSON permet arrays amb tipus barrejats:

```json
{
  "mixed": [1, "text", true, null]
}
```

👉 **Bones pràctiques:**  
Tot i que és legal, en entorns professionals i amb **JSON Schema** és recomanable que:
- tots els elements d’un array siguin del **mateix tipus**
- o segueixin una estructura comuna

Això facilita la validació i el processament de dades.

---

### 3. Cadena de text (`string`)

```json
{
  "name": "Joan"
}
```

---

### 4. Nombre (`number`)

```json
{
  "price": 19.95,
  "quantity": 3
}
```

JSON **no distingeix** entre enters i decimals.

---

### 5. Booleà (`boolean`)

```json
{
  "available": true,
  "deleted": false
}
```

---

### 6. Valor nul (`null`)

```json
{
  "description": null
}
```

---

## Jerarquia i combinació de dades

```json
{
  "order_id": 1001,
  "customer": {
    "name": "Laura",
    "email": "laura@mail.com"
  },
  "items": [
    { "product": "Keyboard", "qty": 1 },
    { "product": "Mouse", "qty": 2 }
  ]
}
```

---

## Usos habituals del format JSON

- Intercanvi de dades entre aplicacions
- APIs REST
- Emmagatzematge de configuracions
- Exportació de dades de bases de dades
- Comunicació client-servidor

---

## Resum

- JSON és un **format d’intercanvi de dades** lleuger i molt utilitzat.
- Permet **objectes dins d’objectes** i estructures jeràrquiques complexes.
- Els arrays poden contenir tipus barrejats, però és recomanable mantenir-los homogenis.
- És la base de moltes tecnologies modernes de desenvolupament web.
