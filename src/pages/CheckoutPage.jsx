// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useBasket } from '../context/BasketContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CheckoutPage() {
  // Pegue as funções handleIncrementQuantity e handleDecrementQuantity do contexto
  const { basket, handleRemove, handleIncrementQuantity, handleDecrementQuantity, clearBasket } = useBasket();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    deliveryDate: '',
    deliveryTime: '',
    observations: '',
  });

  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (basket.length === 0) {
      alert("Sua cesta está vazia! Adicione produtos antes de finalizar o pedido.");
      return;
    }

    if (!formData.deliveryDate || !formData.deliveryTime) {
        alert("Por favor, selecione a data e o horário de entrega.");
        return;
    }

    const orderDetails = {
      basket: [...basket],
      formData: { ...formData },
      total: total,
      orderId: Math.floor(Math.random() * 1000000),
      orderDate: new Date().toISOString().split('T')[0],
    };

    console.log("Pedido Finalizado!", orderDetails);
    alert("Seu pedido foi finalizado com sucesso! Data de entrega: " + formData.deliveryDate + " às " + formData.deliveryTime);

    clearBasket();

    navigate('/confirmacao-pedido', { state: { orderDetails } });
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  // Função para lidar com a modificação da cesta personalizada (replicada do Basket.jsx)
  const handleModifyCustomBasket = (basketToModify) => {
    navigate('/monte-sua-cesta', { state: { customBasketToEdit: basketToModify } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Finalizar Pedido</h1>

      {basket.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
          <p className="text-gray-600 text-lg mb-4">Sua cesta está vazia. Adicione produtos para finalizar o pedido.</p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate('/monte-sua-cesta')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Voltar para Montar Cesta
            </button>
            <Link
              to="/"
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Coluna de Revisão da Cesta */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Revisão do Pedido</h2>
            <ul className="space-y-3 mb-4">
              {basket.map((item) => (
                <li key={item.product.id} className="flex flex-col items-start border-b pb-2">
                  <div className="w-full flex justify-between items-center mb-1">
                    <span className="font-semibold">{item.product.name}</span> (x{item.quantity})
                    <span className="ml-2 text-gray-600">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* LÓGICA PARA EXIBIR INGREDIENTES DE CESTAS PERSONALIZADAS */}
                  {item.product.type === 'custom_basket' && item.product.ingredients && item.product.ingredients.length > 0 && (
                    <div className="text-sm text-gray-500 w-full mb-2 border-l pl-2 ml-4">
                      <span className="font-medium block mb-1">Conteúdo:</span>
                      <ul className="list-disc pl-4">
                        {item.product.ingredients.map(ingredient => (
                          <li key={ingredient.product.id}>
                            {ingredient.product.name} (x{ingredient.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CONTROLES DE QUANTIDADE E BOTÕES DE AÇÃO - REPLICADO DO BASKET.JSX */}
                  <div className="w-full flex justify-end items-center space-x-2 mt-2"> {/* Adicionado mt-2 para espaçamento */}
                    {/* Botões de quantidade +/-: Aparecem para todos os tipos de itens */}
                    <>
                      <button
                        onClick={() => handleDecrementQuantity(item.product.id)}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrementQuantity(item.product.id)}
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
                      onClick={() => handleRemove(item.product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-4"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <p className="font-bold text-2xl text-right text-red-700">Total: R$ {total.toFixed(2)}</p>
          </div>

          {/* Coluna de Informações de Entrega e Pagamento (mantida) */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dados de Entrega</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campos existentes: Nome, Endereço, Cidade, CEP, Email, Telefone, Data/Hora, Observações */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">CEP</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Data e Hora de Entrega</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Data de Entrega</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    required
                    min={getMinDate()}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Horário de Entrega</label>
                  <input
                    type="time"
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="observations" className="block text-sm font-medium text-gray-700">Observações do Pedido (Ex: "Vinho na frente", "Não tocar a campainha")</label>
                <textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="Digite aqui quaisquer instruções especiais ou observações para o entregador..."
                ></textarea>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Método de Pagamento</h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-600">
                <p>Pagamento simulado. Em um projeto real, aqui estaria a integração com um gateway de pagamento (Cartão de Crédito, Pix, Boleto, etc.).</p>
                <div className="mt-2">
                  <input type="radio" id="pix" name="paymentMethod" value="pix" defaultChecked />
                  <label htmlFor="pix" className="ml-2">Pix</label>
                  <input type="radio" id="card" name="paymentMethod" value="card" className="ml-4" disabled />
                  <label htmlFor="card" className="ml-2 text-gray-400">Cartão de Crédito (desativado)</label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg"
              >
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}