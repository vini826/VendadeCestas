// src/components/Basket.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Basket({
  basket,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemove,
  hideCheckoutButton = false,
  customTotalMessage = null
}) {
  const navigate = useNavigate();

  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Função para lidar com a modificação da cesta personalizada
  const handleModifyCustomBasket = (basketToModify) => {
    navigate('/monte-sua-cesta', { state: { customBasketToEdit: basketToModify } });
  };

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
              className="flex flex-col justify-between items-start p-2 border-b last:border-b-0"
            >
              <div className="w-full flex justify-between items-center mb-2">
                <span className="font-semibold">{item.product.name}</span>
                <span className="ml-2 text-gray-600">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {item.product.type === 'custom_basket' && item.product.ingredients && item.product.ingredients.length > 0 && (
                <div className="text-sm text-gray-500 w-full mb-2 border-l pl-2">
                  <span className="font-medium block mb-1">Conteúdo da Cesta:</span>
                  <ul className="list-disc pl-5">
                    {item.product.ingredients.map(ingredient => (
                      <li key={ingredient.product.id}>
                        {ingredient.product.name} (x{ingredient.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="w-full flex justify-end items-center space-x-2">
                {/* BOTÕES DE QUANTIDADE +/-: AGORA APARECEM PARA TODOS OS TIPOS DE ITENS */}
                <> {/* Removida a condição item.product.type !== 'custom_basket' */}
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
                </>
                
                {/* Botão Modificar Cesta Personalizada (só para custom_basket) */}
                {item.product.type === 'custom_basket' && (
                  <button
                    onClick={() => handleModifyCustomBasket(item.product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Modificar
                  </button>
                )}

                {/* Botão Remover sempre aparece */}
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
      <p className="font-bold text-xl mb-4">{customTotalMessage || `Total: R$ ${total.toFixed(2)}`}</p>

      {!hideCheckoutButton && basket.length > 0 && (
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Finalizar Pedido
        </button>
      )}
    </div>
  );
}