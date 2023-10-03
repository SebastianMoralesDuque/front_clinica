import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HomePatient from './pages/patient/HomePatient';
import HistorialMedico from './pages/patient/HistorialMedico';
import Pqrs from './pages/patient/Pqrs';
import PatientNavbar from './components/patient/PatientNavbar';
import DoctorNavbar from './components/doctor/DoctorNavbar';
import AdminNavbar from './components/admin/AdminNavbar';
import Navbar from './components/Nabvar';
import HomeAdmin from './pages/admin/HomeAdmin';
import CreateMedico from './pages/admin/CreateMedico';
import PqrsAdmin from './pages/admin/PqrsAdmin';
import HistorialConsultasMed from './pages/admin/HistorialConsultasMed';
import CrudMed from './pages/admin/CrudMed';
import InformacionPaciente from './pages/patient/InformacionPaciente';
import HomeDoctor from './pages/doctor/HomeDoctor';
import AtenderCita from './pages/doctor/AtenderCita';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';

const AppRoutes = () => {
  // Obtener el tipo de usuario almacenado en localStorage
  const userType = localStorage.getItem('userType');
  console.log(userType);

  // Estado para forzar la actualización de las rutas al cambiar el tipo de usuario
  const [userTypeState, setUserTypeState] = useState(userType);

  // Función para redirigir a la página de mantenimiento si es necesario
  const redirectToMaintenance = () => <Navigate to="/maintenancePage" />;

  // Simular el efecto de inicio de sesión
  useEffect(() => {
    // Aquí puedes colocar tu lógica de inicio de sesión, si es así
  }, []);

  // Función para recargar la página y borrar el contenido del localStorage
  const reloadAndClearLocalStorage = () => {
    localStorage.clear();
    setUserTypeState(null); // Cambia el estado para forzar la actualización de las rutas
  };

  return (
    <Router>
      {/* Renderizar el Navbar según el tipo de usuario o Navbar por defecto */}
      {userTypeState === 'paciente' && <PatientNavbar />}
      {userTypeState === 'medico' && <DoctorNavbar />}
      {userTypeState === 'admin' && <AdminNavbar />}
      {!userTypeState && <Navbar />}

      {/* Lógica condicional para renderizar el componente Home correspondiente */}
      {userTypeState === 'paciente' ? (
        <Routes>
          <Route path="/" element={<HomePatient />} />
          <Route path="/historialMedico" element={<HistorialMedico />} />
          <Route path="/pqrs" element={<Pqrs />} />
          <Route path="/informacionPaciente" element={<InformacionPaciente />} />
        </Routes>
      ) : userTypeState === 'medico' ? (
        <Routes>
          <Route path="/homeDoctor" element={<HomeDoctor />} />
          <Route path="/atenderCita" element={<AtenderCita />} />
        </Routes>
      ) : userTypeState === 'admin' ? (
        <Routes>
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/createmedico" element={<CreateMedico />} />
          <Route path="/pqrsadmin" element={<PqrsAdmin />} />
          <Route path="/historialconsultasmed" element={<HistorialConsultasMed />} />
          <Route path="/crudmed" element={<CrudMed />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintenancePage" element={<MaintenancePage />} />
          <Route path="/notFoundPage" element={<NotFoundPage />} />
          <Route path="/maintenance" element={redirectToMaintenance} />
          
          {/* Redirección a NotFoundPage en caso de no encontrar la página */}
          <Route path="*" element={<Navigate to="/notFoundPage" />} />
        </Routes>
      )}

      {/* Botón para recargar la página y borrar localStorage */}
      <button onClick={reloadAndClearLocalStorage}>Recargar y borrar localStorage</button>
    </Router>
  );
};

export default AppRoutes;
