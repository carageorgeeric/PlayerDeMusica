<?php
session_start();
include 'conexao.php';

// 1. Verifica segurança
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Não autorizado"]);
    exit;
}

// 2. Recebe o ID da música a ser deletada
$dados = json_decode(file_get_contents("php://input"), true);
$id_musica_banco = $dados['id'];
$usuario_id = $_SESSION['usuario_id'];

if ($id_musica_banco) {
    // 3. Deleta APENAS se o ID bater e o usuário for o dono
    $sql = "DELETE FROM musicas_salvas WHERE id = ? AND usuario_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id_musica_banco, $usuario_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao deletar"]);
    }
}
?>