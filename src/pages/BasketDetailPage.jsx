// src/pages/BasketDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import preBuiltBaskets from '../data/preBuiltBaskets'; // Importe os dados das cestas

export default function BasketDetailPage() {
  const { id } = useParams();
  const { handleAdd } = useBasket(); // Pega a função handleAdd do contexto do carrinho

  const basketId = parseInt(id, 10);
  const basket = preBuiltBaskets.find(b => b.id === basketId);

  if (!basket) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Cesta Não Encontrada</h1>
        <p className="text-lg text-gray-700 mb-6">A cesta que você está procurando não existe ou foi removida.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Voltar para a Página Inicial
        </Link>
      </div>
    );
  }

  // CORREÇÃO: handleAddFullBasket agora adiciona a cesta pré-montada como um ÚNICO ITEM
  const handleAddFullBasket = () => {
    // Passa o objeto 'basket' completo para a função handleAdd
    // A função handleAdd (no contexto) vai tratar 'basket' como um 'product' (com id, name, price)
    handleAdd(basket);
    alert(`Cesta "${basket.name}" adicionada ao carrinho!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{basket.name}</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Imagem da Cesta */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={basket.image}
            alt={basket.name}
            className="rounded-lg shadow-lg w-full max-w-sm h-auto object-cover"
          />
        </div>

        {/* Detalhes da Cesta e Botão */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-gray-700 text-lg mb-4">{basket.description}</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Conteúdo da Cesta:</h2>
          <ul className="list-disc pl-5 mb-4 text-gray-600 self-start">
            {/* Aqui você lista os produtos que compõem a cesta, apenas para informação */}
            {basket.products && basket.products.map(item => (
              <li key={item.id}>
                {item.name} (x{item.quantity})
              </li>
            ))}
          </ul>

          <p className="text-3xl font-bold text-purple-700 mb-6">Total: R$ {basket.price.toFixed(2)}</p>
          
          <button
            onClick={handleAddFullBasket}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 text-xl w-full md:w-auto"
          >
            Adicionar Cesta ao Carrinho
          </button>
        </div>
      </div>

      <Link to="/" className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}