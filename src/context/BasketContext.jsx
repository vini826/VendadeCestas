// src/context/BasketContext.jsx
import React, { createContext, useState, useContext } from 'react';
import products from '../data/products';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // ... (suas funções handleAdd, handleIncrementQuantity, handleDecrementQuantity, handleRemove aqui) ...

  const handleAdd = (productToAdd) => {
    const existingItemIndex = basket.findIndex(
      (item) => item.product.id === productToAdd.id
    );

    if (existingItemIndex > -1) {
      const newBasket = [...basket];
      newBasket[existingItemIndex].quantity += 1;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { product: productToAdd, quantity: 1 }]);
    }
  };

  const handleIncrementQuantity = (productIdToIncrement) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.product.id === productIdToIncrement
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrementQuantity = (productIdToDecrement) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) => {
          if (item.product.id === productIdToDecrement) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productIdToRemove) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.product.id !== productIdToRemove)
    );
  };

  // NOVA FUNÇÃO: Limpar a cesta
  const clearBasket = () => {
    setBasket([]);
  };

  const contextValue = {
    basket,
    handleAdd,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemove,
    clearBasket, // <-- Adicione a nova função ao valor do contexto
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};