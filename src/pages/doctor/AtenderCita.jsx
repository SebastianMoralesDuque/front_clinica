import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

function AtenderCita() {
  const { citaId } = useParams();

  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [notasMedicas, setNotasMedicas] = useState('');

  const handleGuardarAtencion = () => {
    const datosAtencion = {
      idCita: citaId,
      sintomas,
      diagnostico,
      notasMedicas,
      tratamiento,
    };
  
    swal({
      title: 'Registrando Atención',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });
    const idCita = parseInt(citaId, 10); // Convierte citaId a un entero
    // Hacer la solicitud POST a la primera ruta
    fetch('http://localhost:9009/atenciones/gestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAtencion),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar la atención');
        }
        // Hacer la solicitud POST adicional a la segunda ruta
        return fetch('http://localhost:9009/citas/gestion/cambiarEstadoCita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_cita: idCita }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw Error('Error al cambiar el estado de la cita');
        }
  
        // Cerrar el mensaje de carga y mostrar un mensaje de éxito
        swal({
          title: 'Atención Registrada',
          icon: 'success',
        });
  
        // Redirigir después de mostrar la alerta
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      })
      .catch((error) => {
        // Cerrar el mensaje de carga y mostrar un mensaje de error
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Atender Cita</h2>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
        {/* Otros elementos relevantes para mostrar información de la cita */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Registrar la Atención</h3>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Diagnóstico
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Tratamiento
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Síntomas
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Notas Médicas
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={notasMedicas}
            onChange={(e) => setNotasMedicas(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-4">
          <Link to="/">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleGuardarAtencion}
            >
              Finalizar Atención
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AtenderCita;
