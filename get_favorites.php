<?php
session_start();
include 'conexao.php';

// Verifica se está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

// Busca as músicas salvas desse usuário (da mais recente para a mais antiga)
$sql = "SELECT * FROM musicas_salvas WHERE usuario_id = $usuario_id ORDER BY id DESC";
$result = $conn->query($sql);

$favoritas = [];

while ($row = $result->fetch_assoc()) {
    $favoritas[] = $row;
}

// Devolve a lista para o JavaScript
echo json_encode($favoritas);
?>