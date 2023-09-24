import React, { useState } from 'react';

function EditarInformacionModal({ pacienteInfo, closeModal }) {
  // Estados para los campos editables
  const [nombre, setNombre] = useState(pacienteInfo.nombre);
  const [cedula, setCedula] = useState(pacienteInfo.cedula_usuario);
  const [fechaNacimiento, setFechaNacimiento] = useState(pacienteInfo.fecha_nacimiento);
  const [alergias, setAlergias] = useState(pacienteInfo.alergias);
  const [eps, setEps] = useState(pacienteInfo.eps);
  const [tipoSangre, setTipoSangre] = useState(pacienteInfo.tipo_sangre);

  // Función para guardar los cambios y cerrar el modal
  const guardarCambios = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la información del paciente
    // Puedes enviar una solicitud al servidor para actualizar los datos.
    // Después de guardar los cambios, cierra el modal.
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Editar Información</h2>
        <form className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-800 font-medium">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cedula" className="block text-gray-800 font-medium">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fechaNacimiento" className="block text-gray-800 font-medium">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alergias" className="block text-gray-800 font-medium">Alergias:</label>
            <input
              type="text"
              id="alergias"
              name="alergias"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eps" className="block text-gray-800 font-medium">EPS:</label>
            <input
              type="text"
              id="eps"
              name="eps"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={eps}
              onChange={(e) => setEps(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipoSangre" className="block text-gray-800 font-medium">Tipo de Sangre:</label>
            <input
              type="text"
              id="tipoSangre"
              name="tipoSangre"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={tipoSangre}
              onChange={(e) => setTipoSangre(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={guardarCambios}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarInformacionModal;
