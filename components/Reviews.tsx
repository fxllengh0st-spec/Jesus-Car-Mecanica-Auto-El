import React from 'react';
import { REVIEWS, BUSINESS_INFO } from '../constants';
import { Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 bg-brand-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">O que nossos clientes dizem</h2>
            <p className="text-slate-400">Transparência é o nosso maior valor.</p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center bg-brand-800 px-4 py-2 rounded-lg border border-slate-700">
            <span className="text-2xl font-bold text-white mr-2">{BUSINESS_INFO.rating}</span>
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-slate-400 text-sm">no Google Maps</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-brand-800/50 p-6 rounded-2xl border border-slate-800 relative">
              <Quote className="absolute top-4 right-4 text-brand-700 w-8 h-8 opacity-50" />
              <div className="flex items-center mb-4">
                 <div className="w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center text-white font-bold text-lg">
                    {review.author.charAt(0)}
                 </div>
                 <div className="ml-3">
                   <p className="text-white font-medium">{review.author}</p>
                   <p className="text-xs text-slate-500">{review.time}</p>
                 </div>
              </div>
              <div className="flex text-yellow-400 mb-3 w-4 h-4">
                 {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                 ))}
              </div>
              <p className="text-slate-300 text-sm italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;