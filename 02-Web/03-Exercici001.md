# Exercici001: 

Pàgina web amb estils CSS bàsics

Imagina que ets un dissenyador web i fas una pàgina web per practicar amb **CSS bàsic**.  

## Pàgina principal: `index.html`

1. **Un títol principal** (`<h1>`) amb el text: *Benvinguts a CSS bàsic*.  
   - Dona-li un identificador `id="titol"`.  
2. Un **paràgraf** amb text qualsevol.  
   - Assigna-li la classe `text-important`.  
3. Un **paràgraf** amb múltiples classes: `gran`, `negreta`, `subratllat`.  
4. Una **llista desordenada** amb tres elements.  
   - El **primer element** s’ha de veure de color vermell.  
   - Els **elements del mig** s’han de veure verds.  
   - L’**últim element** s’ha de veure blau.  
5. Un **enllaç extern** a la Viquipèdia (https://www.wikipedia.org).  
   - Que s’obri en una pestanya nova (`target="_blank"`).  
   - Quan hi passes el ratolí a sobre (`:hover`), el text ha de canviar de color i el cursor a `pointer`.  
6. Un **enllaç intern** a un altre fitxer `contacte.html`.  

---

## Pàgina `contacte.html`

1. **Un títol principal** (`<h1>`) amb el text: *Contacte*.  
2. Un **paràgraf** amb una breu descripció (pots inventar-la).  
3. Una **llista desordenada** amb tres dades inventades sobre tu.  
4. Una **llista ordenada** amb tres objectius d’aprenentatge.  
5. Un **enllaç intern** per tornar a `index.html`.

---

## Arxiu d’estils `estils.css`

1. Defineix un estil **per etiqueta** (`p`) que posi tots els paràgrafs de color verd.  
2. Defineix un estil **per id** (`#titol`) que posi el títol amb mida més gran i subratllat.  
3. Defineix estils **per classes**:  
   - `.text-important` → vermell i negreta.  
   - `.vermell` → vermell.  
   - `.gran` → mida 24px.  
   - `.negreta` → text en negreta.  
   - `.subratllat` → text subratllat.  
4. Defineix un estil amb **pseudoclasse** per a `a:hover` → canvia el color i posa cursor `pointer`.  
5. Defineix un estil amb **pseudoelements** per afegir símbols a tots els paràgrafs:  
   - `::before` → 👉 (blau)  
   - `::after` → ✔ (verd)  

---

### Exemple d’estructura d’arxius

```text
DAM1M04-Exercici000/
├── index.html
├── contacte.html
└── estils.css
```
## Entrega

Entrega l'exercici com un nou repositori a GitHub anomenat DAM1M04-Exercici001, i l'enllaç del repositori GitHub anterior a l'espai d'entrega del Moodle de l'assignatura