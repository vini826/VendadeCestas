// src/data/preBuiltBaskets.js
import products from './products'; // <-- Importe a lista de produtos completa

const preBuiltBaskets = [
  {
    id: 101, // ID único para a cesta romântica
    name: 'Cesta Romântica',
    price: 150.00,
    description: 'Uma seleção apaixonante de chocolates finos, um vinho tinto suave e lindas flores vermelhas para celebrar o amor.',
    image: 'https://via.placeholder.com/400x300/e0b0ff/FFFFFF?text=Cesta+Romantica',
    products: [
      // ATENÇÃO AQUI: Cada item é o PRODUTO COMPLETO do seu products.js, MAIS a quantidade
      { ...products.find(p => p.id === 1), quantity: 3 }, // id 1 = Chocolate (exemplo)
      { ...products.find(p => p.id === 6), quantity: 1 }, // id 6 = Vinho
      { ...products.find(p => p.id === 7), quantity: 1 }, // id 7 = Flores
    ],
  },
  {
    id: 102,
    name: 'Cesta Gourmet',
    price: 220.00,
    description: 'Para os amantes da alta gastronomia, com queijos artesanais, patês exclusivos e geleias especiais.',
    image: 'https://via.placeholder.com/400x300/ffb0e0/FFFFFF?text=Cesta+Gourmet',
    products: [
      { ...products.find(p => p.id === 2), quantity: 1 }, // id 2 = Queijo
      { ...products.find(p => p.id === 8), quantity: 2 }, // id 8 = Patê
      { ...products.find(p => p.id === 9), quantity: 1 }, // id 9 = Geleia
    ],
  },
  {
    id: 103,
    name: 'Cesta Café da Manhã',
    price: 100.00,
    description: 'Um despertar delicioso com pães fresquinhos, sucos naturais, frutas da estação e bolachas artesanais.',
    image: 'https://via.placeholder.com/400x300/a0e0ff/FFFFFF?text=Cesta+Cafe',
    products: [
      { ...products.find(p => p.id === 3), quantity: 1 }, // id 3 = Pão
      { ...products.find(p => p.id === 4), quantity: 2 }, // id 4 = Suco
      { ...products.find(p => p.id === 10), quantity: 1 }, // id 10 = Bolacha
    ],
  },
];

export default preBuiltBaskets;