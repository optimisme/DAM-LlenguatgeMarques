# Dissenys comuns

## Autocenter

Fer un espai central que tingui una amplada màxima i que es centri automàticament.

```css
.autocenter {
  max-width: 800px;
  margin: auto;
  padding: 0 15px;
}
```

A la carpeta "./02-Web/Dissenys/exemple-00", a l'arxiu "index.html" escollir la opció **"Show Preview"** per veure la pàgina web.

## Text emplenat de gradient

Per donar un efecte de text amb gradient de colors, es defineix el background amb un gradient, i es fa servir `background-clip: text` per fer que el fons només afecti al text. Finalment es posa el color del text a transparent.

**Important!** *"-webkit-background-clip"* és necessari per a que funcioni a l'iPhone, en comptes de *"background-clip"*.

```css
.gradient-text {
  background: conic-gradient(#ec8c86,#d78191,#c1759c,#8eabcb,#7cbddb,#91c6a8,#b4d48d,#dfc17e,#ec8c86);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 5em;
  font-weight: bold;
}
```

A la carpeta "./02-Web/Dissenys/exemple-01", a l'arxiu "index.html" escollir la opció **"Show Preview"** per veure la pàgina web.

## Fotografia anys 70

Les fotografies dels anys 70 tenien un estil molt característic, amb els colors saturats, els cantons arrodonits i una ombra que donava profunditat.

```css
.picture70block { 
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
}

.picture70img { 
  border-radius: 16px;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.20) , 0px 2px 17px 0px rgba(0,0,0,0.20);
  box-sizing: border-box;
  filter: saturate(150%);
  width: 100%;
}
```

A la carpeta "./02-Web/Dissenys/exemple-02", a l'arxiu "index.html" escollir la opció **"Show Preview"** per veure la pàgina web.

## Fotografia estil Polaroid

Les fotografies amb Polaroid permeten escriure un text a sota de la imatge.

```css
.polaroidBlock { 
  box-sizing: border-box;
  padding: 32px;
  width: 100%;
}

.polaroidFrame { 
  border-radius: 8px;
  box-shadow: 0px 5px 15px 2px rgba(0,0,0,0.20);
  padding: 16px;
  transform: rotate3d(0, 0, 1, 358deg);
}
```

A la carpeta "./02-Web/Dissenys/exemple-03", a l'arxiu "index.html" escollir la opció **"Show Preview"** per veure la pàgina web.

## Fotografia estil Vintage

Les fotografies amb estil Vintage tenen un efecte de color antic.

```css
.vintageBlock {
  box-sizing: border-box;
  padding: 32px;
  width: 80%;
}

.vintageFrame {
  background: linear-gradient(-15deg, #faf7e3, #d7ca99);
  border-radius: 16px;
  box-shadow: 0px 5px 15px 2px rgba(0,0,0,0.20);
  padding: 16px;
  transform: rotate(-2deg);
  transition: all 0.3s ease-in-out;
}
```

A la carpeta "./02-Web/Dissenys/exemple-04", a l'arxiu "index.html" escollir la opció **"Show Preview"** per veure la pàgina web.