import React, { useState } from 'react';
import PasswordResetModal from './PasswordResetModal';

const PasswordRecoveryModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    cedula: '', // Cambiado de 'email' a 'cedula
  });

  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud POST al servidor
      const response = await fetch('http://localhost:9009/usuarios/gestion/login/recuperarContrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula: formData.cedula }),
      });

      // Verificar si la solicitud fue exitosa (código de estado 2xx)
      if (response.ok) {
        console.log('Solicitud exitosa. Puedes manejar la respuesta del servidor aquí si es necesario.');
      } else {
        // Manejar errores si la solicitud no fue exitosa
        console.error('Error en la solicitud:', response.status, response.statusText);
      }
    } catch (error) {
      // Manejar errores de red o de la solicitud
      console.error('Error en la solicitud:', error.message);
    }

    // Actualiza el estado para indicar que el formulario se ha enviado
    setIsFormSubmitted(true);

    // Mostrar el modal de cambio de contraseña después de enviar el formulario
    setShowPasswordResetModal(true);
  };

  return (
    <div className="bg-white rounded-lg p-8">
      {!showPasswordResetModal ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-4">Recuperar Contraseña</h2>
          {!isFormSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="cedula" className="block text-gray-800 font-medium">Cédula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                >
                  Recuperar Contraseña
                </button>
              </div>
            </form>
          ) : null}
        </>
      ) : null}

{showPasswordResetModal && (
  <PasswordResetModal closeModal={() => setShowPasswordResetModal(false)} cedula={formData.cedula} />
)}

    </div>
  );
};

export default PasswordRecoveryModal;
