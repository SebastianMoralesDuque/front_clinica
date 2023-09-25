import React, { useState } from 'react';
import Pagination from '../patient/Pagination'; // Asegúrate de importar la paginación si no lo has hecho
import { historialCitas } from '../../pages/doctor/Data'; // Importa tus datos de historial de citas

function DocHistorialCitas() {
  const elementosPorPagina = 3;
  const [paginaHistorial, setPaginaHistorial] = useState(0);

  const paginarHistorialCitas = (data) => {
    const indiceInicio = paginaHistorial * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaHistorial = (data) => {
    setPaginaHistorial(data.selected);
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Historial de Citas</h2>
      <ul className="flex justify-center">
        {paginarHistorialCitas(historialCitas).map((cita) => (
          <li key={cita.id} className="mr-4">
            <div className="bg-white p-4 rounded shadow">
              <strong>ID: {cita.id}</strong><br />
              <span className="block">Fecha de Atención: {cita.fechaAtencion}</span>
              <span className="block">Paciente: {cita.paciente}</span>
              <span className="block">Diagnóstico: {cita.diagnostico}</span>
              <span className="block">Tratamiento: {cita.tratamiento}</span>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        pageCount={Math.ceil(historialCitas.length / elementosPorPagina)}
        onPageChange={cambiarPaginaHistorial}
      />
    </div>
  );
}

export default DocHistorialCitas;