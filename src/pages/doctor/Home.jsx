import React, { useState } from 'react';
import DocCitasPend from '../../components/doctor/DocCitasPend'; // Importa el componente DocCitasPend
import DocHistorialCitas from '../../components/doctor/DocHistorialCitas';
import DoctorDayOffModal from '../../components/doctor/DoctorDayOffModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegisterDayOff = (selectedDate) => {
    // Implementa la lógica de registro aquí
    console.log(`Se registró un día libre para la fecha: ${selectedDate}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, Dr. Botas</h1>

      {/* Sección de Citas Pendientes */}
      <DocCitasPend />

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
    </div>
  );
}

export default Home;