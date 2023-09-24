import React, { useState } from 'react';

function HistorialMedico() {
  const [filtroMedico, setFiltroMedico] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);

  // Datos ficticios de consultas médicas
  const consultas = [
    {
      id: 1,
      fecha: '2023-09-15',
      medico: 'Dr. Juan Pérez',
      motivo: 'Atención de la Cita: Consulta de rutina',
      diagnostico: 'Diagnóstico: Sin problemas de salud detectados.',
      tratamiento: 'Tratamiento: Ninguno requerido.',
      notasMedicas: 'Notas Médicas: El paciente se encuentra en buen estado de salud.',
    },
    {
      id: 2,
      fecha: '2023-09-10',
      medico: 'Dra. María Gómez',
      motivo: 'Atención de la Cita: Dolor abdominal',
      diagnostico: 'Diagnóstico: Gastroenteritis leve.',
      tratamiento: 'Tratamiento: Reposo, hidratación y dieta blanda.',
      notasMedicas: 'Notas Médicas: El paciente debe seguir el tratamiento y evitar alimentos irritantes.',
    },
    {
      id: 3,
      fecha: '2023-09-05',
      medico: 'Dr. Carlos Rodríguez',
      motivo: 'Atención de la Cita: Fiebre persistente',
      diagnostico: 'Diagnóstico: Infección viral.',
      tratamiento: 'Tratamiento: Antipiréticos y descanso.',
      notasMedicas: 'Notas Médicas: El paciente debe controlar la fiebre y beber líquidos abundantes.',
    },
    // Puedes agregar más consultas ficticias aquí
  ];

  // Datos ficticios de información del paciente
  const pacienteInfo = {
    fechaNacimiento: '1990-05-20',
    alergias: 'Alergias: Ninguna conocida.',
    eps: 'EPS: Seguro Médico XYZ',
    tipoSangre: 'Tipo de Sangre: A+',
  };

  const filtrarConsultas = () => {
    // Filtrar por médico y fecha según los valores de filtroMedico y filtroFecha
    // Puedes implementar la lógica de filtrado aquí según tus necesidades
    const consultasFiltradas = consultas.filter((consulta) => {
      const coincideMedico = consulta.medico.includes(filtroMedico);
      const coincideFecha = consulta.fecha.includes(filtroFecha);
      return coincideMedico && coincideFecha;
    });

    return consultasFiltradas;
  };

  const mostrarDetallesConsulta = (consulta) => {
    setConsultaSeleccionada(consulta);
  };

  const cerrarDetallesConsulta = () => {
    setConsultaSeleccionada(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historial Médico</h2>
      <div className="mb-4 flex">
        <div className="mr-4">
          <label className="text-gray-700">Filtrar por Médico:</label>
          <input
            type="text"
            value={filtroMedico}
            onChange={(e) => setFiltroMedico(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="text-gray-700">Filtrar por Fecha:</label>
          <input
            type="text"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Consultas</h3>
        <div className="grid grid-cols-3 gap-4">
          {filtrarConsultas().map((consulta) => (
            <div key={consulta.id} className="bg-white border rounded-lg p-4">
              <span className="text-gray-600">
                {consulta.fecha} - {consulta.medico}
              </span>
              <button
                onClick={() => mostrarDetallesConsulta(consulta)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>
      {consultaSeleccionada && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Detalles de la Consulta</h3>
          <div className="bg-white border rounded-lg p-4">
            <p>{consultaSeleccionada.motivo}</p>
            <p>{consultaSeleccionada.diagnostico}</p>
            <p>{consultaSeleccionada.tratamiento}</p>
            <p>{consultaSeleccionada.notasMedicas}</p>
          </div>
          <button
            onClick={cerrarDetallesConsulta}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
          >
            Cerrar Detalles
          </button>
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold mb-2">Información del Paciente</h3>
        <div className="bg-white border rounded-lg p-4">
          <p>{pacienteInfo.fechaNacimiento}</p>
          <p>{pacienteInfo.alergias}</p>
          <p>{pacienteInfo.eps}</p>
          <p>{pacienteInfo.tipoSangre}</p>
        </div>
      </div>
    </div>
  );
}

export default HistorialMedico;
