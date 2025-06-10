// src/context/BasketContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
// import products from '../data/products'; // Remova esta linha

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    try {
      const storedBasket = localStorage.getItem('cestaDeProdutos');
      return storedBasket ? JSON.parse(storedBasket) : [];
    } catch (error) {
      console.error("Erro ao carregar cesta do localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cestaDeProdutos', JSON.stringify(basket));
    } catch (error) {
      console.error("Erro ao salvar cesta no localStorage:", error);
    }
  }, [basket]);

  const handleAdd = (itemToAdd) => {
    setBasket(prevBasket => {
      // Clona prevBasket para garantir imutabilidade absoluta no início da função
      const currentBasketSnapshot = JSON.parse(JSON.stringify(prevBasket));

      const existingItemIndex = currentBasketSnapshot.findIndex(
        (basketItem) => basketItem.product.id === itemToAdd.id
      );

      let updatedBasket;
      if (existingItemIndex > -1) {
        updatedBasket = [...currentBasketSnapshot];
        updatedBasket[existingItemIndex] = {
          ...updatedBasket[existingItemIndex],
          quantity: updatedBasket[existingItemIndex].quantity + 1
        };
      } else {
        const productData = {
            id: itemToAdd.id,
            name: itemToAdd.name,
            price: itemToAdd.price,
            image: itemToAdd.image,
            type: itemToAdd.type,
            ingredients: itemToAdd.ingredients // Certifique-se que ingredients é um array e seus itens são serializáveis
        };
        updatedBasket = [...currentBasketSnapshot, { product: productData, quantity: 1 }];
      }
      
      // Clona o resultado antes de retornar para garantir nova referência
      return JSON.parse(JSON.stringify(updatedBasket));
    });
  };

  const handleIncrementQuantity = (productIdToIncrement) => {
    setBasket((prevBasket) => {
      const currentBasketSnapshot = JSON.parse(JSON.stringify(prevBasket));
      const newBasket = currentBasketSnapshot.map((item) => {
        if (item.product.id === productIdToIncrement) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return JSON.parse(JSON.stringify(newBasket));
    });
  };

  const handleDecrementQuantity = (productIdToDecrement) => {
    setBasket((prevBasket) => {
      const currentBasketSnapshot = JSON.parse(JSON.stringify(prevBasket)); // Snapshot inicial
      
      const newBasket = currentBasketSnapshot.map((item) => {
        if (item.product.id === productIdToDecrement) {
          // Garante que a quantidade nunca seja menor que 1.
          // Se a quantidade é 1, permanece 1 (a remoção total é feita com o botão "Remover").
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      });
      
      // Retorna uma nova cópia para garantir que o React detecte a mudança
      return JSON.parse(JSON.stringify(newBasket));
    });
  };

  const handleRemove = (productIdToRemove) => {
    setBasket((prevBasket) => {
        const newBasket = prevBasket.filter((item) => item.product.id !== productIdToRemove);
        return JSON.parse(JSON.stringify(newBasket)); // Clona antes de retornar
    });
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