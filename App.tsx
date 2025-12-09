import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/AdminDashboard';
import { AppView } from './types';
import { Wrench, ShieldCheck, LogIn } from 'lucide-react';
import { BUSINESS_INFO } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const toggleView = () => {
    setCurrentView(prev => prev === AppView.HOME ? AppView.ADMIN : AppView.HOME);
  };

  return (
    <div className="min-h-screen bg-brand-900 text-slate-100 font-sans selection:bg-brand-accent selection:text-brand-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-brand-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
              <div className="bg-gradient-to-tr from-brand-blue to-brand-accent p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block leading-none">Jesus Car</span>
                <span className="text-xs text-brand-accent tracking-wide uppercase font-semibold">Mecânica & Elétrica</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {currentView === AppView.HOME ? (
                <>
                  <a href="#services" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Serviços</a>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Sobre</a>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Localização</a>
                  <button 
                    onClick={toggleView}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs border border-slate-700 px-3 py-1.5 rounded-full"
                  >
                    <LogIn className="w-3 h-3" />
                    Área do Mecânico
                  </button>
                </>
              ) : (
                <button 
                  onClick={toggleView}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Voltar para o Site
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentView === AppView.HOME ? (
          <>
            <Hero />
            <Services />
            
            {/* Trust Banner */}
            <section className="bg-brand-blue py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-around items-center gap-8 text-center md:text-left">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Garantia no Serviço</p>
                    <p className="text-blue-100 text-sm">Qualidade assegurada em reparos.</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20 hidden md:block"></div>
                <div className="text-white">
                  <p className="font-bold text-2xl mb-1">{BUSINESS_INFO.phone}</p>
                  <p className="text-blue-100 text-sm">Ligue ou mande mensagem agora</p>
                </div>
              </div>
            </section>

            <Reviews />
            
            {/* Map Section */}
            <section className="h-96 w-full bg-slate-800 relative group overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <a 
                   href={BUSINESS_INFO.mapLink} 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-white text-brand-900 px-6 py-3 rounded-full font-bold shadow-xl transform group-hover:scale-110 transition-transform pointer-events-auto flex items-center gap-2"
                 >
                   Ver no Google Maps
                 </a>
               </div>
               {/* Static Map Image Placeholder - In real app, embed Google Maps iframe */}
               <img 
                 src="https://picsum.photos/1920/600?grayscale" 
                 alt="Mapa" 
                 className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
               />
            </section>

            {/* Footer */}
            <footer className="bg-brand-950 py-12 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-slate-500 text-sm mb-4">{BUSINESS_INFO.address}</p>
                <p className="text-slate-600 text-xs">
                  © {new Date().getFullYear()} Jesus Car Auto Elétrica. Todos os direitos reservados.
                </p>
              </div>
            </footer>

            <ChatWidget />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>
    </div>
  );
};

export default App;