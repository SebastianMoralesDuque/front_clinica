import React, { useState } from 'react';
import Pagination from '../../components/patient/Pagination';
import { citasPendientes, citasAnteriores } from './Data';
import AgendarCitaModal from '../../components/patient/AgendarCitaModal';
import PqrModal from '../../components/patient/PqrModal'; // Importa el nuevo componente
import 'react-datepicker/dist/react-datepicker.css';

function Home() {
  const nombrePaciente = "Sebastian Morales";
  const elementosPorPagina = 3;
  const [paginaPendientes, setPaginaPendientes] = useState(0);
  const [paginaAnteriores, setPaginaAnteriores] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pqrModalVisible, setPqrModalVisible] = useState(false); // Estado para mostrar el modal PQR
  const [selectedCitaId, setSelectedCitaId] = useState(null); // Estado para almacenar el ID de la cita seleccionada
  const [formularioCita, setFormularioCita] = useState({
    especializacion: '',
    medico: '',
    fecha: null, 
    hora: '',
    motivo: '',
  });
  const [especializaciones] = useState([
    'Especialización 1',
    'Especialización 2',
    // Agrega más especializaciones según tus necesidades
  ]);

  const [medicosDisponibles, setMedicosDisponibles] = useState({
    'Especialización 1': [
      { nombre: 'Dr. Juan Pérez', horarios: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM'] },
      // Agrega más médicos y sus horarios según la especialización
    ],
    'Especialización 2': [
      { nombre: 'Dra. María González', horarios: ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'] },
      // Agrega más médicos y sus horarios según la especialización
    ],
    // Agrega más especializaciones y sus médicos disponibles
  });

  const [horariosMedico, setHorariosMedico] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null); // Estado para la fecha seleccionada

  const paginarCitasPendientes = (data) => {
    const indiceInicio = paginaPendientes * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const paginarCitasAnteriores = (data) => {
    const indiceInicio = paginaAnteriores * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaPendientes = (data) => {
    setPaginaPendientes(data.selected);
  };

  const cambiarPaginaAnteriores = (data) => {
    setPaginaAnteriores(data.selected);
  };

  const handleAgendarCitaClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAgendarCita = (cita) => {
    // Aquí puedes agregar la lógica para guardar la cita
    alert("Cita agendada con éxito");
  };

  const handleGenerarPQRClick = (citaId) => {
    setSelectedCitaId(citaId);
    setPqrModalVisible(true);
  };

  const handleFechaChange = (date) => {
    setFechaSeleccionada(date);
    setFormularioCita({
      ...formularioCita,
      fecha: date,
    });
    // Obtener los horarios disponibles del médico seleccionado para la fecha seleccionada
    const medicoSeleccionado = formularioCita.medico;
    if (medicoSeleccionado) {
      const horarios = medicosDisponibles[formularioCita.especializacion].find(
        (medico) => medico.nombre === medicoSeleccionado
      ).horarios;
      setHorariosMedico(horarios);
    }
  };

  const handleFormularioChange = (e) => {
    const { name, value } = e.target;
    setFormularioCita({
      ...formularioCita,
      [name]: value,
    });
    // Si se cambia la especialización o el médico, resetear la fecha y los horarios
    if (name === 'especializacion' || name === 'medico') {
      setFechaSeleccionada(null);
      setHorariosMedico([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">¡Bienvenido, {nombrePaciente}!</h1>
            <div className="text-sm">
              <p className="text-gray-600">Número de Identificación: 1004516248</p>
              <p className="text-gray-600">Ciudad de Residencia: Armenia</p>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={handleAgendarCitaClick}
          >
            Agendar Cita
          </button>
        </div>
      </div>

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

      <div className="text-center mt-4">
        <hr className="border-t-2 border-gray-300" />
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
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleGenerarPQRClick(cita.id)}
                >
                  Generar PQR
                </button>
              </div>
            </li>
          ))}
        </ul>
        <hr />
      </div>
      <Pagination
        pageCount={Math.ceil(citasAnteriores.length / elementosPorPagina)}
        onPageChange={cambiarPaginaAnteriores}
      />

      <AgendarCitaModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        handleAgendarCita={handleAgendarCita}
        formularioCita={formularioCita}
        especializaciones={especializaciones}
        medicosDisponibles={medicosDisponibles}
        fechaSeleccionada={fechaSeleccionada}
        horariosMedico={horariosMedico}
        handleFormularioChange={handleFormularioChange}
        handleFechaChange={handleFechaChange}
      />

      {/* Agregar el modal PQR */}
      {pqrModalVisible && (
        <PqrModal citaId={selectedCitaId} closeModal={() => setPqrModalVisible(false)} />
      )}
    </div>
  );
}

export default Home;
