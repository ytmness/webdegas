# 📋 GUÍA COMPLETA: Subir webdegas a Synology

## Dominio: consultinglaw.net

## 🖥️ Información del Servidor Synology

### IP Local (dentro de tu red):
- **IP del servidor (local):** `192.168.1.8`
- **Acceso DSM (HTTPS):** `https://192.168.1.8:5001/`
- **Acceso DSM (HTTP):** `http://192.168.1.8:5000/` (si está habilitado)
- **Sitio web (una vez configurado):** `http://192.168.1.8` ← **Usa HTTP, no HTTPS**

> **Cómo verificar la IP local del Synology:**
> - Usa `find.synology.com` en un navegador
> - O instala la utilidad **Synology Assistant**
> - O ve a **Panel de Control > Red > Interfaz de Red** en DSM
> - O revisa la tabla DHCP de tu router

### IP Pública (para internet):
- **IP pública (IPv4):** `189.219.66.244` ← **Para configurar DNS en GoDaddy**
- **IP pública (IPv6):** `2806:230:2044:c3dd:9c9f:9a29:ce17:deac` (opcional)

> ⚠️ **Importante:** 
> - **IP Local** (`192.168.1.8`): Se usa dentro de tu red local para acceder al Synology
> - **IP Pública** (`189.219.66.244`): Se usa en los DNS de GoDaddy para que el dominio apunte a tu servidor desde internet
> - Para acceder al sitio web desde la IP local, usa siempre **HTTP** (`http://`), no HTTPS. Los certificados SSL no funcionan con direcciones IP, solo con nombres de dominio.

---

## PASO 1: Acceder a tu Synology (DSM)

1. **Encuentra la IP de tu Synology** (si no la conoces):
   - Usa `find.synology.com` en un navegador
   - O instala la utilidad **Synology Assistant**
   - O ve a **Panel de Control > Red > Interfaz de Red** en DSM
   - O revisa la tabla DHCP de tu router

2. **Accede a DSM:**
   - Abre tu navegador (Chrome, Firefox, Safari, etc.)
   - En la barra de direcciones escribe la dirección de tu Synology:
     - **Tu servidor:** `https://192.168.1.8:5001/`
     - **Nota:** El puerto `5001` es para HTTPS. Si prefieres HTTP, usa `http://192.168.1.8:5000/`
   - Ingresa tu usuario y contraseña de administrador
   - Deberías ver el escritorio de DSM (se parece a Windows)

> **Información del servidor:**
> - **IP local:** 192.168.1.8
> - **Puerto HTTPS:** 5001
> - **Puerto HTTP:** 5000 (si está habilitado)

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
3. En la pestaña **"Portal web"** (o "Web Service Portal"), verás la configuración de puertos:
   - **Puerto HTTP:** Debe estar en `80` y **habilitado** ✅
   - **Puerto HTTPS:** Puede estar en `443` (opcional)
   - Si el puerto 80 no está habilitado, haz clic en el botón de configuración (⚙️) y habilítalo
4. Verifica que **Apache HTTP Server 2.4** esté en estado "Normal" (verde)
5. Verifica que **PHP 8.2** esté en estado "Normal" (verde)
6. Si alguno no está normal, haz clic en el ícono de administración para configurarlo

---

## PASO 5: Subir los archivos de tu proyecto

1. En el menú principal, abre **"File Station"** (el explorador de archivos)
2. En el panel izquierdo, busca la carpeta llamada **`web`**
   - Si no existe, créala: clic derecho en el espacio → **"Crear"** → **"Crear carpeta"** → nómbrala `web`
3. Entra a la carpeta **`web`**

### Opción A - Subir el ZIP directamente (RECOMENDADO):

1. Haz clic en el botón **"Cargar"** (arriba)
2. Selecciona tu archivo `webdegas-main.zip`
3. Una vez subido, haz clic derecho sobre el ZIP → **"Extraer aquí"**
4. Se creará la carpeta `webdegas-main` dentro de `web`
5. **Verifica:** Dentro de `webdegas-main` deben estar todos tus archivos: `index.html`, `form/`, `img/`, `script/`, etc.

> **Nota:** Si ves un archivo `index.html` suelto en la carpeta `web` (fuera de `webdegas-main`), es probablemente de otro proyecto o ejemplo. Puedes ignorarlo o eliminarlo. Lo importante es que tu proyecto esté dentro de `webdegas-main`.

