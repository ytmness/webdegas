# 📋 Comandos Git - Guía Rápida

Esta guía contiene los comandos que necesitas para trabajar con Git entre tu computadora local y el servidor Ubuntu.

---

## 🖥️ Configuración Inicial (Una sola vez)

### En tu computadora local (Windows):

```powershell
# 1. Navegar a tu proyecto
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Configurar tu nombre y email
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# 4. Agregar repositorio remoto (reemplaza con tu URL real)
git remote add origin https://github.com/tu-usuario/webdegas.git

# O si ya tienes un repositorio:
git remote set-url origin https://github.com/tu-usuario/webdegas.git

# 5. Agregar todos los archivos
git add .

# 6. Hacer primer commit
git commit -m "Commit inicial - proyecto webdegas"

# 7. Subir al repositorio remoto
git push -u origin main
# O si tu rama se llama 'master':
git push -u origin master
```

### En el servidor Ubuntu:

```bash
# 1. Conectarte al servidor
ssh root@216.128.139.41

# 2. Ir al directorio del sitio
cd /var/www/webdegas

# 3. Clonar el repositorio (primera vez)
git clone https://github.com/tu-usuario/webdegas.git .

# 4. Configurar permisos
chown -R www-data:www-data /var/www/webdegas
chmod -R 755 /var/www/webdegas

# 5. Configurar Git en el servidor (opcional, para commits directos)
git config user.name "Servidor Ubuntu"
git config user.email "servidor@consultinglaw.net"
```

---

## 🔄 Workflow Diario - Trabajar en Local y Actualizar Servidor

### Paso 1: Trabajar en tu computadora local

```powershell
# 1. Ir a tu proyecto
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main

# 2. Ver qué archivos has modificado
git status

# 3. Agregar archivos modificados (todos)
git add .

# O agregar archivos específicos:
git add index.html
git add form/form2.php
git add img/logo1.gif

# 4. Hacer commit con descripción
git commit -m "Agregué nueva sección de contacto"

# 5. Subir cambios al repositorio
git push origin main
# O:
git push origin master
```

### Paso 2: Actualizar el servidor

```bash
# 1. Conectarte al servidor (copia y pega este comando)
ssh root@216.128.139.41

# 2. Ir al directorio del proyecto
cd /var/www/webdegas

# 3. Verificar estado actual
git status

# 4. Descargar los últimos cambios
git pull origin main
# O:
git pull origin master

# 5. Verificar permisos (por si acaso)
chown -R www-data:www-data /var/www/webdegas
chmod -R 755 /var/www/webdegas

# 6. Listo! Los cambios ya están en el servidor
```

---

## 📝 Comandos Útiles

### Ver información:

```powershell
# Ver qué archivos cambiaron
git status

# Ver diferencias en archivos modificados
git diff

# Ver historial de commits
git log

# Ver últimos 5 commits
git log -5

# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r
```

### Deshacer cambios:

```powershell
# Deshacer cambios en un archivo específico (antes de hacer add)
git checkout -- nombre-archivo.html

# Deshacer todos los cambios no guardados (CUIDADO)
git checkout .

# Deshacer el último commit (mantiene los cambios)
git reset --soft HEAD~1

# Deshacer el último commit y eliminar los cambios (CUIDADO)
git reset --hard HEAD~1
```

### En el servidor (comandos útiles):

```bash
# Ver último commit
git log -1

# Ver qué archivos cambiaron en el último pull
git log -1 --name-only

# Ver diferencias con el repositorio remoto
git fetch
git diff HEAD origin/main

# Forzar actualización (descarta cambios locales si los hay)
git fetch origin
git reset --hard origin/main

# Ver configuración de Git
git config --list
```

---

## ⚠️ Solución de Problemas

### Error: "Please tell me who you are"

```powershell
# Configurar nombre y email
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### Error: "fatal: not a git repository"

```powershell
# Asegúrate de estar en el directorio correcto
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main

# O inicializa Git
git init
```

### Error: "remote origin already exists"

```powershell
# Ver repositorio remoto actual
git remote -v

# Cambiar URL del repositorio remoto
git remote set-url origin https://github.com/tu-usuario/webdegas.git
```

### Hay conflictos en el servidor:

```bash
# En el servidor, si hay conflictos después de pull:
cd /var/www/webdegas

# Opción 1: Descartar cambios locales y usar solo el remoto
git fetch origin
git reset --hard origin/main

# Opción 2: Guardar cambios locales, actualizar, y luego aplicar cambios
git stash
git pull origin main
git stash pop
```

### No puedes hacer push porque el servidor tiene cambios:

```powershell
# En tu computadora local, primero hacer pull
git pull origin main

# Resolver conflictos si los hay, luego:
git add .
git commit -m "Resolví conflictos"
git push origin main
```

### Olvidaste hacer commit antes de hacer push:

```powershell
# Ver qué archivos tienes modificados
git status

# Agregar archivos
git add .

# Hacer commit
git commit -m "Descripción de cambios"

# Ahora sí hacer push
git push origin main
```

---

## 🎯 Resumen: Comandos que usarás más seguido

### En tu computadora local:

```powershell
# Los 3 comandos que usarás todo el tiempo:
git add .
git commit -m "Descripción de lo que cambiaste"
git push origin main
```

### En el servidor:

```bash
# El comando que usarás después de cada push:
cd /var/www/webdegas && git pull origin main
```

**O si quieres hacerlo en una sola línea desde tu computadora local:**

```powershell
# Esto ejecuta el pull directamente en el servidor (requiere que tengas SSH configurado)
ssh root@216.128.139.41 "cd /var/www/webdegas && git pull origin main"
```

---

## 💡 Tips

1. **Siempre revisa con `git status` antes de hacer commit** para ver qué vas a subir
2. **Usa mensajes de commit descriptivos**: "Corregí error en formulario" es mejor que "cambios"
3. **Haz commit frecuentemente**: Es mejor muchos commits pequeños que uno grande
4. **Antes de hacer push, verifica con `git log`** que tus commits están bien
5. **En el servidor, siempre verifica permisos después de pull**: `chown -R www-data:www-data /var/www/webdegas`

---

## 📞 Comandos para Copiar y Pegar

### Después de hacer cambios en local:

```powershell
cd C:\Users\sergi\Desktop\webdegas-main\webdegas-main
git add .
git commit -m "Tus cambios aquí"
git push origin main
```

### Luego en el servidor (copia y pega estos 3 comandos uno por uno):

```bash
ssh root@216.128.139.41
```

```bash
cd /var/www/webdegas
```

```bash
git pull origin main
```

¡Y listo! 🎉
