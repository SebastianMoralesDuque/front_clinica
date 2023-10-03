import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <ul className="flex space-x-4 items-center">
        <li></li>
        <li></li>
        <li>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition duration-300"
            onClick={openLoginModal}
          >
            Iniciar Sesión de admin
          </button>
        </li>
      </ul>
      {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
    </nav>
  );
}

export default Navbar;