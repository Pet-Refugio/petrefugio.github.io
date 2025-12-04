import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/principal/Servicos.css';

const servicosData = [
    { id: 1, nome: 'Veterinário de Emergência', icone: '🏥', descricao: 'Atendimento 24 horas para urgências e consultas.', cor: '#007BFF' },
    { id: 2, nome: 'Hotel e Creche', icone: '🏨', descricao: 'Hospedagem segura e diversão diária para seu pet.', cor: '#28A745' },
    { id: 3, nome: 'Banho e Tosa', icone: '🛁', descricao: 'Serviços de estética completos, com hora marcada.', cor: '#FFC107' },
    { id: 4, nome: 'Treinador Comportamental', icone: '🧠', descricao: 'Treinamento focado em obediência e correção de hábitos.', cor: '#DC3545' },
    { id: 5, nome: 'Pet Sitter', icone: '🚶‍♀️', descricao: 'Cuidado em casa e passeios diários quando você estiver ocupado.', cor: '#17A2B8' },
    { id: 6, nome: 'Adoção', icone: '🏡', descricao: 'Encontre seu novo melhor amigo ou divulgue um pet para adoção.', cor: '#6F42C1' },
];

const prestadoresData = [
    { id: 101, servicoId: 1, nome: 'Dr. Lucas Costa', especialidade: 'Clínico Geral', avaliacao: 4.8, cor: '#007BFF' },
    { id: 102, servicoId: 1, nome: 'Clínica Pet Feliz', especialidade: 'Consulta e Cirurgia', avaliacao: 4.5, cor: '#007BFF' },
    { id: 103, servicoId: 2, nome: 'Cão Amigo Hotel', especialidade: 'Hospedagem de Luxo', avaliacao: 5.0, cor: '#28A745' },
    { id: 104, servicoId: 2, nome: 'Tia Carol - Creche', especialidade: 'Creche Diária', avaliacao: 4.7, cor: '#28A745' },
    { id: 105, servicoId: 3, nome: 'Estética Pet Show', especialidade: 'Banho e Tosa Completa', avaliacao: 4.9, cor: '#FFC107' },
    { id: 106, servicoId: 3, nome: 'Groomer Max', especialidade: 'Tosa Artística', avaliacao: 4.6, cor: '#FFC107' },
    { id: 107, servicoId: 4, nome: 'Treinador Alex', especialidade: 'Comportamento Canino', avaliacao: 4.9, cor: '#DC3545' },
    { id: 108, servicoId: 4, nome: 'Adestramento Total', especialidade: 'Obediência Básica', avaliacao: 4.4, cor: '#DC3545' },
    { id: 109, servicoId: 5, nome: 'Pet Sitter Júlia', especialidade: 'Passeios e Visitas', avaliacao: 4.8, cor: '#17A2B8' },
    { id: 110, servicoId: 5, nome: 'Vizinhança Solidária', especialidade: 'Rede de Pet Sitters', avaliacao: 4.3, cor: '#17A2B8' },
    { id: 111, servicoId: 6, nome: 'ONG Cão Feliz', especialidade: 'Adoção de cães', avaliacao: 5.0, cor: '#6F42C1' },
    { id: 112, servicoId: 6, nome: 'S.O.S Gatos', especialidade: 'Adoção de gatos', avaliacao: 4.9, cor: '#6F42C1' },
];

const Servicos = () => {
    const navigate = useNavigate();
    const [expandedServiceId, setExpandedServiceId] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    };

    const togglePrestadores = (id) => {
        setExpandedServiceId(expandedServiceId === id ? null : id);
    };

    const getPrestadoresPorServico = (servicoId) => {
        return prestadoresData.filter(p => p.servicoId === servicoId);
    };

    const getIniciaisNome = (nome) => {
        return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const handleContato = (e, prestadorNome) => {
        e.stopPropagation();
        alert(`Contato com ${prestadorNome} em desenvolvimento!`);
    };

    return (
        <div className="pagina-servicos">
            <button className="botao-voltar" onClick={handleGoBack}>
                Voltar
            </button>
            <div className="cabecalho-servicos">
                <h1>Serviços PetRefugio 🐾</h1>
                <p>Encontre os melhores profissionais e serviços para o seu pet.</p>
            </div>

            <div className="lista-servicos">
                {servicosData.map((servico) => {
                    const isExpanded = expandedServiceId === servico.id;
                    const prestadores = getPrestadoresPorServico(servico.id);

                    return (
                        <div 
                            className={`card-servico ${isExpanded ? 'expanded' : ''}`} 
                            key={servico.id} 
                            style={{ '--cor-card': servico.cor }}
                        >
                            <div className="card-cabecalho">
                                <div className="icone-servico">{servico.icone}</div>
                                <div className="info-servico">
                                    <h2>{servico.nome}</h2>
                                    <p>{servico.descricao}</p>
                                </div>
                            </div>

                            <button 
                                className={`botao-servico ${isExpanded ? 'active' : ''}`}
                                onClick={() => togglePrestadores(servico.id)}
                            >
                                {isExpanded ? 'Ocultar Prestadores' : 'Ver Prestadores'}
                            </button>

                            {isExpanded && (
                                <div className="lista-prestadores">
                                    {prestadores.map(prestador => (
                                        <div className="prestador-card" key={prestador.id}>
                                            <div className="prestador-avatar" style={{ backgroundColor: prestador.cor }}>
                                                {getIniciaisNome(prestador.nome)}
                                            </div>
                                            <div className="prestador-info">
                                                <span>{prestador.nome}</span>
                                                <small>{prestador.especialidade}</small>
                                            </div>
                                            <div className="prestador-avaliacao">
                                                {prestador.avaliacao} ⭐
                                            </div>
                                            <button 
                                                className="botao-contato-prestador"
                                                onClick={(e) => handleContato(e, prestador.nome)}
                                                title="Entrar em contato"
                                            >
                                                📞
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Servicos;