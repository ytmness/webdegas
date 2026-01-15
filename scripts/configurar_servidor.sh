#!/bin/bash

# Script de configuración inicial del servidor Ubuntu
# Para configurar webdegas en el servidor

echo "=========================================="
echo "Configuración de Servidor Ubuntu"
echo "Proyecto: webdegas"
echo "=========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que se está ejecutando como root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Por favor ejecuta este script como root (usa: sudo bash configurar_servidor.sh)${NC}"
    exit 1
fi

echo -e "${YELLOW}Paso 1: Actualizando el sistema...${NC}"
apt update && apt upgrade -y

echo ""
echo -e "${YELLOW}Paso 2: Instalando software necesario...${NC}"
apt install -y nginx php-fpm php-cli php-curl php-mbstring php-xml php-gd php-zip php-mysql git certbot python3-certbot-nginx

echo ""
echo -e "${YELLOW}Paso 3: Obteniendo versión de PHP instalada...${NC}"
PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
echo "Versión de PHP detectada: $PHP_VERSION"

echo ""
echo -e "${YELLOW}Paso 4: Creando directorios...${NC}"
mkdir -p /var/www/webdegas
chown -R www-data:www-data /var/www
chmod -R 755 /var/www

echo ""
echo -e "${YELLOW}Paso 5: Verificando estado de servicios...${NC}"
systemctl enable nginx
systemctl start nginx
systemctl enable php${PHP_VERSION}-fpm
systemctl start php${PHP_VERSION}-fpm

echo ""
echo -e "${YELLOW}Paso 6: Creando archivo de configuración de Nginx...${NC}"

# Crear archivo de configuración de Nginx
cat > /etc/nginx/sites-available/webdegas.conf << EOF
server {
    listen 80;
    listen [::]:80;
    
    server_name consultinglaw.net www.consultinglaw.net 216.128.139.41;
    
    root /var/www/webdegas;
    index index.html index.php;
    
    access_log /var/log/nginx/webdegas_access.log;
    error_log /var/log/nginx/webdegas_error.log;
    
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
echo -e "${YELLOW}Paso 7: Activando sitio...${NC}"
ln -sf /etc/nginx/sites-available/webdegas.conf /etc/nginx/sites-enabled/

# Eliminar sitio por defecto de Nginx si existe
rm -f /etc/nginx/sites-enabled/default

echo ""
echo -e "${YELLOW}Paso 8: Verificando configuración de Nginx...${NC}"
if nginx -t; then
    echo -e "${GREEN}✓ Configuración de Nginx correcta${NC}"
    systemctl reload nginx
else
    echo -e "${RED}✗ Error en la configuración de Nginx${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Paso 9: Configurando firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    echo -e "${GREEN}✓ Firewall configurado${NC}"
else
    echo -e "${YELLOW}⚠ UFW no está instalado. Instalando...${NC}"
    apt install -y ufw
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
fi

echo ""
echo -e "${GREEN}=========================================="
echo "¡Configuración completada exitosamente!"
echo "==========================================${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Sube tus archivos a /var/www/webdegas"
echo "2. Configura los permisos: chown -R www-data:www-data /var/www/webdegas"
echo "3. Si usas Git, clona tu repositorio en /var/www/webdegas"
echo "4. Configura los DNS para que apunten a 216.128.139.41"
echo "5. Obtén el certificado SSL con: certbot --nginx -d consultinglaw.net -d www.consultinglaw.net"
echo ""
echo "Para verificar que todo funciona:"
echo "- Verifica Nginx: systemctl status nginx"
echo "- Verifica PHP-FPM: systemctl status php${PHP_VERSION}-fpm"
echo "- Verifica firewall: ufw status"
echo ""
echo "Accede a tu sitio: http://216.128.139.41 (o tu dominio cuando configures DNS)"
