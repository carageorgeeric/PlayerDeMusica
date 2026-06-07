-- ============================================================
-- Banco de dados do Player de Música
-- Importe este arquivo no phpMyAdmin (ou via linha de comando)
-- para criar a estrutura necessária para o login e os favoritos.
--
--   mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS player_musica
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE player_musica;

-- ------------------------------------------------------------
-- Tabela de usuários (login e cadastro)
-- Usada por: auth.php
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(100)        NOT NULL,
    email VARCHAR(150)        NOT NULL UNIQUE,
    senha VARCHAR(255)        NOT NULL  -- armazena o hash gerado por password_hash()
);

-- ------------------------------------------------------------
-- Tabela de músicas salvas (favoritos)
-- Usada por: save_music.php, get_favorites.php, remover_musica.php
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS musicas_salvas (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id   INT          NOT NULL,
    nome_musica  VARCHAR(255) NOT NULL,
    artista      VARCHAR(255) NOT NULL,
    capa         VARCHAR(500),
    link_preview VARCHAR(500),
    CONSTRAINT fk_musicas_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);
