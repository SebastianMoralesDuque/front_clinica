import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import AssignScheduleModal from '../../components/admin/AssignScheduleModal';// Ajusta la ruta según tu estructura de archivos

function CrudMed() {
    const [medicoData, setMedicoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCedula, setSelectedCedula] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9009/medicos/gestion');
            if (response.ok) {
                const data = await response.json();
                setMedicoData(data);
            } else {
                console.error('Error al obtener datos de médicos');
            }
        } catch (error) {
            console.error('Error en la solicitud para obtener datos de médicos:', error);
        }
    };

    const handleEdit = (cedula) => {
        console.log(`Editar médico con cédula: ${cedula}`);
    };

    const handleDelete = async (cedula, especialidad, pacienteData) => {
        try {
            // Eliminar médico
            const medicoResponse = await fetch('http://localhost:9009/medicos/eliminar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cedula_usuario: cedula, especializacion: especialidad }),
            });

            // Verificar si se eliminó el medico con éxito
            if (medicoResponse.ok) {

                // Crear objeto con datos del medico
                const usuarioEliminar = {
                    cedula: pacienteData.cedula,
                    nombre: pacienteData.nombre,
                    contrasena: pacienteData.contrasena,
                    email: pacienteData.email,
                    telefono: pacienteData.telefono,
                    ciudad: pacienteData.ciudad,
                };

                // Eliminar usuario asociado
                const usuarioResponse = await fetch('http://localhost:9009/usuarios/gestion', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuarioEliminar),
                });

                // Verificar si se eliminó el usuario con éxito
                if (usuarioResponse.ok) {

                    // Muestra la notificación con SweetAlert
                    swal('¡Éxito!', 'Médico eliminado exitosamente', 'success');

                    // Vuelve a cargar los datos de la tabla después de la eliminación
                    fetchData();
                } else {
                    // Error al eliminar el usuario
                    console.error('Error al eliminar el Medico');

                    // Muestra la notificación de error con SweetAlert
                    swal('Error', 'Hubo un problema al eliminar el Medico', 'error');
                }
            } else {
                // Error al eliminar el médico
                console.error('Error al eliminar el médico');

                // Muestra la notificación de error con SweetAlert
                swal('Error', 'Hubo un problema al eliminar el médico', 'error');
            }
        } catch (error) {
            // Error en la solicitud
            console.error('Error en la solicitud:', error);

            // Muestra la notificación de error con SweetAlert
            swal('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
        }
    };


    const handleAssignSchedule = (cedula) => {
        setSelectedCedula(cedula);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    return (
        <div className="p-8">
            <h2 className="text-2xl mb-6 text-center">Listado de médicos</h2>

            <div>
                <Link to="/" className="mb-4 mr-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    ⇦
                </Link>

                <Link to="/createmedico" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    Registrar Médico
                </Link>
            </div>


            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Foto</th>
                        <th className="border border-gray-300 px-4 py-2">Cédula</th>
                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                        <th className="border border-gray-300 px-4 py-2">Ciudad</th>
                        <th className="border border-gray-300 px-4 py-2">Especialidad</th>
                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {medicoData.map((medico, index) => (
                        <tr key={index} className="items-center">
                            <td className="px-4 py-8 flex items-center justify-center">
                                {medico[0].url_foto && <img src={medico[0].url_foto} alt="Foto del médico" className="w-16 h-16" />}
                                {!medico[0].url_foto && "Sin foto"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].cedula}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].email}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].telefono}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].ciudad}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[2]}</td>
                            <td className="text-center">
                                <div className="mx-auto">

                                    <button
                                        onClick={() => handleEdit(medico[0].cedula)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(medico[0].cedula, medico[2], {
                                            cedula: medico[0].cedula,
                                            nombre: medico[0].nombre,
                                            email: medico[0].email,
                                            contrasena: medico[0].contrasena,
                                            telefono: medico[0].telefono,
                                            ciudad: medico[0].ciudad,
                                        })}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleAssignSchedule(medico[0].cedula)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Asignar Horario
                                    </button>
                                </div>

                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
              {/* Renderizar el modal si está abierto */}
      {isModalOpen && (
        <AssignScheduleModal cedula={selectedCedula} closeModal={closeModal} />
      )}
    </div>
    );
}

export default CrudMed;
