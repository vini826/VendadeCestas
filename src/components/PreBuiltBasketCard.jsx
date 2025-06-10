// src/components/PreBuiltBasketCard.jsx
import React from 'react';
import { useBasket } from '../context/BasketContext';

export default function PreBuiltBasketCard({ basket }) {
  const { handleAdd } = useBasket();

  const handleAddBasket = () => {
    // Adiciona todos os produtos da cesta ao carrinho
    basket.products.forEach((product) => {
      // Verifica se o produto já existe no carrinho
      const existingItem = basket.find(item => item.product.id === product.id);
      if (existingItem) {
        // Se existir, atualiza a quantidade
        for (let i = 0; i < product.quantity; i++) {
          handleAdd(product);
        }
      } else {
        // Se não existir, adiciona o produto com a quantidade especificada
        for (let i = 0; i < product.quantity; i++) {
          handleAdd(product);
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{basket.name}</h2>
        <p className="text-gray-600 mb-2">R$ {basket.price.toFixed(2)}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {basket.products.map((product) => (
            <li key={product.id}>
              {product.name} (x{product.quantity})
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleAddBasket}
        className="w-full bg-green-500 text-white font-bold py-2 hover:bg-green-600 transition duration-300 block"
      >
        Adicionar Cesta
      </button>
    </div>
  );
}