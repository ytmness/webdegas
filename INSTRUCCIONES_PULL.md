# Instrucciones para hacer Pull en Servidor Ubuntu

## Cambios Realizados
Se corrigió el problema del recuadro de direcciones que permanecía visible sobre el formulario de contacto. Ahora el recuadro se oculta automáticamente cuando se abre el formulario y reaparece cuando se cierra.

**Archivos modificados:**
- `script/scripts.js`
- `consultinglaw website/public_html/script/scripts.js`

## Comandos para actualizar en Ubuntu

### Comandos para actualizar en el servidor

**Ruta del proyecto:** `/var/www/webdegas`

Ejecuta estos comandos en orden:

```bash
# 1. Navegar al directorio del proyecto
cd /var/www/webdegas

# 2. Actualizar desde el repositorio remoto
git pull origin main

# 3. Ajustar permisos para el servidor web
chown -R www-data:www-data /var/www/webdegas/*

# 4. Recargar Nginx para aplicar cambios
systemctl reload nginx
```

### Verificación opcional

Puedes verificar que los cambios se aplicaron:

```bash
# Ver el último commit
git log --oneline -1

# Verificar que los archivos tienen los cambios
grep -n "display.*none" script/scripts.js
grep -n "display.*block" script/scripts.js
```

### Si hay conflictos o problemas

Si encuentras conflictos durante el pull:

```bash
cd /var/www/webdegas

# Guardar cambios locales si es necesario
git stash

# Actualizar desde remoto
git pull origin main

# Restaurar cambios locales (si aplicaste stash)
git stash pop

# Ajustar permisos y recargar
chown -R www-data:www-data /var/www/webdegas/*
systemctl reload nginx
```

## Resumen de comandos completos

```bash
cd /var/www/webdegas
git pull origin main
chown -R www-data:www-data /var/www/webdegas/*
systemctl reload nginx
```

## Confirmación

El commit que se subió tiene el mensaje:
**"Fix: Ocultar recuadro de direcciones al abrir formulario de contacto"**

Commit hash: `9b33089`

## Notas Adicionales

- Si hay archivos modificados localmente que no quieres perder, haz un backup antes del pull
- Si aparecen conflictos de merge, Git te indicará qué archivos necesitan resolución
- Asegúrate de tener permisos de escritura en el directorio del proyecto
