export default function Basket({
  basket,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemove, // onRemove agora remove o item por completo
}) {
  // O cálculo do total continua o mesmo, considerando a quantidade de cada item
  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white border p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Sua Cesta</h2>
      {basket.length === 0 ? (
        <p className="text-gray-500">Nenhum item adicionado.</p>
      ) : (
        <ul className="space-y-2">
          {basket.map((item) => (
            <li
              key={item.product.id}
              className="flex flex-col sm:flex-row justify-between items-center p-2 border-b last:border-b-0"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <span className="font-semibold">{item.product.name}</span>
                <span className="ml-2 text-gray-600">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Botões de Decrementar e Incrementar Quantidade */}
                <button
                  onClick={() => onDecrementQuantity(item.product.id)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button
                  onClick={() => onIncrementQuantity(item.product.id)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
                {/* Botão de Remover Item Completo */}
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-4"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-4" />
      <p className="font-bold text-xl">Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}