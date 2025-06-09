// src/context/BasketContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'; // <-- Importe useEffect
import products from '../data/products';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  // Inicializa o estado da cesta, tentando carregar do localStorage
  // Se não encontrar, inicializa como um array vazio
  const [basket, setBasket] = useState(() => {
    try {
      const storedBasket = localStorage.getItem('cestaDeProdutos');
      return storedBasket ? JSON.parse(storedBasket) : [];
    } catch (error) {
      console.error("Erro ao carregar cesta do localStorage:", error);
      return []; // Retorna vazio em caso de erro
    }
  });

  // useEffect para salvar a cesta no localStorage sempre que ela mudar
  useEffect(() => {
    try {
      localStorage.setItem('cestaDeProdutos', JSON.stringify(basket));
    } catch (error) {
      console.error("Erro ao salvar cesta no localStorage:", error);
    }
  }, [basket]); // O efeito roda sempre que 'basket' muda

  // ... (suas funções handleAdd, handleIncrementQuantity, handleDecrementQuantity, handleRemove aqui) ...

  const handleAdd = (productToAdd) => {
    setBasket(prevBasket => {
      const existingItemIndex = prevBasket.findIndex(
        (item) => item.product.id === productToAdd.id
      );

      if (existingItemIndex > -1) {
        const newBasket = [...prevBasket];
        newBasket[existingItemIndex] = {
          ...newBasket[existingItemIndex],
          quantity: newBasket[existingItemIndex].quantity + 1
        }; // Garante imutabilidade do objeto interno
        return newBasket;
      } else {
        return [...prevBasket, { product: productToAdd, quantity: 1 }];
      }
    });
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

  const clearBasket = () => {
    setBasket([]);
  };

  const contextValue = {
    basket,
    handleAdd,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemove,
    clearBasket,
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