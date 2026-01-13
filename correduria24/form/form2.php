<?php 
// Validación y sanitización de datos
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Obtener y validar datos
$nombre = isset($_GET['posName']) ? sanitize_input($_GET['posName']) : '';
$mail = isset($_GET['posEmail']) ? sanitize_input($_GET['posEmail']) : '';
$trabajo = isset($_GET['posJob']) ? sanitize_input($_GET['posJob']) : '';
$ciudad = isset($_GET['posCity']) ? sanitize_input($_GET['posCity']) : '';
$pais = isset($_GET['posCountry']) ? sanitize_input($_GET['posCountry']) : '';

// Validar campos requeridos
if (empty($nombre) || empty($mail)) {
    http_response_code(400);
    echo "Error: Nombre y email son campos requeridos.";
    exit;
}

// Validar formato de email
if (!validate_email($mail)) {
    http_response_code(400);
    echo "Error: El formato del email no es válido.";
    exit;
}

// Construir mensaje
$mensaje = "<html><body>";
$mensaje .= "<h2>Nuevo contacto desde la web</h2>";
$mensaje .= "<p><strong>Nombre:</strong> " . $nombre . "</p>";
$mensaje .= "<p><strong>E-mail:</strong> " . $mail . "</p>";
$mensaje .= "<p><strong>Trabajo:</strong> " . $trabajo . "</p>";
$mensaje .= "<p><strong>Ciudad:</strong> " . $ciudad . "</p>";
$mensaje .= "<p><strong>País:</strong> " . $pais . "</p>";
$mensaje .= "<p><strong>Enviado el:</strong> " . date('d/m/Y H:i:s', time()) . "</p>";
$mensaje .= "</body></html>";

// Configuración de email
$para = 'info.mty@consultinglaw.net';
$asunto = 'Contacto Web GMconsulting - ' . $nombre;

// Cabeceras mejoradas
$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
$cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$cabeceras .= 'From: ' . $nombre . ' <' . $mail . '>' . "\r\n";
$cabeceras .= 'Reply-To: ' . $mail . "\r\n";
$cabeceras .= 'X-Mailer: PHP/' . phpversion() . "\r\n";

// Enviar email
if (mail($para, $asunto, $mensaje, $cabeceras)) {
    http_response_code(200);
    echo ""; // Éxito silencioso para AJAX
} else {
    http_response_code(500);
    echo "Error: No se pudo enviar el mensaje. Por favor, intente más tarde.";
}

?>
