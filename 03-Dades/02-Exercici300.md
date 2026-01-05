# Exercici300: 

Validació d'arxius **.json**

Genera els arxius "-schema.json"* dels exercicis que hi ha a la carpeta **"02-Exercici300"** per tal que passin les validacions amb **"validate.sh"**. És a dir, has de generar els arxius:

```bash
clients-schema.json
flora-schema.json
movies-schema.json
olympics-schema.json
opera-schema.json
sabana-schema.json
solar-schema.json
traditions-schema.json
```
 
Assegura't que passen la validació:

```bash
./validate.sh clients-schema.json clients.json
./validate.sh flora-schema.json flora.json
./validate.sh movies-schema.json movies.json
./validate.sh olympics-schema.json olympics.json
./validate.sh opera-schema.json opera.json
./validate.sh sabana-schema.json sabana.json
./validate.sh solar-schema.json solar.json
./validate.sh traditions-schema.json traditions.json
```

## Entrega

Entrega l'exercici com un nou repositori a GitHub anomenat `DAM1M04-Exercici300`, i l'enllaç del repositori GitHub anterior a l'espai d'entrega del Moodle de l'assignatura