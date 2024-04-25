import React from 'react';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Bienvenido a la Cosmetica Coco Pink</h1>
        <p className="text-gray-600 text-center">
          En nuestra Cosmetica, nos dedicamos a brindar servicios de Cosmetica de alta calidad. Nuestro equipo de profesionales está aquí para ti.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
          <ul className="list-disc pl-6">
            <li>Consultas</li>
            <li>Análisis</li>
            <li>Atencion Especializada</li>
            {/* Agrega más servicios según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
