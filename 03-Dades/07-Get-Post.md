# GET

**Serveix per demanar informació**

* Les dades van a la **URL**
* No modifica dades del servidor
* Es pot guardar als **favorits**
* Té límit de mida
* Les dades són **visibles**

📌 Exemple:

```
GET /pelicules?id=5
```

👉 “Vull veure la pel·lícula amb id 5”

Podem demanar diversos valors separant-los amb `&`

```
GET /pelicules?minId=100&maxId=200
```

👉 “Obtenir llista de pelicules amb id entre 100 i 200”

Casos típics:

* Cercar
* Llistar
* Mostrar una fitxa

## Definir crides GET al servidor NodeJS

Al servidor, definim la direcció URL amb un *'app.get'* normalment i obtenim els parametres amb **"req.query.NOMDELPARAMETRE"**.

> **Nota**: Si són paràmetres numèrics els passem a enters amb *"parseInt"* com en aquest exemple:

```javascript
app.get('/curs', async (req, res) => {
  try {
    // Llegit el valor del paràmetre "id" en format enter
    const cursId = parseInt(req.query.id, 10)
    ...
}
```

Amb aquesta capacitat, ja podem fer enllaços a fitxes personalitzades.

```html
<td><a href="/curs?id={{id}}">Veure detalls</a></td>
```

Al codi de **"app.js"**, un cop la crida **"/curs"** té l'identificador el fa servir per agafar el curs de la base de dades:

```javascript
 `WHERE c.id = ${[cursId]}`
```

## Errors de resposta

Fixeu-vos que el servidor **"app.js"** contempla casos d'error, i retorna el significat amb un codi:

```javascript
return res.status(500).send('Error consultant la base de dades');
return res.status(400).send('Paràmetre id invàlid')
return res.status(404).send('Curs no trobat')
```

Aquests números no són aleatòris, estàn definits segons un estàndard:

[Codis d'estat web](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

---

# POST

**Serveix per enviar informació**

* Les dades van al **cos (body)** de la petició
* Pot **crear o modificar** dades
* No és visible a la URL
* No es pot guardar com a favorit
* Admet dades grans (formularis)

📌 Exemple:

```
POST /clients
body: { nom: "Anna", email: "anna@mail.com" }
```

👉 “Vull crear un client nou”

Casos típics:

* Formularis
* Login
* Crear / editar dades

## Definir crides POST al servidor NodeJS

Al servidor, definim la direcció URL amb un *'app.post'*  i obtenim els parametres amb **"req.body.NOMDELPARAMETRE"**.

```javascript
app.post('/afegirCurs', async (req, res) => {
  try {
    const nom = req.body.nom
    const tematica = req.body.tematica
```

Aleshores podem fer queries a la base de dades, amb aquests paràmetres:

**Afegir una fila a una taula**
```javascript
    await db.query(
      `
      INSERT INTO cursos (nom, tematica)
      VALUES ("${nom}", "${tematica}")
      `
    )
```

**Esborrar una fila**
```javascript
    await db.query(
      `DELETE FROM cursos WHERE id = ${id}`
    )
```

> **Important**: Un cop fetes les accions tipus *"POST"* el més habitual és redireccionar a una pàgina automàticament, al servidor com a resposta del *"POST"* diem on volem redireccionar:

```javascript
    res.redirect('/cursos')
```

---