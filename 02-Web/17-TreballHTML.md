# Treball HTML + CSS: Web d'un artista o grup musical

## Descripció del projecte

L'objectiu d'aquest treball és desenvolupar una pàgina web professional per promocionar un cantant o grup de música, real o inventat.

La web ha de presentar l'artista, la seva música, la trajectòria, els concerts i les diferents maneres de contactar-hi.

El projecte ha de demostrar els coneixements adquirits d'HTML5, CSS, Flexbox, disseny responsiu, animacions i interactivitat sense JavaScript.

Es valorarà especialment la qualitat estètica, la coherència visual, les animacions i l'experiència d'usuari.

## Organització

- El treball es farà en grups de dues persones, diferents dels grups de Strata.
- Cada equip ha d'escollir un cantant o grup musical que no hagi triat cap altre grup de DAM, DAW o MIX.
- El desenvolupament s'organitzarà en tasques mitjançant GitHub Issues.
- Cada alumne treballarà en la seva pròpia branca i els canvis s'integraran a `main` mitjançant Pull Requests.
- El projecte s'haurà de publicar en un servidor Proxmox.

---

# Tasques del projecte

## Tasca 1. Preparar GitHub

**Requeriments:**

- Crear un repositori anomenat `DAM1M04-TreballHTML`.
- Crear la branca principal `main`.
- Crear una branca secundària per a cada alumne del grup.
- Afegir els dos alumnes com a col·laboradors.
- Crear un fitxer `README.md` amb el nom de l'artista, la descripció i els integrants.
- Crear les tasques del projecte com a GitHub Issues.
- Integrar els canvis a `main` mitjançant Pull Requests.

## Tasca 2. Preparar l'estructura del projecte

**Requeriments:**

- Crear les cinc pàgines HTML: `index.html`, `musica.html`, `historia.html`, `concerts.html` i `contacte.html`.
- Crear les carpetes necessàries per organitzar CSS, imatges i altres recursos.
- Utilitzar rutes relatives per als recursos locals.
- Separar completament el codi HTML del CSS.
- Organitzar els CSS amb criteris de reutilització.
- NO es pot fer servir Grid.
- NO es pot fer servir l'atribut "style"

## Tasca 3. Dissenyar la identitat visual

**Requeriments:**

- Definir una paleta de colors relacionada amb l'estil musical de l'artista.
- Utilitzar almenys una tipografia de Google Fonts.
- Crear una identitat visual pròpia amb logotip, colors i estils coherents.
- Dissenyar botons, targetes i altres components reutilitzables.
- Mantenir la mateixa estètica a totes les pàgines.

## Tasca 4. Crear el Header i el menú de navegació

**Requeriments:**

- Mostrar el nom de l'artista o grup i el seu logotip.
- Crear un menú amb enllaços a les cinc pàgines.
- Destacar visualment la pàgina activa.
- Adaptar el menú a dispositius mòbils.
- Implementar un menú desplegable per a mòbils sense JavaScript, utilitzant `checkbox` i `:checked`.
- Animar l'obertura i el tancament del menú amb transicions CSS.

## Tasca 5. Crear el Footer

**Requeriments:**

- Mostrar un text de copyright alineat a la dreta.
- Afegir enllaços a Instagram, TikTok, YouTube i Spotify.
- Utilitzar icones vectorials o una biblioteca d'icones.
- Aplicar efectes `:hover` als enllaços de les xarxes socials.
- Utilitzar el mateix disseny de Footer a totes les pàgines.

## Tasca 6. Pàgina principal — `index.html`

**Requeriments:**

- Crear un Hero amb una fotografia de l'artista, un eslògan i un botó destacat.
- Mostrar una secció promocional del darrer àlbum o senzill.
- Crear una secció amb les principals novetats de l'artista.
- Incorporar una animació associada al desplaçament vertical de la pàgina (*scroll-driven animation*).
- Incorporar una animació vectorial SVG o Lottie.
- Afegir un botó o interruptor que permeti activar i desactivar una animació del Hero sense JavaScript.

## Tasca 7. Pàgina de música — `musica.html`

**Requeriments:**

- Mostrar una discografia amb almenys quatre àlbums o senzills.
- Presentar les portades en una distribució CSS flexbox.
- Incloure el títol, l'any de publicació i una breu descripció de cada àlbum.
- Incorporar almenys un reproductor de Spotify, YouTube o un element HTML5 `audio`.
- Crear targetes amb efectes animats en passar el ratolí per sobre (`:hover`).
- Implementar un sistema de pestanyes per alternar entre àlbums i senzills utilitzant `radio` i `:checked`, sense JavaScript.

## Tasca 8. Pàgina d'història — `historia.html`

**Requeriments:**

- Explicar l'origen i la trajectòria de l'artista.
- Crear una línia temporal amb els principals esdeveniments de la seva carrera.
- Afegir fotografies, il·lustracions o imatges relacionades amb cada etapa.
- Implementar un carrusel d'imatges interactiu sense JavaScript.
- Aplicar animacions CSS a les imatges o als elements de la línia temporal.
- Incorporar transicions suaus entre els diferents elements del carrusel.

## Tasca 9. Pàgina de concerts — `concerts.html`

**Requeriments:**

- Mostrar una llista de concerts amb data, ciutat, recinte i disponibilitat d'entrades.
- Presentar els concerts amb targetes o una distribució adaptativa.
- Incloure almenys sis concerts, reals o ficticis.
- Destacar visualment els concerts esgotats.
- Afegir botons per consultar o comprar entrades, que poden ser enllaços ficticis.
- Implementar filtres interactius per mostrar tots els concerts, els pròxims concerts o els concerts esgotats, sense JavaScript.
- Animar els canvis d'estat dels controls amb CSS.

