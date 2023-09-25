import React, { useState } from 'react';
import Pagination from '../patient/Pagination'; // Asegúrate de importar la paginación si no lo has hecho
import { citasPendientes } from '../../pages/doctor/Data'; // Importa tus datos de citas pendientes
import { Link } from 'react-router-dom';

function DocCitasPend() {
  const elementosPorPagina = 3;
  const [paginaPendientes, setPaginaPendientes] = useState(0);

  const paginarCitasPendientes = (data) => {
    const indiceInicio = paginaPendientes * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaPendientes = (data) => {
    setPaginaPendientes(data.selected);
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Citas del día de hoy</h2>
      <ul className="flex justify-center">
        {paginarCitasPendientes(citasPendientes).map((cita) => (
          <li key={cita.id} className="mr-4">
            <div className="bg-white p-4 rounded shadow">
              <strong>ID: {cita.id}</strong><br />
              <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
              <span className="block">Fecha de Cita: {cita.fechaCita}</span>
              <span className="block">Paciente: {cita.paciente}</span>
              <span className="block">Estado: {cita.estado}</span>
              <span className="block">Motivo: {cita.motivo}</span>
              <Link to="/atenderCita">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Atender Cita
                </button>
              </Link>

            </div>
          </li>
        ))}
      </ul>
      <Pagination
        pageCount={Math.ceil(citasPendientes.length / elementosPorPagina)}
        onPageChange={cambiarPaginaPendientes}
      />
    </div>
  );
}

export default DocCitasPend;