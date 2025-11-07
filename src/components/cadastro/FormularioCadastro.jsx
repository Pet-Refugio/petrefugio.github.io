// src/components/cadastro/FormularioCadastro.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 👈 NOVO: Importa o contexto
import { cadastrar } from '../../services/api';     // 👈 NOVO: Importa a função (ajustada para ser chamada diretamente)

// Importa o CSS original (caminho ajustado para a profundidade do componente)
import '../../styles/cadastro/formulario.css'; 

const FormularioCadastro = () => {
  const { login } = useAuth(); // 👈 NOVO: Pega a função de login do contexto
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    tipoConta: 'pessoal',
    nome: '',
    nascimento: '',
    email: '',
    documento: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const tiposConta = [
    { value: 'pessoal', label: 'Pessoal', icone: '👤' },
    { value: 'petshop', label: 'Pet Shop', icone: '🏪' },
    { value: 'veterinario', label: 'Veterinário', icone: '🐾' },
    { value: 'ong', label: 'ONG', icone: '❤️' },
    { value: 'prestador', label: 'Prestador', icone: '🔧' },
    { value: 'hotel', label: 'Hotel', icone: '🏨' }
  ];

  const mudarDado = (e) => {
    const { name, value } = e.target;
    setDados(prev => ({
      ...prev,
      [name]: value
    }));
    if (erro) setErro('');
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    
    // --- Validações ---
    if (dados.senha !== dados.confirmarSenha) {
      setErro('As senhas não coincidem');
      setCarregando(false);
      return;
    }
    
    if (dados.senha.length < 6) {
      setErro('Senha precisa ter 6+ caracteres');
      setCarregando(false);
      return;
    }

    if (dados.tipoConta !== 'pessoal' && !dados.documento) {
      setErro('Documento é obrigatório para este tipo de conta');
      setCarregando(false);
      return;
    }
    // --- Fim Validações ---
    
    try {
      // Chama a função cadastrar (que está no api.js)
      const resultado = await cadastrar(dados);
      
      if (resultado.success) {
        // Usa a função login do AuthContext para salvar estado e localStorage
        login(resultado.data, resultado.token); 
        
        console.log('Cadastro realizado com sucesso!', resultado.data);
        alert('Cadastro realizado com sucesso! Redirecionando...');
        
        // Navega para a área principal
        navigate('/principal', { replace: true });
      } else {
        setErro(resultado.message);
      }
    } catch (error) {
      setErro(error.message || 'Erro ao conectar com o servidor. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-cadastro-lateral">
      <div className="card-tipos-conta">
        <h3>Selecione o Tipo de Conta</h3>
        <div className="opcoes-conta-lateral">
          {tiposConta.map((tipo) => (
            <label key={tipo.value} className="opcao-conta-lateral">
              <input
                type="radio"
                name="tipoConta"
                value={tipo.value}
                checked={dados.tipoConta === tipo.value}
                onChange={mudarDado}
              />
              <div className="card-opcao">
                <span className="icone-opcao-lateral">{tipo.icone}</span>
                <span className="texto-opcao-lateral">{tipo.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="card-formulario-lateral">
        <h2>Criar Conta</h2>
        
        {erro && <div className="erro-lateral">{erro}</div>}
        
        <form onSubmit={enviarForm} className="form-lateral">
          <div className="grupo-form-lateral">
            <label htmlFor="nome">
              {dados.tipoConta === 'pessoal' ? 'Nome Completo' : 
               dados.tipoConta === 'veterinario' ? 'Nome do Veterinário' :
               dados.tipoConta === 'ong' ? 'Nome da ONG' :
               dados.tipoConta === 'petshop' ? 'Nome do Pet Shop' :
               dados.tipoConta === 'hotel' ? 'Nome do Hotel' :
               'Nome do Prestador'}
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
                dados.tipoConta === 'ong' ? 'Nome da organização' :
                dados.tipoConta === 'petshop' ? 'Nome do estabelecimento' :
                dados.tipoConta === 'hotel' ? 'Nome do hotel' :
                'Nome do prestador de serviço'
              }
              required 
            />
          </div>

          {dados.tipoConta !== 'pessoal' && (
            <div className="grupo-form-lateral condicional">
              <label htmlFor="documento">
                {dados.tipoConta === 'petshop' ? 'CNPJ' :
                 dados.tipoConta === 'veterinario' ? 'CRMV' :
                 dados.tipoConta === 'ong' ? 'CNPJ da ONG' :
                 dados.tipoConta === 'hotel' ? 'CNPJ' :
                 'Documento Profissional'}
              </label>
              <input 
                type="text" 
                id="documento" 
                name="documento" 
                value={dados.documento}
                onChange={mudarDado}
                placeholder={
                  dados.tipoConta === 'petshop' ? '00.000.000/0000-00' :
                  dados.tipoConta === 'veterinario' ? 'Número do CRMV' :
                  dados.tipoConta === 'ong' ? 'CNPJ da organização' :
                  dados.tipoConta === 'hotel' ? 'CNPJ do estabelecimento' :
                  'Documento profissional'
                }
                required
              />
            </div>
          )}
          
          <div className="grupo-form-lateral">
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
          
          <div className="grupo-form-lateral">
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
          
          <div className="campos-senha-lateral">
            <div className="grupo-form-lateral">
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
            
            <div className="grupo-form-lateral">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input 
                type="password" 
                id="confirmarSenha" 
                name="confirmarSenha" 
                value={dados.confirmarSenha}
                onChange={mudarDado}
                placeholder="Digite novamente"
                required 
              />
            </div>
          </div>

          <div className="acoes-lateral">
            <button 
              type="submit" 
              className="botao-principal-lateral"
              disabled={carregando}
              >
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <Link to="/" className="botao-voltar-lateral">Voltar</Link>
          </div>
        </form>
        
        <div className="links-lateral">
          Já tem conta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default FormularioCadastro;