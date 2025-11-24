<?php
session_start();
include 'conexao.php';


if (!isset($_SESSION['usuario_id'])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

$sql = "SELECT * FROM musicas_salvas WHERE usuario_id = $usuario_id ORDER BY id DESC";
$result = $conn->query($sql);

$favoritas = [];

while ($row = $result->fetch_assoc()) {
    $favoritas[] = $row;
}


echo json_encode($favoritas);
?>