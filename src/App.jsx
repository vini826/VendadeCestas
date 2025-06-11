// src/App.jsx
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage"; // Continua sendo a página inicial
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import BasketDetailPage from './pages/BasketDetailPage';
import CartPage from './pages/CartPage';
import PreBuiltBasketsPage from './pages/PreBuiltBasketsPage'; // <-- Importe a página de cestas prontas
import { BasketProvider } from "./context/BasketContext";

function App() {
  return (
    <Router>
      <BasketProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Página inicial permanece */}
          <Route path="/monte-sua-cesta" element={<Home />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmacao-pedido" element={<OrderConfirmationPage />} />
          
          {/* Rota para a página de Cestas Prontas */}
          <Route path="/cestas-prontas" element={<PreBuiltBasketsPage />} /> {/* <-- NOVA ROTA */}

          <Route path="/cestas/:id" element={<BasketDetailPage />} /> 

          <Route path="*" element={
              <div className="p-8 text-center min-h-screen bg-red-100 flex flex-col justify-center items-center">
                  <h1 className="text-5xl font-bold text-red-700 mb-4">404 - Página Não Encontrada</h1>
                  <p className="text-lg text-red-600">A página que você está procurando não existe.</p>
                  <Link to="/" className="mt-6 text-blue-600 hover:underline">Voltar para a página inicial</Link>
              </div>
          } />
        </Routes>
      </BasketProvider>
    </Router>
  );
}

export default App;