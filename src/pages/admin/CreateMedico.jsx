import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';

function CreateMedico() {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        contrasena: '',
        confirmarContrasena: '',
        email: '',
        telefono: '',
        ciudad: '',
        especialidad: '',
    });

    const [especialidades, setEspecialidades] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [errores, setErrores] = useState({});
    const [filtroCiudades, setFiltroCiudades] = useState('');

    useEffect(() => {
        // Hacer la petición a la ruta para obtener especialidades
        fetch('http://localhost:9009/medicos/especialidades')
            .then(response => response.json())
            .then(data => setEspecialidades(data))
            .catch(error => console.error('Error al obtener especialidades:', error));

        // Hacer la petición a la ruta para obtener ciudades
        fetch('https://api-colombia.com/api/v1/City')
            .then(response => response.json())
            .then(data => setCiudades(data))
            .catch(error => console.error('Error al obtener ciudades:', error));
    }, []);  // El segundo argumento vacío asegura que la petición se realice solo una vez al montar el componente

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        let errores = {};

        // Validar el correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errores.email = 'Correo electrónico inválido';
        }

        // Validar la confirmación de la contraseña
        if (formData.contrasena !== formData.confirmarContrasena) {
            errores.confirmarContrasena = 'Las contraseñas no coinciden';
        }

        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    const mostrarNotificacion = () => {
        swal('¡Éxito!', 'Médico agregado con éxito', 'success');
        setTimeout(() => {
            window.location.href = '/crudmed';
          }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            // Encriptar la contraseña antes de enviarla al servidor
            const hashedPassword = await bcrypt.hash(formData.contrasena, 10);

            // Datos a enviar al servidor para el registro de usuario
            const datosRegistro = {
                cedula: formData.cedula,
                nombre: formData.nombre,
                contrasena: hashedPassword,  // Utiliza la contraseña encriptada
                email: formData.email,
                telefono: formData.telefono,
                ciudad: formData.ciudad,
                especialidad: formData.especialidad,
            };

            // Realizar la petición de registro de usuario al servidor
            fetch('http://localhost:9009/usuarios/gestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosRegistro),
            })
                .then(response => response.json())
                .then(data => {
                    // Manejar la respuesta del servidor, si es necesario
                    console.log('Respuesta del servidor (Registro de Usuario):', data);

                    // Datos a enviar al servidor para el registro del médico
                    const datosMedico = {
                        cedula_usuario: formData.cedula,
                        especializacion: formData.especialidad,
                    };

                    // Realizar la petición de registro de médico al servidor
                    fetch('http://localhost:9009/medicos/crear', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(datosMedico),
                    })
                        .then(response => response.json())
                        .then(dataMedico => {
                            // Manejar la respuesta del servidor, si es necesario
                            console.log('Respuesta del servidor (Registro de Médico):', dataMedico);

                            // Mostrar la notificación de éxito
                            mostrarNotificacion();
                        })
                        .catch(errorMedico => console.error('Error al enviar datos de registro de médico:', errorMedico));
                })
                .catch(error => console.error('Error al enviar datos de registro de usuario:', error));
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl mb-6 text-center">Registrar Médico</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md max-w-lg mx-auto">
                {/* Otros campos del formulario... */}
                <input type="text" name="cedula" placeholder="Cédula" onChange={handleInputChange} className="p-2 w-full border rounded" />
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} className="p-2 w-full border rounded" />
                <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleInputChange} className="p-2 w-full border rounded" />
                <input type="password" name="confirmarContrasena" placeholder="Confirmar Contraseña" onChange={handleInputChange} className="p-2 w-full border rounded" />
                {errores.confirmarContrasena && <p className="text-red-500">{errores.confirmarContrasena}</p>}
                <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleInputChange} className="p-2 w-full border rounded" />
                {errores.email && <p className="text-red-500">{errores.email}</p>}
                <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleInputChange} className="p-2 w-full border rounded" />

                {/* Menú desplegable de ciudades con búsqueda */}
                <Select
                    options={ciudades.map(ciudad => ({ value: ciudad.name, label: ciudad.name }))}
                    isSearchable
                    placeholder="Selecciona una ciudad"
                    onChange={(selectedOption) => setFormData({ ...formData, ciudad: selectedOption.value })}
                />

                {/* Campo de especialidad con opciones obtenidas de la API */}
                <select
                    name="especialidad"
                    onChange={handleInputChange}
                    value={formData.especialidad}
                    className="p-2 w-full border rounded"
                >
                    <option value="" disabled>Elija una especialidad</option>
                    {especialidades.map(especialidad => (
                        <option key={especialidad.id} value={especialidad.nombre}>{especialidad.nombre}</option>
                    ))}
                </select>

                <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full">
                    Registrar Médico
                </button>
            </form>
        </div>
    );
}

export default CreateMedico;
