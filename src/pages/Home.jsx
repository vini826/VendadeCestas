// src/pages/Home.jsx
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Basket from "../components/Basket";
import { useBasket } from '../context/BasketContext'; // Correto, você já importou

export default function Home() {
  
  const {
    basket,
    handleAdd,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemove
  } = useBasket(); // <-- ESSA É A LINHA CRÍTICA!

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Monte sua Cesta</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} />
          ))}
        </div>
        {/* Passamos as funções que VIERAM DO CONTEXTO para o componente Basket */}
        <Basket
          basket={basket}
          onIncrementQuantity={handleIncrementQuantity}
          onDecrementQuantity={handleDecrementQuantity}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}