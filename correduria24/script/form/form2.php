<?php 

$nombre = $_GET['posName'];
$mail = $_GET['posEmail'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0" . "\r\n";
$header .= 'Content-type: text/html; charset=iso-8859-1';

$mensaje = "Este mensaje fue enviado por " . $nombre . "<br>  \r\n";
$mensaje .= "E-mail: " . $mail . "<br> \r\n";
$mensaje .= "Telefono: " . $_GET['posTel'] . "<br> \r\n";
$mensaje .= "Mensaje: " . $_GET['posText'] . "<br> \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

//$mensaje = utf8_decode($mensaje);

$para = 'info.mty@consultinglaw.net';
//$asunto = 'Contacto mitreimportaciones.com : '. $_GET['posAsunto'];
$asunto = 'Contacto Web GMconsulting ';

$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Cabeceras adicionales
//$cabeceras .= 'To: María <maria@example.com>, Kelly <kelly@example.com>' . "\r\n";
//$cabeceras .= 'From: Riviera Maya Contacto Web <recordatorio@example.com>' . "\r\n";

$cabeceras .= 'To: ' . $para . "\r\n";
$cabeceras .= 'From: ' . $nombre . '<' . $mail . '>' ."\r\n";

 if ( mail($para, $asunto, $mensaje, $cabeceras) ) { echo ""; }
 else { 
 echo "no jalo<br>";
 echo $nombre ."<br><br>";
 echo $asunto ."<br><br>";
 echo $mail ."<br><br>";
 echo $header ."<br><br>";
 echo $mensaje ."<br><br>";
  }

?>
