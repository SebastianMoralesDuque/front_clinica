import React from 'react';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Bienvenido a la Clínica San Gabriel</h1>
        <p className="text-gray-600 text-center">
          En nuestra clínica, nos dedicamos a brindar servicios de salud de alta calidad. Nuestro equipo de profesionales está aquí para cuidar de ti y de tu familia.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
          <ul className="list-disc pl-6">
            <li>Consultas Médicas</li>
            <li>Análisis Clínicos</li>
            <li>Tratamientos Especializados</li>
            {/* Agrega más servicios según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
