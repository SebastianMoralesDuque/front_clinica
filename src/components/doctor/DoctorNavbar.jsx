import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorNavbar = () => {
  
  const doctorData = JSON.parse(localStorage.getItem('medicoData'));

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('medicoData');
    // Recargar la página al cerrar sesión
    window.location.href = '/'; // Cambia '/login' por la ruta que desees
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">Clínica</Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {doctorData && (
          <>
            <li>
              <span className="text-white">{`¡Hola, Dr. ${doctorData.userData[0][0].nombre.split(' ')[0]}!`}</span>
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
