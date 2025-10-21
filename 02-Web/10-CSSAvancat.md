# CSS Avançat

## Colors i unitats

En CSS podem definir colors de diverses maneres. Cada format té avantatges segons el context (compatibilitat, llegibilitat o control de transparència).

| Format           | Exemple                    | Descripció                                                                          |
| :--------------- | :------------------------- | :---------------------------------------------------------------------------------- |
| **Nom de color** | `red`, `blue`, `lightgray` | Útil per proves o colors simples.                                                   |
| **Hexadecimal**  | `#ff0000` → vermell        | Cada parella representa **vermell**, **verd** i **blau** en hexadecimal (`00–ff`).  |
| **RGB**          | `rgb(255, 0, 0)`           | Mateix significat que `#ff0000`, però en decimal (`0–255`).                         |
| **RGBA**         | `rgba(255, 0, 0, 0.5)`     | Afegeix el canal **alfa (transparència)** (`0 = transparent`, `1 = opac`).          |
| **HSL**          | `hsl(0, 100%, 50%)`        | Defineix el color per **to (hue)**, **saturació** i **lluminositat**. Més intuïtiu. |
| **HSLA**         | `hsla(0, 100%, 50%, 0.5)`  | Igual que HSL, però amb **transparència**.                                          |

### Colors per components

| Component        | Significat                 | Rang      | Exemple                                         |
| :--------------- | :------------------------- | :-------- | :---------------------------------------------- |
| **Hue (to)**     | Posició al cercle cromàtic | `0–360°`  | `0=vermell`, `120=verd`, `240=blau`             |
| **Saturació**    | Intensitat del color       | `0%–100%` | `0%` = grisos, `100%` = colors vius             |
| **Lluminositat** | Quantitat de llum          | `0%–100%` | `0%` = negre, `50%` = color pur, `100%` = blanc |
| **Alfa (α)**     | Transparència              | `0–1`     | `0.3` = 30% opacitat                            |

Un mateix color es pot expressar de diferents maneres:

| Format                             | Exemple                          |
| :--------------- | :--------------- |
| **Nom de color**                             | `color: blue;`                          |
| **Hexadecimal curt (3 dígits)**              | `color: #00f;`                          |
| **Hexadecimal complet (6 dígits)**           | `color: #0000ff;`                       |
| **Hexadecimal amb transparència (8 dígits)** | `color: #0000ff80;`                     |
| **RGB**                                      | `color: rgb(0, 0, 255);`                |
| **RGBA** (alpha = transparència)             | `color: rgba(0, 0, 255, 0.5);`          |
| **RGB amb percentatges**                     | `color: rgb(0%, 0%, 100%);`             |
| **HSL**                                      | `color: hsl(240, 100%, 50%);`           |
| **HSLA** (alpha = transparència)             | `color: hsla(240, 100%, 50%, 0.5);`     |
<br/>

Aquestes eines ajuden a escollir els colors:

- [HSL](https://www.hslpicker.com/#c0ff33)
- [W3Schools colos](https://www.w3schools.com/colors/colors_hsl.asp)

## Tipografia

La tipografia és una part essencial del disseny web. 

Permet millorar la llegibilitat i la personalitat visual d’una pàgina.

| Propietat        | Exemple                                    | Descripció                                                              |
| :--------------- | :----------------------------------------- | :---------------------------------------------------------------------- |
| `font-family`    | `font-family: Arial, sans-serif;`          | Defineix la família o tipus de lletra. Pots llistar fonts alternatives. |
| `font-size`      | `font-size: 1.2rem;`                       | Mida del text (millor amb unitats relatives com `rem`).                 |
| `font-weight`    | `font-weight: bold;` o `font-weight: 300;` | Gruix de la lletra.                                                     |
| `font-style`     | `font-style: italic;`                      | Cursiva o normal.                                                       |
| `line-height`    | `line-height: 1.5;`                        | Alçada de línia, per facilitar la lectura.                              |
| `letter-spacing` | `letter-spacing: 0.05em;`                  | Espaiat entre caràcters.                                                |
| `text-transform` | `text-transform: uppercase;`               | Majúscules / minúscules automàtiques.                                   |
| `text-align`     | `text-align: center;`                      | Alineació del text.                                                     |

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #222;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}

p {
  margin-bottom: 1.2em;
}
```

Al parlar de tipografies cal tenir en compte les parts de les fonts:

<center>
<img src="./assets/cssadv-fontanatomy.png" style="width: 90%; max-width: 800px">
</center>

I que els objectes han de quedar alineats per la 'baseline':

<center>
<img src="./assets/cssadv-fontbaseline.png" style="width: 90%; max-width: 400px">
</center>

### Fonts externes

A més de les fonts instal·lades al dispositiu, podem importar tipografies des de serveis com **"Google Fonts"** o **"Adobe Fonts"**

// TODO

# Columnes

// TODO

# Carousel CSS

// TODO