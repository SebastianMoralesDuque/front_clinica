import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

const PatientNavbar = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    // Recargar la página al cerrar sesión
    window.location.href = '/';
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteAccount = () => {
    // Agrega la lógica para eliminar la cuenta aquí
    console.log('Eliminar cuenta');
  };

  const editInfo = () => {
    // Agrega la lógica para editar la información aquí
    console.log('Editar información');
  };

  const userData = user ? user.userData[0][0] : null;
  const userData2 = user ? user.userData[0][1] : null;

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-semibold">
        Clínica
      </Link>
      {user && (
        <div className="flex items-center">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/historialMedico"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                Historial Médico
              </Link>
            </li>
            <li>
              <Link
                to="/pqrs"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                Pqrs
              </Link>
            </li>
          </ul>
          <div className="ml-4 relative">
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-white focus:outline-none flex items-center hover:text-blue-500"
>
  <span className="mr-2 hover:underline">{`¡Hola, ${userData.nombre}!`}</span>
  <img
    src={userData.url_foto}
    alt="Perfil"
    className="rounded-full h-8 w-8 mr-2"
  />
  <ChevronDown className="text-white" />
</button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-md rounded-md border w-48">
                <button
                  onClick={openModal}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Perfil
                </button>
                <div className="border-t"></div>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-200 w-full text-left"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}

{modalIsOpen && (
  <div
    className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
    onClick={closeModal}
  >
    <div
      className="relative p-8 bg-white mx-auto my-8 max-w-2xl rounded-md text-center"
      onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
    >
      <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>
      <button
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        onClick={closeModal}
      >
        &times;
      </button>
      <div className="flex items-center justify-center mb-4">
        <img
          src={userData.url_foto}
          alt="Perfil"
          className="rounded-full h-20 w-20"
        />
      </div>
      <table className="table-auto w-full">
        <tbody>
          {Object.entries(userData).map(([key, value]) => {
            if (
              key !== 'contrasena' &&
              key !== 'url_foto' &&
              key !== 'cedula_usuario'
            ) {
              return (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value}</td>
                </tr>
              );
            }
            return null;
          })}
          <tr>
            <td className="border px-4 py-2">Fecha de Nacimiento</td>
            <td className="border px-4 py-2">{userData2.fecha_nacimiento}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Alergias</td>
            <td className="border px-4 py-2">{userData2.alergias}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">EPS</td>
            <td className="border px-4 py-2">{userData2.eps}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Tipo de Sangre</td>
            <td className="border px-4 py-2">{userData2.tipo_sangre}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Acciones</td>
            <td className="border px-4 py-2">
              <button
                onClick={deleteAccount}
                className="bg-red-500 text-white px-2 py-1 mr-2 hover:bg-red-600"
              >
                Eliminar Cuenta
              </button>
              <button
                onClick={editInfo}
                className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600"
              >
                Editar Información
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}
    </nav>
  );
};

export default PatientNavbar;
