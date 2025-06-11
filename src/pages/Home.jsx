// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Basket from "../components/Basket";
import { useBasket } from '../context/BasketContext';

const MIN_BASKET_VALUE = 100.00;

export default function Home() {
  const location = useLocation();
  const { customBasketToEdit } = location.state || {};

  const [tempBasket, setTempBasket] = useState([]);
  const [editingBasketId, setEditingBasketId] = useState(null); 

  const { handleAdd: addCustomBasketToGlobal, handleRemove: removeCustomBasketFromGlobal } = useBasket();

  useEffect(() => {
    if (customBasketToEdit) {
      setTempBasket([...customBasketToEdit.ingredients]);
      setEditingBasketId(customBasketToEdit.id);
    } else {
      setTempBasket([]);
      setEditingBasketId(null);
    }
  }, [customBasketToEdit]);


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
    setTempBasket(prevTempBasket => {
      const newTempBasket = prevTempBasket.map((item) => {
        if (item.product.id === productIdToDecrement) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      });
      return newTempBasket;
    });
  };

  const handleRemoveTemp = (productIdToRemove) => {
    setTempBasket(prevTempBasket =>
      prevTempBasket.filter((item) => item.product.id !== productIdToRemove)
    );
  };


  const tempBasketTotal = tempBasket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const isSaveBasketButtonActive = tempBasketTotal >= MIN_BASKET_VALUE;

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
    
    const finalCustomBasketProduct = {
      id: editingBasketId || Date.now(),
      name: editingBasketId ? `Minha Cesta Personalizada #${editingBasketId % 1000}` : customBasketName,
      price: tempBasketTotal,
      image: 'https://via.placeholder.com/150x150/8a2be2/FFFFFF?text=Minha+Cesta',
      type: 'custom_basket',
      ingredients: [...tempBasket],
    };

    if (editingBasketId) {
      removeCustomBasketFromGlobal(editingBasketId);
    }
    addCustomBasketToGlobal(finalCustomBasketProduct);

    setTempBasket([]);
    setEditingBasketId(null);
    alert(`Sua cesta "${finalCustomBasketProduct.name}" foi ${editingBasketId ? 'atualizada' : 'adicionada'} ao carrinho!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Monte sua Cesta</h1>
      {editingBasketId && (
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
            // MUDANÇA AQUI: cores do botão Salvar Minha Cesta
            className={`w-full font-bold py-3 rounded-lg transition duration-300 text-lg ${isSaveBasketButtonActive ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={!isSaveBasketButtonActive}
          >
            {editingBasketId ? 'Atualizar Cesta' : 'Salvar Minha Cesta'}
          </button>
          {editingBasketId && (
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