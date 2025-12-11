import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/AdminDashboard';
import AppointmentForm from './components/AppointmentForm';
import Gallery from './components/Gallery';
import { AppView, Appointment } from './types';
import { Wrench, ShieldCheck, LogIn, Menu, X, Phone } from 'lucide-react';
import { BUSINESS_INFO } from './constants';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={(e) => {
      if (onClick) onClick();
    }}
    className="text-slate-300 hover:text-white transition-colors text-sm font-medium block px-3 py-2"
  >
    {children}
  </a>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Lifted state for appointments (acting as a simple DB for this demo)
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const toggleView = () => {
    setCurrentView(prev => prev === AppView.HOME ? AppView.ADMIN : AppView.HOME);
    setIsMobileMenuOpen(false);
  };

  const handleNewAppointment = (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pendente',
      createdAt: Date.now()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  return (
    <div className="min-h-screen bg-brand-900 text-slate-100 font-sans selection:bg-brand-accent selection:text-brand-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-brand-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
              setCurrentView(AppView.HOME);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <div className="bg-gradient-to-tr from-brand-blue to-brand-accent p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block leading-none">Jesus Car</span>
                <span className="text-xs text-brand-accent tracking-wide uppercase font-semibold">Mecânica & Elétrica</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {currentView === AppView.HOME ? (
                <>
                  <a href="#services" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Serviços</a>
                  <a href="#galeria" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Galeria</a>
                  <a href="#agendamento" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Agendar</a>
                  <a href="#reviews" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Avaliações</a>
                  <a href={BUSINESS_INFO.mapLink} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Localização</a>
                  <button 
                    onClick={toggleView}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs border border-slate-700 px-3 py-1.5 rounded-full hover:bg-brand-800"
                  >
                    <LogIn className="w-3 h-3" />
                    Área do Mecânico
                    {appointments.filter(a => a.status === 'Pendente').length > 0 && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>
                </>
              ) : (
                <button 
                  onClick={toggleView}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 bg-brand-800 px-4 py-2 rounded-full border border-slate-700"
                >
                   &larr; Voltar para o Site
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-900 border-b border-slate-800 absolute w-full left-0 top-20 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {currentView === AppView.HOME ? (
                <>
                  <NavLink href="#services" onClick={() => setIsMobileMenuOpen(false)}>Serviços</NavLink>
                  <NavLink href="#galeria" onClick={() => setIsMobileMenuOpen(false)}>Galeria</NavLink>
                  <NavLink href="#agendamento" onClick={() => setIsMobileMenuOpen(false)}>Agendar</NavLink>
                  <NavLink href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Avaliações</NavLink>
                  <NavLink href={BUSINESS_INFO.mapLink} onClick={() => setIsMobileMenuOpen(false)}>Localização</NavLink>
                  <div className="pt-4 mt-4 border-t border-slate-800">
                    <button 
                      onClick={toggleView}
                      className="flex items-center gap-2 text-slate-400 hover:text-white text-sm w-full px-3 py-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Área do Mecânico
                      {appointments.filter(a => a.status === 'Pendente').length > 0 && (
                        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={toggleView}
                  className="text-slate-300 hover:text-white font-medium block w-full text-left px-3 py-2"
                >
                  Voltar para o Site
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentView === AppView.HOME ? (
          <>
            <Hero />
            <Services />
            <Gallery />
            <AppointmentForm onSchedule={handleNewAppointment} />
            
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
                <div className="text-white flex flex-col md:items-start items-center">
                  <p className="font-bold text-2xl mb-1 flex items-center gap-2">
                    <Phone className="w-5 h-5 md:hidden" />
                    {BUSINESS_INFO.phone}
                  </p>
                  <p className="text-blue-100 text-sm">Ligue ou mande mensagem agora</p>
                </div>
              </div>
            </section>

            <div id="reviews" className="scroll-mt-20">
              <Reviews />
            </div>
            
            {/* Map Section */}
            <section className="h-96 w-full bg-slate-800 relative group overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <a 
                   href={BUSINESS_INFO.mapLink} 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-white text-brand-900 px-6 py-3 rounded-full font-bold shadow-xl transform group-hover:scale-110 transition-transform pointer-events-auto flex items-center gap-2 hover:bg-slate-100"
                 >
                   Ver no Google Maps
                 </a>
               </div>
               <img 
                 src="https://picsum.photos/1920/600?grayscale" 
                 alt="Mapa" 
                 className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
               />
            </section>

            {/* Footer */}
            <footer className="bg-brand-950 py-12 border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
                  <Wrench className="w-5 h-5" />
                  <span className="font-bold text-lg">Jesus Car</span>
                </div>
                <p className="text-slate-500 text-sm mb-4">{BUSINESS_INFO.address}</p>
                <div className="flex justify-center gap-4 mb-8">
                   <a href="#" className="text-slate-500 hover:text-brand-blue transition-colors text-sm">Privacidade</a>
                   <a href="#" className="text-slate-500 hover:text-brand-blue transition-colors text-sm">Termos</a>
                </div>
                <p className="text-slate-600 text-xs">
                  © {new Date().getFullYear()} Jesus Car Auto Elétrica. Todos os direitos reservados.
                </p>
              </div>
            </footer>

            <ChatWidget />
            
            {/* Floating WhatsApp Button (Fixed Bottom Left) */}
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Olá, vim pelo site e gostaria de agendar.`}
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
              aria-label="Falar no WhatsApp"
            >
              <Phone className="w-6 h-6 fill-current" />
            </a>
          </>
        ) : (
          <AdminDashboard appointments={appointments} />
        )}
      </main>
    </div>
  );
};

export default App;