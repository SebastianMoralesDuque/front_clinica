import React, { useState } from 'react';
import DocCitasDelDia from '../../components/doctor/DocCitasDelDia'; // Importa el componente DocCitasPend
import DocHistorialCitas from '../../components/doctor/DocHistorialCitas';
import DoctorDayOffModal from '../../components/doctor/DoctorDayOffModal';
import CitasPendientesModal from '../../components/doctor/CitasPendientesModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
  const [isCitasPendientesModalOpen, setIsCitasPendientesModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCitasPendientesModal = () => {
    setIsCitasPendientesModalOpen(true);
  };

  const closeCitasPendientesModal = () => {
    setIsCitasPendientesModalOpen(false);
  };

  const handleRegisterDayOff = (selectedDate) => {
    // Implementa la lógica de registro aquí
    console.log(`Se registró un día libre para la fecha: ${selectedDate}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Bienvenido, Dr. Botas</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
          onClick={openCitasPendientesModal}
        >
          Agenda
        </button>
      </div>

      {/* Sección de Citas Pendientes */}
      <DocCitasDelDia />

      {/* Sección de Historial de Citas */}
      <DocHistorialCitas />
      {/* Botón para abrir el modal */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
        onClick={openModal}
      >
        Registrar Día Libre
      </button>

      {/* Modal para registrar día libre */}
      {isModalOpen && <DoctorDayOffModal closeModal={closeModal} />}
      {/* Modal de Citas Pendientes */}
      <CitasPendientesModal isOpen={isCitasPendientesModalOpen} onClose={closeCitasPendientesModal} />
    </div>
  );
}

export default Home;