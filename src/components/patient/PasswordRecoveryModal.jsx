import React, { useState } from 'react';
import PasswordResetModal from './PasswordResetModal'; // Importa el componente de cambio de contraseña

const PasswordRecoveryModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false); // Nuevo estado para el modal de cambio de contraseña

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Nuevo estado para rastrear si se ha enviado el formulario

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar una solicitud al servidor
    // para enviar un código de verificación al usuario con el correo electrónico proporcionado en formData.email.
    // Puedes mostrar un mensaje de éxito o error según la respuesta del servidor.
    console.log('Formulario de recuperación de contraseña enviado con datos:', formData);

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
                <label htmlFor="email" className="block text-gray-800 font-medium">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.email}
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
        <PasswordResetModal closeModal={() => setShowPasswordResetModal(false)} />
      )}
    </div>
  );
}

export default PasswordRecoveryModal;
