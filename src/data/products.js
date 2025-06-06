import chocolateImage from '../assets/images/Chocolate.jpg'; // Corrigido o caminho relativo

const products = [
  { id: 1, name: "Chocolate", price: 12.5, image: chocolateImage }, // Direct link to a chocolate image
  { id: 2, name: "Vinho", price: 40.0, image: "https://53662.cdn.simplo7.net/static/53662/sku/vinhos-vinho-tinto-seco-colonial-valdameri-uva-bordo-serra-gaucha-p-1709651378299.jpg" }, // Direct link to a wine image
  { id: 3, name: "Pelúcia", price: 25.0, image: "https://rihappy.vtexassets.com/arquivos/ids/1161632/Pelucia-Disney---25-Cm---Lilo-e-Stitch---Stitch---Big-Feet---Fun.jpg?v=637508300877330000" }, // Direct link to a plushie image
  { id: 4, name: "Flor", price: 15.0, image: "https://patriciaflores.com.br/wp-content/uploads/2023/03/buque_de_flores_rosas_classic_linha_premium_franca_sp.webp" }, // Direct link to a flower image
];

export default products;