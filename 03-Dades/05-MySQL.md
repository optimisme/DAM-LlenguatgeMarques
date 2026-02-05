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

s