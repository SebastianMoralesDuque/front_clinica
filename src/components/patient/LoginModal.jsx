import React, { useRef, useState } from 'react';
import RegisterModal from './RegisterModal';
import PasswordRecoveryModal from './PasswordRecoveryModal';
import swal from 'sweetalert';

const LoginModal = ({ closeModal }) => {
  const modalRef = useRef(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPasswordRecoveryModal, setShowPasswordRecoveryModal] = useState(false);
  const [formDataUser, setFormDataUser] = useState({
    cedula: '',
    password: '',
  });
  const [formDataAdmin, setFormDataAdmin] = useState({
    email: '',
    password_admin: '',
  });

  const [loginType, setLoginType] = useState('user');
  const [showContent, setShowContent] = useState(true); // Nuevo estado

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormDataUser({
      cedula: '',
      password: '',
    });
    setFormDataAdmin({
      email: '',
      password_admin: '',
    });
  };

  const handleInputChangeUser = (e) => {
    const { name, value } = e.target;
    setFormDataUser({
      ...formDataUser,
      [name]: value,
    });
  };

  const handleInputChangeAdmin = (e) => {
    const { name, value } = e.target;
    setFormDataAdmin({
      ...formDataAdmin,
      [name]: value,
    });
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    // Realiza la petición de login a http://localhost:9009/usuarios/gestion/login/medpac
    console.log('Formulario enviado con datos:', formDataUser);
    const response = await fetch('http://localhost:9009/usuarios/gestion/login/medpac', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataUser),
    });

    if (response.ok) {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Correctas. Bienvenido(a)",
        icon: "success",
        timer: "2000",
        buttons: false
      });
    } else {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Incorrectas. Acceso no autorizado",
        icon: "error",
        timer: "2000",
        buttons: false
      });
    }
    closeModal();
  };

  const handleSubmitAdmin = async(e) => {
    e.preventDefault();
   // Realiza la petición de login a http://localhost:9009/usuarios/gestion/login/admin
   console.log('Formulario enviado con datos:', formDataAdmin);
   const response = await fetch('http://localhost:9009/usuarios/gestion/login/admin', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formDataAdmin),
   });

   if (response.ok) {
     swal({
       title: "Inicio de sesión",
       text: "Credenciales Correctas. Bienvenido(a)",
       icon: "success",
       timer: "2000",
       buttons: false
     });
   } else {
     swal({
       title: "Inicio de sesión",
       text: "Credenciales Incorrectas. Acceso no autorizado",
       icon: "error",
       timer: "2000",
       buttons: false
     });
   }
   closeModal();
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const togglePasswordRecoveryModal = () => {
    setShowContent(!showContent); // Ocultar todo lo anterior al mostrar PasswordRecoveryModal
    setShowPasswordRecoveryModal(!showPasswordRecoveryModal);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-8" ref={modalRef}>
        {showContent && (
          <div className="text-center mb-4">
            <div className="flex justify-center items-center mt-4">
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${loginType === 'user' ? 'border-b-2 border-blue-800' : 'border-b border-transparent'
                  }`}
                onClick={() => handleLoginTypeChange('user')}
              >
                Usuario
              </div>
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${loginType === 'admin' ? 'border-b-2 border-blue-800' : 'border-b border-transparent'
                  }`}
                onClick={() => handleLoginTypeChange('admin')}
              >
                Administrador
              </div>
            </div>
          </div>
        )}

        {showContent && (
          <>
            {loginType === 'user' ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">Inicio Sesión Usuario</h2>
                <form onSubmit={handleSubmitUser} className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="cedula" className="block text-gray-800 font-medium">Cédula:</label>
                    <input
                      type="text"
                      id="cedula"
                      name="cedula"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataUser.cedula}
                      onChange={handleInputChangeUser}
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
                      value={formDataUser.password}
                      onChange={handleInputChangeUser}
                      required
                    />
                  </div>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    ¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={toggleRegisterModal}>Regístrate</span>
                  </p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    ¿Olvidó su contraseña? <span className="text-blue-500 cursor-pointer" onClick={togglePasswordRecoveryModal}>Recupérela aquí</span>
                  </p>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                      onClick={handleSubmitUser} // Agrega esta línea
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">Inicio Sesión Administrador</h2>
                <form onSubmit={handleSubmitAdmin} className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 font-medium">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataAdmin.email}
                      onChange={handleInputChangeAdmin}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password_admin" className="block text-gray-800 font-medium">Contraseña:</label>
                    <input
                      type="password"
                      id="password_admin"
                      name="password_admin"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataAdmin.password_admin}
                      onChange={handleInputChangeAdmin}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                      onClick={handleSubmitAdmin}
                    >
                      Iniciar Sesión
                    </button>

                  </div>
                </form>
              </>
            )}
          </>
        )}

        {showRegisterModal ? (
          <RegisterModal closeModal={toggleRegisterModal} />
        ) : null}

        {showPasswordRecoveryModal ? (
          <PasswordRecoveryModal closeModal={() => {
            setShowContent(true);
            setShowPasswordRecoveryModal(false);
            closeModal();
          }} />
        ) : null}
      </div>
    </div>
  );
}

export default LoginModal;
