import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCustomerResponse = async (history: string, userMessage: string): Promise<string> => {
  if (!apiKey) return "Desculpe, o sistema de IA está offline no momento. Por favor, ligue para a oficina.";

  try {
    const model = 'gemini-2.5-flash';
    const systemPrompt = `
      Você é o assistente virtual da "Jesus Car Mecânica e Auto Elétrica", uma oficina de confiança em São Paulo (Jardim Casablanca).
      
      Informações da empresa:
      - Endereço: R. Yoshimara Minamoto, 930.
      - Horário: Seg-Sex 08:00-18:00, Sáb 08:00-14:00. Dom fechado.
      - Avaliação: 4.9 estrelas no Google.
      - Diferenciais: Preço justo, honestidade, especialista em elétrica e mecânica.
      - Pagamento: Cartão crédito/débito, NFC.

      Seu objetivo:
      1. Ser educado e útil.
      2. Responder dúvidas sobre horários e serviços.
      3. Se o cliente relatar um problema no carro, dê uma hipótese muito breve e diga "Recomendamos agendar um diagnóstico para ter certeza".
      4. Sempre termine convidando para agendar pelo WhatsApp.

      Contexto da conversa:
      ${history}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + `\nCliente diz: ${userMessage}` }] }
      ]
    });

    return response.text || "Desculpe, não entendi. Pode repetir?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Estou tendo dificuldades técnicas. Por favor, use o botão do WhatsApp.";
  }
};

export const generateTechnicalExplanation = async (symptoms: string, diagnosis: string): Promise<string> => {
  if (!apiKey) return "Erro na API.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um assistente técnico para o mecânico chefe da Jesus Car.
      
      Entrada do Mecânico:
      - Sintomas relatados: "${symptoms}"
      - Diagnóstico técnico (o que o mecânico achou): "${diagnosis}"

      Tarefa:
      Gere uma mensagem para enviar ao cliente via WhatsApp.
      A mensagem deve ter:
      1. Uma explicação didática e simples do problema (analogias são boas).
      2. A gravidade do problema (Segurança? Apenas conforto?).
      3. Um tom profissional e transparente.
      
      Gere apenas o texto da mensagem.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt
    });

    return response.text || "Erro ao gerar explicação.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA.";
  }
};