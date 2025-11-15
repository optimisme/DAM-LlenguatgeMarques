# Formularis

Els **formularis** en HTML permeten recollir informació de l’usuari (com noms, correus, comentaris o opcions) i enviar-la al servidor per ser processada.

## ✏️ Form 

Un formulari es defineix amb l’etiqueta `<form>`:

```html
<form action="destinacio" method="post">
    <!-- Camps del formulari -->
</form>
```

> **Nota**: Quan l'element d'un formulari està sel·leccionat, es diu que té el **focus**. Això és important per canviar-ne l'estil des de CSS.

**Atributs principals:**

- **action**: indica on s’enviarà la informació (URL o fitxer).
method: pot ser
    - `get` → envia les dades a la URL (visible, per cerques o filtres)
    - `post` → envia les dades de manera interna (segura per formularis llargs o confidencials)

> **Nota**: Les accions dels formularis les treballeu extènsament a segon de **DAW**. 

## 🏷️ Label (etiqueta)

L’element `<label>` serveix per descriure un camp d’entrada i millorar l’accessibilitat.

S’associa a un element `<input>`, `<textarea>` o `<select>` mitjançant l’atribut for.

```html
<label for="usuari">Nom d’usuari:</label>
<input type="text" id="usuari" name="usuari">
```

- L'atribut **for** indica per quin *input* és aquesta etiqueta, a través de l'**id** de l'*input*.

## ✏️ Input 

L’element `<input>` Serveix per entrades de dades (text, número, correu, contrasenya, etc.).

**Atributs importants:**

- **type**: defineix el tipus de camp
- **name**: el nom amb què s’enviarà la dada al servidor
value – el valor del camp
- **placeholder**: text d’ajuda dins del camp
- **required**: obliga a emplenar el camp abans d’enviar
- **id**: permet associar el camp amb un *label*
- **pattern**: expressió per validar que el text té el format esperat
- **title**: missatge d’ajuda que es mostra quan el patró no coincideix

Exemple-00: Obrir amb "Show preview" la pàgina "02-Web/13-Formularis/exemple-00/index.html"

### ✍️ Input tipus "text"

L'usuari ha d'escriure un text, es pot definir el tipus de text per fer comprovacions.

```html
<input type="text" name="nom" placeholder="Nom complet">
<input type="password" name="clau" placeholder="Contrasenya">
<input type="email" name="correu" placeholder="exemple@correu.com">
<input type="number" name="edat" min="0" max="120">
```

Per tipus complexes, es pot definir el patró que valida si el text és vàlid. Es fa amb patrons **regex**

```html
<input type="text" id="usuari" name="usuari"
         pattern="[A-Za-zÀ-ÿ\s]{3,20}"
         title="Nom entre 3 i 20 caràcters, només lletres" required><br><br>
```

> **Nota:** Els patrons *RegEx* es poden demanar a la IA o buscar en biblioteques tipus [RegExLib](https://regexlib.com/?AspxAutoDetectCookieSupport=1), [RegExr](https://regexr.com)

Exemple-01: Obrir amb "Show preview" la pàgina "02-Web/13-Formularis/exemple-01/index.html"

### ✅ Input tipus "checkbox"

Permet seleccionar múltiples opcions **independents**.

```html
<label><input type="checkbox" name="aficions" value="musica"> 🎵 Música</label>
<label><input type="checkbox" name="aficions" value="esport"> ⚽ Esport</label>
```

**Atributs:**

- **name**: nom del grup d’opcions
- **value**: valor que s’envia si està marcat
- **checked**: deixa l’opció marcada per defecte

### 🔘 Input tipus "radio"

```html
<p>Nivell d’estudis:</p>
<label><input type="radio" name="estudis" value="eso" required> ESO</label><br>
<label><input type="radio" name="estudis" value="batxillerat"> Batxillerat</label><br>
<label><input type="radio" name="estudis" value="fp"> Formació Professional</label><br>
<label><input type="radio" name="estudis" value="universitat"> Universitat</label><br><br>

<p>Torn de classe:</p>
<label><input type="radio" name="torn" value="mati" required> Matí</label><br>
<label><input type="radio" name="torn" value="tarda"> Tarda</label><br>
<label><input type="radio" name="torn" value="vespre"> Vespre</label><br><br>
```

**Important!**: Totes les opcions d’un mateix grup comparteixen el mateix name.

**Atributs**:

- **name**: grup al qual pertanyen les opcions
- **value**: valor de l’opció seleccionada
- **checked**: opció marcada per defecte

Exemple-02: Obrir amb "Show preview" la pàgina "02-Web/13-Formularis/exemple-02/index.html"

### 🚀 Input tipus "button"

```html
<input type="submit" value="Enviar">
<input type="reset" value="Esborrar">
<button type="button">Fer alguna acció</button>
```

**Tipus principals:**

- **submit**: envia el formulari
- **reset** neteja tots els camps
- **button** botó genèric (pot executar codi JavaScript)

## Elements complexes

### 📝 textarea

L’etiqueta `<textarea>` s’utilitza per escriure text llarg (comentaris, descripcions, missatges, observacions, etc.). **Permet diverses línies de text**.

```html
<label for="missatge">Missatge:</label>
<textarea id="missatge" name="missatge" rows="4" cols="40" placeholder="Escriu el teu comentari aquí..." required></textarea>
```

**Important!**: El text que l’usuari escriu dins del `<textarea>` es considera el valor que s’envia, així que aquest element no utilitza l’atribut value.

**Atributs**

- **name**: Nom amb què s’enviarà la dada al servidor
- **id**: Identificador per associar un <label>
- **rows**: Nombre de files visibles (alçada del camp)
- **cols**: Nombre de columnes visibles (amplada del camp)
- **placeholder**: Text d’ajuda dins del camp
- **required**: Fa que el camp sigui obligatori
- **maxlength**: Nombre màxim de caràcters permesos

### 🔽 select (i option)

L’etiqueta `<select>` permet crear menús desplegables amb opcions predefinides.

Cada opció es defineix dins amb `<option>`.

```html
<label for="pais">País:</label>
<select id="pais" name="pais" required>
  <option value="">-- Selecciona un país --</option>
  <option value="es">Espanya</option>
  <option value="fr">França</option>
  <option value="it">Itàlia</option>
</select>
```

**Atributs de "select"**

- **name**: Nom del camp que s’enviarà al servidor
- **id**: Identificador per al <label>
- **required**: Fa que sigui obligatori triar una opció
- **multiple**: Permet seleccionar més d’una opció (es - **manté amb Ctrl o Cmd)
- **size**: Mostra diverses opcions alhora sense desplegable (llista visible)

**Atributs de "option"**

- **value**: Valor que s’enviarà al servidor
- **selected**: Marca l’opció per defecte
- **disabled**: Fa que l’opció no sigui seleccionable

Exemple-03: Obrir amb "Show preview" la pàgina "02-Web/13-Formularis/exemple-03/index.html"

### 📝 Colorpicker

### 📝 Slider

###  Date