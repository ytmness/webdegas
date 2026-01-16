# Comandos para resolver el conflicto en el servidor

## Opción 1: Guardar cambios locales y luego hacer pull (recomendado)

```bash
cd /var/www/webdegas

# 1. Ver qué cambios hay localmente
git diff script/scripts.js

# 2. Guardar temporalmente los cambios locales
git stash

# 3. Hacer pull de los cambios nuevos
git pull origin main

# 4. Verificar que todo esté bien
git status
```

## Opción 2: Descartar cambios locales y usar solo la versión del repositorio

Si los cambios locales son viejos y quieres descartarlos completamente:

```bash
cd /var/www/webdegas

# Descartar cambios locales
git checkout -- script/scripts.js

# Hacer pull
git pull origin main
```

## Opción 3: Ver cambios primero y luego decidir

```bash
cd /var/www/webdegas

# Ver qué cambió localmente
git diff script/scripts.js | head -50

# Si los cambios locales son importantes, guardarlos:
git stash save "Cambios locales antes de pull"

# Hacer pull
git pull origin main

# Ver si quieres aplicar los cambios guardados (probablemente no)
# git stash pop  # Solo si necesitas los cambios antiguos
```

## Después del pull, verificar:

```bash
# Ver que el archivo tiene la versión correcta
grep -n "locationBox.parentNode" script/scripts.js

# Ver que no hay agent logs problemáticos
grep -n "logData5\|logData6" script/scripts.js
# (No debería aparecer nada)

# Reiniciar Nginx si es necesario
systemctl reload nginx
```
