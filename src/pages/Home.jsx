import React, { useState } from 'react';
import Pagination from '../components/Pagination'; // Importa el componente de paginación
import { citasPendientes, citasAnteriores } from './Data'; // Importa las constantes de citas pendientes y citas anteriores desde el archivo data.js

function Home() {
  const nombrePaciente = "Sebastian Morales";
  const elementosPorPagina = 3; // Máximo de elementos por página
  const [paginaPendientes, setPaginaPendientes] = useState(0);
  const [paginaAnteriores, setPaginaAnteriores] = useState(0);

  // Función para paginar los datos de citas pendientes
  const paginarCitasPendientes = (data) => {
    const indiceInicio = paginaPendientes * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  // Función para paginar los datos de citas anteriores
  const paginarCitasAnteriores = (data) => {
    const indiceInicio = paginaAnteriores * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  // Función para cambiar la página de citas pendientes
  const cambiarPaginaPendientes = (data) => {
    setPaginaPendientes(data.selected);
  };

  // Función para cambiar la página de citas anteriores
  const cambiarPaginaAnteriores = (data) => {
    setPaginaAnteriores(data.selected);
  };

  // Función para manejar el clic en el botón "Agendar Cita"
  const handleAgendarCitaClick = () => {
    // Aquí puedes agregar la lógica para agendar una cita
    alert("Cita agendada");
  };

  return (
<div className="container mx-auto p-4">
  {/* Encabezado */}
  <div className="mb-4">
    <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
      <div>
        <h1 className="text-2xl font-bold">¡Bienvenido, {nombrePaciente}!</h1>
        {/* Información del Paciente */}
        <div className="text-sm">
          <p className="text-gray-600">Número de Identificación: 1004516248</p>
          <p className="text-gray-600">Ciudad de Residencia: Armenia</p>
          {/* Otros detalles relevantes */}
        </div>
      </div>
      {/* Botón "Agendar Cita" */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Agendar Cita
      </button>
    </div>
  </div>

  {/* Resumen de Citas Pendientes */}
  <div className="mb-4">
    <h2 className="text-lg font-semibold mb-2 text-center">Citas Pendientes</h2>
  </div>
  <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
    <ul className="flex justify-center">
      {paginarCitasPendientes(citasPendientes).map((cita) => (
        <li key={cita.id} className="mr-4">
          <div className="bg-white p-4 rounded shadow">
            <strong>ID: {cita.id}</strong><br />
            <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
            <span className="block">Fecha de Cita: {cita.fechaCita}</span>
            <span className="block">Médico: {cita.medico}</span>
            <span className="block">Paciente: {cita.paciente}</span>
            <span className="block">Estado: {cita.estado}</span>
            <span className="block">Motivo: {cita.motivo}</span>
          </div>
        </li>
      ))}
    </ul>
    <hr />
  </div>
  <Pagination
    pageCount={Math.ceil(citasPendientes.length / elementosPorPagina)}
    onPageChange={cambiarPaginaPendientes}
  />
  {/* Separador */}
<div className="text-center mt-4">
  <hr className="border-t-2 border-gray-300" />
</div>
<div className="mb-4">
</div>
<div className="mb-4">
  <h2 className="text-lg font-semibold mb-2 text-center">Citas Anteriores</h2>
</div>
<div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
  <ul className="flex justify-center">
    {paginarCitasAnteriores(citasAnteriores).map((cita) => (
      <li key={cita.id} className="mr-4">
        <div className="bg-white p-4 rounded shadow">
          <strong>ID: {cita.id}</strong><br />
          <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
          <span className="block">Fecha de Cita: {cita.fechaCita}</span>
          <span className="block">Médico: {cita.medico}</span>
          <span className="block">Paciente: {cita.paciente}</span>
          <span className="block">Estado: {cita.estado}</span>
          <span className="block">Motivo: {cita.motivo}</span>
          {/* Agregar botón "Generar PQR" */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => handleGenerarPQRClick(cita.id)} // Asignar una función para manejar el clic
          >
            Generar PQR
          </button>
        </div>
      </li>
    ))}
  </ul>
  <hr />
  {/* Separador */}
  <div className="text-center mt-4">
    <hr className="border-t-2 border-gray-200" />
  </div>
</div>
<Pagination
  pageCount={Math.ceil(citasAnteriores.length / elementosPorPagina)}
  onPageChange={cambiarPaginaAnteriores}
/>
</div>

  );
}

export default Home;
