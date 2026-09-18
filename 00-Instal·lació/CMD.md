# Comandes bàsiques del terminal de Linux

## 1. Orientar-se

* `pwd` — Mostra la ruta completa del directori on ens trobem actualment.

```bash
# Mostra el directori actual
pwd
```

* `ls` — Mostra els fitxers i directoris d'una carpeta.

```bash
# Mostra els fitxers i directoris de la carpeta actual
ls

# Mostra el contingut de la carpeta Documents
ls Documents
```

* `ls -la` — Mostra tots els fitxers, inclosos els ocults, amb informació detallada.

```bash
# Mostra tots els fitxers amb informació detallada
ls -la
```

* `cd` — Canvia el directori actual.

```bash
# Entra a la carpeta Documents
cd Documents

# Puja al directori pare
cd ..

# Va al directori personal de l'usuari
cd ~
```

* `clear` — Neteja el contingut visible de la terminal.

```bash
# Neteja la pantalla del terminal
clear
```

* `history` — Mostra les comandes executades anteriorment.

```bash
# Mostra l'historial de comandes
history

# Mostra les últimes línies de l'historial
history | tail
```

## 2. Treballar amb fitxers

* `mkdir` — Crea un directori nou.

```bash
# Crea una carpeta anomenada projecte
mkdir projecte

# Crea dues carpetes: src i tests
mkdir src tests
```

* `touch` — Crea un fitxer buit o actualitza la seva data de modificació.

```bash
# Crea un fitxer buit anomenat main.py
touch main.py

# Crea un fitxer buit anomenat README.md
touch README.md
```

* `cp` — Copia fitxers o directoris.

```bash
# Copia main.py a un nou fitxer anomenat copia.py
cp main.py copia.py

# Copia la carpeta src i tot el seu contingut a backup
cp -r src backup
```

* `mv` — Mou un fitxer o directori; també serveix per canviar-ne el nom.

```bash
# Canvia el nom de main.py a app.py
mv main.py app.py

# Mou app.py dins de la carpeta src
mv app.py src/
```

* `rm` — Esborra un fitxer.

```bash
# Esborra el fitxer prova.txt
rm prova.txt
```

* `rm -r` — Esborra un directori i tot el seu contingut.

```bash
# Esborra la carpeta carpeta i tot el seu contingut
rm -r carpeta
```

* `cat` — Mostra el contingut d'un fitxer directament a la terminal.

```bash
# Mostra el contingut de README.md
cat README.md

# Mostra el contingut de main.py
cat main.py
```

* `less` — Permet consultar còmodament un fitxer llarg, desplaçant-nos pel contingut.

```bash
# Obre app.log per consultar-lo còmodament
less app.log

# Obre README.md amb el visor less
less README.md
```

* `head` — Mostra les primeres línies d'un fitxer.

```bash
# Mostra les primeres 10 línies d'app.log
head app.log

# Mostra les primeres 20 línies d'app.log
head -n 20 app.log
```

* `tail` — Mostra les últimes línies d'un fitxer.

```bash
# Mostra les últimes 10 línies d'app.log
tail app.log

# Mostra les últimes 20 línies d'app.log
tail -n 20 app.log

# Mostra les noves línies d'app.log a mesura que s'afegeixen
tail -f app.log
```

## 3. Buscar fitxers i contingut

* `find` — Busca fitxers i directoris a partir d'una carpeta.

```bash
# Busca tots els fitxers amb extensió .py a partir del directori actual
find . -name "*.py"

# Busca tots els fitxers a partir del directori actual
find . -type f

# Busca fitxers JavaScript dins de src i les seves subcarpetes
find src -name "*.js"
```

* `grep` — Busca text dins d'un fitxer.

```bash
# Busca la paraula TODO dins de main.py
grep "TODO" main.py

# Busca la paraula error dins d'app.log
grep "error" app.log
```

* `grep -R` — Busca text recursivament dins dels fitxers d'un directori i les seves subcarpetes.

```bash
# Busca la paraula TODO dins dels fitxers de la carpeta actual i les seves subcarpetes
grep -R "TODO" .

# Busca TODO dins de src i les seves subcarpetes i mostra el número de línia
grep -Rn "TODO" src
```

* Combinar `find` amb `grep`.

```bash
# Busca fitxers o carpetes que continguin "deures" al nom
find . | grep "deures"

# Busca la paraula "deures" dins de tots els fitxers trobats
find . -type f -exec grep "deures" {} +
```

