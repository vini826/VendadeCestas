// src/App.jsx
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import BasketDetailPage from './pages/BasketDetailPage';
import CartPage from './pages/CartPage'; // <-- Importe a nova página do carrinho
import { BasketProvider } from "./context/BasketContext";

function App() {
  return (
    <Router>
      <BasketProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/monte-sua-cesta" element={<Home />} />

          {/* MUDANÇA AQUI: A rota /carrinho agora renderiza o componente CartPage */}
          <Route path="/carrinho" element={<CartPage />} /> {/* REMOVIDO O JSX PLACEHOLDER */}

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmacao-pedido" element={<OrderConfirmationPage />} />

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