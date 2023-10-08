import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

const DoctorNavbar = () => {
  const doctorData = JSON.parse(localStorage.getItem('medicoData'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('medicoData');
    // Recargar la página al cerrar sesión
    window.location.href = '/'; // Cambia '/login' por la ruta que desees
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
  const userData = doctorData ? doctorData.userData[0][0] : null;

  const userData2 = doctorData ? doctorData.userData[0][1] : null;

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">Clínica</Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {doctorData && (
          <>
            <li>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none flex items-center hover:text-blue-500"
              >
                <span className="mr-2 hover:underline">{`¡Hola, Dr. ${doctorData.userData[0][0].nombre.split(' ')[0]}!`}</span>
                <img
                  src={doctorData.userData[0][0].url_foto}
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
            </li>
          </>
        )}
      </ul>

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
                {/* Mostrar la información del perfil */}
                <tr>
                  <td className="border px-4 py-2">Nombre</td>
                  <td className="border px-4 py-2">{userData.nombre}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Cédula</td>
                  <td className="border px-4 py-2">{userData.cedula}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Ciudad</td>
                  <td className="border px-4 py-2">{userData.ciudad}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Email</td>
                  <td className="border px-4 py-2">{userData.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Teléfono</td>
                  <td className="border px-4 py-2">{userData.telefono}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Especializacion</td>
                  <td className="border px-4 py-2">{userData2.especializacion}</td>
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
}

export default DoctorNavbar;
