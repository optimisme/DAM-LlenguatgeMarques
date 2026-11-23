# 03 - Publicar la pàgina web i enviar arxius

Anterior: [02 - Túnel MySQL](./02-tunel-mysql.md) | [Tornar a l'índex](../TeoriaProxmox.md)

Aquests passos es fan **cada cop que voleu actualitzar** el que hi ha al servidor remot. Abans cal haver completat [01 - Preparar el servidor remot](./01-servidor-remot.md).

Totes les comandes s'executen **des de la consola local**, a la carpeta **"proxmox"**.

## Enviar la pàgina web al Proxmox

Aquest script empaqueta la pàgina web, l'envia al Proxmox i hi reinicia el servidor NodeJS:

```bash
./proxmoxDeploy.sh
```

La pàgina queda publicada a (canvieu *usuari* pel vostre usuari):

[https://usuari.ieti.site](https://usuari.ieti.site)

## Comprovar el servidor NodeJS remot

Si la pàgina no respon, connecteu-vos al servidor remot:

```bash
./proxmoxConnect.sh
```

Des de la consola remota, **pm2** permet veure si el servidor funciona i llegir-ne els errors:

```bash
pm2 list
pm2 logs app
```

Per aturar el servidor:

```bash
pm2 delete app
```

## Enviar arxius al Proxmox

L'script **'proxmoxSendFile.sh'** permet enviar arxius al Proxmox:

Exemple:

```bash
./proxmoxSendFile.sh $HOME/Baixades/nomArxiu.txt
```

L'arxiu queda a l'arrel del servidor.

## Problemes habituals

| Què passa | Causa més probable | Solució |
|---|---|---|
| La pàgina no carrega | El servidor NodeJS no està funcionant | Revisar `pm2 list` i `pm2 logs app` al servidor remot |
| La pàgina només carrega afegint *:3000* | Falta la redirecció del port 80 | Executar `./proxmoxSetupRedirect80.sh` |
| Error de connexió amb la base de dades | Falta crear la base de dades o l'usuari al servidor remot | Revisar [01](./01-servidor-remot.md) i clonar la base de dades amb [02](./02-tunel-mysql.md) |