### Opción B - Subir los archivos descomprimidos:

1. En tu computadora, descomprime el ZIP
2. Arrastra todos los archivos y carpetas del proyecto directamente a la carpeta `web` en File Station

> **Importante:** Si subes el ZIP y lo extraes, la ruta será `/web/webdegas-main`. Si subes los archivos directamente, la ruta será `/web`.

---

## PASO 6: Crear un Virtual Host (sitio web)

1. Regresa a **Web Station**
2. Ve a la pestaña **"Virtual Host"** (no confundir con "Servicio web")
3. Haz clic en **"Crear"**
4. Llena los campos:
   - **Tipo de portal:** Name-based
   - **Nombre del host:** `webdegas` (o el nombre que quieras)
   - **Puerto:** `80` (HTTP) - si quieres HTTPS usa `443` pero requiere certificado
   - **Carpeta raíz del documento:** ⚠️ **IMPORTANTE:** Haz clic en el botón de carpeta y selecciona:
     - **Si subiste el ZIP y lo extrajiste:** `/web/webdegas-main` ← **Esta es la correcta**
     - **NO uses:** `/web` (esa carpeta puede tener otros archivos como `index.html` de ejemplo)
   - **HTTP back-end server:** Apache HTTP Server 2.4
   - **PHP:** Selecciona la versión que instalaste (ej: PHP 8.2)
5. Haz clic en **"Aceptar"**

> **Nota importante:** 
> - Si ya tienes un servicio web llamado "web" en la pestaña "Servicio web", ese es diferente al Virtual Host
> - El Virtual Host es lo que necesitas crear en la pestaña "Virtual Host"
> - Si ves un archivo `index.html` suelto en la carpeta `/web` que no es tuyo, puedes eliminarlo o ignorarlo
> - El Virtual Host debe apuntar a `/web/webdegas-main` donde están todos tus archivos del proyecto

---

## PASO 7: Acceder a tu sitio web

Ahora tu sitio está en línea! Puedes acceder de dos formas:

### Opción 1 - Desde tu red local (HTTP):

⚠️ **IMPORTANTE:** Usa **HTTP** (no HTTPS) para acceder desde la IP local:
- **URL correcta:** `http://192.168.1.8` ← **Usa HTTP, no HTTPS**
- **O con puerto específico:** `http://192.168.1.8:80`
- **O con puerto personalizado:** `http://192.168.1.8:8080` (si usaste otro puerto)

> **Nota sobre HTTPS:** Si intentas acceder con `https://192.168.1.8`, verás un error de certificado porque los certificados SSL están diseñados para nombres de dominio (como `consultinglaw.net`), no para direcciones IP. Para uso local, usa siempre **HTTP**.

### Opción 2 - Si configuraste un nombre:

1. Edita el archivo `hosts` de tu computadora y agrega:
   ```
   192.168.1.8    webdegas.local
   ```
2. Luego accede desde: `http://webdegas.local`

> **Nota:** El archivo hosts en Windows está en `C:\Windows\System32\drivers\etc\hosts` (requiere permisos de administrador para editarlo)

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
- Accede con `http://192.168.1.8:8080` o `http://webdegas.local:8080`

### Acceso al sitio web:

Una vez configurado el Virtual Host, podrás acceder a tu sitio web desde:
- **Red local:** `http://192.168.1.8` (si usaste puerto 80)
- **Con puerto personalizado:** `http://192.168.1.8:8080` (si usaste otro puerto)
- **Con nombre local:** `http://webdegas.local` (si configuraste el archivo hosts)

### Archivo .htaccess:

Tu proyecto tiene un archivo `.htaccess` vacío, está bien dejarlo así. Si necesitas agregar reglas de reescritura o configuración adicional, puedes editarlo.

### Seguridad:

- Los archivos PHP ahora incluyen validación y sanitización de datos
- Se validan los campos requeridos (nombre y email)
- Se valida el formato del email
- Los datos se sanitizan para prevenir inyección de código

### Dominio público (consultinglaw.net):

Si quieres que el sitio sea accesible desde internet usando `consultinglaw.net`:

#### Paso 1: Obtén tu IP pública

1. Ve a `https://whatismyipaddress.com/` para conocer tu IP pública
2. O revisa la configuración de tu router
3. **Anota esta IP** - la necesitarás para configurar los DNS

