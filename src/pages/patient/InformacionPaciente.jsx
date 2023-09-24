import React, { useState } from 'react';
import { FaUser, FaEdit } from 'react-icons/fa';
import EditarInformacionModal from './EditarInformacionModal'; // Importa el componente de edición de información

function InformacionPaciente() {
  const [isEditing, setIsEditing] = useState(false);

  // Datos ficticios del paciente
  const pacienteInfo = {
    nombre: 'Nombre del Paciente',
    cedula_usuario: '1234567890',
    fecha_nacimiento: '1990-05-20',
    alergias: 'Alergias: Ninguna conocida.',
    eps: 'EPS: Seguro Médico XYZ',
    tipo_sangre: 'Tipo de Sangre: A+',
    // Agrega otros datos del paciente aquí
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-4">
          <div className="relative rounded-full w-32 h-32 mx-auto bg-gray-300">
            {/* Icono de usuario */}
            <FaUser className="absolute inset-0 w-full h-full text-gray-500 m-auto" />
          </div>
          <button
            onClick={toggleEdit}
            className="mt-2 text-blue-500 hover:underline focus:outline-none"
          >
            Editar Foto de Perfil
          </button>
        </div>
        {isEditing ? (
          <EditarInformacionModal pacienteInfo={pacienteInfo} closeModal={toggleEdit} />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">{pacienteInfo.nombre}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>{`Cédula: ${pacienteInfo.cedula_usuario}`}</p>
                <p>{`Fecha de Nacimiento: ${pacienteInfo.fecha_nacimiento}`}</p>
              </div>
              <div>
                <p>{pacienteInfo.alergias}</p>
                <p>{pacienteInfo.eps}</p>
                <p>{pacienteInfo.tipo_sangre}</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={toggleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
              >
                Editar Información
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InformacionPaciente;
