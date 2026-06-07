<?php
session_start();
include 'conexao.php';


if (!isset($_SESSION['usuario_id'])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

$stmt = $conn->prepare("SELECT * FROM musicas_salvas WHERE usuario_id = ? ORDER BY id DESC");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$favoritas = [];

while ($row = $result->fetch_assoc()) {
    $favoritas[] = $row;
}


echo json_encode($favoritas);
?>