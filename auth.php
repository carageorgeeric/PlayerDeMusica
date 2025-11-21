<?php
session_start(); // Inicia a sessão para guardar quem está logado
include 'conexao.php'; // Pega a chave do banco

// Recebe a ação (se é 'login' ou 'cadastro')
$acao = $_POST['acao'];

// --- SE FOR CADASTRO ---
if ($acao == 'cadastro') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Criptografa a senha (segurança básica)
    // Assim, se alguém invadir o banco, não vê a senha real
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Verifica se o email já existe
    $sql_check = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        echo "<script>alert('Este email já está cadastrado!'); window.location.href='login.html';</script>";
    } else {
        // Insere no banco
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senhaHash')";
        
        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Cadastro realizado! Faça login agora.'); window.location.href='login.html';</script>";
        } else {
            echo "Erro: " . $conn->error;
        }
    }
}

// --- SE FOR LOGIN ---
elseif ($acao == 'login') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Busca o usuário pelo email
    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        // Verifica se a senha bate com a criptografia
        if (password_verify($senha, $usuario['senha'])) {
            // SUCESSO! Salva os dados na sessão
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nome'] = $usuario['nome'];

            // Manda para a página do player
            header("Location: index.php");
        } else {
            echo "<script>alert('Senha incorreta!'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('Usuário não encontrado!'); window.location.href='login.html';</script>";
    }
}
?>