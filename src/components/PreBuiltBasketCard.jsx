// src/components/PreBuiltBasketCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PreBuiltBasketCard({ basket }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
      <img
        src={basket.image}
        alt={basket.name}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Cesta"; }}
      />
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold mb-2 text-red-700">{basket.name}</h2>
        <p className="text-gray-600 mb-2">{basket.description.substring(0, 100)}...</p>
        <p className="text-xl font-semibold text-green-600">R$ {basket.price.toFixed(2)}</p>
        
        <h4 className="font-semibold text-gray-700 mt-4 mb-2">Itens Principais:</h4>
        <ul className="list-disc pl-5 text-gray-600 text-sm">
          {basket.products && basket.products.slice(0, 3).map(item => (
            <li key={item.id}>
              {item.name} (x{item.quantity})
            </li>
          ))}
          {basket.products && basket.products.length > 3 && <li className="text-gray-500">...e mais</li>}
        </ul>
      </div>
      <div className="p-4 pt-0">
        <Link
          to={`/cestas/${basket.id}`} // CORREÇÃO: Comentário fora das chaves {}
          className="w-full bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-800 transition duration-300 block text-center"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}