# Stash

**"git stash"** s'utilitza per emmagatzemar temporalment els canvis no confirmats al teu repositori de Git sense haver de fer un commit. 

Això és útil si vols canviar de branca o actualitzar el codi sense perdre els canvis locals.

Les comandes principals són:

- **git stash**: Emmagatzema els canvis no confirmats (tant els fitxers seguits com els nous).
- **git stash list**: Mostra la llista dels estats desats.
- **git stash apply**: Recupera els canvis emmagatzemats en l'última posició sense eliminar-los de l'stash.
- **git stash pop**: Recupera els canvis emmagatzemats en l'última posició i els elimina de l'stash.
- **git stash drop**: Elimina una entrada específica de l'stash.
- **git stash clear**: Elimina totes les entrades de l'stash.

## Treball local i remot (opció Stash)

Quan es vol descarregar canvis remots, sense perdre el treball local amb **stash** es poden fer aquests passos:

- *git stash*: Desa tots els canvis locals sense confirmar (inclosos els fitxers nous).
- *git pull origin main*: Integra els teus canvis més recents del repositori remot.
- *git stash pop*: Recupera stash, si hi ha conflictes cal que es resolguin.

```bash
git stash
git pull origin main
git stash pop
git add Java-R/Teoria/src/main/java/com/exercici*
git commit -m "Mantenir exercicis locals"
```