<?php
require_once __DIR__ . '/../config/database.php';

class User {
    private $conn;
    private $table = 'usuarios';

    // Propriedades do usuário
    public $id;
    public $nome;
    public $email;
    public $senha;
    public $tipo;
    public $complemento;
    public $criado_em;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Criar usuário
    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
                 SET nome = :nome, 
                     email = :email, 
                     senha = :senha, 
                     tipo = :tipo, 
                     complemento = :complemento';

        $stmt = $this->conn->prepare($query);

        // Hash da senha
        $this->senha = password_hash($this->senha, PASSWORD_BCRYPT);

        // Limpar dados
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $complemento_json = json_encode($this->complemento);

        // Vincular parâmetros
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':senha', $this->senha);
        $stmt->bindParam(':tipo', $this->tipo);
        $stmt->bindParam(':complemento', $complemento_json);

        if($stmt->execute()) {
            return true;
        }

        printf("Erro: %s.\n", $stmt->error);
        return false;
    }

    // Verificar se email existe
    public function emailExists() {
        $query = 'SELECT id, nome, email, senha, tipo 
                  FROM ' . $this->table . ' 
                  WHERE email = ? 
                  LIMIT 0,1';

        $stmt = $this->conn->prepare($query);
        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        $num = $stmt->rowCount();

        if($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->nome = $row['nome'];
            $this->senha = $row['senha'];
            $this->tipo = $row['tipo'];
            return true;
        }

        return false;
    }

    // Verificar senha
    public function verifyPassword($password) {
        return password_verify($password, $this->senha);
    }
}
?>
