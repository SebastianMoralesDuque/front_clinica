import React from 'react';
import DocCitasPend from '../../components/doctor/DocCitasPend'; // Importa el componente DocCitasPend


function Home() {
  return (
    <div>
      <h2>Bienvenido, Dr. Nombre del Médico</h2>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-center">Citas Pendientes</h2>
      </div>
      <DocCitasPend />
      <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
        {/* ... Resto del código ... */}
      </div>
    </div>
  );
}

export default Home;