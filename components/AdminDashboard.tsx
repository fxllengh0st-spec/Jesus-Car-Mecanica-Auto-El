import React, { useState } from 'react';
import { generateTechnicalExplanation } from '../services/geminiService';
import { Wrench, MessageSquare, Clipboard, Share2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [generatedExplanation, setGeneratedExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!symptoms || !diagnosis) return;
    setIsGenerating(true);
    const result = await generateTechnicalExplanation(symptoms, diagnosis);
    setGeneratedExplanation(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedExplanation);
    alert('Texto copiado!');
  };

  const handleWhatsappShare = () => {
    const text = encodeURIComponent(generatedExplanation);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-brand-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
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
              className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              {isGenerating ? (
                <>Gerando...</>
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
            
            <div className="flex-1 bg-brand-800 rounded-lg p-4 text-slate-300 text-sm leading-relaxed overflow-y-auto mb-4 border border-slate-700/50">
              {generatedExplanation ? (
                generatedExplanation.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))
              ) : (
                <p className="text-slate-500 italic text-center mt-10">
                  Preencha os campos ao lado e clique em gerar para criar uma mensagem explicativa.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={!generatedExplanation}
                className="flex-1 bg-brand-700 hover:bg-brand-600 disabled:opacity-50 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Clipboard className="w-4 h-4" />
                Copiar
              </button>
              <button
                onClick={handleWhatsappShare}
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
    </div>
  );
};

export default AdminDashboard;