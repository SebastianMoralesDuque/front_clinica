import React, { useState } from 'react';

function AtenderCita() {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');

  const handleGuardarAtencion = () => {
    // Aquí puedes implementar la lógica para guardar la atención de la cita
    // Puedes enviar el diagnóstico y tratamiento al servidor, por ejemplo.
    // Luego redirige al médico de nuevo a la página de citas pendientes o donde sea necesario.
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Atender Cita</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Diagnóstico
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tratamiento
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleGuardarAtencion}
        >
          Guardar Atención
        </button>
      </div>
    </div>
  );
}

export default AtenderCita;