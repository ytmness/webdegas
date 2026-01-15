# 📋 GUÍA COMPLETA: Desplegar webdegas en Ubuntu Server

## 🖥️ Información del Servidor Ubuntu

### Información de Conexión:
- **Ubicación:** Dallas
- **IP Address (IPv4):** `216.128.139.41`
- **IPv6 Address:** `2001:19f0:6401:0429:5400:05ff:fedc:bbc6`
- **Usuario:** `root`
- **Contraseña:** `6.QyP4EQ2fbYHU@h`
- **Dominio:** `consultinglaw.net` (a configurar en DNS)

---

## 📝 Tabla de Contenidos

1. [Conexión Inicial al Servidor](#1-conexión-inicial-al-servidor)
2. [Instalar Software Necesario](#2-instalar-software-necesario)
3. [Configurar Nginx para Múltiples Sitios](#3-configurar-nginx-para-múltiples-sitios)
4. [Configurar PHP y PHP-FPM](#4-configurar-php-y-php-fpm)
5. [Configurar Git en el Servidor](#5-configurar-git-en-el-servidor)
6. [Crear el Primer Sitio (webdegas)](#6-crear-el-primer-sitio-webdegas)
7. [Configurar DNS](#7-configurar-dns)
8. [Configurar Firewall](#8-configurar-firewall)
9. [Configurar Certificado SSL (Let's Encrypt)](#9-configurar-certificado-ssl-lets-encrypt)
10. [Workflow con Git](#10-workflow-con-git)
11. [Solución de Problemas](#11-solución-de-problemas)

---

## 1. Conexión Inicial al Servidor

### Desde Windows (PowerShell o CMD):

```powershell
ssh root@216.128.139.41
```

Cuando te pida la contraseña, pega: `6.QyP4EQ2fbYHU@h`

### Desde Linux/Mac:

```bash
ssh root@216.128.139.41
```

---

## 2. Instalar Software Necesario

Una vez conectado al servidor, ejecuta estos comandos en orden:

```bash
# Actualizar el sistema
apt update && apt upgrade -y

# Instalar Nginx (servidor web)
apt install nginx -y

# Instalar PHP y extensiones necesarias
apt install php-fpm php-cli php-curl php-mbstring php-xml php-gd php-zip php-mysql -y

# Instalar Git
apt install git -y

# Instalar Certbot (para SSL)
apt install certbot python3-certbot-nginx -y

# Verificar versiones instaladas
nginx -v
php -v
git --version
```

---

## 3. Configurar Nginx para Múltiples Sitios

### Crear estructura de directorios:

```bash
# Crear directorio para sitios web
mkdir -p /var/www

# Crear directorio para webdegas
mkdir -p /var/www/webdegas

# Dar permisos correctos
chown -R www-data:www-data /var/www
chmod -R 755 /var/www
```

### Configurar Nginx para múltiples sitios:

Nginx ya viene configurado para múltiples sitios. Cada sitio tendrá su propio archivo de configuración en `/etc/nginx/sites-available/` y se activará creando un enlace simbólico en `/etc/nginx/sites-enabled/`.

---

## 4. Configurar PHP y PHP-FPM

Verificar que PHP-FPM esté corriendo:

```bash
# Verificar estado de PHP-FPM
systemctl status php8.1-fpm
# O la versión que tengas instalada (php8.2-fpm, php8.3-fpm, etc.)

# Si no está corriendo, iniciarlo
systemctl start php8.1-fpm
systemctl enable php8.1-fpm
```

**Nota:** Reemplaza `php8.1-fpm` con tu versión de PHP. Para verificar tu versión:
```bash
php -v
```

---

## 5. Configurar Git en el Servidor

### Configurar Git globalmente:

```bash
# Configurar tu nombre y email (cambia por tus datos)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list
```

### Preparar directorio para repositorio:

```bash
# Crear directorio para repositorio Git (opcional, puedes usar el mismo directorio del sitio)
cd /var/www
```

**Nota:** En este caso, usaremos el mismo directorio del sitio web para el repositorio Git, pero puedes usar un directorio separado si lo prefieres.

---

## 6. Crear el Primer Sitio (webdegas)

### Paso 1: Crear archivo de configuración de Nginx

```bash
# Crear archivo de configuración
nano /etc/nginx/sites-available/webdegas.conf
```

Pega esta configuración (ajusta según tu dominio):

```nginx
server {
    listen 80;
    listen [::]:80;
    
    # Cambia 'consultinglaw.net' por tu dominio o usa la IP
    server_name consultinglaw.net www.consultinglaw.net 216.128.139.41;
    
    # Directorio raíz del sitio
    root /var/www/webdegas;
    index index.html index.php;
    
    # Logs
    access_log /var/log/nginx/webdegas_access.log;
    error_log /var/log/nginx/webdegas_error.log;
    
    # Configuración para archivos PHP
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        # Ajusta la versión según tu PHP (php8.2-fpm.sock, php8.3-fpm.sock, etc.)
    }
    
    # Configuración para archivos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Bloquear acceso a archivos ocultos
    location ~ /\. {
        deny all;
    }
    
    # Página por defecto
    location / {
        try_files $uri $uri/ =404;
    }
}
```

Guarda el archivo: `Ctrl + O`, `Enter`, `Ctrl + X`

**Nota:** Ajusta la línea `fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;` según tu versión de PHP. Para encontrar tu socket de PHP:

```bash
ls -la /var/run/php/
```

### Paso 2: Activar el sitio

```bash
# Crear enlace simbólico para activar el sitio
ln -s /etc/nginx/sites-available/webdegas.conf /etc/nginx/sites-enabled/

# Verificar configuración de Nginx
nginx -t

# Si todo está bien, recargar Nginx
systemctl reload nginx
```

### Paso 3: Clonar/Subir el proyecto

#### Opción A: Si ya tienes un repositorio Git (RECOMENDADO):

```bash
cd /var/www/webdegas

# Si ya tienes un repositorio remoto:
git clone https://github.com/tu-usuario/tu-repositorio.git .

# O si ya tienes el código localmente, puedes hacer pull inicialmente
# (ver sección de Git más abajo)
```

#### Opción B: Subir archivos manualmente (primera vez):

```bash
cd /var/www/webdegas

# Crear un archivo de prueba primero
echo "<h1>Webdegas funcionando!</h1>" > index.html

# Luego sube tus archivos usando SCP desde tu computadora local
# (ver sección de comandos SCP más abajo)
```

### Paso 4: Configurar permisos

```bash
# Dar permisos correctos
chown -R www-data:www-data /var/www/webdegas
chmod -R 755 /var/www/webdegas

# Dar permisos de escritura si es necesario (para logs, uploads, etc.)
chmod -R 775 /var/www/webdegas
```

### Paso 5: Verificar que funciona

```bash
# Verificar que Nginx está corriendo
systemctl status nginx

# Verificar que PHP-FPM está corriendo
systemctl status php8.1-fpm
```

Abre tu navegador y ve a: `http://216.128.139.41` o `http://consultinglaw.net` (si ya configuraste DNS)

---

## 7. Configurar DNS

### Si tu dominio es `consultinglaw.net`:

1. **Accede a GoDaddy** (o tu proveedor de DNS)
2. **Configura los registros DNS:**

   **Registro A (dominio principal):**
   - **Tipo:** `A`
   - **Nombre/Host:** `@`
   - **Valor:** `216.128.139.41`
   - **TTL:** `600`

   **Registro A (www):**
   - **Tipo:** `A`
   - **Nombre/Host:** `www`
   - **Valor:** `216.128.139.41`
   - **TTL:** `600`

3. **Espera 15-30 minutos** para que se propaguen los DNS

4. **Verifica la propagación:**
   ```bash
   # Desde tu servidor
   nslookup consultinglaw.net
   dig consultinglaw.net
   ```

   O usa herramientas online: `https://www.whatsmydns.net/`

---

## 8. Configurar Firewall

### Verificar si UFW está instalado y configurado:

```bash
# Verificar estado del firewall
ufw status

# Si no está instalado
apt install ufw -y

# Permitir SSH (IMPORTANTE - hazlo primero)
ufw allow 22/tcp

# Permitir HTTP (puerto 80)
ufw allow 80/tcp

# Permitir HTTPS (puerto 443)
ufw allow 443/tcp

# Activar firewall
ufw enable

# Verificar reglas
ufw status numbered
```

**⚠️ IMPORTANTE:** Asegúrate de permitir SSH antes de activar el firewall, o te quedarás fuera del servidor.

---

## 9. Configurar Certificado SSL (Let's Encrypt)

### Paso 1: Asegúrate de que los DNS estén propagados

Espera 15-30 minutos después de configurar los DNS antes de intentar obtener el certificado.

### Paso 2: Obtener certificado SSL:

```bash
# Obtener certificado SSL para consultinglaw.net
certbot --nginx -d consultinglaw.net -d www.consultinglaw.net

# Sigue las instrucciones en pantalla:
# - Ingresa tu email
# - Acepta los términos
# - Certbot configurará automáticamente Nginx para usar HTTPS
```

### Paso 3: Verificar renovación automática:

```bash
# Probar renovación (no renueva realmente, solo verifica)
certbot renew --dry-run

# El certificado se renueva automáticamente cada 90 días
```

Después de obtener el certificado, Nginx debería redirigir automáticamente HTTP a HTTPS.

---

## 10. Workflow con Git

### Configuración Inicial (una sola vez)

#### En tu servidor Ubuntu:

```bash
cd /var/www/webdegas

# Si ya tienes un repositorio remoto, clónalo:
git clone https://github.com/tu-usuario/webdegas.git .

# O si ya tienes archivos aquí y quieres inicializar Git:
git init
git remote add origin https://github.com/tu-usuario/webdegas.git

# Configurar permisos
chown -R www-data:www-data /var/www/webdegas
chmod -R 755 /var/www/webdegas
```

#### En tu computadora local (Windows):

```powershell
# Navega a tu carpeta del proyecto
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main

# Si no tienes Git instalado, instálalo desde: https://git-scm.com/

# Inicializar Git (si no está inicializado)
git init

# Agregar repositorio remoto (reemplaza con tu URL real)
git remote add origin https://github.com/tu-usuario/webdegas.git

# Si ya tienes un repositorio remoto existente:
git remote set-url origin https://github.com/tu-usuario/webdegas.git
```

### Workflow Diario: Hacer Cambios Locales y Actualizar el Servidor

#### Paso 1: Trabajar en tu computadora local

```powershell
# 1. Navega a tu proyecto
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main

# 2. Haz tus cambios en los archivos (edita, crea, elimina)

# 3. Ver qué archivos cambiaste
git status

# 4. Agregar archivos modificados al staging
git add .

# O agregar archivos específicos:
git add index.html
git add form/form2.php

# 5. Hacer commit de los cambios
git commit -m "Descripción de los cambios: Agregué nueva sección de contacto"

# 6. Subir cambios al repositorio remoto (GitHub, GitLab, etc.)
git push origin main
# O si tu rama se llama 'master':
git push origin master
```

#### Paso 2: En el servidor Ubuntu, hacer pull de los cambios

```bash
# 1. Conectarte al servidor
ssh root@216.128.139.41

# 2. Ir al directorio del proyecto
cd /var/www/webdegas

# 3. Verificar que estás en la rama correcta
git branch

# 4. Hacer pull de los últimos cambios
git pull origin main
# O si tu rama se llama 'master':
git pull origin master

# 5. Si hay conflictos (raro pero puede pasar), resolverlos y luego:
git add .
git commit -m "Resolví conflictos"
git push origin main

# 6. Verificar permisos (por si acaso)
chown -R www-data:www-data /var/www/webdegas
chmod -R 755 /var/www/webdegas

# 7. Recargar Nginx si es necesario (generalmente no es necesario)
systemctl reload nginx
```

### Comandos Git Útiles

#### En tu computadora local:

```powershell
# Ver historial de commits
git log

# Ver cambios en archivos sin agregarlos
git diff

# Ver estado actual
git status

# Cambiar a otra rama
git checkout nombre-rama

# Crear nueva rama
git checkout -b nueva-rama

# Ver ramas remotas
git branch -r
```

#### En el servidor:

```bash
# Ver último commit
git log -1

# Ver qué archivos cambiaron
git status

# Ver diferencias con el remoto
git fetch
git diff HEAD origin/main

# Deshacer cambios locales (CUIDADO - esto elimina cambios no guardados)
git reset --hard origin/main
```

---

## 11. Solución de Problemas

### El sitio no carga (Error 502 Bad Gateway):

```bash
# Verificar que PHP-FPM está corriendo
systemctl status php8.1-fpm

# Si no está corriendo
systemctl start php8.1-fpm
systemctl enable php8.1-fpm

# Verificar logs de Nginx
tail -f /var/log/nginx/webdegas_error.log

# Verificar logs de PHP-FPM
tail -f /var/log/php8.1-fpm.log
```

### Error 404 Not Found:

```bash
# Verificar que el archivo existe
ls -la /var/www/webdegas/index.html

# Verificar configuración de Nginx
nginx -t

# Verificar que el sitio está activo
ls -la /etc/nginx/sites-enabled/

# Ver logs
tail -f /var/log/nginx/webdegas_error.log
```

### Los formularios PHP no funcionan:

```bash
# Verificar que PHP-FPM está corriendo
systemctl status php8.1-fpm

# Verificar que la configuración de Nginx tiene la sección PHP correcta
cat /etc/nginx/sites-available/webdegas.conf | grep php

# Verificar permisos de archivos PHP
ls -la /var/www/webdegas/form/

# Ver logs de PHP
tail -f /var/log/php8.1-fpm.log
```

### Problemas con Git pull:

```bash
# Si hay cambios locales que interfieren:
git stash
git pull origin main
git stash pop

# Si quieres descartar cambios locales y usar solo el remoto:
git fetch origin
git reset --hard origin/main
```

### El certificado SSL no se renueva:

```bash
# Verificar estado del certificado
certbot certificates

# Forzar renovación manual
certbot renew --force-renewal

# Verificar cron job para renovación automática
systemctl status certbot.timer
```

### Verificar que todos los servicios están corriendo:

```bash
# Verificar Nginx
systemctl status nginx

# Verificar PHP-FPM
systemctl status php8.1-fpm

# Verificar firewall
ufw status

# Ver puertos abiertos
netstat -tulpn | grep -E ':(80|443|22)'
```

---

## 📝 Notas Importantes

### Seguridad:

1. **Cambiar contraseña SSH:** Después de la primera conexión, cambia la contraseña:
   ```bash
   passwd
   ```

2. **Usar SSH keys en lugar de contraseña:** Más seguro que usar contraseña
   ```bash
   # En tu computadora local, generar clave SSH:
   ssh-keygen -t rsa -b 4096
   
   # Copiar clave al servidor:
   ssh-copy-id root@216.128.139.41
   ```

3. **No exponer información sensible:** No subas contraseñas o claves API al repositorio Git

### Rendimiento:

1. **Habilitar caché en Nginx:** Ya está configurado en la configuración de ejemplo
2. **Optimizar PHP:** Ajustar `php.ini` según necesidades
3. **Monitorear logs:** Revisar periódicamente los logs para detectar problemas

### Backup:

```bash
# Hacer backup del sitio
tar -czf /root/backup-webdegas-$(date +%Y%m%d).tar.gz /var/www/webdegas

# Hacer backup de configuración de Nginx
tar -czf /root/backup-nginx-$(date +%Y%m%d).tar.gz /etc/nginx
```

---

## ✅ Checklist Final

- [ ] Servidor Ubuntu actualizado
- [ ] Nginx instalado y configurado
- [ ] PHP y PHP-FPM instalados y corriendo
- [ ] Git instalado y configurado
- [ ] Sitio web creado y funcionando
- [ ] DNS configurado y propagado
- [ ] Firewall configurado (puertos 22, 80, 443)
- [ ] Certificado SSL instalado (opcional pero recomendado)
- [ ] Repositorio Git configurado
- [ ] Permisos de archivos correctos
- [ ] Sitio accesible desde navegador
- [ ] Formularios PHP funcionando

---

## 🎉 ¡Listo!

Tu sitio web debería estar funcionando correctamente en Ubuntu Server. 

### Resumen rápido de comandos Git diarios:

**En local (Windows):**
```powershell
git add .
git commit -m "Descripción de cambios"
git push origin main
```

**En servidor (Ubuntu):**
```bash
cd /var/www/webdegas
git pull origin main
```

Si necesitas ayuda adicional, consulta la sección de solución de problemas o revisa los logs del servidor.
