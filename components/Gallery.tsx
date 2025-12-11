import React from 'react';
import { Camera, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
    title: 'Manutenção de Motor',
    category: 'Mecânica Geral'
  },
  {
    url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop',
    title: 'Diagnóstico Computadorizado',
    category: 'Tecnologia'
  },
  {
    url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800&auto=format&fit=crop',
    title: 'Revisão de Suspensão',
    category: 'Segurança'
  },
  {
    url: 'https://images.unsplash.com/photo-1632823471565-1ecf5a80d984?q=80&w=800&auto=format&fit=crop',
    title: 'Reparo Elétrico',
    category: 'Auto Elétrica'
  },
  {
    url: 'https://images.unsplash.com/photo-1530046339160-7115356bc31c?q=80&w=800&auto=format&fit=crop',
    title: 'Troca de Peças',
    category: 'Peças Originais'
  },
  {
    url: 'https://images.unsplash.com/photo-1562519819-016930b6e655?q=80&w=800&auto=format&fit=crop',
    title: 'Oficina Equipada',
    category: 'Infraestrutura'
  }
];

const Gallery: React.FC = () => {
  return (
    <section id="galeria" className="py-20 bg-brand-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-brand-900 rounded-full mb-4 border border-brand-700">
            <Camera className="w-6 h-6 text-brand-blue" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Galeria de Serviços</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Confira a qualidade e o cuidado que temos com cada veículo que entra em nossa oficina.
            Transparência e organização são nossa prioridade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-slate-700/50"
            >
              <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-brand-900/0 transition-colors z-10"></div>
              
              {/* Image */}
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2 block">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-xl flex items-center justify-between">
                    {image.title}
                    <ZoomIn className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;