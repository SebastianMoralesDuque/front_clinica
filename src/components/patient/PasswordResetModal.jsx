import React, { useState } from 'react';
import bcrypt, { hash } from 'bcryptjs';

const PasswordResetModal = ({ closeModal, cedula }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); // Usamos un array para los 6 dígitos
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
      verificationCode: '',
      passwordToSend: '',
      cedula: cedula
  });

  const handleVerificationCodeChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^\d+$/)) {
      // Asegúrate de que solo se ingresen dígitos
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Avanzar al siguiente campo de entrada cuando se ingresa un dígito válido
      if (index < 5 && value !== '') {
        document.getElementById(`verificationCode${index + 1}`).focus();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida que el código de verificación no esté vacío y que las contraseñas coincidan
    if (verificationCode.some((digit) => digit === '') || newPassword !== confirmPassword) {
      setErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }
   
    const hashedPassword = await bcrypt.hash(newPassword, 10); //Encripta la contraseña antes de mandarla al back para cambiarla
    formData.passwordToSend = hashedPassword;
    formData.verificationCode = verificationCode.join('');

    try {
      console.log(formData);
      // Realizar la solicitud POST al servidor para cambiar la contraseña
      const response = await fetch('http://localhost:9009/usuarios/gestion/login/cambiarContrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Verificar si la solicitud fue exitosa (código de estado 2xx)
      if (response.ok) {
        console.log('Contraseña cambiada con éxito. Puedes manejar la respuesta del servidor aquí si es necesario.');
        swal({
          title: 'Recuperar Contraseña',
          text: 'Su contraseña ha sido modificada con éxito.',
          icon: 'success',
          timer: '3000',
          buttons: false,
        });
        closeModal();
      } else {
        // Manejar errores si la solicitud no fue exitosa
        console.error('Error en la solicitud:', response.status, response.statusText);
        swal({
          title: 'Recuperar Contraseña',
          text: 'El código ingresado es incorrecto.',
          icon: 'error',
          timer: '3000',
          buttons: false,
        });
      }
    } catch (error) {
      // Manejar errores de red o de la solicitud
      console.error('Error en la solicitud:', error.message);
    }

    // Cierra el modal después de enviar el formulario
    closeModal();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Cambiar Contraseña</h2>
      <p className="text-center text-gray-600 mb-4">Ingrese el código de verificación</p> 
      <div className="h-4"></div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 flex justify-center">
          {verificationCode.map((digit, index) => (
            <input
              type="text"
              id={`verificationCode${index}`}
              name={`verificationCode${index}`}
              key={index}
              className="w-10 h-10 border text-center rounded mx-1 px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              value={digit}
              onChange={(e) => handleVerificationCodeChange(e, index)}
              maxLength="1"
            />
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-800 font-medium">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-800 font-medium">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetModal;