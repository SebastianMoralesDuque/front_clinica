import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorNavbar = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || null;

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    // Recargar la página al cerrar sesión
    window.location.href = '/';  
  };
  console.log(user);

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">Clínica</Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {user && (
          <>
            <li>
              <Link to="/historialMedico" className="text-white hover:text-blue-500 transition duration-300">Historial Médico</Link>
            </li>
            <li>
              <Link to="/pqrs" className="text-white hover:text-blue-500 transition duration-300">Pqrs</Link>
            </li>
            <li>
              <span className="text-white">{`¡Hola, ${user.userData[0][0].nombre}!`}</span>
            </li>
            <li>
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default DoctorNavbar;
