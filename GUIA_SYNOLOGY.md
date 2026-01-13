# 📋 GUÍA COMPLETA: Subir webdegas a Synology

## Dominio: consultinglaw.net

---

## PASO 1: Acceder a tu Synology (DSM)

1. Abre tu navegador (Chrome, Firefox, Safari, etc.)
2. En la barra de direcciones escribe la IP de tu Synology seguida de `:5000`
   - **Ejemplo:** `192.168.1.50:5000` (pregunta la IP a quien administra la red si no la sabes)
3. Ingresa tu usuario y contraseña de administrador
4. Deberías ver el escritorio de DSM (se parece a Windows)

---

## PASO 2: Instalar Web Station

1. En el escritorio de DSM, haz clic en el ícono de **cuadrícula** (arriba a la izquierda) para abrir el menú
2. Busca y haz clic en **"Centro de paquetes"** (Package Center)
3. En la barra de búsqueda de arriba, escribe: **Web Station**
4. Haz clic en **"Instalar"** cuando aparezca Web Station
5. Espera a que termine la instalación (puede tardar 1-2 minutos)

---

## PASO 3: Instalar Apache y PHP (para que funcionen tus formularios)

Mientras estás en el **Centro de Paquetes**:

1. Busca: **Apache HTTP Server 2.4**
   - Haz clic en **"Instalar"**
2. Luego busca: **PHP 8.2** o la versión más reciente de PHP
   - Haz clic en **"Instalar"**
3. Espera a que ambos terminen de instalarse

> **Nota:** Si PHP 8.2 no está disponible, instala la versión más reciente que aparezca (PHP 8.1, 8.0, etc.)

---

## PASO 4: Configurar Web Station

1. Cierra el Centro de Paquetes
2. En el menú principal, busca y abre **"Web Station"**
3. En la pestaña **"Web Service Portal"**, verás algo como:
   - **PHP:** (selecciona la versión que instalaste, ejemplo: PHP 8.2)
   - **HTTP back-end server:** Apache 2.4
4. Haz clic en el botón de **configuración (⚙️)** junto a Apache
5. Asegúrate que esté **habilitado** y dale **"Aplicar"**

---

## PASO 5: Subir los archivos de tu proyecto

1. En el menú principal, abre **"File Station"** (el explorador de archivos)
2. En el panel izquierdo, busca la carpeta llamada **`web`**
   - Si no existe, créala: clic derecho en el espacio → **"Crear"** → **"Crear carpeta"** → nómbrala `web`
3. Entra a la carpeta **`web`**

### Opción A - Subir el ZIP directamente:

1. Haz clic en el botón **"Cargar"** (arriba)
2. Selecciona tu archivo `webdegas-main.zip`
3. Una vez subido, haz clic derecho sobre el ZIP → **"Extraer aquí"**
4. Entra a la carpeta `webdegas-main` que se creó

### Opción B - Subir los archivos descomprimidos:

1. En tu computadora, descomprime el ZIP
2. Arrastra todos los archivos y carpetas del proyecto directamente a la carpeta `web` en File Station

> **Importante:** Si subes el ZIP y lo extraes, la ruta será `/web/webdegas-main`. Si subes los archivos directamente, la ruta será `/web`.

---

## PASO 6: Crear un Virtual Host (sitio web)

1. Regresa a **Web Station**
2. Ve a la pestaña **"Virtual Host"**
3. Haz clic en **"Crear"**
4. Llena los campos:
   - **Tipo de portal:** Name-based
   - **Nombre del host:** `webdegas` (o el nombre que quieras)
   - **Puerto:** `80` (HTTP) - si quieres HTTPS usa `443` pero requiere certificado
   - **Carpeta raíz del documento:** Haz clic en el botón de carpeta y selecciona:
     - Si subiste el ZIP: `/web/webdegas-main`
     - Si subiste directo: `/web`
   - **HTTP back-end server:** Apache HTTP Server 2.4
   - **PHP:** Selecciona la versión que instalaste
5. Haz clic en **"Aceptar"**

---

## PASO 7: Acceder a tu sitio web

Ahora tu sitio está en línea! Puedes acceder de dos formas:

### Opción 1 - Desde tu red local:

En el navegador: `http://IP-DE-TU-SYNOLOGY`
- **Ejemplo:** `http://192.168.1.50`

### Opción 2 - Si configuraste un nombre:

1. Edita el archivo `hosts` de tu computadora y agrega:
   ```
   192.168.1.50    webdegas.local
   ```
2. Luego accede desde: `http://webdegas.local`

> **Nota para Windows:** El archivo hosts está en `C:\Windows\System32\drivers\etc\hosts` (requiere permisos de administrador para editarlo)

---

## PASO 8: Configurar el envío de emails (SMTP)

Tu formulario usa `form2.php` para enviar emails. Para que funcione, necesitas configurar el servidor SMTP en Synology:

### Configuración SMTP en Synology:

