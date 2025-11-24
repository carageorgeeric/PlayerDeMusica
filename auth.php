<?php
session_start(); 
include 'conexao.php'; 


$acao = $_POST['acao'];


if ($acao == 'cadastro') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];


    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);


    $sql_check = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        echo "<script>alert('Este email já está cadastrado!'); window.location.href='login.html';</script>";
    } else {
        
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senhaHash')";
        
        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Cadastro realizado! Faça login agora.'); window.location.href='login.html';</script>";
        } else {
            echo "Erro: " . $conn->error;
        }
    }
}


elseif ($acao == 'login') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];


    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();


        if (password_verify($senha, $usuario['senha'])) {

            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nome'] = $usuario['nome'];

    
            header("Location: index.php");
        } else {
            echo "<script>alert('Senha incorreta!'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('Usuário não encontrado!'); window.location.href='login.html';</script>";
    }
}
?>