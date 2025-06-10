// src/pages/CartPage.jsx
import React from 'react';
import { useBasket } from '../context/BasketContext';
import Basket from '../components/Basket';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { basket, handleIncrementQuantity, handleDecrementQuantity, handleRemove } = useBasket();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Seu Carrinho</h1>

      {basket.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
          <p className="text-gray-600 text-lg mb-4">Sua cesta está vazia.</p>
          <div className="flex flex-col space-y-4"> {/* Adicionado um flex container para os botões */}
            <Link
              to="/monte-sua-cesta"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Começar a Montar Cesta
            </Link>
            <Link
              to="/" // <-- NOVO BOTÃO: Ir para a página inicial
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <Basket
            basket={basket}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            onRemove={handleRemove}
            hideCheckoutButton={false}
            customTotalMessage={null}
          />
        </div>
      )}
    </div>
  );
}