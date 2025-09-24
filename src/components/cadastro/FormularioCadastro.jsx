import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/cadastro/formulario.css';

const FormularioCadastro = () => {
  const [dados, setDados] = useState({
    tipoConta: 'pessoal', // Valor padrão
    nome: '',
    nascimento: '',
    email: '',
    documento: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Opções de tipo de conta
  const tiposConta = [
    { value: 'pessoal', label: 'Conta Pessoal', icone: '👤' },
    { value: 'comercio', label: 'Comércio', icone: '🏪' },
    { value: 'veterinario', label: 'Veterinário', icone: '🐾' },
    { value: 'ong', label: 'ONG', icone: '❤️' }
  ];

  const mudarDado = (e) => {
    const { name, value } = e.target;
    setDados(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const enviarForm = (e) => {
    e.preventDefault();
    
    // Validações
    if (dados.senha !== dados.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }
    
    if (dados.senha.length < 6) {
      setErro('Senha precisa ter 6+ caracteres');
      return;
    }

    // Validação específica para contas não-pessoais
    if (dados.tipoConta !== 'pessoal' && !dados.documento) {
      setErro('Documento é obrigatório para este tipo de conta');
      return;
    }
    
    console.log('Dados enviados:', dados);
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <div className="card-cadastro">
      <h2>Criar Conta</h2>
      
      {erro && <div className="erro">{erro}</div>}
      
      <form onSubmit={enviarForm}>
        
        {/* Seleção do Tipo de Conta */}
        <div className="grupo-form">
          <label>Tipo de Conta</label>
          <div className="opcoes-conta">
            {tiposConta.map((tipo) => (
              <label key={tipo.value} className="opcao-conta">
                <input
                  type="radio"
                  name="tipoConta"
                  value={tipo.value}
                  checked={dados.tipoConta === tipo.value}
                  onChange={mudarDado}
                />
                <span className="icone-opcao">{tipo.icone}</span>
                <span className="texto-opcao">{tipo.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grupo-form">
          <label htmlFor="nome">
            {dados.tipoConta === 'pessoal' ? 'Nome Completo' : 
             dados.tipoConta === 'veterinario' ? 'Nome do Veterinário' :
             'Nome/Razão Social'}
          </label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value={dados.nome}
            onChange={mudarDado}
            placeholder={
              dados.tipoConta === 'pessoal' ? 'Seu nome completo' :
              dados.tipoConta === 'veterinario' ? 'Nome do profissional' :
              'Nome da empresa/entidade'
            }
            required 
          />
        </div>

        {/* Campo de documento para contas não-pessoais */}
        {dados.tipoConta !== 'pessoal' && (
          <div className="grupo-form">
            <label htmlFor="documento">
              {dados.tipoConta === 'comercio' ? 'CNPJ' :
               dados.tipoConta === 'veterinario' ? 'CRMV' :
               'CNPJ da ONG'}
            </label>
            <input 
              type="text" 
              id="documento" 
              name="documento" 
              value={dados.documento}
              onChange={mudarDado}
              placeholder={
                dados.tipoConta === 'comercio' ? '00.000.000/0000-00' :
                dados.tipoConta === 'veterinario' ? 'Número do CRMV' :
                'CNPJ da organização'
              }
            />
          </div>
        )}
        
        <div className="grupo-form">
          <label htmlFor="nascimento">
            {dados.tipoConta === 'pessoal' ? 'Data de Nascimento' : 'Data de Fundação'}
          </label>
          <input 
            type="date" 
            id="nascimento" 
            name="nascimento" 
            value={dados.nascimento}
            onChange={mudarDado}
            required 
          />
        </div>
        
        <div className="grupo-form">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={dados.email}
            onChange={mudarDado}
            placeholder="seu@email.com"
            required 
          />
        </div>
        
        <div className="grupo-form">
          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            id="senha" 
            name="senha" 
            value={dados.senha}
            onChange={mudarDado}
            placeholder="Mínimo 6 caracteres"
            required 
          />
        </div>
        
        <div className="grupo-form">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input 
            type="password" 
            id="confirmarSenha" 
            name="confirmarSenha" 
            value={dados.confirmarSenha}
            onChange={mudarDado}
            placeholder="Digite a senha novamente"
            required 
          />
        </div>
        
        <div className="acoes">
          <button type="submit" className="botao">Cadastrar</button>
          <Link to="/" className="botao secundario">Voltar</Link>
        </div>
      </form>
      
      <div className="links">
        Já tem conta? <Link to="/login">Entrar</Link>
      </div>
    </div>
  );
};

export default FormularioCadastro;