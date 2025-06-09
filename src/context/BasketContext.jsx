// src/context/BasketContext.jsx
import React, { createContext, useState, useContext } from 'react';
import products from '../data/products'; // Ainda vamos usar os produtos aqui para o mock

// 1. Criar o Contexto
export const BasketContext = createContext();

// 2. Criar o Provedor (Provider)
export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // Lógica de adição de item (copiada de Home.jsx)
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

  // Lógica de incremento de quantidade (copiada de Home.jsx)
  const handleIncrementQuantity = (productIdToIncrement) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.product.id === productIdToIncrement
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Lógica de decremento de quantidade (copiada de Home.jsx)
  const handleDecrementQuantity = (productIdToDecrement) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) => {
          if (item.product.id === productIdToDecrement) {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove se a quantidade chegar a 0
    );
  };

  // Lógica de remoção completa do item (copiada de Home.jsx)
  const handleRemove = (productIdToRemove) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.product.id !== productIdToRemove)
    );
  };

  // O valor que será fornecido para os componentes que consumirem este contexto
  const contextValue = {
    basket,
    handleAdd,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemove,
    // Você pode adicionar o total da cesta aqui também se quiser!
    // Ex: basketTotal: basket.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

// 3. Criar um Hook customizado para facilitar o consumo
export const useBasket = () => {
  return useContext(BasketContext);
};