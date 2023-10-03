import React from 'react';
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

  // Función para redirigir a la página de mantenimiento si es necesario
  const redirectToMaintenance = () => <Navigate to="/maintenancePage" />;

  return (
    <Router>
      {/* Renderizar el Navbar según el tipo de usuario o Navbar por defecto */}
      {userType === 'paciente' && <PatientNavbar />}
      {userType === 'medico' && <DoctorNavbar />}
      {userType === 'admin' && <AdminNavbar />}
      {!userType && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas para paciente */}
        {userType === 'paciente' && (
          <>
            <Route path="/HomePatient" element={<HomePatient />} />
            <Route path="/historialMedico" element={<HistorialMedico />} />
            <Route path="/pqrs" element={<Pqrs />} />
            <Route path="/informacionPaciente" element={<InformacionPaciente />} />
          </>
        )}

        {/* Rutas para médico */}
        {userType === 'medico' && (
          <>
            <Route path="/inicioMedico" element={<HomeDoctor />} />
            <Route path="/atenderCita" element={<AtenderCita />} />
          </>
        )}

        {/* Rutas para administrador */}
        {userType === 'admin' && (
          <>
            <Route path="/homeAdmin" element={<HomeAdmin />} />
            <Route path="/createmedico" element={<CreateMedico />} />
            <Route path="/pqrsadmin" element={<PqrsAdmin />} />
            <Route path="/historialconsultasmed" element={<HistorialConsultasMed />} />
            <Route path="/crudmed" element={<CrudMed />} />
          </>
        )}

        {/* Rutas compartidas para todos los tipos de usuario */}
        <Route path="/maintenancePage" element={<MaintenancePage />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/maintenance" element={redirectToMaintenance} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
