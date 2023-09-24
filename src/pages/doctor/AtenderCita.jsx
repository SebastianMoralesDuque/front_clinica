import React, { useState } from 'react';

function AtenderCita() {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [historialVisible, setHistorialVisible] = useState(false);

  const handleGuardarAtencion = () => {
    // Aquí puedes implementar la lógica para guardar la atención de la cita
    // Puedes enviar el diagnóstico y tratamiento al servidor, por ejemplo.
    // Luego redirige al médico de nuevo a la página de citas pendientes o donde sea necesario.
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Atender Cita</h2>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
        <div className="flex">
          {/* Columna de Información */}
          <div className="w-1/2 pr-4">
            <h3 className="text-lg font-semibold">Datos de la Cita</h3>
            <p>Fecha de Cita: 2023-09-30 10:00 AM</p>
            <p>Nombre del Paciente: Juan Pérez</p>
            <p>Motivo de la Consulta: Dolor de cabeza</p>
          </div>

          {/* Columna de Historial Médico */}
          <div className="w-1/2 pl-4">
            <h3 className="text-lg font-semibold">Historial Médico del Paciente</h3>
            <div className="bg-white p-4 rounded shadow">
              {/* Tabla de Historial Médico */}
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border p-2">Fecha</th>
                      <th className="border p-2">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">2023-08-01</td>
                      <td className="border p-2">El paciente se queja de dolor abdominal. Se realiza un ultrasonido para diagnóstico.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-09-25</td>
                      <td className="border p-2">El paciente se queja de dolor de cabeza. Se receta analgésico.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-09-15</td>
                      <td className="border p-2">El paciente tiene fiebre y dolor de garganta. Se receta antibióticos.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-08-30</td>
                      <td className="border p-2">El paciente presenta alergia en la piel. Se receta crema antialérgica.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-08-15</td>
                      <td className="border p-2">El paciente tiene problemas de insomnio. Se recomienda terapia de sueño.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-08-01</td>
                      <td className="border p-2">El paciente se queja de dolor abdominal. Se realiza un ultrasonido para diagnóstico.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-07-15</td>
                      <td className="border p-2">El paciente presenta fiebre alta. Se indica reposo y líquidos.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-07-01</td>
                      <td className="border p-2">El paciente tiene dolor en la espalda. Se recomienda fisioterapia.</td>
                    </tr>
                    <tr>
                      <td className="border p-2">2023-06-15</td>
                      <td className="border p-2">El paciente sufre una lesión en el deporte. Se realiza radiografía para evaluar el daño.</td>
                    </tr>
                    {/* Agrega más filas según sea necesario */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Campos de Diagnóstico y Tratamiento */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Registrar la Atención</h3>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Diagnóstico
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Tratamiento
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
          ></textarea>
        </div>

        {/* Botón para Finalizar la Atención */}
        <div className="mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleGuardarAtencion}
          >
            Finalizar Atención
          </button>
        </div>
      </div>

      {/* Otros elementos opcionales que mencionaste */}
    </div>
  );
}

export default AtenderCita;
