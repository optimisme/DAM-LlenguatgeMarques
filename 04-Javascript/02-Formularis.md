# Formularis i JavaScript

## Input de text (`type="text"`) + event `input`

**HTML**

```html
<input id="inpNom" type="text" placeholder="Escriu el teu nom">
<p id="outNom"></p>
```

**JavaScript**

```js
function llegirNom() {
  const ref = document.querySelector('#inpNom')
  return ref.value
}

function escriureNom(text) {
  const ref = document.querySelector('#outNom')
  ref.textContent = text
}

function onNomInput() {
  escriureNom(llegirNom())
}

document.querySelector('#inpNom').addEventListener('input', onNomInput)
```

> **Nota**: L’event `input` s’activa a cada canvi del camp i copià el text del `value` cap al paràgraf.

---

## Input de text + event `change`

**HTML**

```html
<input id="inpCiutat" type="text" placeholder="Ciutat">
<p id="outCiutat"></p>
```

**JavaScript**

```js
function onCiutatChange() {
  const ref = document.querySelector('#inpCiutat')
  document.querySelector('#outCiutat').textContent = ref.value
}

document.querySelector('#inpCiutat').addEventListener('change', onCiutatChange)
```

> **Nota**: L’event `change` normalment només dispara quan l’usuari acaba el canvi (sovint en perdre el focus).

---

## Select/option (`<select>`) + event `change`

**HTML**

```html
<select id="selCurs">
  <option value="">-- tria --</option>
  <option value="smx">SMX</option>
  <option value="dam">DAM</option>
</select>
<p id="outCurs"></p>
```

**JavaScript**

```js
function onCursChange() {
  const ref = document.querySelector('#selCurs')
  document.querySelector('#outCurs').textContent = ref.value
}

document.querySelector('#selCurs').addEventListener('change', onCursChange)
```

> **Nota**: Un `<select>` guarda l’opció triada a `value` i es captura amb `change`.

---

## Checkbox (`type="checkbox"`) + `checked`

**HTML**

```html
<label>
  <input id="chkCond" type="checkbox">
  Accepto condicions
</label>
<p id="outCond"></p>
```

**JavaScript**

```js
function onCondChange() {
  const ref = document.querySelector('#chkCond')
  document.querySelector('#outCond').textContent = ref.checked ? 'Sí' : 'No'
}

document.querySelector('#chkCond').addEventListener('change', onCondChange)
```

> **Nota**: En un checkbox no uses `value` sinó `checked` (true/false) per saber si està marcat.

---

## Radiobox (grup) + trobar el `:checked`

**HTML**

```html
<label><input type="radio" name="mode" value="presencial"> Presencial</label>
<label><input type="radio" name="mode" value="online"> Online</label>
<p id="outMode"></p>
```

**JavaScript**

```js
function llegirRadio(name) {
  const ref = document.querySelector(`input[name="${name}"]:checked`)
  return ref ? ref.value : ''
}

function onModeChange() {
  document.querySelector('#outMode').textContent = llegirRadio('mode')
}

document.querySelectorAll('input[name="mode"]').forEach(r => {
  r.addEventListener('change', onModeChange)
})
```

> **Nota**: Els radio funcionen en grup (mateix `name`) i el valor s’obté buscant el que està `:checked`.

---

## Textarea + `input`

**HTML**

```html
<textarea id="txtComent" rows="3"></textarea>
<p id="outComent"></p>
```

**JavaScript**

```js
function onComentInput() {
  const ref = document.querySelector('#txtComent')
  document.querySelector('#outComent').textContent = ref.value
}

document.querySelector('#txtComent').addEventListener('input', onComentInput)
```

> **Nota**: Un `<textarea>` es llegeix igual que un input de text: amb `value`.

---

## Number (`type="number"`) + `valueAsNumber`

**HTML**

```html
<input id="inpNota" type="number" min="0" max="10">
<p id="outNota"></p>
```

**JavaScript**

```js
function onNotaInput() {
  const ref = document.querySelector('#inpNota')
  document.querySelector('#outNota').textContent = String(ref.valueAsNumber)
}

document.querySelector('#inpNota').addEventListener('input', onNotaInput)
```

> **Nota**: `valueAsNumber` retorna un número (en lloc d’un text) i és útil per fer càlculs.

---

## Posar valors des de JavaScript (modificar el formulari)

**HTML**

```html
<input id="inpSetNom" type="text">
<button id="btnPosaNom" type="button">Posa "Pere"</button>
```

**JavaScript**

```js
function posaPere() {
  document.querySelector('#inpSetNom').value = 'Pere'
}

document.querySelector('#btnPosaNom').addEventListener('click', posaPere)
```

> **Nota**: Modifiques un input assignant directament `element.value = ...`.

---

## Event `submit` del formulari + `preventDefault()`

**HTML**

```html
<form id="frm">
  <input id="inpMail" type="text" placeholder="mail">
  <button type="submit">Enviar</button>
</form>
<pre id="outFrm"></pre>
```

**JavaScript**

```js
function onSubmit(e) {
  e.preventDefault()
  const mail = document.querySelector('#inpMail').value
  document.querySelector('#outFrm').textContent = mail
}

document.querySelector('#frm').addEventListener('submit', onSubmit)
```

> **Nota**: Amb `preventDefault()` evites que el form recarregui la pàgina i gestiones l’enviament amb JS.

---

## Focus/Blur: saber quan un camp entra/surt de selecció

**HTML**

```html
<input id="inpFocus" type="text" placeholder="fes focus aquí">
<p id="outFocus"></p>
```

**JavaScript**

```js
function onFocus() {
  document.querySelector('#outFocus').textContent = 'Focus'
}

function onBlur() {
  document.querySelector('#outFocus').textContent = 'Sense focus'
}

const ref = document.querySelector('#inpFocus')
ref.addEventListener('focus', onFocus)
ref.addEventListener('blur', onBlur)
```

> **Nota**: `focus` i `blur` serveixen per detectar quan l’usuari entra o surt d’un camp (si el camp té o no té el focus)