1. Ve a **Panel de Control** → **Notificaciones** → **Email**
2. Configura tu cuenta de correo:
   - **Servidor SMTP:** (depende de tu proveedor)
     - Gmail: `smtp.gmail.com` (puerto 587 o 465)
     - Outlook: `smtp-mail.outlook.com` (puerto 587)
     - Otros: consulta con tu proveedor
   - **Usuario:** Tu email completo
   - **Contraseña:** Tu contraseña de email (o contraseña de aplicación si usas Gmail)
   - **Puerto:** 587 (TLS) o 465 (SSL)
   - **Cifrado:** TLS o SSL según corresponda
3. Prueba enviando un email de prueba

### Configuración PHP para SMTP (si es necesario):

Si los emails no se envían, puede ser necesario configurar PHP para usar SMTP:

1. En **Web Station**, ve a **PHP Settings**
2. Busca la configuración de `php.ini` o crea un archivo `.user.ini` en la raíz del proyecto
3. Agrega estas líneas (ajusta según tu servidor SMTP):
   ```ini
   [mail function]
   SMTP = smtp.gmail.com
   smtp_port = 587
   sendmail_from = tu-email@consultinglaw.net
   ```

> **Nota:** Los archivos PHP ya están configurados para enviar a `info.mty@consultinglaw.net` y `info.baja@consultinglaw.net`. Asegúrate de que estos emails existan y puedan recibir correos.

---

## ⚠️ NOTAS IMPORTANTES:

### Permisos de archivos:

Si te da error de permisos:
1. Ve a **File Station**
2. Clic derecho en la carpeta `web` (o `webdegas-main`)
3. **"Propiedades"** → **"Permisos"**
4. Asegúrate que el grupo **`http`** tenga permisos de **lectura y ejecución**
5. Si es necesario, también da permisos al usuario **`http`**

### Puerto 80 ocupado:

Si el puerto 80 está ocupado:
- Usa otro puerto como `8080` en el Virtual Host
- Accede con `http://IP:8080` o `http://webdegas.local:8080`

### Archivo .htaccess:

Tu proyecto tiene un archivo `.htaccess` vacío, está bien dejarlo así. Si necesitas agregar reglas de reescritura o configuración adicional, puedes editarlo.

### Seguridad:

- Los archivos PHP ahora incluyen validación y sanitización de datos
- Se validan los campos requeridos (nombre y email)
- Se valida el formato del email
- Los datos se sanitizan para prevenir inyección de código

### Dominio público:

Si quieres que el sitio sea accesible desde internet (no solo la red local):
1. Configura un DNS apuntando `consultinglaw.net` a la IP pública de tu Synology
2. Configura el router para hacer port forwarding del puerto 80 (o 443 para HTTPS)
3. Considera usar HTTPS con un certificado SSL (Let's Encrypt es gratuito)

---

## 🔧 Solución de problemas comunes:

### El formulario no envía emails:

1. Verifica que SMTP esté configurado en **Panel de Control → Notificaciones → Email**
2. Revisa los logs de PHP en **Web Station → Logs**
3. Prueba enviar un email de prueba desde **Panel de Control → Notificaciones**
4. Verifica que los emails de destino (`info.mty@consultinglaw.net`, `info.baja@consultinglaw.net`) existan

### Error 403 Forbidden:

1. Verifica los permisos de la carpeta (debe tener permisos de lectura para `http`)
2. Verifica que la ruta en el Virtual Host sea correcta

### Error 404 Not Found:

1. Verifica que los archivos estén en la ruta correcta
2. Verifica la configuración del Virtual Host
3. Asegúrate de que `index.html` exista en la raíz

### Los caracteres especiales se ven mal:

- Los archivos PHP ahora usan UTF-8, así que deberían verse correctamente
- Si aún hay problemas, verifica que el servidor esté configurado para UTF-8

---

## 📝 Resumen de archivos mejorados:

Los siguientes archivos PHP han sido mejorados con:
- ✅ Validación de datos de entrada
- ✅ Sanitización para prevenir inyecciones
- ✅ Validación de formato de email
- ✅ Charset UTF-8 (en lugar de iso-8859-1)
- ✅ Mejor manejo de errores
- ✅ Mensajes de error más informativos

**Archivos actualizados:**
- `form/form2.php`
- `script/form/form2.php`
- `en/form/form2.php`
- `en/script/form/form2.php`
- `correduria24/form/form2.php`
- `correduria24/script/form/form2.php`
- `correduria24/en/form/form2.php`
- `correduria24/en/script/form/form2.php`

---

## ✅ Checklist final:

- [ ] Web Station instalado
- [ ] Apache HTTP Server 2.4 instalado
- [ ] PHP instalado (8.2 o superior)
- [ ] Archivos subidos a `/web` o `/web/webdegas-main`
- [ ] Virtual Host creado y configurado
- [ ] Permisos de carpeta configurados (http tiene acceso)
- [ ] SMTP configurado en Panel de Control
- [ ] Sitio accesible desde el navegador
- [ ] Formulario de contacto probado y funcionando

---

**¡Listo! Tu sitio web debería estar funcionando correctamente en Synology.** 🎉
