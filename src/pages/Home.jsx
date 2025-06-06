import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Basket from "../components/Basket";

export default function Home() {
  const [basket, setBasket] = useState([]);

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

  // Nova função para incrementar a quantidade
  const handleIncrementQuantity = (productIdToIncrement) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.product.id === productIdToIncrement
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Nova função para decrementar a quantidade
  const handleDecrementQuantity = (productIdToDecrement) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((item) => {
          if (item.product.id === productIdToDecrement) {
            // Decrementa a quantidade, mas não deixa ser menor que 1
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove o item se a quantidade chegar a 0 (opcional, pode ser feito apenas com o botão "Remover")
    );
  };

  // A função handleRemove agora será usada especificamente para remover o item *completamente*
  const handleRemove = (productIdToRemove) => {
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.product.id !== productIdToRemove)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Monte sua Cesta</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} />
          ))}
        </div>
        {/* Passamos as novas funções para o componente Basket */}
        <Basket
          basket={basket}
          onIncrementQuantity={handleIncrementQuantity}
          onDecrementQuantity={handleDecrementQuantity}
          onRemove={handleRemove} // onRemove agora remove o item por completo
        />
      </div>
    </div>
  );
}