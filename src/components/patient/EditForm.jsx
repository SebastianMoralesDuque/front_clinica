import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';
import userRegisterService from '../../services/userRegisterService';
import obtenerEps from '../../services/epsService';

const EditForm = ({ detallesAEditar, handleFieldChange, handleGoBack }) => {
  const [epsOptions, setEpsOptions] = useState([]);
  const [selectedEps, setSelectedEps] = useState('');

  useEffect(() => {
    const fetchEps = async () => {
      try {
        const epsData = await obtenerEps();
        setEpsOptions(epsData);
      } catch (error) {
        console.error('Error al obtener EPS:', error);
      }
    };

    fetchEps();
  }, []); // Se ejecutará una vez al montar el componente

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFieldChange('url_foto', file);
  };

  const handleSaveChanges = async () => {
    try {
      let imageUrl = '';

      if (detallesAEditar.url_foto) {
        const formData = new FormData();
        formData.append('fotoPerfil', detallesAEditar.url_foto);

        imageUrl = await userRegisterService.uploadPhotoToCloudinary(formData, detallesAEditar.cedula);
        console.log('Foto cargada en Cloudinary con éxito:', imageUrl);
      }

      const { email, telefono, alergias, cedula } = detallesAEditar;
      const eps = selectedEps || detallesAEditar.eps; // Utiliza la EPS seleccionada o la existente

      const response = await fetch('http://localhost:9009/usuarios/gestion/editarPaciente', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, telefono, url_foto: imageUrl, alergias, eps, cedula }), // Agregamos cedula al cuerpo
      });

      if (response.ok) {
        // Mostrar swal en caso de éxito
        swal('Éxito', 'Paciente editado con éxito', 'success', {
          icon: 'success',
          timer: 2000, // Cerrar automáticamente el alerta después de 2 segundos
        }).then(() => {
          window.location.href = '/';
        });

        // Puedes redirigir o realizar otras acciones según tus necesidades
      } else {
        // Mostrar swal en caso de error
        swal('Error', 'Hubo un error al editar el paciente. Por favor, inténtalo de nuevo.', 'error');
      }
    } catch (error) {
      console.error('Error al editar el paciente:', error);
    }
  };

  return (
    <div>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-800">Subir Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800">Cédula</label>
          <input
            type="text"
            value={detallesAEditar.cedula}
            disabled
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800">Email</label>
          <input
            type="text"
            value={detallesAEditar.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800">Teléfono</label>
          <input
            type="text"
            value={detallesAEditar.telefono}
            onChange={(e) => handleFieldChange('telefono', e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800">Alergias</label>
          <input
            type="text"
            value={detallesAEditar.alergias}
            onChange={(e) => handleFieldChange('alergias', e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800">EPS</label>
          <select
            value={selectedEps}
            onChange={(e) => setSelectedEps(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option key="" value="" disabled>
              Seleccione EPS
            </option>
            {epsOptions.map((eps, index) => (
              <option key={index} value={eps.nombre}>
                {eps.nombre}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
      <button onClick={handleGoBack} className="mt-4 bg-gray-500 text-white px-4 py-2 hover:bg-gray-600">
        Regresar
      </button>
    </div>
  );
};

export default EditForm;
