// src/pages/Home.jsx
import React, { useState, useEffect } from 'react'; // Importe useEffect
import { useLocation } from 'react-router-dom'; // Importe useLocation
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Basket from "../components/Basket";
import { useBasket } from '../context/BasketContext';

const MIN_BASKET_VALUE = 60.00;

export default function Home() {
  const location = useLocation(); // Hook para acessar o state da navegação
  const { customBasketToEdit } = location.state || {}; // Pega a cesta para editar, se houver

  const [tempBasket, setTempBasket] = useState([]);
  // NOVO ESTADO: Guarda a ID da cesta que está sendo editada
  const [editingBasketId, setEditingBasketId] = useState(null); 

  // Obter handleAdd e handleRemove (do global) do contexto
  const { handleAdd: addCustomBasketToGlobal, handleRemove: removeCustomBasketFromGlobal } = useBasket();

  // useEffect para carregar a cesta para edição quando a página é acessada em modo de edição
  useEffect(() => {
    if (customBasketToEdit) {
      // Se estamos em modo de edição, carrega os ingredientes no tempBasket
      setTempBasket([...customBasketToEdit.ingredients]);
      setEditingBasketId(customBasketToEdit.id); // Define que estamos editando esta ID
      // Limpa o state da localização para evitar recarregamento contínuo
      // location.state = undefined; // Não funciona diretamente assim, precisa de navigate.replace
    } else {
      // Se não estamos editando, e a cesta temporária não está vazia (ex: recarregou a página),
      // pode ser útil mantê-la ou limpá-la, dependendo do UX desejado.
      // Por enquanto, se não for edição, inicia vazia (se não for persistida no localStorage localmente)
      setTempBasket([]);
      setEditingBasketId(null);
    }
  }, [customBasketToEdit]); // Roda quando customBasketToEdit muda


  // --- Funções para MANIPULAR A CESTA TEMPORÁRIA (tempBasket) ---
  const handleAddTemp = (productToAdd) => {
    setTempBasket(prevTempBasket => {
      const existingItemIndex = prevTempBasket.findIndex(
        (item) => item.product.id === productToAdd.id
      );

      if (existingItemIndex > -1) {
        const newTempBasket = [...prevTempBasket];
        newTempBasket[existingItemIndex] = {
          ...newTempBasket[existingItemIndex],
          quantity: newTempBasket[existingItemIndex].quantity + 1
        };
        return newTempBasket;
      } else {
        return [...prevTempBasket, { product: productToAdd, quantity: 1 }];
      }
    });
  };

  const handleIncrementQuantityTemp = (productIdToIncrement) => {
    setTempBasket(prevTempBasket =>
      prevTempBasket.map((item) =>
        item.product.id === productIdToIncrement
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrementQuantityTemp = (productIdToDecrement) => {
    setTempBasket(prevTempBasket =>
      prevTempBasket
        .map((item) => {
          if (item.product.id === productIdToIncrement) { // Correção aqui, productIdToIncrement
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveTemp = (productIdToRemove) => {
    setTempBasket(prevTempBasket =>
      prevTempBasket.filter((item) => item.product.id !== productIdToRemove)
    );
  };
  // --- Fim das Funções da Cesta Temporária ---


  const tempBasketTotal = tempBasket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const isSaveBasketButtonActive = tempBasketTotal >= MIN_BASKET_VALUE;

  // Função para "salvar" ou "atualizar" a cesta montada e adicioná-la/atualizá-la no carrinho GLOBAL
  const handleSaveCustomBasket = () => {
    if (tempBasket.length === 0) {
      alert("Sua cesta está vazia! Adicione itens antes de salvar sua cesta.");
      return;
    }

    if (!isSaveBasketButtonActive) {
      alert(`Para salvar sua cesta, o valor mínimo deve ser de R$ ${MIN_BASKET_VALUE.toFixed(2)}. Sua cesta atual está em R$ ${tempBasketTotal.toFixed(2)}.`);
      return;
    }

    const customBasketName = `Minha Cesta Personalizada #${Math.floor(Math.random() * 1000)}`;
    
    // Se estiver editando, cria um objeto da cesta personalizada com o ID existente
    const finalCustomBasketProduct = {
      id: editingBasketId || Date.now(), // Usa o ID existente se editando, senão um novo ID
      name: editingBasketId ? `Minha Cesta Personalizada #${editingBasketId % 1000}` : customBasketName, // Mantém o nome original se editando ou gera novo
      price: tempBasketTotal,
      image: 'https://via.placeholder.com/150x150/8a2be2/FFFFFF?text=Minha+Cesta',
      type: 'custom_basket',
      ingredients: [...tempBasket], // Copia os itens da cesta temporária como ingredientes
    };

    // Lógica para REMOVER A VERSÃO ANTIGA (se estiver editando) e ADICIONAR A NOVA
    if (editingBasketId) {
      // Remove a versão antiga da cesta personalizada do carrinho global
      removeCustomBasketFromGlobal(editingBasketId); // Usa a função de remoção global
    }
    // Adiciona a nova (ou atualizada) cesta personalizada ao carrinho GLOBAL
    addCustomBasketToGlobal(finalCustomBasketProduct);

    setTempBasket([]); // Limpa a cesta temporária
    setEditingBasketId(null); // Sai do modo de edição
    alert(`Sua cesta "${finalCustomBasketProduct.name}" foi ${editingBasketId ? 'atualizada' : 'adicionada'} ao carrinho!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Monte sua Cesta</h1>
      {editingBasketId && ( // Mensagem visível apenas quando estiver editando
        <p className="text-xl font-semibold text-center text-blue-700 mb-4">
          Você está editando a Cesta Personalizada #{editingBasketId % 1000}.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAddTemp} />
          ))}
        </div>
        
        <div className="flex flex-col gap-4">
          <Basket
            basket={tempBasket}
            onIncrementQuantity={handleIncrementQuantityTemp}
            onDecrementQuantity={handleDecrementQuantityTemp}
            onRemove={handleRemoveTemp}
            hideCheckoutButton={true}
            customTotalMessage={`Total da Cesta (mín. R$ ${MIN_BASKET_VALUE.toFixed(2)}): R$ ${tempBasketTotal.toFixed(2)}`}
          />
          <button
            onClick={handleSaveCustomBasket}
            className={`w-full font-bold py-3 rounded-lg transition duration-300 text-lg ${isSaveBasketButtonActive ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={!isSaveBasketButtonActive}
          >
            {editingBasketId ? 'Atualizar Cesta' : 'Salvar Minha Cesta'} {/* Texto do botão muda */}
          </button>
          {editingBasketId && ( // Botão para cancelar edição
            <button
              onClick={() => { setTempBasket([]); setEditingBasketId(null); }}
              className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300 text-lg mt-2"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </div>
    </div>
  );
}