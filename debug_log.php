<?php
// Endpoint simple para recibir logs de debug
$logFile = __DIR__ . '/.cursor/debug.log';
$logDir = dirname($logFile);

// Crear directorio si no existe
if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

// Obtener datos del POST
$data = file_get_contents('php://input');
$logEntry = json_decode($data, true);

if ($logEntry) {
    $logEntry['timestamp'] = isset($logEntry['timestamp']) ? $logEntry['timestamp'] : time() * 1000;
    $logLine = json_encode($logEntry) . "\n";
    file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok']);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>