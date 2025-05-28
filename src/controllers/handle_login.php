<?php
session_start();
require_once __DIR__ . '/../models/User.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    
    $user = new User();
    $user->email = $email;
    
    if($user->emailExists() && $user->verifyPassword($senha)) {
        // Login bem-sucedido
        $_SESSION['user_id'] = $user->id;
        $_SESSION['user_email'] = $user->email;
        $_SESSION['user_nome'] = $user->nome;
        $_SESSION['user_tipo'] = $user->tipo;
        
        header('Location: /perfil.php');
        exit;
    } else {
        // Login falhou
        header('Location: /login.php?error=Email+ou+senha+incorretos');
        exit;
    }
} else {
    header('Location: /login.php');
    exit;
}
?>
