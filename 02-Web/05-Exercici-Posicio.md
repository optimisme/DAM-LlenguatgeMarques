# Exercici002: 

Construir una mini-web d’empresa amb 3 pàgines HTML i un full d’estil comú, aplicant tècniques de max-width + auto-center, Flex i Grid.

La temàtica pot ser: “un gimnàs”, “una botiga de roba”, “una acadèmia”, etc.

## Estructura del projecte
```text
exercici-002/
├── index.html
├── productes.html
├── contacte.html
└── global.css
```

- global.css → conté els estils comuns (tipografia, colors corporatius, menú i peu).
- Cada HTML pot tenir un `<style>` propi amb els estils particulars d’aquella pàgina.

## Elements comuns a totes les pàgines

**Menú fixed:**

- Barra horitzontal a la part superior, amb position: fixed; top: 0; width: 100%;.
- Inclou els enllaços principals (Inici, Productes, Contacte).
- S’ha de veure sempre encara que es faci scroll.
- El contingut principal de cada pàgina ha de començar més avall del menú (p. ex. margin-top: 70px;).

**Peu mínim:**

- Fent servir l'element **&lt;**footer**&gt;**
- Bloc senzill al final de la pàgina
- Pot contenir drets d’autor, correu de contacte o icones socials.
- S’ha de repetir igual a totes les pàgines.

## index.html

Pàgina principal amb la funció de presentar l'empresa i captar l'atenció.

**Requisits de maquetació**

- Contenidor centrat: max-width: 1100px; margin: auto;.
- Hero destacat inicial amb títol, subtítol i botó cridaner (fes servir l'element **&lt;**button**&gt;**).
- Secció de col·leccions: 3 blocs informatius (cartes amb títol, paràgraf i etiquetes curtes en span).
- Banda de beneficis: horitzontal amb Flex (p. ex.: 
- Enviament 48h · Canvis gratuïts · Pagament segur).

## productes.html

Pàgina que mostra els productes o serveis.

**Requisits de maquetació**

- Barra de filtres a la part superior (elements en línia com span o a).
- Grid de targetes amb Flex:
    * display: flex; flex-wrap: wrap; gap: …;
    * Cada targeta: caixa amb imatge fictícia, nom i preu.
    * Amplada flexible: flex: 1 1 260px; perquè saltin de línia quan no hi ha espai.

## contacte.html

Pàgina que facilita la comunicació amb l’empresa.

**Requisits de maquetació**

- Contenidor centrat: max-width + auto.
- Layout amb Grid de 2 columnes:
    * Columna A: formulari senzill (nom, email, missatge).
    * Columna B: informació de contacte (adreça, horari, telèfon) + mapa fictici (caixa grisa o iframe de Google Maps).

