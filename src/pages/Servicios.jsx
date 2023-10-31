import React from 'react';

function Servicios() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Nuestros Servicios</h1>
        <p className="text-gray-600 text-center">
          En la Clínica San Gabriel, nos esforzamos por proporcionar una amplia gama de servicios de salud para atender tus necesidades. Nuestro equipo de profesionales altamente capacitados se dedica a garantizar tu bienestar y comodidad.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Algunos de Nuestros Servicios Incluyen:</h2>
          <ul className="list-disc pl-6">
            <li>Consultas Médicas: Ofrecemos consultas con médicos especializados para abordar tus preocupaciones de salud y proporcionar orientación.</li>
            <li>Análisis Clínicos: Realizamos una variedad de análisis clínicos para evaluar y monitorear tu salud.</li>
            <li>Tratamientos Especializados: Proporcionamos tratamientos adaptados a tus necesidades específicas, utilizando tecnologías y enfoques de vanguardia.</li>
            {/* Agrega más servicios según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
