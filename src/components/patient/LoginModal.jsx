import React, { useRef, useState } from 'react';
import RegisterModal from './RegisterModal';

const LoginModal = ({ closeModal }) => {
  const modalRef = useRef(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const toggleRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(!showRegisterModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión con los datos en formData
    // Por ejemplo, puedes enviar una solicitud a tu servidor para autenticar al usuario.
    // Luego, cierra el modal si el inicio de sesión es exitoso o muestra un mensaje de error.
    console.log('Formulario enviado con datos:', formData);
    closeModal(); // Cierra el modal después de enviar el formulario
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-8" ref={modalRef}>
        {showLoginModal ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2>
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
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-800 font-medium">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <p className="text-gray-600 text-sm text-center mb-4">¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={toggleRegisterModal}>Regístrate</span></p>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </>
        ) : null}

        {showRegisterModal ? (
          <RegisterModal closeModal={closeModal} /> 
        ) : null}
      </div>
    </div>
  );
}

export default LoginModal;
