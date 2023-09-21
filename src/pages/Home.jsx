import React, { useState } from 'react';
import Pagination from '../components/Pagination'; // Importa el componente de paginación

function Home() {
  const nombrePaciente = "Juan Pérez";
  const elementosPorPagina = 3; // Máximo de elementos por página
  const [paginaActual, setPaginaActual] = useState(0);

  // Datos de ejemplo para citas pendientes
  const citasPendientes = [
    {
      id: 1,
      fecha: "2023-10-15",
      medico: "Dr. Smith",
      motivo: "Control de rutina",
    },
    {
      id: 2,
      fecha: "2023-10-20",
      medico: "Dr. Johnson",
      motivo: "Dolor de cabeza",
    },
    {
      id: 3,
      fecha: "2023-11-05",
      medico: "Dr. Rodriguez",
      motivo: "Seguimiento de tratamiento",
    },
    // Agrega más citas pendientes aquí
  ];

  // Datos de ejemplo para historial médico
  const historialMedico = [
    {
      id: 1,
      fecha: "2023-09-10",
      medico: "Dr. García",
      diagnostico: "Gripe",
      tratamiento: "Reposo y medicamentos",
    },
    {
      id: 2,
      fecha: "2023-08-25",
      medico: "Dr. Pérez",
      diagnostico: "Dolor de garganta",
      tratamiento: "Gargarismos y antibióticos",
    },
    {
      id: 3,
      fecha: "2023-07-15",
      medico: "Dr. López",
      diagnostico: "Examen de rutina",
      tratamiento: "Ninguno",
    },
    {
      id: 4,
      fecha: "2023-07-15",
      medico: "Dr. López",
      diagnostico: "Examen de rutina",
      tratamiento: "Ninguno",
    },
    {
      id: 5,
      fecha: "2023-07-15",
      medico: "Dr. López",
      diagnostico: "Examen de rutina",
      tratamiento: "Ninguno",
    },
    {
      id: 6,
      fecha: "2023-07-15",
      medico: "Dr. López",
      diagnostico: "Examen de rutina",
      tratamiento: "Ninguno",
    },
    {
      id: 7,
      fecha: "2023-07-15",
      medico: "Dr. López",
      diagnostico: "Examen de rutina",
      tratamiento: "Ninguno",
    },
    // Agrega más registros de historial médico aquí
  ];

  // Datos de ejemplo para PQRS
  const pqrs = [
    {
      id: 1,
      fecha: "2023-09-05",
      asunto: "Consulta sobre factura",
      infoAdicional1: "Número de factura: 12345",
      infoAdicional2: "Detalles del problema",
      infoAdicional3: "Respuesta pendiente",
    },
    {
      id: 2,
      fecha: "2023-08-20",
      asunto: "Solicitud de cambio de cita",
      infoAdicional1: "Cita original: 2023-09-15",
      infoAdicional2: "Nueva fecha solicitada: 2023-09-20",
      infoAdicional3: "Respuesta pendiente",
    },
    {
      id: 3,
      fecha: "2023-07-10",
      asunto: "Reclamación por servicio",
      infoAdicional1: "Número de factura: 54321",
      infoAdicional2: "Descripción del problema",
      infoAdicional3: "Resuelto",
    },
    // Agrega más registros de PQRS aquí
  ];

  const paginarDatos = (data) => {
    const indiceInicio = paginaActual * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPagina = (data) => {
    setPaginaActual(data.selected);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">¡Hola, {nombrePaciente}!</h1>

      {/* Resumen de Citas Pendientes */}
      <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Citas Pendientes</h2>
        <ul className="flex">
          {paginarDatos(citasPendientes).map((cita) => (
            <li key={cita.id} className="mr-4">
              <div className="bg-white p-4 rounded shadow">
                <strong>ID: {cita.id}</strong><br />
                <span className="block">Fecha: {cita.fecha}</span>
                <span className="block">Médico: {cita.medico}</span>
                <span className="block">Motivo: {cita.motivo}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* Paginación para Citas Pendientes */}
        <Pagination
          pageCount={Math.ceil(citasPendientes.length / elementosPorPagina)}
          onPageChange={cambiarPagina}
        />
      </div>

      {/* Historial de Consultas */}
      <div className="bg-green-100 p-4 rounded shadow mb-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Historial de Consultas</h2>
        <ul className="flex">
          {paginarDatos(historialMedico).map((registro) => (
            <li key={registro.id} className="mr-4">
              <div className="bg-white p-4 rounded shadow">
                <strong>ID: {registro.id}</strong><br />
                <span className="block">Fecha: {registro.fecha}</span>
                <span className="block">Médico: {registro.medico}</span>
                <span className="block">Diagnóstico: {registro.diagnostico}</span>
                <span className="block">Tratamiento: {registro.tratamiento}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* Paginación para Historial de Consultas */}
        <Pagination
          pageCount={Math.ceil(historialMedico.length / elementosPorPagina)}
          onPageChange={cambiarPagina}
        />
      </div>

      {/* PQRS */}
      <div className="bg-yellow-100 p-4 rounded shadow mb-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">PQRS</h2>
        <ul className="flex">
          {paginarDatos(pqrs).map((pqrsItem) => (
            <li key={pqrsItem.id} className="mr-4">
              <div className="bg-white p-4 rounded shadow">
                <strong>ID: {pqrsItem.id}</strong><br />
                <span className="block">Fecha: {pqrsItem.fecha}</span>
                <span className="block">Asunto: {pqrsItem.asunto}</span>
                <span className="block">Información Adicional 1: {pqrsItem.infoAdicional1}</span>
                <span className="block">Información Adicional 2: {pqrsItem.infoAdicional2}</span>
                <span className="block">Información Adicional 3: {pqrsItem.infoAdicional3}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* Paginación para PQRS */}
        <Pagination
          pageCount={Math.ceil(pqrs.length / elementosPorPagina)}
          onPageChange={cambiarPagina}
        />
      </div>
    </div>
  );
}

export default Home;
