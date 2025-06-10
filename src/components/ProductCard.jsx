// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col justify-between items-center text-center">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">R$ {product.price.toFixed(2)}</p>
      <button
        onClick={() => onAdd(product)} // Chama a função onAdd passada como prop (handleAddTemp)
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-auto"
      >
        Adicionar
      </button>
    </div>
  );
}