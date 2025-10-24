import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [imagemPreview, setImagemPreview] = useState(null);
  const navigate = useNavigate();

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

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const enviarForm = (e) => {
    e.preventDefault();
    
    // Simular cadastro do pet
    const novoPet = {
      id: Date.now(), // ID temporário
      tutorId: 101, // ID do usuário logado (será dinâmico)
      ...dadosPet,
      avatar: imagemPreview || '/assets/pets/pet-default.jpg',
      capa: '/assets/capas/pet-default.jpg',
      estatisticas: {
        posts: 0,
        seguidores: 0
      }
    };

    console.log('Novo pet cadastrado:', novoPet);
    alert('Pet cadastrado com sucesso!');
    navigate('/perfil');
  };

  return (
    <div className="pagina-adicionar-pet">
      <div className="container-adicionar-pet">
        
        {/* Lado Esquerdo - Upload e Info Visual */}
        <div className="lado-esquerdo">
          <div className="cabecalho-adicionar-pet">
            <h1>Adicionar Novo Pet</h1>
            <p>Preencha as informações do seu pet para criar um perfil</p>
          </div>

          {/* Upload de Foto */}
          <div className="secao-upload">
            <label className="label-upload">
              <div className="area-upload">
                {imagemPreview ? (
                  <img src={imagemPreview} alt="Preview" className="preview-imagem" />
                ) : (
                  <div className="placeholder-upload">
                    <span className="icone-upload">📷</span>
                    <span>Adicionar foto do pet</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="input-upload"
                />
              </div>
            </label>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="lado-direito">
          <form onSubmit={enviarForm} className="formulario-adicionar-pet">
            
            {/* Informações Básicas */}
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

            {/* Tipo e Raça */}
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

            {/* Idade e Peso */}
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

            {/* Sexo - Estilo Melhorado */}
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

            {/* Saúde - Estilo Melhorado */}
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

            {/* Bio */}
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

            {/* Ações */}
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