* `which` — Mostra quin executable s'executarà quan escrivim una determinada comanda.

```bash
# Mostra quin executable de Python s'utilitzarà
which python

# Mostra on es troba l'executable de Git
which git
```

* `whereis` — Busca l'executable, documentació i altres fitxers relacionats amb un programa.

```bash
# Busca fitxers relacionats amb Python
whereis python

# Busca fitxers relacionats amb Git
whereis git
```

## 4. Combinació de comandes

* `|` — Envia la sortida d'una comanda com a entrada d'una altra.

```bash
# Mostra només les línies de ls que contenen ".py"
ls | grep ".py"

# Compta quants fitxers .py hi ha a partir del directori actual
find . -name "*.py" | wc -l
```

* `>` — Guarda la sortida d'una comanda en un fitxer, substituint-ne el contingut anterior.

```bash
# Guarda el resultat de ls dins de fitxers.txt
ls > fitxers.txt

# Escriu "Hola" dins de prova.txt, substituint el contingut anterior
echo "Hola" > prova.txt
```

* `>>` — Afegeix la sortida al final d'un fitxer sense esborrar el contingut anterior.

```bash
# Afegeix una nova línia al final de prova.txt
echo "Nova línia" >> prova.txt

# Afegeix la data i hora actuals al final de registre.log
date >> registre.log
```

* `2>` — Redirigeix els missatges d'error a un fitxer.

```bash
# Busca fitxers .py a tot el sistema i guarda els errors a errors.txt
find / -name "*.py" 2> errors.txt
```

* `xargs` — Converteix les dades rebudes per entrada en arguments per executar una altra comanda.

```bash
# Busca fitxers .tmp i els passa a rm perquè els esborri
find . -name "*.tmp" | xargs rm
```

Una forma més segura si els noms poden contenir espais:

```bash
# Busca fitxers .tmp i els esborra gestionant correctament espais als noms
find . -name "*.tmp" -print0 | xargs -0 rm
```

## 5. Utilitats especialment útils programant

* `wc` — Compta línies, paraules o caràcters.

```bash
# Mostra el nombre de línies, paraules i bytes de README.md
wc README.md

# Compta només les línies de main.py
wc -l main.py

# Compta quants fitxers Python hi ha
find . -name "*.py" | wc -l
```

* `sort` — Ordena les línies d'un text.

```bash
# Ordena alfabèticament les línies de noms.txt
sort noms.txt

# Ordena numèricament les línies de numeros.txt
sort -n numeros.txt
```

* `uniq` — Elimina línies repetides consecutives, habitualment després de `sort`.

```bash
# Ordena els noms i elimina els duplicats
sort noms.txt | uniq

# Ordena els noms i mostra quantes vegades apareix cadascun
sort noms.txt | uniq -c
```

* `diff` — Mostra les diferències entre dos fitxers.

```bash
# Mostra les diferències entre dues versions d'un fitxer
diff versio1.py versio2.py

# Mostra les diferències en format unificat
diff -u versio1.py versio2.py
```

* `file` — Indica quin tipus de fitxer és un determinat arxiu.

```bash
# Mostra el tipus de fitxer d'imatge.png
file imatge.png

# Determina quin tipus de fitxer és programa
file programa
```

* `du` — Mostra l'espai de disc ocupat per fitxers i directoris.

```bash
# Mostra l'espai ocupat pel directori actual en format llegible
du -sh .

# Mostra l'espai ocupat per cada element de la carpeta actual
du -sh *
```

* `df` — Mostra l'espai lliure i ocupat dels sistemes de fitxers.

```bash
# Mostra l'espai disponible als sistemes de fitxers
df

# Mostra l'espai disponible en un format fàcil de llegir
df -h
```

* `ps` — Mostra els processos que s'estan executant.

```bash
# Mostra els processos associats al terminal actual
ps

# Mostra tots els processos del sistema
ps aux

# Mostra els processos que contenen la paraula python
ps aux | grep python
```

* `kill` — Envia un senyal a un procés, habitualment per finalitzar-lo.

```bash
# Demana al procés 1234 que finalitzi
kill 1234

# Força la finalització immediata del procés 1234
kill -9 1234
```

* `curl` — Permet fer peticions HTTP des de la terminal i descarregar contingut.

```bash
# Fa una petició HTTP i mostra la resposta
curl https://example.com

# Mostra només les capçaleres HTTP de la resposta
curl -I https://example.com

# Descarrega un fitxer mantenint el seu nom original
curl -O https://example.com/file.zip
```
