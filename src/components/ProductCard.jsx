export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border p-4 rounded-xl shadow-md flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-24 h-24 mb-2" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-green-600 font-bold">R$ {product.price.toFixed(2)}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Adicionar
      </button>
    </div>
  );
}
