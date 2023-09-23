import React, { useState, useEffect } from 'react';

function AgendarCitaModal({ modalVisible, closeModal, handleAgendarCita }) {
  const [formularioCita, setFormularioCita] = useState({
    especializacion: '',
    medico: '',
    motivo: '',
  });

  const handleFormularioChange = (e) => {
    const { name, value } = e.target;
    setFormularioCita({
      ...formularioCita,
      [name]: value,
    });
  };

  const handleSubmitFormulario = (e) => {
    e.preventDefault();
    handleAgendarCita(formularioCita);
    closeModal();
  };

  // Agregar un manejador de eventos para cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleCloseModalOnOutsideClick = (e) => {
      if (modalVisible && e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };

    window.addEventListener('click', handleCloseModalOnOutsideClick);

    return () => {
      window.removeEventListener('click', handleCloseModalOnOutsideClick);
    };
  }, [modalVisible, closeModal]);

  return (
    modalVisible && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 modal-overlay">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Agendar Cita</h2>
          <form onSubmit={handleSubmitFormulario}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Especialización:
              </label>
              <select
                name="especializacion"
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={handleFormularioChange}
                value={formularioCita.especializacion}
              >
                <option value="">Seleccionar Especialización</option>
                <option value="Especialización 1">Especialización 1</option>
                <option value="Especialización 2">Especialización 2</option>
                {/* Agrega más opciones de especialización según tus necesidades */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Médico:
              </label>
              <select
                name="medico"
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={handleFormularioChange}
                value={formularioCita.medico}
              >
                <option value="">Seleccionar Médico</option>
                {/* Aquí puedes agregar dinámicamente las opciones de médicos disponibles según la especialización seleccionada */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Motivo para Consulta:
              </label>
              <textarea
                name="motivo"
                className="w-full border border-gray-300 rounded py-2 px-3"
                rows="4"
                onChange={handleFormularioChange}
                value={formularioCita.motivo}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Agendar Cita
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AgendarCitaModal;
