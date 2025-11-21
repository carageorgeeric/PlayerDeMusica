<?php
session_start();

// Verifica se o usuário NÃO está logado
if (!isset($_SESSION['usuario_id'])) {
    // Se não estiver, manda de volta para o login
    header("Location: login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> 
    
    <title>Player de Música</title>
</head>

<body>
    <div style="position: absolute; top: 20px; left: 20px; color: white; z-index: 100; font-family: sans-serif; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 10px;">
        Olá, <strong><?php echo $_SESSION['usuario_nome']; ?></strong>! 
        <a href="logout.php" style="color: #ff4081; margin-left: 10px; text-decoration: none;">Sair</a>
    </div>

    <div class="background">
        <img src="assets/2.png" id="bg-img"> 
    </div>

    <div class="container">
        
        <div class="player-img">
            <img src="assets/2.png" class="active" id="cover">
        </div>

        <h2 id="music-title">NomeDaMusica</h2>
        <h3 id="music-artist">NomeDoCantor</h3>

        <div class="player-progress" id="player-progress">
            <div class="progress" id="progress"></div>
            <div class="music-duration">
                <span id="current-time">0:00</span>
                <span id="duration">0:00</span>
            </div>
        </div>

        <div class="player-controls">
            <i class="fa-solid fa-backward" title="Anterior" id="prev"></i>
            <i class="fa-solid fa-play play-button" title="Tocar" id="play"></i>
            <i class="fa-solid fa-forward" title="Proxima" id="next"></i>
        </div>

        <div class="search-wrapper">
            <input type="text" id="search-input" placeholder="Buscar música ou artista...">
            
            <button id="search-button" title="Pesquisar">
                <i class="fa-solid fa-search"></i>
            </button>
            
            <button id="fav-button" title="Meus Favoritos">
                <i class="fa-solid fa-heart"></i>
            </button>

            <div class="loading" id="loading-spinner"></div>
        </div>

        <ul id="music-list" class="music-list">
            </ul>
        </div> <script src="main.js"></script>

</body>
</html>