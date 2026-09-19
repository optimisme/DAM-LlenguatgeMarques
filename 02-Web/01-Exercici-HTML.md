# Exercici000

## Currículum web d’un alumne

Crea un petit lloc web personal que presenti el **currículum d’un alumne**. El lloc estarà format per diverses pàgines HTML relacionades entre elles mitjançant un menú de navegació.

L’objectiu és practicar l’estructura bàsica d’un document HTML, els títols, paràgrafs, llistes, imatges, enllaços i elements semàntics com `<nav>` i `<footer>`.

Totes les pàgines han de tenir una capçalera `<head>` que inclogui:

* Codificació UTF-8 amb `<meta charset="UTF-8">`.
* Un títol de pàgina amb l’element `<title>`.

També han de disposar d’un menú de navegació dins d’un element `<nav>` que permeti accedir a les diferents pàgines del currículum.

---

## Pàgina principal: `index.html`

Aquesta pàgina servirà com a presentació de l’alumne.

1. Un **títol principal** (`<h1>`) amb el nom de l’alumne.

2. Un **subtítol** (`<h2>`) amb un text com:

   *Estudiant de Desenvolupament d'Aplicacions Multiplataforma*

3. Un **paràgraf** (`<p>`) amb una breu presentació personal.

   Per exemple:

   *Sóc estudiant d'informàtica i estic interessat en el desenvolupament d'aplicacions, la programació i les noves tecnologies.*

4. Una **imatge** (`<img>`) de l’alumne o una imatge que el representi.

   La imatge s’ha de trobar dins de la carpeta `imatges/`.

   Per exemple:

   ```html
   <img src="imatges/perfil.jpg" width="200">
   ```

5. Una **llista desordenada** (`<ul>`) amb algunes dades personals o habilitats.

   Per exemple:

   * Programació
   * Desenvolupament web
   * Bases de dades
   * Sistemes operatius

6. Una **llista ordenada** (`<ol>`) amb alguns objectius professionals o acadèmics.

   Per exemple:

   1. Acabar el cicle formatiu.
   2. Realitzar pràctiques en una empresa.
   3. Treballar com a desenvolupador de software.

7. Utilitza almenys una vegada els elements:

   * `<hr>` per crear un separador horitzontal.
   * `<br>` per crear un salt de línia.
   * `&nbsp;` per inserir un espai no separable.

---

## Menú de navegació

Totes les pàgines han de tenir un menú dins d’un element `<nav>`.

Aquest menú ha de contenir enllaços locals a les diferents pàgines del lloc web.

Per exemple:

```text
Inici
Estudis
Projectes
```

Els enllaços han de permetre navegar entre:

* `index.html`
* `estudis.html`
* `projectes.html`

---

## Pàgina `estudis.html`

Aquesta pàgina mostrarà la formació i els coneixements de l’alumne.

1. Un **títol principal** (`<h1>`) amb el text:

   *Estudis i formació*

2. Un o més **subtítols** (`<h2>`) per separar diferents apartats.

   Per exemple:

   * Formació acadèmica
   * Coneixements

3. Un **paràgraf** (`<p>`) explicant breument els estudis que està realitzant l’alumne.

4. Una **llista ordenada** (`<ol>`) amb la formació acadèmica.

   Per exemple:

   1. ESO
   2. Batxillerat o CFGM
   3. CFGS Desenvolupament d'Aplicacions Multiplataforma

5. Una **llista desordenada** (`<ul>`) amb tecnologies o llenguatges coneguts.

   Per exemple:

   * Java
   * HTML
   * CSS
   * SQL
   * Linux

6. Una imatge relacionada amb els estudis o la informàtica situada dins de la carpeta `imatges/`.

7. Utilitza també almenys un `<hr>` o `<br>` per organitzar visualment el contingut.

---

## Pàgina `projectes.html`

Aquesta pàgina mostrarà alguns projectes o treballs realitzats per l’alumne.

1. Un **títol principal** (`<h1>`) amb el text:

   *Projectes*

2. Un **subtítol** (`<h2>`) per a cada projecte o grup de projectes.

3. Un o més **paràgrafs** (`<p>`) explicant els projectes.

4. Una **llista desordenada** (`<ul>`) amb alguns projectes.

   Per exemple:

   * Aplicació de gestió de tasques.
   * Joc desenvolupat amb Java.
   * Pàgina web personal.

5. Una **llista ordenada** (`<ol>`) indicant, per exemple, els passos seguits per desenvolupar un projecte.

6. Una o més **imatges** relacionades amb els projectes.

---

## Peu de pàgina

Totes les pàgines han de tenir un element `<footer>` al final del document.

Dins del `<footer>` hi ha d’haver:

* El símbol de copyright amb el nom de l’alumne.
* Un enllaç extern.
* Un enllaç de correu electrònic.
* Un enllaç de telèfon.

Per exemple:

```text
© 2026 Nom de l'alumne
GitHub
Correu electrònic
Telèfon
```

L’enllaç extern pot apuntar, per exemple, a:

```text
https://github.com/
```

Aquest enllaç extern s’ha d’obrir en una pestanya nova utilitzant:

```html
target="_blank"
```

L’enllaç de correu electrònic ha d’utilitzar:

```html
mailto:
```

Per exemple:

```html
<a href="mailto:alumne@example.com">Correu electrònic</a>
```

L’enllaç de telèfon ha d’utilitzar:

```html
tel:
```

Per exemple:

```html
<a href="tel:+34123456789">Telèfon</a>
```

---

## Exemple d’estructura d’arxius

```text
DAM1M04-Exercici000/

├── index.html
├── estudis.html
├── projectes.html
└── imatges/
    ├── perfil.jpg
    ├── estudis.jpg
    └── projecte.jpg
```

---

## Elements HTML obligatoris

Al conjunt de les pàgines s’han d’utilitzar els elements següents:

```html
<head>
<meta charset="UTF-8">
<title>

<nav>

<h1>
<h2>

<p>

<ul>
<ol>
<li>

<img>

<a>

<hr>
<br>
&nbsp;

<footer>
```

Els enllaços han d’incloure:

* Enllaços locals entre les diferents pàgines.
* Un enllaç a una pàgina web externa.
* Un enllaç de correu electrònic amb `mailto:`.
* Un enllaç de telèfon amb `tel:`.

L’enllaç extern s’ha d’obrir en una pestanya nova amb `target="_blank"`.

---

## Entrega

Entrega l’exercici com un nou repositori a GitHub anomenat:

```text
DAM1M04-Exercici000
```

Copia l’enllaç del repositori de GitHub a l’espai d’entrega del Moodle de l’assignatura.
