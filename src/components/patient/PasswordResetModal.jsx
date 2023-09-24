import React, { useState } from 'react';

const PasswordResetModal = ({ closeModal }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']); // Usamos un array para los 6 dígitos
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el código de verificación no esté vacío y que las contraseñas coincidan
    if (verificationCode.some((digit) => digit === '') || newPassword !== confirmPassword) {
      setErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar una solicitud al servidor
    // para cambiar la contraseña del usuario con el código de verificación y la nueva contraseña.
    // Puedes mostrar un mensaje de éxito o error según la respuesta del servidor.
    console.log('Formulario de cambio de contraseña enviado con datos:', {
      verificationCode: verificationCode.join(''), // Convertir el array en un solo código
      newPassword,
    });

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
}

export default PasswordResetModal;
