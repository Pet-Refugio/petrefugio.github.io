<?php
require_once __DIR__ . '/../models/User.php';

class AuthController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function register() {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

        $data = json_decode(file_get_contents("php://input"));

        $this->userModel->nome = $data->nome;
        $this->userModel->email = $data->email;
        $this->userModel->senha = $data->senha;
        $this->userModel->tipo = $data->tipo;
        $this->userModel->complemento = $data->complemento;

        // Verificar se email já existe
        if($this->userModel->emailExists()) {
            http_response_code(400);
            echo json_encode(array('message' => 'Email já cadastrado.'));
            return;
        }

        // Criar usuário
        if($this->userModel->create()) {
            http_response_code(201);
            echo json_encode(array(
                'message' => 'Usuário criado com sucesso',
                'user' => array(
                    'id' => $this->userModel->id,
                    'nome' => $this->userModel->nome,
                    'email' => $this->userModel->email,
                    'tipo' => $this->userModel->tipo
                )
            ));
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Erro ao criar usuário'));
        }
    }

    public function login() {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

        $data = json_decode(file_get_contents("php://input"));

        $this->userModel->email = $data->email;
        $password = $data->senha;

        // Verificar se email existe e senha está correta
        if($this->userModel->emailExists() && $this->userModel->verifyPassword($password)) {
            // Criar token (simplificado - em produção usar JWT)
            $token = bin2hex(random_bytes(32));
            
            http_response_code(200);
            echo json_encode(array(
                'message' => 'Login realizado com sucesso',
                'token' => $token,
                'user' => array(
                    'id' => $this->userModel->id,
                    'nome' => $this->userModel->nome,
                    'email' => $this->userModel->email,
                    'tipo' => $this->userModel->tipo
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array('message' => 'Login falhou'));
        }
    }
}
?>
