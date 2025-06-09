// src/App.jsx
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import { BasketProvider } from "./context/BasketContext";

function App() {
  return (
    <Router>
      {/* O BasketProvider DEVE envolver TODAS as rotas que precisam da cesta */}
      <BasketProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/monte-sua-cesta" element={<Home />} />
          {/* As rotas /carrinho e /checkout também estão dentro do Provider */}
          <Route path="/carrinho" element={
              <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
                  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                      <h1 className="text-3xl font-bold mb-4 text-center">Seu Carrinho</h1>
                      <p className="text-center text-gray-600 mb-6">
                          Para ver o carrinho funcionando, vá para "Monte Sua Cesta".
                      </p>
                      <Link
                        to="/checkout"
                        className="block text-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
                      >
                        Ir para o Checkout
                      </Link>
                  </div>
              </div>
          } />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={
              <div className="p-8 text-center min-h-screen bg-red-100 flex flex-col justify-center items-center">
                  <h1 className="text-5xl font-bold text-red-700 mb-4">404 - Página Não Encontrada</h1>
                  <p className="text-lg text-red-600">A página que você está procurando não existe.</p>
                  <Link to="/" className="mt-6 text-blue-600 hover:underline">Voltar para a página inicial</Link>
              </div>
          } />
        </Routes>
      </BasketProvider> {/* Fechamento do BasketProvider */}
    </Router>
  );
}

export default App;