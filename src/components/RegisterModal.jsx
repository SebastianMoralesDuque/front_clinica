import React, { useRef, useState, useEffect } from 'react';
import getToken from '../services/tokenService';
import obtenerEstados from '../services/estadoService';
import obtenerCiudades from '../services/ciudadService';

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
    foto: null, // Campo para la foto
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [authToken, setAuthToken] = useState('');

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // Si el campo es de tipo archivo, guarda el archivo seleccionado
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario de registro enviado con datos:', formData);
    closeModal();
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="w-full px-2">
              <label htmlFor="foto" className="block text-gray-800 font-medium mb-1">Foto</label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleInputChange}
                className="block w-full border rounded py-2 px-4 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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