> ⚠️ **Importante:** Si tu IP pública cambia (IP dinámica), considera usar un servicio de DNS dinámico (DDNS) o solicitar una IP estática a tu proveedor de internet.

#### Paso 2: Configura los DNS en GoDaddy

1. **Accede a GoDaddy:**
   - Ve a `https://www.godaddy.com/` e inicia sesión
   - Ve a **Mis Productos** → **Dominios**
   - Haz clic en `consultinglaw.net` → **DNS** o **Administrar DNS**

2. **Configura los registros DNS:**

   Necesitas crear/editar estos registros usando tu **IPv4** (no la IPv6):

   **⚠️ IMPORTANTE - Limpieza de registros existentes:**
   
   Antes de crear los nuevos registros, necesitas limpiar los existentes:

   **1. Elimina el registro A "Parked":**
   - Busca el registro A que tiene `@` con valor "Parked"
   - Haz clic en los 3 puntos (⋯) o el ícono de editar → **Eliminar**
   - Si no te deja eliminarlo, intenta editarlo y cambiar el valor a `189.219.66.244`
   - **Mantén solo el registro A con tu IP** (`189.219.66.244`)

   **2. Cambia el CNAME de www a registro A:**
   - Busca el registro **CNAME** que tiene `www` → `consultinglaw.net.`
   - **Elimínalo** (haz clic en los 3 puntos → Eliminar)
   - Luego **crea un nuevo registro A** para `www`:
     - **Tipo:** `A` (NO CNAME)
     - **Nombre/Host:** `www`
     - **Valor/Puntos a:** `189.219.66.244` ← **Tu IPv4**
     - **TTL:** `600` (o el valor por defecto)

   **Registro A (para el dominio principal - @):**
   - Si ya tienes un registro A con `@` y valor `189.219.66.244`, **déjalo así** ✅
   - Si tienes otro registro A con "Parked", **elimínalo** o **edítalo** para que apunte a `189.219.66.244`
   - Solo debe haber **UN** registro A para `@` con tu IP

   **Registro A (para www):**
   - **PRIMERO:** Elimina el CNAME existente de `www`
   - **Luego:** Crea un nuevo registro A:
     - **Tipo:** `A` (NO CNAME)
     - **Nombre/Host:** `www`
     - **Valor/Puntos a:** `189.219.66.244` ← **Tu IPv4 (la misma)**
     - **TTL:** `600` (o el valor por defecto)

   **⚠️ NO elimines estos registros (son necesarios):**
   - Los registros **NS** (nameservers) - no se pueden eliminar, es normal
   - El registro **SOA** - no se puede eliminar
   - Los registros **TXT** y **CNAME** que empiezan con `_` (como `_domainconnect`, `_dmarc`) - déjalos

   **Ejemplo de cómo se vería en GoDaddy:**
   ```
   Tipo | Nombre | Valor          | TTL
   -----|--------|----------------|-----
   A    | @      | 189.219.66.244 | 600
   A    | www    | 189.219.66.244 | 600
   ```

   > **Nota:** 
   > - Usa la **IPv4** (`189.219.66.244`) para los registros A. La IPv6 (`2806:230:2044:c3dd:9c9f:9a29:ce17:deac`) se usa para registros AAAA, pero no es necesaria para empezar.
   > - Si ves el error "El nombre de registro www está en conflicto", significa que ya existe un registro para `www`. Elimínalo primero y luego crea el nuevo registro A.

3. **Guarda los cambios** y espera 5-30 minutos para que se propaguen los DNS

#### Paso 2.5: Configuración de red en Synology (opcional pero recomendado)

Si necesitas verificar o ajustar la configuración de red del Synology:

1. Ve a **Panel de Control > Red > Interfaz de red > General**

2. **Pasarela predeterminada:**
   - Debe ser `192.168.1.1` (tu router)
   - Si está diferente, haz clic en "Editar" y corrígela

3. **Configurar el servidor DNS manualmente:**
   - **Opción A (recomendada):** Deja desmarcado para usar los DNS del router
   - **Opción B:** Si quieres usar DNS públicos, marca la casilla y usa:
     - **Servidor DNS preferido:** `8.8.8.8` (Google) o `1.1.1.1` (Cloudflare)
     - **Servidor DNS alternativo:** `8.8.4.4` (Google) o `1.0.0.1` (Cloudflare)

