// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import preBuiltBaskets from '../data/preBuiltBaskets'; // <-- Importe os dados das cestas pré-montadas

export default function LandingPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-red-800 mb-8 text-center">
        Bem-Vindo à Minha Cesta Perfeita!
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        Explore nossas opções de cestas pré-montadas ou crie a sua própria cesta personalizada com os itens que você mais ama!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Renderize as cestas de AMOSTRA (as 3 primeiras, por exemplo) dinamicamente */}
        {preBuiltBaskets.slice(0, 3).map(basket => (
          // O COMENTÁRIO FOI MOVIDO PARA DENTRO DOS PARÊNTESES DO MAP, MAS ANTES DO JSX DE RETORNO.
          // OU REMOVA-O SE NÃO FOR NECESSÁRIO
          <div key={basket.id} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-red-700 mb-2">{basket.name}</h3>
            <p className="text-gray-700">{basket.description.substring(0, 50)}...</p>
            <span className="text-xl font-semibold text-green-600 mt-4 block">R$ {basket.price.toFixed(2)}</span>
            <Link
              to={`/cestas/${basket.id}`}
              className="mt-4 inline-block bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}

        {/* Card "Monte sua Cesta" (continua o mesmo) */}
        <div className="col-span-full flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 w-full max-w-sm">
            <h3 className="text-2xl font-bold text-red-700 mb-2">Monte sua Cesta</h3>
            <div className="flex items-center justify-center text-center gap-1">
              <p className="text-gray-700">Preço mínimo:</p>
              <span className="text-xl font-semibold text-green-600">R$ 100,00</span>
            </div>
            <Link
              to="/monte-sua-cesta"
              className="mt-4 inline-block bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300"
            >
              Comece a Montar!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}