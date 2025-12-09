import { ServiceItem, Review } from './types';

export const BUSINESS_INFO = {
  name: "Jesus Car Mecânica e Auto Elétrica",
  address: "R. Yoshimara Minamoto, 930 - Jardim Casablanca, São Paulo - SP, 05847-620",
  phone: "(11) 96466-9312",
  rating: 4.9,
  reviewCount: 32,
  mapLink: "https://maps.app.goo.gl/BFxqKbdVZbdZSodX8",
  whatsapp: "5511964669312"
};

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Auto Elétrica',
    icon: 'Zap',
    description: 'Diagnóstico computadorizado, alternadores, baterias e reparos elétricos complexos.'
  },
  {
    id: '2',
    title: 'Mecânica Geral',
    icon: 'Wrench',
    description: 'Suspensão, freios, troca de óleo, correias e revisão completa.'
  },
  {
    id: '3',
    title: 'Injeção Eletrônica',
    icon: 'Activity',
    description: 'Limpeza de bicos, rastreamento de falhas e otimização de consumo.'
  },
  {
    id: '4',
    title: 'Ar Condicionado',
    icon: 'Thermometer',
    description: 'Higienização, carga de gás e manutenção do sistema de arrefecimento.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Gilberto Miranda Biliu',
    rating: 5,
    text: 'Profissional super competente e preço justo. E sempre preocupado em atender o cliente da melhor forma possível.',
    time: '3 anos atrás'
  },
  {
    id: '2',
    author: 'Edgar Silva',
    rating: 5,
    text: 'Excelente oficina. Sem palavras para descrever o serviço prestado pelo Rodrigo, um ótimo profissional.',
    time: '5 anos atrás'
  },
  {
    id: '3',
    author: 'Marcos Rocha',
    rating: 5,
    text: 'Muito bom! Melhor lugar para levar o carro, mecânico honesto e profissional!',
    time: '6 anos atrás'
  }
];