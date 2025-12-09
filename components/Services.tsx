import React from 'react';
import { SERVICES } from '../constants';
import { Zap, Wrench, Activity, Thermometer } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  Activity: <Activity className="w-8 h-8" />,
  Thermometer: <Thermometer className="w-8 h-8" />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Nossos Serviços Especializados</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Utilizamos equipamentos modernos para garantir o melhor desempenho do seu veículo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-brand-900 p-8 rounded-2xl border border-slate-700 hover:border-brand-blue transition-colors group">
              <div className="bg-brand-800 w-16 h-16 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;