// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Adicione Link aqui para a rota 404
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/monte-sua-cesta" element={<Home />} />
        <Route path="/carrinho" element={
            <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-4 text-center">Seu Carrinho</h1>
                    <p className="text-center text-gray-600">
                        Aqui seria a página do seu carrinho.
                        Para ver o carrinho funcionando, vá para "Monte Sua Cesta".
                    </p>
                </div>
            </div>
        } />
        <Route path="*" element={
            <div className="p-8 text-center min-h-screen bg-red-100 flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-red-700 mb-4">404 - Página Não Encontrada</h1>
                <p className="text-lg text-red-600">A página que você está procurando não existe.</p>
                <Link to="/" className="mt-6 text-blue-600 hover:underline">Voltar para a página inicial</Link>
            </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;