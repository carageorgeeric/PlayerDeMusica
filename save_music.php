<?php
session_start();
include 'conexao.php';

// 1. Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não logado!"]);
    exit;
}

// 2. Recebe os dados do JavaScript (JSON)
$dados = json_decode(file_get_contents("php://input"), true);

if ($dados) {
    $usuario_id = $_SESSION['usuario_id'];
    $nome = $dados['displayName'];
    $artista = $dados['artist'];
    $capa = $dados['cover'];
    $preview = $dados['path'];

    // 3. Prepara o comando SQL (INSERT)
    // Usamos (?) para evitar erros de aspas ou ataques hackers
    $sql = "INSERT INTO musicas_salvas (usuario_id, nome_musica, artista, capa, link_preview) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issss", $usuario_id, $nome, $artista, $capa, $preview);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Música salva com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Nenhum dado recebido."]);
}
?>