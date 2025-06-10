// src/data/preBuiltBaskets.js
import products from './products'; // Importe a lista de produtos completa

const preBuiltBaskets = [
  {
    id: 101,
    name: 'Cesta Romântica',
    price: 150.00, // <-- O PREÇO É DA CESTA INTEIRA
    description: 'Uma seleção apaixonante de chocolates finos, um vinho tinto suave e lindas flores vermelhas para celebrar o amor.',
    image: 'https://via.placeholder.com/400x300/e0b0ff/FFFFFF?text=Cesta+Romantica',
    products: [ // Lista de ingredientes para exibição
      { ...products.find(p => p.id === 1), quantity: 3 },
      { ...products.find(p => p.id === 6), quantity: 1 },
      { ...products.find(p => p.id === 7), quantity: 1 },
    ],
  },
  // ... outras cestas
];

export default preBuiltBaskets;