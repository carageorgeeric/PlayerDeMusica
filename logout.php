<?php
session_start();
session_destroy(); // Destrói a sessão
header("Location: login.html"); // Manda de volta para o login
?>