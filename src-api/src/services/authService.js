
export const cadastrar = async (dadosUsuario) => {
    // Simula a lógica de DB e retorna os dados do novo usuário
    console.log("[SERVICE] Simulando inserção no DB:", dadosUsuario.email);
    
    // Simula a criação de um ID e retorna um objeto limpo
    return {
        id: Math.floor(Math.random() * 1000) + 1,
        nome: dadosUsuario.nome || 'Usuário Novo',
        email: dadosUsuario.email,
        tipo_conta: dadosUsuario.tipo_conta || 'pessoal',
        data_cadastro: new Date().toISOString()
    };
};

export const login = async (email, senha) => {
    // Simula a busca no DB e a validação da senha
    console.log("[SERVICE] Simulando login para:", email);
    
    // Simula sucesso de login
    return {
        usuario: { id: 100, nome: 'Usuário Simulado', email: email },
        token: 'simulated_jwt_token_43210' // Token simulado
    };
};