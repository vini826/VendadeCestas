// src/pages/PreBuiltBasketsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PreBuiltBasketCard from '../components/PreBuiltBasketCard'; // Será usado para exibir cada cesta
import preBuiltBaskets from '../data/preBuiltBaskets'; // Importe os dados

export default function PreBuiltBasketsPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Nossas Cestas Prontas</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Conheça todas as nossas opções de cestas já montadas, perfeitas para todas as ocasiões!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {preBuiltBaskets.map((basket) => (
          // O PreBuiltBasketCard terá um link para a BasketDetailPage
          <PreBuiltBasketCard key={basket.id} basket={basket} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}