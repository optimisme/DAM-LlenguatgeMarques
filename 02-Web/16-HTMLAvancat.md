
# HTML Avançat

## Enllaços especials per correu i telèfon en HTML

HTML permet crear enllaços que obren directament el client de correu o l’aplicació de trucades del dispositiu. Només cal utilitzar protocols especials dins de l’atribut href.

###  ✉️ Enllaços de correu electrònic (mailto:)

```html
<a href="mailto:exemple@correu.com">Envia'm un correu</a>
```

Pots afegir assumpte, cos del missatge, etc.:
```html
<a href="mailto:exemple@correu.com?subject=Consulta&body=Hola!">
  Tinc un dubte sobre els preus!
</a>
```

###  📞 Enllaços de telèfon (tel:)

```html
<a href="tel:+34900123456">Truca'ns</a>
```

> Important:
> 
> Els enllaços mailto: i tel: funcionen especialment bé en mòbils.
> En ordinadors depenen de si hi ha configurat un programa de correu o telefonia.

## Elements multimèdia

HTML5 incorpora dos elements multimèdia molt importants: <audio> per reproduir so i <video> per reproduir vídeo.

### 🎧 `<audio>` — Reproduir sò

```html
<audio src="so.mp3" controls></audio>
```

O bé, si hi ha el mateix audio en diferents formats:

```html
<audio controls>
  <source src="so.mp3" type="audio/mpeg">
  <source src="so.ogg" type="audio/ogg">
  El teu navegador no suporta l'element audio.
</audio>
```

**Atributs principals**

- **controls**: mostra els controls (play, pausa, volum).
- **autoplay**: comença sol (alguns navegadors ho bloquegen).
- **loop**: es repeteix automàticament.
- **muted**: comença silenciat.

### 🎬 `<video>` — Reproduir vídeo

```html
<video src="video.mp4" controls width="600"></video>
```

O bé, si hi ha el mateix vídeo en diferents formats:

```html
<video controls width="640" poster="miniatura.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  El teu navegador no suporta l'element video.
</video>
```

**Atributs principals**

- **controls**: mostra controls de reproducció.
- **poster="imatge.jpg"**: imatge que es veu abans de donar a play.
- **autoplay**: comença sol.
- **loop**: es repeteix.
- **muted**: necessari sovint per poder usar autoplay.
- **width / height**: dimensions del vídeo.

## 🖼️ `<iframe>` — Inserir contingut extern en una pàgina

L’element `<iframe>` permet incrustar una altra pàgina web (o contingut extern) dins del teu HTML. Funciona com una *"finestra"* que mostra un altre document.

Normalment es fa servir per incrustar elements externs com vídeos de *YouTube* o *Google Maps*

## Animacions SVG

SVG (Scalable Vector Graphics) és un format d’imatge vectorial basat en codi XML.

A diferència d’una imatge JPG o PNG, un SVG es pot fer gran o petit sense perdre qualitat, perquè està fet amb línies i figures matemàtiques, no amb píxels.

És ideal per:

- icones
- logos
- formes geomètriques
- animacions simples
- gràfics que han de ser súper nítids en qualsevol mida

Es pot escriure codi SVG directament dins l'HTML, d'aquesta manera se li pot definir l'estil i posar-hi animacions i transicions.

```svg
<svg width="400" height="300">
  <circle cx="60" cy="60" r="40" stroke="blue" fill="lightblue" />
</svg>
```

Els atributs CSS són propis dels elements SVG i per tant diferents dels atributs HTML:

```css
circle {
  fill: lightblue;
  stroke: blue;
  stroke-width: 2;    
}
```

> **Nota:** Els SVG es poden carregar d'arxius *.svg* com una imatge amb un element `<img>` però aleshores no són interactius ni animats.

### 🔗 Referència per aprendre SVG

[W3Schools – SVG Tutorial](https://www.w3schools.com/graphics/svg_intro.asp)

### Lottie Animation

Aprofitant que els formats SVG i CSS són "complicats" de programar, hi ha eines que permeten fer animacions pel web i exportar-les a formats propietaris com **"Lottie"**


Una "Lottie Animations" és una animació vectorial de format JSON lleuger, escalable (que no perd definició al fer-lo gran) i molt fàcil d’integrar a pàgines web i apps.

[Animacions Lottie gratis](https://lottiefiles.com/featured-free-animations)

[Editor Lottie files](https://creator.lottiefiles.com)
