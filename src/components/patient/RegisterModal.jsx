import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getToken from '../../services/tokenService';
import obtenerEstados from '../../services/estadoService';
import obtenerCiudades from '../../services/ciudadService'
import obtenerEps from '../../services/epsService'; // Importa la función aquí;

const RegisterModal = ({ closeModal }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    cedula: '',
    telefono: '',
    departamento: '',
    ciudad: '',
    email: '',
    contrasena: '',
    fotoPerfil: null, // Nuevo campo para la foto de perfil
    fechaNacimiento: null,
    eps: '',
    alergias: '',
    tipoSangre: '',
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [epsList, setEpsList] = useState([]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      // Si el campo es de tipo archivo, guarda el archivo seleccionado
      const newValue = e.target.files[0];
      setFormData({
        ...formData,
        [name]: newValue,
      });
    } else {
      // Para otros campos, simplemente actualiza el valor
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFechaNacimientoChange = (date) => {
    setFormData({
      ...formData,
      fechaNacimiento: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario de registro enviado con datos:', formData);
    closeModal();
  
    try {
      // Cargar la foto en Cloudinary
      let imageUrl = null;
      if (formData.fotoPerfil) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", formData.fotoPerfil);
        cloudinaryData.append("public_id", formData.cedula);
        cloudinaryData.append("upload_preset", "ml_default");
        cloudinaryData.append("cloud_name", "dkm9g0zpt"); // Reemplaza con tu cloud_name
        cloudinaryData.append("api_key", "654495213436479"); // Reemplaza con tu api_key
        cloudinaryData.append("api_secret", "PIJO3ukm6rEsZFGjOIK7gcVDV-g"); // Reemplaza con tu api_secret
  
        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload", {
          method: "post",
          body: cloudinaryData,
        });
  
        if (cloudinaryResponse.ok) {
          const cloudinaryData = await cloudinaryResponse.json();
          imageUrl = cloudinaryData.url;
          console.log('Foto cargada en Cloudinary con éxito:', imageUrl);
        } else {
          console.error('Error al cargar la foto en Cloudinary');
        }
      }
  
      // Datos para la primera petición
      const data1 = {
        cedula: formData.cedula,
        nombre: formData.nombreCompleto,
        contrasena: formData.contrasena,
        email: formData.email,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        url_foto: imageUrl, // Agregar la URL de la foto de perfil
      };
  
      // Realizar la primera petición a http://localhost:9009/usuarios/gestion
      const response1 = await fetch('http://localhost:9009/usuarios/gestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
      });
  
      if (response1.ok) {
        console.log('Primera petición exitosa');

        // Obtener la respuesta JSON que debe contener la ID del usuario creado
        const usuarioCreado = await response1.json();

        // Datos para la segunda petición
        const data2 = {
          cedula_paciente: formData.cedula,
          fecha_nacimiento: formData.fechaNacimiento,
          alergias: formData.alergias,
          eps: formData.eps,
          tipo_sangre: formData.tipoSangre
        };

        // Realizar la segunda petición a http://localhost:9009/usuarios/gestion/pacientes
        const response2 = await fetch('http://localhost:9009/usuarios/gestion/pacientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2),
        });

        if (response2.ok) {
          console.log('Segunda petición exitosa');
        } else {
          console.error('Error en la segunda petición');
        }
      } else {
        console.error('Error en la primera petición');
      }
    } catch (error) {
      console.error('Error al realizar las peticiones:', error);
    }
  };



  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const authToken = await getToken();
        setAuthToken(authToken);
      } catch (error) {
        console.error("Error al obtener el token de autenticación:", error);
      }
    };

    obtenerToken();
  }, []);

  useEffect(() => {
    const cargarEps = async () => {
      try {
        const epsData = await obtenerEps(); // Utiliza la función importada
        setEpsList(epsData);
      } catch (error) {
        console.error('Error al obtener datos de EPS:', error);
      }
    };

    cargarEps();
  }, []);

  useEffect(() => {
    if (authToken) {
      const cargarEstados = async () => {
        try {
          const estados = await obtenerEstados(authToken);
          setDepartamentos(estados);
        } catch (error) {
          console.error("Error al obtener datos de departamentos:", error);
        }
      };

      cargarEstados();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken && formData.departamento) {
      const cargarCiudadesPorEstado = async () => {
        try {
          const ciudades = await obtenerCiudades(authToken, formData.departamento);
          setCiudades(ciudades);
        } catch (error) {
          console.error("Error al obtener datos de ciudades:", error);
        }
      };

      cargarCiudadesPorEstado();
    }
  }, [authToken, formData.departamento]);


  return (
    <div className="fixed inset-0 flex items-center justify-center" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-4 max-w-lg" ref={modalRef}>
        <h2 className="text-xl font-semibold mb-2 text-center">Regístrate</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <input
                type="text"
                placeholder="Nombre Completo"
                name="nombreCompleto"
                id="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2">
              <input
                type="text"
                placeholder="Cédula"
                name="cedula"
                id="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <input
                type="text"
                placeholder="Teléfono"
                name="telefono"
                id="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2">
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <label htmlFor="departamento" className="block text-gray-800 font-medium mb-1">Departamento</label>
              <select
                className="form-select w-full border rounded px-3 py-2"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleInputChange}
              >
                <option disabled value="">Selecciona</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.state_name} value={departamento.state_name}>
                    {departamento.state_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2 px-2">
              <label htmlFor="ciudad" className="block text-gray-800 font-medium mb-1">Municipio</label>
              <select
                className="form-select w-full border rounded px-3 py-2"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              >
                <option disabled selected value="">Selecciona</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.city_name} value={ciudad.city_name}>
                    {ciudad.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
              <input
                type="password"
                placeholder="Contraseña"
                name="contrasena"
                id="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <label htmlFor="fechaNacimiento" className="block text-gray-800 font-medium mb-1">Fecha de Nacimiento</label>
              <DatePicker
                selected={formData.fechaNacimiento}
                onChange={handleFechaNacimientoChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                name="fechaNacimiento"
                id="fechaNacimiento"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2">
              <label htmlFor="eps" className="block text-gray-800 font-medium mb-1">EPS</label>
              <select
                className="form-select w-full border rounded px-3 py-2"
                id="eps"
                name="eps"
                value={formData.eps}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">Selecciona</option>
                {epsList.map((eps) => (
                  <option key={eps.nombre} value={eps.nombre}>
                    {eps.nombre}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <label htmlFor="alergias" className="block text-gray-800 font-medium mb-1">Alergias</label>
              <input
                type="text"
                placeholder="Alergias"
                name="alergias"
                id="alergias"
                value={formData.alergias}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2 px-2">
              <label htmlFor="tipoSangre" className="block text-gray-800 font-medium mb-1">Tipo de Sangre</label>
              <select
                className="form-select w-full border rounded px-3 py-2"
                id="tipoSangre"
                name="tipoSangre"
                value={formData.tipoSangre}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">Selecciona</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
              <label htmlFor="fotoPerfil" className="block text-gray-800 font-medium mb-1">Foto de Perfil</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="fotoPerfil"
                id="fotoPerfil"
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
              name="registro"
              id="registro"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
