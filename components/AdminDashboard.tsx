import React, { useState } from 'react';
import { generateTechnicalExplanation } from '../services/geminiService';
import { Wrench, MessageSquare, Clipboard, Share2, Check, Calendar, Clock, Car, User } from 'lucide-react';
import { Appointment } from '../types';

interface AdminDashboardProps {
  appointments: Appointment[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments }) => {
  const [activeTab, setActiveTab] = useState<'workbench' | 'agenda'>('agenda');
  
  // Workbench State
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [generatedExplanation, setGeneratedExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleGenerate = async () => {
    if (!symptoms || !diagnosis) return;
    setIsGenerating(true);
    const result = await generateTechnicalExplanation(symptoms, diagnosis);
    setGeneratedExplanation(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedExplanation);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleWhatsappShare = (text: string, phone?: string) => {
    const encoded = encodeURIComponent(text);
    const url = phone 
      ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('agenda')}
          className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'agenda' 
              ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' 
              : 'bg-brand-800 text-slate-400 hover:text-white hover:bg-brand-700'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Agenda ({appointments.filter(a => a.status === 'Pendente').length})
        </button>
        <button
          onClick={() => setActiveTab('workbench')}
          className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'workbench' 
              ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' 
              : 'bg-brand-800 text-slate-400 hover:text-white hover:bg-brand-700'
          }`}
        >
          <Wrench className="w-5 h-5" />
          Workbench IA
        </button>
      </div>

      {activeTab === 'workbench' && (
        <div className="bg-brand-800 rounded-2xl p-6 md:p-8 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-brand-accent/10 rounded-xl">
              <Wrench className="w-8 h-8 text-brand-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Workbench Digital</h2>
              <p className="text-slate-400">Ferramenta para explicar problemas técnicos aos clientes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  O que o cliente relatou? (Sintomas)
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Ex: Barulho 'tec tec' ao virar o volante, luz da bateria acesa..."
                  className="w-full h-32 bg-brand-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Qual é o diagnóstico técnico?
                </label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Ex: Homocinética estourada lado direito, precisa trocar coifa e graxa..."
                  className="w-full h-32 bg-brand-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !symptoms || !diagnosis}
                className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    Gerar Explicação Simples
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-brand-900 rounded-xl p-6 border border-slate-700 flex flex-col h-full">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                Mensagem para o Cliente
              </h3>
              
              <div className="flex-1 bg-brand-800 rounded-lg p-4 text-slate-300 text-sm leading-relaxed overflow-y-auto mb-4 border border-slate-700/50 min-h-[200px]">
                {generatedExplanation ? (
                  generatedExplanation.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 italic text-center opacity-60">
                    <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                    <p>Preencha os campos e gere a mensagem.</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  disabled={!generatedExplanation}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-300 ${
                    hasCopied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-brand-700 hover:bg-brand-600 text-white disabled:opacity-50 disabled:hover:bg-brand-700'
                  }`}
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleWhatsappShare(generatedExplanation)}
                  disabled={!generatedExplanation}
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Enviar no Zap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agenda' && (
        <div className="bg-brand-800 rounded-2xl p-6 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-4 min-h-[500px]">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Solicitações de Agendamento</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Pendente
                </span>
                <span className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Confirmado
                </span>
              </div>
           </div>

           {appointments.length === 0 ? (
             <div className="text-center py-20 opacity-50">
               <Calendar className="w-16 h-16 text-slate-500 mx-auto mb-4" />
               <p className="text-slate-400 text-lg">Nenhum agendamento recebido ainda.</p>
             </div>
           ) : (
             <div className="grid gap-4">
               {[...appointments].reverse().map((appt) => (
                 <div key={appt.id} className="bg-brand-900 border border-slate-700 rounded-xl p-5 hover:border-brand-blue transition-colors group">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      
                      {/* Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-white font-bold text-lg">{appt.customerName}</h3>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${appt.status === 'Pendente' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                            {appt.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                           <div className="flex items-center gap-1">
                             <Car className="w-4 h-4 text-brand-accent" />
                             {appt.carModel}
                           </div>
                           <div className="flex items-center gap-1">
                             <Wrench className="w-4 h-4 text-brand-accent" />
                             {appt.serviceType}
                           </div>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex flex-col md:items-end justify-center min-w-[150px]">
                        <div className="flex items-center gap-2 text-white font-medium">
                           <Calendar className="w-4 h-4 text-brand-blue" />
                           {new Date(appt.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                           <Clock className="w-4 h-4" />
                           {appt.time}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 md:pt-0 md:border-l md:border-slate-800 md:pl-4">
                        <button 
                          onClick={() => handleWhatsappShare(`Olá ${appt.customerName}! Recebemos seu pedido de agendamento para o ${appt.carModel} dia ${new Date(appt.date).toLocaleDateString('pt-BR')} às ${appt.time}. Podemos confirmar?`, appt.phone)}
                          className="bg-green-600 hover:bg-green-500 text-white p-2.5 rounded-lg transition-colors"
                          title="Confirmar no WhatsApp"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;