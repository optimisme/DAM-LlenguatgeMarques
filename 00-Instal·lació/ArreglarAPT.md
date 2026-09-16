# Arreglar APT Ubuntu

Si per algún motiu el sistema de paquets `apt` d'Ubuntu es trenca, executar:

```bash
sudo rm -f /var/lib/dpkg/lock
sudo rm -f /var/lib/dpkg/lock-frontend
sudo rm -f /var/cache/apt/archives/lock
sudo dpkg --configure -a
sudo apt --fix-broken install
sudo apt clean
sudo apt update
sudo apt install --reinstall apt dpkg debconf
sudo dpkg --configure -a
sudo apt --fix-broken install
```