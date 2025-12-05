import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/AdicionarPet.css';

const AdicionarPet = () => {
  const [dadosPet, setDadosPet] = useState({
    nome: '',
    apelido: '',
    tipo: 'cachorro',
    raca: '',
    idade: '',
    dataNascimento: '',
    peso: '',
    sexo: 'macho',
    bio: '',
    vacinado: true,
    castrado: false
  });

  // Estado para a foto de perfil do pet
  const [imagemPreview, setImagemPreview] = useState(null); 
  // NOVO: Estado para a foto de capa do pet
  const [capaPreview, setCapaPreview] = useState(null); 

  const navigate = useNavigate();
  const { adicionarPet } = useAuth();

  const tiposPet = [
    { value: 'cachorro', label: 'Cachorro', icone: '🐕' },
    { value: 'gato', label: 'Gato', icone: '🐈' },
    { value: 'passaro', label: 'Pássaro', icone: '🐦' },
    { value: 'roedor', label: 'Roedor', icone: '🐹' },
    { value: 'reptil', label: 'Réptil', icone: '🦎' },
    { value: 'outro', label: 'Outro', icone: '🐾' }
  ];

  const racasPorTipo = {
    cachorro: ['Labrador', 'Golden Retriever', 'Poodle', 'Bulldog', 'Vira-lata', 'Pinscher', 'Pug', 'Shih Tzu', 'Outra'],
    gato: ['Siamês', 'Persa', 'Maine Coon', 'Sphynx', 'Vira-lata', 'Angorá', 'Outra'],
    passaro: ['Calopsita', 'Papagaio', 'Canário', 'Periquito', 'Outro'],
    roedor: ['Hamster', 'Porquinho-da-índia', 'Chinchila', 'Outro'],
    reptil: ['Iguana', 'Tartaruga', 'Lagarto', 'Outro'],
    outro: ['Outro']
  };

  const mudarDado = (e) => {
    const { name, value, type, checked } = e.target;
    setDadosPet(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImagemChange = (e, tipo) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (tipo === 'foto') {
          setImagemPreview(reader.result);
        } else if (tipo === 'capa') {
          setCapaPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const enviarForm = (e) => {
    e.preventDefault();
    
    // Criar objeto do pet com os dados do formulário
    const novoPet = {
      nome: dadosPet.nome,
      tipo: dadosPet.tipo,
      raca: dadosPet.raca,
      idade: dadosPet.idade,
      descricao: dadosPet.bio,
      foto: imagemPreview || getEmojiPorTipo(dadosPet.tipo), // Foto de Perfil
      capa: capaPreview, 
      apelido: dadosPet.apelido,
      peso: dadosPet.peso,
      sexo: dadosPet.sexo,
      vacinado: dadosPet.vacinado,
      castrado: dadosPet.castrado
    };

    const sucesso = adicionarPet(novoPet);
    
    if (sucesso) {
      console.log('✅ Pet cadastrado com sucesso!');
      navigate('/perfil');
    } else {
      console.error('❌ Falha ao cadastrar o pet.');
    }
  };

  const getEmojiPorTipo = (tipo) => {
    const emojis = {
      cachorro: '🐕',
      gato: '🐈',
      passaro: '🐦',
      roedor: '🐹',
      reptil: '🦎',
      outro: '🐾'
    };
    return emojis[tipo] || '🐾';
  };

  return (
    <div className="pagina-adicionar-pet">
      <div className="container-adicionar-pet">
        
        <div className="lado-esquerdo_1">
          <div className="cabecalho-adicionar-pet">
            <h1>Adicionar Novo Pet</h1>
            <p>Preencha as informações do seu pet para criar um perfil</p>
          </div>

          <div className="secao-uploads-pet">
            
            <div className="secao-upload foto-perfil-upload">
              <label className="label-upload">
                <span className="upload-titulo">Foto de Perfil (Quadrada)</span>
                <div className="area-upload is-perfil">
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="Preview" className="preview-imagem" />
                  ) : (
                    <div className="placeholder-upload">
                      <span className="icone-upload">🖼️</span>
                      <span>Clique para adicionar</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImagemChange(e, 'foto')}
                    className="input-upload"
                  />
                </div>
              </label>
            </div>

            <div className="secao-upload foto-capa-upload">
              <label className="label-upload">
                <span className="upload-titulo">Foto de Capa (Horizontal)</span>
                <div className="area-upload is-capa">
                  {capaPreview ? (
                    <img src={capaPreview} alt="Preview da Capa" className="preview-imagem-capa" />
                  ) : (
                    <div className="placeholder-upload">
                      <span className="icone-upload">🏞️</span>
                      <span>Adicionar Capa</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImagemChange(e, 'capa')}
                    className="input-upload"
                  />
                </div>
              </label>
            </div>

          </div>
        </div>

        <div className="lado-direito">
          <form onSubmit={enviarForm} className="formulario-adicionar-pet">
            
            <div className="grupo-campos">
              <div className="grupo-form">
                <label htmlFor="nome">Nome do Pet *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={dadosPet.nome}
                  onChange={mudarDado}
                  placeholder="Ex: Luna, Thor, Mel"
                  required
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="apelido">Apelido</label>
                <input
                  type="text"
                  id="apelido"
                  name="apelido"
                  value={dadosPet.apelido}
                  onChange={mudarDado}
                  placeholder="Ex: luninha, thorzinho"
                />
              </div>
            </div>

            <div className="grupo-campos">
              <div className="grupo-form">
                <label htmlFor="tipo">Tipo de Pet *</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={dadosPet.tipo}
                  onChange={mudarDado}
                  required
                >
                  {tiposPet.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.icone} {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grupo-form">
                <label htmlFor="raca">Raça *</label>
                <select
                  id="raca"
                  name="raca"
                  value={dadosPet.raca}
                  onChange={mudarDado}
                  required
                >
                  <option value="">Selecione a raça</option>
                  {racasPorTipo[dadosPet.tipo]?.map(raca => (
                    <option key={raca} value={raca}>
                      {raca}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grupo-campos">
              <div className="grupo-form">
                <label htmlFor="idade">Idade (anos) *</label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  value={dadosPet.idade}
                  onChange={mudarDado}
                  min="0"
                  max="30"
                  placeholder="0"
                  required
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={dadosPet.dataNascimento}
                  onChange={mudarDado}
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="peso">Peso (kg)</label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={dadosPet.peso}
                  onChange={mudarDado}
                  min="0"
                  step="0.1"
                  placeholder="28.5"
                />
              </div>
            </div>

            <div className="grupo-form">
              <label>Sexo *</label>
              <div className="opcoes-sexo">
                <label className="opcao-sexo">
                  <input
                    type="radio"
                    name="sexo"
                    value="macho"
                    checked={dadosPet.sexo === 'macho'}
                    onChange={mudarDado}
                  />
                  <div className="indicador-sexo"></div>
                  <span>Macho</span>
                </label>
                <label className="opcao-sexo">
                  <input
                    type="radio"
                    name="sexo"
                    value="femea"
                    checked={dadosPet.sexo === 'femea'}
                    onChange={mudarDado}
                  />
                  <div className="indicador-sexo"></div>
                  <span>Fêmea</span>
                </label>
              </div>
            </div>
            <div className="grupo-form">
              <label>Saúde</label>
              <div className="opcoes-saude">
                <label className="opcao-saude">
                  <input
                    type="checkbox"
                    name="vacinado"
                    checked={dadosPet.vacinado}
                    onChange={mudarDado}
                  />
                  <div className="checkmark"></div>
                  <div className="info-saude">
                    <span className="rotulo-saude">Vacinado</span>
                    <span className="descricao-saude">Todas as vacinas em dia</span>
                  </div>
                </label>
                <label className="opcao-saude">
                  <input
                    type="checkbox"
                    name="castrado"
                    checked={dadosPet.castrado}
                    onChange={mudarDado}
                  />
                  <div className="checkmark"></div>
                  <div className="info-saude">
                    <span className="rotulo-saude">Castrado</span>
                    <span className="descricao-saude">Procedimento realizado</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="grupo-form">
              <label htmlFor="bio">Sobre o Pet</label>
              <textarea
                id="bio"
                name="bio"
                value={dadosPet.bio}
                onChange={mudarDado}
                placeholder="Conte um pouco sobre a personalidade, hábitos e características do seu pet..."
                rows="4"
              />
            </div>
            <div className="acoes-formulario">
              <button 
                type="button" 
                className="botao-secundario"
                onClick={() => navigate('/perfil')}
              >
                Cancelar
              </button>
              <button type="submit" className="botao-principal">
                Cadastrar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdicionarPet;