// src/components/Basket.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importe useNavigate

export default function Basket({
  basket,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemove,
}) {
  const navigate = useNavigate(); // <-- Inicialize o hook useNavigate

  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white border p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Sua Cesta</h2>
      {basket.length === 0 ? (
        <p className="text-gray-500">Nenhum item adicionado.</p>
      ) : (
        <ul className="space-y-2">
          {basket.map((item) => (
            <li
              key={item.product.id}
              className="flex flex-col sm:flex-row justify-between items-center p-2 border-b last:border-b-0"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">{item.product.name}</span>
                <span className="ml-2 text-gray-600">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Botões de Decrementar e Incrementar Quantidade */}
                <button
                  onClick={() => onDecrementQuantity(item.product.id)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button
                  onClick={() => onIncrementQuantity(item.product.id)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
                {/* Botão de Remover Item Completo */}
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-4"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-4" />
      <p className="font-bold text-xl mb-4">Total: R$ {total.toFixed(2)}</p> {/* Adicionado mb-4 para espaçamento */}

      {/* Botão Finalizar Pedido - SÓ APARECE SE HOUVER ITENS NA CESTA */}
      {basket.length > 0 && (
        <button
          onClick={() => navigate('/checkout')} // Ao clicar, navega para a rota /checkout
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Finalizar Pedido
        </button>
      )}
    </div>
  );
}