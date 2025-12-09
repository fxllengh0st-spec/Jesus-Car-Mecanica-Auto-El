export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  time: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Appointment {
  id: string;
  customerName: string;
  carModel: string;
  serviceType: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export enum AppView {
  HOME = 'HOME',
  ADMIN = 'ADMIN'
}