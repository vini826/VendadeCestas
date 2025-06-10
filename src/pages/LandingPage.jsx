// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom"; 
// Você pode importar os dados das cestas aqui para renderizá-los dinamicamente
import preBuiltBaskets from '../data/preBuiltBaskets'; // <-- Importe os dados

export default function LandingPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Bem-Vindo à Minha Cesta Perfeita!
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        Explore nossas opções de cestas pré-montadas ou crie a sua própria cesta personalizada com os itens que você mais ama!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Renderize as cestas pré-montadas dinamicamente usando os dados */}
        {preBuiltBaskets.map(basket => (
          <div key={basket.id} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{basket.name}</h3>
            <p className="text-gray-700">{basket.description.substring(0, 50)}...</p> {/* Exibe uma parte da descrição */}
            <span className="text-xl font-semibold text-green-600 mt-4 block">R$ {basket.price.toFixed(2)}</span>
            <Link 
              to={`/cestas/${basket.id}`} // <-- LINK PARA A PÁGINA DE DETALHES
              className="mt-4 inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
        
        {/* Card "Monte sua Cesta" (mantido) */}
        <div className="col-span-full flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 w-full max-w-sm">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">Monte sua Cesta</h3>
            <div className="flex items-center justify-center text-center gap-1">
              <p className="text-gray-700">Preço mínimo:</p>
              <span className="text-xl font-semibold text-green-600">R$ 100,00</span>
            </div>
            <Link
              to="/monte-sua-cesta"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Comece a Montar!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}