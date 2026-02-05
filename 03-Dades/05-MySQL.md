# MySQL

## MySQL al Docker

Per arrencar un contenedor 'Docker MySQL':

```bash
docker run --name mysql-escola \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=escola \
  -p 3306:3306 \
  -v "$PWD":/sql \
  -d mysql:8
```

Importar la base de dades 'escola.sql' al contenedor:

```bash
cd 03-Dades/05-MySQL/assets/
docker exec -i mysql-escola mysql -uroot -proot --default-character-set=utf8mb4 < escola.sql
```

Entrar al 'MySQL' del contenedor:

```bash
docker exec -it mysql-escola mysql -uroot -proot --default-character-set=utf8mb4 escola
USE escola;
SHOW TABLES;
SELECT * FROM cursos;
quit;
```

## MySQL a Ubuntu

Per importar la base de dades 'escola.sql' al MySQL d'Ubuntu:

```bash
cd 03-Dades/05-MySQL/assets/
mysql -uroot -p -e "CREATE DATABASE IF NOT EXISTS escola CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Entrar al MySQL d'Ubuntu:

```bash
mysql -uroot -p --default-character-set=utf8mb4 escola
USE escola;
SHOW TABLES;
SELECT * FROM cursos;
quit;
```

## MySQL al Proxmox

Segueix les instruccions per instal·lar el servidor de 'MySQL' al *Proxmox* que hi ha a:

```text
Servidor/nodejs_server/proxmox/TeoriaProxmox.md
```

Un cop tinguis el servidor 'MySQL' funcionant al proxmox, assegura't d'obrir el *Túnel* des del teu ordinador:

```
cd 03-Dades/05-MySQL/proxmox/
./proxmoxTunelStart.sh
```

Crea i envia la base de dades al servidor 'MySQL' remot que hi ha al *Proxmox*:

```bash
mysql -h 127.0.0.1 -P 3307 -u super -p -e "CREATE DATABASE IF NOT EXISTS escola;"
# Codi 1234 amb usuari 'super' segons el tutorial 'TeoriaProxmox'

mysql -h 127.0.0.1 -P 3307 -u super -p escola < ../assets/escola.sql
# Codi 1234 amb usuari 'super' segons el tutorial 'TeoriaProxmox'
```

Comprova que s'han enviat bé les dades:

```bash
mysql -h 127.0.0.1 -P 3307 -u super -p escola
SELECT * FROM cursos;
quit;
```

Envia el codi al proxmox:

```bash
./proxmoxDeploy.sh
```

Navega a la pàgina remota:

```text
https://nomUsuari.ieti.site/cursos
```

Recorda que per al que la pàgina funcioni al *Proxmox*:

- Has d'haver configurat l'arxiu 'config.env' amb el teu nom d'usuari i clau privada
- Has d'haver redireccionat el port 80 cap al 3000 amb './proxmoxSetupRedirect80.sh'