4. **Proxy:**
   - ⚠️ **IMPORTANTE:** Desmarca la casilla "Conectar a través de un servidor proxy"
   - Para un servidor web NO necesitas proxy
   - Si está marcado sin dirección, causará problemas de conexión

5. Haz clic en **"Aplicar"** para guardar los cambios

#### Paso 3: Abrir puertos en el firewall de Synology

Antes de configurar el router, necesitas permitir el tráfico en el firewall de Synology:

1. Ve a **Panel de Control > Seguridad > Firewall**
2. Si el firewall está deshabilitado, puedes habilitarlo (recomendado) o dejarlo deshabilitado
3. Si está habilitado, configura las reglas:
   - Haz clic en **"Editar reglas"** o **"Crear regla"**
   - Crea una regla para HTTP:
     - **Puerto:** `80`
     - **Protocolo:** `TCP`
     - **Acción:** `Permitir`
     - **Origen:** `Todas las interfaces` o `Todas las IP`
   - Crea una regla para HTTPS (si vas a usarlo):
     - **Puerto:** `443`
     - **Protocolo:** `TCP`
     - **Acción:** `Permitir`
     - **Origen:** `Todas las interfaces` o `Todas las IP`
4. Guarda y aplica los cambios

> **Nota:** Si el firewall está deshabilitado, los puertos ya están abiertos. Pero es mejor habilitarlo y crear reglas específicas para mayor seguridad.

#### Paso 4: Configura Port Forwarding en el router

1. Accede a la configuración de tu router:
   - Normalmente `http://192.168.1.1` o `http://192.168.0.1`
   - O revisa la etiqueta del router para la IP de administración
   - Usa las credenciales de administrador del router

2. Busca la sección:
   - **"Port Forwarding"** o **"Reenvío de puertos"**
   - **"NAT"** o **"Virtual Server"**
   - **"Aplicaciones y juegos"** (en algunos routers)

3. Configura estas reglas:

   **Regla 1 - HTTP (puerto 80):**
   - **Nombre/Descripción:** `Web Server HTTP` o `Synology Web`
   - **Puerto externo/Público:** `80`
   - **Puerto interno/Privado:** `80`
   - **IP interna/Destino:** `192.168.1.8` (tu Synology)
   - **Protocolo:** `TCP` (o `TCP/UDP` si está disponible)
   - **Estado:** `Habilitado` ✅

   **Regla 2 - HTTPS (puerto 443, si vas a usar SSL):**
   - **Nombre/Descripción:** `Web Server HTTPS` o `Synology Web SSL`
   - **Puerto externo/Público:** `443`
   - **Puerto interno/Privado:** `443`
   - **IP interna/Destino:** `192.168.1.8` (tu Synology)
   - **Protocolo:** `TCP` (o `TCP/UDP` si está disponible)
   - **Estado:** `Habilitado` ✅

4. Guarda los cambios en el router
5. Reinicia el router si es necesario (algunos routers requieren reinicio para aplicar cambios)

> **Importante:** 
> - El Port Forwarding redirige el tráfico desde internet (puerto 80/443) hacia tu Synology (192.168.1.8)
> - Sin esto, aunque el sitio esté configurado, no será accesible desde internet
> - Algunos proveedores de internet bloquean el puerto 80. Si no funciona, prueba con otro puerto como 8080 y configura el Virtual Host en Synology para usar ese puerto

#### Paso 5: Configura HTTPS en Synology (recomendado)

1. Ve a **Panel de Control → Seguridad → Certificado**
2. Haz clic en **"Añadir"** → **"Añadir un nuevo certificado"**
3. Selecciona **"Obtener un certificado de Let's Encrypt"** (gratuito)
4. Llena los campos:
   - **Nombre de dominio:** `consultinglaw.net`
   - **Correo electrónico:** Tu email (para notificaciones)
   - **Dominio alternativo:** `www.consultinglaw.net` (opcional)
5. Acepta los términos y haz clic en **"Aplicar"**
6. Espera a que se genere el certificado (puede tardar unos minutos)

#### Paso 6: Configura el Virtual Host en Web Station

1. Ve a **Web Station → Servicio web**
2. Crea un nuevo servicio o edita el existente
3. Configura:
   - **Nombre:** `consultinglaw.net`
   - **Puerto:** `80` (HTTP) o `443` (HTTPS si configuraste el certificado)
   - **Carpeta raíz del documento:** `/web/webdegas-main`
   - **HTTP back-end server:** Apache HTTP Server 2.4
   - **PHP:** PHP 8.2
   - **Certificado SSL:** Selecciona el certificado de Let's Encrypt que creaste (si usas HTTPS)
