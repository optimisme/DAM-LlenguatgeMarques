# Plantilles

## Què són les plantilles?

Les plantilles **Handlebars (`.hbs`)** són fitxers HTML amb una sintaxi especial que permet **inserir dades dinàmiques** provinents d'arxius JSON. El seu objectiu principal és **representar dades**, no processar-les.

El resultat final d’una plantilla Handlebars és **HTML pur**, preparat per ser enviat al navegador.

---

## Flux general de treball

El procés habitual amb Handlebars en un servidor Node.js és:

1. El servidor llegeix dades (per exemple, un o més fitxers `.json`)
2. Construeix un objecte amb totes les dades necessàries
3. Passa aquest objecte a una plantilla `.hbs`
4. Handlebars substitueix els marcadors per valors reals
5. Es genera HTML final

```
Dades JSON → plantilla .hbs → HTML
```

---

## Variables

```hbs
{{name}}
```

Mostra el valor d’una clau del JSON.  
Si la clau no existeix, no es mostra res i no hi ha error.

**Exemple**:

```json
{
  "name": "Barcelona",
  "population": 1620000,
  "capital": true
}
```

Ús de les dades a la plantilla:
```hbs
<p>Ciutat: {{name}}</p>
<p>Població: {{population}}</p>
```

---

## Recorregut de llistes (`each`)

- Recorre una llista
- Repeteix el bloc HTML per a cada element
- El context passa a ser l’element actual

```hbs
{{#each cities}}
  <p>{{name}}</p>
{{/each}}
```

### Context i jerarquia

Dins d’un `each`, el context canvia.  
Per accedir a dades superiors cal usar `../`.

---

## Condicionals (`if`)

El contingut es mostra si la clau existeix i té valor.

```hbs
{{#if population}}
  <span>{{population}} habitants</span>
{{/if}}
```

---

## Condicional negatiu (`unless`)

S’executa quan la condició no es compleix.

```hbs
{{#unless population}}
  <em>Població desconeguda</em>
{{/unless}}
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

## Comprovació implícita de claus

Si la clau no existeix, el bloc no es mostra i no hi ha error.

```hbs
{{#if population}}
  Quantitat de població: {{population}}
{{/if}}
```

---

## Limitacions intencionades

- No comparacions
- No càlculs
- No ordenacions
- No modificació de dades

La lògica ha d’estar preparada abans.

---

## Helpers (extensió)

```js
hbs.registerHelper('gt', (a, b) => a > b);
```

```hbs
{{#if (gt population 1000000)}}
  (Ciutat gran)
{{/if}}
```

---

## Què NO fan les plantilles `.hbs`

- No llegeixen fitxers
- No fan consultes
- No processen dades
- No contenen lògica de negoci

Només representen dades.

---

## Bones pràctiques

- Preparar dades al servidor
- Passar només el necessari
- Plantilles simples
- Evitar lògica complexa
