import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal'; // Importa el componente del modal

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">Clínica</Link>
      </div>
      <ul className="flex space-x-4 items-center"> {/* Añade items-center aquí */}
        <li>
          <Link to="/historialMedico" className="text-white hover:text-blue-500 transition duration-300">Historial Médico</Link>
        </li>
        <li>
          <Link to="/pqrs" className="text-white hover:text-blue-500 transition duration-300">Pqrs</Link>
        </li>
        <li>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition duration-300"
            onClick={openLoginModal}
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
      {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
    </nav>
  );
}

export default Navbar;