4. Guarda los cambios

#### Paso 7: Verifica que funciona

1. Espera 15-30 minutos después de configurar los DNS
2. Prueba acceder desde internet:
   - `http://consultinglaw.net` (HTTP)
   - `https://consultinglaw.net` (HTTPS, si lo configuraste)
3. Si no funciona, verifica:
   - Que los DNS se hayan propagado (usa `https://www.whatsmydns.net/` para verificar)
   - Que el Port Forwarding esté configurado correctamente
   - Que el firewall del router permita el tráfico en los puertos 80 y 443

> **Nota:** La propagación de DNS puede tardar hasta 48 horas, aunque normalmente es en 15-30 minutos. Si tu IP pública cambia, necesitarás actualizar los registros DNS o usar un servicio de DNS dinámico.

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

1. Verifica que los archivos estén en la ruta correcta (`/web/webdegas-main`)
2. Verifica la configuración del Virtual Host - debe apuntar a `/web/webdegas-main`
3. Asegúrate de que `index.html` exista dentro de `/web/webdegas-main/index.html`
4. Verifica que el servicio web esté activo (debe mostrar "Normal" en verde)

### Error de certificado SSL / "Sitio web no confiable":

Si ves un error sobre certificado no válido al acceder a `https://192.168.1.8`:

**Solución:** Usa **HTTP** en lugar de HTTPS:
- ❌ **NO uses:** `https://192.168.1.8`
- ✅ **USA:** `http://192.168.1.8`

Los certificados SSL están diseñados para nombres de dominio (como `consultinglaw.net`), no para direcciones IP. Para acceder desde la red local, siempre usa HTTP.

### Error ERR_CONNECTION_REFUSED:

Este error significa que el servidor no está escuchando en el puerto o el servicio no está activo.

1. **Verifica el Portal web:**
   - Ve a Web Station → **Portal web**
   - Verifica que el puerto **80** esté **habilitado** ✅
   - Si no está habilitado, haz clic en configuración (⚙️) y habilítalo
   - Guarda los cambios

2. **Verifica que Apache esté activo:**
   - En Web Station → General, verifica que Apache HTTP Server 2.4 esté en estado "Normal" (verde)
   - Si no está normal, haz clic en el ícono de administración y reinícialo

3. **Verifica el servicio web creado:**
   - Ve a Web Station → **Servicio web**
   - Busca el servicio que creaste (debe tener un nombre como "webdegas" o similar)
   - Verifica que esté en estado "Normal" (verde)
   - Si no está activo, haz clic en "Editar" y verifica la configuración

4. **Verifica la carpeta raíz:**
   - Edita el servicio web
   - Verifica que la "Carpeta raíz del documento" sea exactamente `/web/webdegas-main`
   - NO debe ser solo `/web`

5. **Verifica los permisos:**
   - En File Station, clic derecho en `/web/webdegas-main` → Propiedades → Permisos
   - El usuario/grupo `http` debe tener permisos de **lectura y ejecución**
   - Si no los tiene, agrégalos y aplica

6. **Reinicia el servicio:**
   - En Web Station → Servicio web, selecciona tu servicio
   - Haz clic en "Acción" → "Reiniciar" (si está disponible)

### El sitio no carga / muestra página en blanco:

1. **Verifica la carpeta en File Station:**
   - Debe existir: `/web/webdegas-main/index.html`
   - Debe existir: `/web/webdegas-main/form/form2.php`
   - Si no están ahí, los archivos están en la ubicación incorrecta

2. **Verifica la configuración del servicio web:**
   - Ve a Web Station → Servicio web
   - El servicio debe estar en estado "Normal" (verde)
   - Verifica que la carpeta raíz sea `/web/webdegas-main` (no solo `/web`)

3. **Verifica los permisos:**
   - En File Station, clic derecho en `/web/webdegas-main` → Propiedades → Permisos
   - El usuario/grupo `http` debe tener permisos de lectura y ejecución

4. **Prueba acceder directamente:**
   - `http://192.168.1.8` (si usaste puerto 80)
   - `http://192.168.1.8:8080` (si usaste otro puerto)
   - Si ves el `index.html` suelto de ejemplo, significa que está apuntando a `/web` en lugar de `/web/webdegas-main`

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
