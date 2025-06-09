// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // useLocation para pegar o state

export default function OrderConfirmationPage() {
  const location = useLocation();
  // Pega os dados do pedido do state passado pelo navigate
  const { orderDetails } = location.state || {}; // Garante que orderDetails não seja undefined

  if (!orderDetails) {
    // Se não houver detalhes do pedido (ex: acesso direto à URL), redireciona
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Erro: Pedido Não Encontrado</h1>
        <p className="text-lg text-gray-700 mb-6">Parece que você acessou esta página diretamente ou seu pedido não pôde ser carregado.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Voltar para a Página Inicial
        </Link>
      </div>
    );
  }

  // Desestrutura os detalhes para exibição
  const { basket, formData, total } = orderDetails;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Pedido Confirmado! 🎉</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Obrigado por sua compra! Seu pedido foi processado com sucesso e será entregue em breve.
      </p>

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalhes do Pedido</h2>
        
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-700 mb-2">Itens da Cesta:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {basket.map((item) => (
              <li key={item.product.id}>
                {item.product.name} (x{item.quantity}) - R$ {(item.product.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-700 mb-2">Informações de Entrega:</h3>
          <p className="text-gray-600"><strong>Nome:</strong> {formData.name}</p>
          <p className="text-gray-600"><strong>Endereço:</strong> {formData.address}, {formData.city}, CEP {formData.zip}</p>
          <p className="text-gray-600"><strong>Email:</strong> {formData.email}</p>
          <p className="text-gray-600"><strong>Telefone:</strong> {formData.phone}</p>
          <p className="text-gray-600">
            <strong>Data de Entrega:</strong> {formData.deliveryDate} às {formData.deliveryTime}
          </p>
        </div>

        <hr className="my-4" />
        <p className="font-bold text-3xl text-right text-purple-700">Total: R$ {total.toFixed(2)}</p>
      </div>

      <Link to="/" className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold text-lg">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}