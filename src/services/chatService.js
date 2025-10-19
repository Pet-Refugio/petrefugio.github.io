export const chatService = {
  // Obter conversa com um amigo
  obterConversa: async (amigoId) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const conversas = {
      1: [
        { id: 1, remetente: 'eu', texto: 'Oi Ana! Como está o Thor?', tempo: '10:30', lida: true },
        { id: 2, remetente: 'amigo', texto: 'Oi! Ele está ótimo, acabamos de voltar do passeio! 🐕', tempo: '10:32', lida: true },
        { id: 3, remetente: 'amigo', texto: 'Você vai na feira de adoção sábado?', tempo: '10:33', lida: false }
      ],
      2: [
        { id: 1, remetente: 'eu', texto: 'Carlos, você viu minha postagem sobre o cachorro perdido?', tempo: '09:15', lida: true },
        { id: 2, remetente: 'amigo', texto: 'Vi sim! Vou compartilhar nos meus grupos! 🐶', tempo: '09:20', lida: true }
      ],
      3: [
        { id: 1, remetente: 'amigo', texto: 'Olá! Lembra da dica do veterinário sobre escovação?', tempo: '14:00', lida: false },
        { id: 2, remetente: 'eu', texto: 'Lembro sim! Já comprei a escova especial! 🦷', tempo: '14:05', lida: true }
      ]
    };

    return {
      success: true,
      data: conversas[amigoId] || []
    };
  },

  // Enviar mensagem
  enviarMensagem: async (amigoId, mensagem) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      data: {
        id: Date.now(),
        remetente: 'eu',
        texto: mensagem,
        tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        lida: false
      }
    };
  },

  // Marcar mensagens como lidas
  marcarComoLida: async (amigoId, mensagemId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  }
};

export default chatService;
