#!/bin/bash

# Script para agregar un segundo sitio web en el mismo servidor Ubuntu
# Ejemplo: Si ya tienes webdegas, puedes agregar otro sitio sin conflictos

echo "=========================================="
echo "Agregar Segundo Sitio Web"
echo "=========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que se está ejecutando como root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Por favor ejecuta este script como root (usa: sudo bash agregar_segundo_sitio.sh)${NC}"
    exit 1
fi

# Solicitar información del nuevo sitio
echo -e "${YELLOW}Por favor proporciona la siguiente información:${NC}"
echo ""
read -p "Nombre del sitio (ejemplo: miotro-sitio): " SITIO_NAME
read -p "Dominio del sitio (ejemplo: miotro-sitio.com): " DOMINIO
read -p "¿También incluir www? (s/n): " INCLUIR_WWW

if [ -z "$SITIO_NAME" ] || [ -z "$DOMINIO" ]; then
    echo -e "${RED}Error: Debes proporcionar el nombre y dominio del sitio${NC}"
    exit 1
fi

# Obtener versión de PHP
PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")

echo ""
echo -e "${YELLOW}Creando directorio para $SITIO_NAME...${NC}"
mkdir -p /var/www/$SITIO_NAME
chown -R www-data:www-data /var/www/$SITIO_NAME
chmod -R 755 /var/www/$SITIO_NAME

echo ""
echo -e "${YELLOW}Creando archivo de configuración de Nginx...${NC}"

# Preparar server_name
SERVER_NAME="$DOMINIO"
if [ "$INCLUIR_WWW" = "s" ] || [ "$INCLUIR_WWW" = "S" ]; then
    SERVER_NAME="$DOMINIO www.$DOMINIO"
fi

# Crear archivo de configuración
cat > /etc/nginx/sites-available/$SITIO_NAME.conf << EOF
server {
    listen 80;
    listen [::]:80;
    
    server_name $SERVER_NAME;
    
    root /var/www/$SITIO_NAME;
    index index.html index.php;
    
    access_log /var/log/nginx/${SITIO_NAME}_access.log;
    error_log /var/log/nginx/${SITIO_NAME}_error.log;
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php${PHP_VERSION}-fpm.sock;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~ /\. {
        deny all;
    }
    
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

echo ""
echo -e "${YELLOW}Activando sitio...${NC}"
ln -sf /etc/nginx/sites-available/$SITIO_NAME.conf /etc/nginx/sites-enabled/

echo ""
echo -e "${YELLOW}Verificando configuración de Nginx...${NC}"
if nginx -t; then
    echo -e "${GREEN}✓ Configuración de Nginx correcta${NC}"
    systemctl reload nginx
else
    echo -e "${RED}✗ Error en la configuración de Nginx${NC}"
    exit 1
fi

# Crear archivo de prueba
echo "<h1>Sitio $SITIO_NAME funcionando!</h1><p>Dominio: $DOMINIO</p>" > /var/www/$SITIO_NAME/index.html
chown www-data:www-data /var/www/$SITIO_NAME/index.html

echo ""
echo -e "${GREEN}=========================================="
echo "¡Segundo sitio agregado exitosamente!"
echo "==========================================${NC}"
echo ""
echo "Información del nuevo sitio:"
echo "- Nombre: $SITIO_NAME"
echo "- Dominio: $DOMINIO"
echo "- Directorio: /var/www/$SITIO_NAME"
echo "- Configuración: /etc/nginx/sites-available/$SITIO_NAME.conf"
echo ""
echo "Próximos pasos:"
echo "1. Sube tus archivos a /var/www/$SITIO_NAME"
echo "2. Configura los permisos: chown -R www-data:www-data /var/www/$SITIO_NAME"
echo "3. Configura los DNS para que apunten a 216.128.139.41"
echo "4. Obtén el certificado SSL con: certbot --nginx -d $DOMINIO $(if [ "$INCLUIR_WWW" = "s" ] || [ "$INCLUIR_WWW" = "S" ]; then echo "-d www.$DOMINIO"; fi)"
echo ""
echo "Para verificar:"
echo "- http://$DOMINIO"
echo ""
echo "Lista de sitios activos:"
ls -1 /etc/nginx/sites-enabled/
