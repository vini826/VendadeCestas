// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300">
          Minha Cesta Perfeita
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white text-lg hover:text-gray-200 transition duration-300">
              Cestas Prontas
            </Link>
          </li>
          <li>
            <Link to="/monte-sua-cesta" className="text-white text-lg hover:text-gray-200 transition duration-300">
              Monte Sua Cesta
            </Link>
          </li>
          <li>
            <Link to="/carrinho" className="text-white text-lg hover:text-gray-200 transition duration-300">
              Carrinho
            </Link>
          </li>
          {/* Adicione mais links conforme necessário, por exemplo, /contato, /sobre */}
        </ul>
      </div>
    </nav>
  );
}