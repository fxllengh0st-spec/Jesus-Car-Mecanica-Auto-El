import React from 'react';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Hero: React.FC = () => {
  const handleWhatsapp = () => {
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Olá, gostaria de agendar um horário na Jesus Car.`, '_blank');
  };

  return (
    <div className="relative bg-brand-900 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Oficina Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start items-center space-x-2 mb-6">
            <span className="bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
              Desde 2018 em Jardim Casablanca
            </span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-bold text-slate-200">4.9 (32 Avaliações)</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Confiança e Qualidade na <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-accent">
              Manutenção do Seu Carro
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-xl text-slate-300 mb-8">
            Especialistas em Auto Elétrica e Mecânica Geral. Diagnóstico preciso, preço justo e serviço honesto que você pode confiar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={handleWhatsapp}
              className="px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Agendar no WhatsApp
            </button>
            <a 
              href="#services"
              className="px-8 py-4 bg-brand-800 hover:bg-brand-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center"
            >
              Nossos Serviços
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-400 text-sm border-t border-slate-800 pt-8">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <Clock className="w-5 h-5 text-brand-accent" />
              <div>
                <p className="text-slate-200 font-medium">Horário de Funcionamento</p>
                <p>Seg-Sex: 08h às 18h</p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <MapPin className="w-5 h-5 text-brand-accent" />
              <div>
                <p className="text-slate-200 font-medium">Localização Fácil</p>
                <p>Jardim Casablanca, SP</p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-brand-accent flex items-center justify-center text-[10px] font-bold text-brand-accent">✓</div>
              <div>
                <p className="text-slate-200 font-medium">Comodidades</p>
                <p>Banheiro e Sala de Espera</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;