## Tasca 10. Pàgina de contacte — `contacte.html`

**Requeriments:**

- Mostrar una adreça de contacte, real o fictícia.
- Incorporar un mapa de Google Maps.
- Mostrar un telèfon amb un enllaç `tel:`.
- Mostrar una adreça electrònica amb un enllaç `mailto:`.
- Crear un formulari amb els camps: nom, telèfon, correu electrònic, motiu de contacte i missatge.
- Validar els camps mitjançant HTML5 i expressions regulars amb `pattern` quan correspongui.
- Canviar automàticament l'aspecte dels camps segons si són vàlids o invàlids, amb `:valid` i `:invalid`.
- Incorporar animacions o transicions als camps quan rebin el focus (`:focus`).
- No és necessari que el formulari enviï les dades a un servidor.

## Tasca 11. Interactivitat i control d'animacions

**Requeriments:**

- Incorporar almenys tres animacions CSS amb `@keyframes` en diferents elements de la web.
- Implementar transicions amb `transition`.
- Utilitzar transformacions CSS com `scale`, `translate` o `rotate`.
- Crear almenys dos controls que permetin activar i desactivar efectes visuals mitjançant `checkbox`, `radio` i `:checked`.
- Implementar almenys una interacció amb `:hover` i una altra amb `:focus`.
- Utilitzar `animation-play-state` per pausar i reprendre alguna animació.
- Respectar la preferència `prefers-reduced-motion` per reduir les animacions quan l'usuari ho sol·liciti.

Tota la interactivitat d'aquesta tasca s'ha de desenvolupar sense JavaScript.

## Tasca 12. Adaptar la web a mòbils

**Requeriments:**

- Utilitzar Flexbox per distribuir els continguts.
- Adaptar les cinc pàgines a pantalles de mòbil i ordinador.
- Utilitzar Media Queries per modificar la distribució segons l'amplada.
- Evitar el desplaçament horitzontal no desitjat.
- Comprovar que els menús, carrusels, formularis i altres elements interactius funcionen en pantalles tàctils.
- Garantir una mida adequada dels botons i una bona llegibilitat dels textos.

## Tasca 13. Revisar i millorar el projecte

**Requeriments:**

- Comprovar que tots els enllaços funcionen correctament.
- Revisar el codi HTML i CSS.
- Eliminar codi innecessari o duplicat.
- Comprovar que les imatges tenen text alternatiu (`alt`).
- Verificar que els controls interactius es poden utilitzar amb el teclat.
- Comprovar que totes les pàgines mantenen una estètica coherent.
- Provar la web en almenys dos navegadors diferents.

## Tasca 14. Publicar la web a Proxmox

**Requeriments:**

- Publicar la web en un servidor del Proxmox.
- Comprovar que les cinc pàgines són accessibles.
- Verificar que es carreguen correctament els CSS, les imatges i els altres recursos.
- Actualitzar el `README.md` amb les instruccions del projecte i l'URL de la web publicada.

## Tasca 15. Lliurar el projecte

**Requeriments:**

- Tenir tots els canvis integrats a la branca `main`.
- Tenir totes les tasques de GitHub Issues completades i tancades.
- Tenir la web publicada i accessible al servidor Proxmox.
- Lliurar al Moodle l'enllaç del repositori de GitHub.
- Lliurar al Moodle l'enllaç de la web publicada.
- Identificar els dos integrants de l'equip.

---

# Especificacions generals

Aquestes condicions són obligatòries per a tot el projecte:

- No es pot fer servir Grid.
- No es pot fer servir l'atribut "style"
- No es pot utilitzar JavaScript per implementar la interactivitat.
- No es pot incloure CSS incrustat als documents HTML.
- Tots els fitxers CSS han d'estar organitzats amb criteris de reutilització.
- El disseny ha de ser original, coherent i professional.
- Les cinc pàgines han de funcionar correctament en mòbils i ordinadors.
- Les animacions han de tenir una funció visual o interactiva, no només decorativa.
- Es poden utilitzar eines d'IA per generar fotografies fictícies, il·lustracions, fons i altres recursos gràfics.
- Es poden utilitzar biblioteques de CSS, però no poden substituir la implementació pròpia dels requisits d'interactivitat.

**El resultat final ha de tenir l'aparença d'una web musical professional.** No es tracta únicament de completar els requisits, sinó d'aconseguir una experiència visual atractiva, coherent i ben acabada.

## Entrega

Entregueu l'exercici com un nou repositori a GitHub anomenat **DAM1M04-ExerciciHTML**, d'un dels dos alumnes.

Al repositori del GitHub hi ha d'haver aportacions dels dos alumnes, és a dir que qui tingui el repositori l'ha de compartir amb el seu company.

Copia l'enllaç del repositori a l'espai d'entrega del Moodle de l'assignatura.

La visualització pràctica s'ha de fer a través del Proxmox de l'institut, igualment s'ha de penjar la web al proxmos d'un dels dos alumnes del grup.

Per tant:

- Entrega la URL del GitHub i la URL del Proxmox al Moodle
- Aportacions dels dos alumnes al GitHub del l'exercici
- Visualizació de la web al Proxmox de l'institut
- Cada alumne del grup ha d'entregar les mateixes dues URLs al seu Moodle personal