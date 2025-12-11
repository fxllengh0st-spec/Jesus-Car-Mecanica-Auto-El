import React, { useState } from 'react';
import { Calendar, Car, User, Phone, Wrench, CheckCircle } from 'lucide-react';
import { SERVICES } from '../constants';
import { Appointment } from '../types';

interface AppointmentFormProps {
  onSchedule: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSchedule }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    carModel: '',
    serviceType: SERVICES[0].title,
    date: '',
    time: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="agendamento" className="py-20 bg-brand-900 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-brand-800/50 border border-brand-blue/30 rounded-2xl p-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Solicitação Enviada!</h3>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Recebemos seu pedido de agendamento para <strong>{formData.carModel}</strong>. 
              Nossa equipe confirmará a disponibilidade pelo WhatsApp em breve.
            </p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ ...formData, customerName: '', phone: '', carModel: '', date: '', time: '' });
              }}
              className="text-brand-blue hover:text-white font-medium underline transition-colors"
            >
              Fazer outro agendamento
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendamento" className="py-20 bg-brand-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <span className="text-brand-accent font-semibold tracking-wider uppercase text-sm">Planejamento</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-6">
              Agende sua visita <br />
              <span className="text-brand-blue">Sem Sair de Casa</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Evite filas e garanta o melhor horário para a manutenção do seu veículo. 
              Preencha o formulário e nossa equipe entrará em contato para confirmar.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-800 rounded-lg text-brand-blue">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Horário Flexível</h4>
                  <p className="text-slate-500 text-sm">Escolha o melhor dia e período.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-800 rounded-lg text-brand-blue">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Diagnóstico Prévio</h4>
                  <p className="text-slate-500 text-sm">Descreva o serviço para prepararmos as peças.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Seu Nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: João Silva"
                      className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white focus:outline-none focus:border-brand-blue transition-colors"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input 
                      required
                      type="tel" 
                      placeholder="(11) 99999-9999"
                      className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white focus:outline-none focus:border-brand-blue transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Modelo do Carro</label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: Volkswagen Gol 1.6 2018"
                    className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white focus:outline-none focus:border-brand-blue transition-colors"
                    value={formData.carModel}
                    onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Serviço Desejado</label>
                <div className="relative">
                  <select 
                    className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-brand-blue appearance-none"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Outro">Outro / Não sei explicar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Data Preferida</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-brand-blue"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Hora</label>
                  <input 
                    required
                    type="time" 
                    className="w-full bg-brand-900 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-brand-blue"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 mt-2"
              >
                Solicitar Agendamento
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;