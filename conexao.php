<?php
// conexao.php

$host = "localhost";
$usuario = "root";     // Usuário padrão do XAMPP
$senha = "";           // Senha padrão do XAMPP é vazia
$banco = "player_musica"; // O nome do banco que criámos

// Cria a conexão
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica se deu erro
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>