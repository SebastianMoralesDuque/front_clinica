import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomePatient from './pages/patient/HomePatient';
import HistorialMedico from './pages/patient/HistorialMedico';
import Pqrs from './pages/patient/Pqrs';
import PatientNavbar from './components/patient/PatientNavbar';
import DoctorNavbar from './components/doctor/DoctorNavbar';
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
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/HomePatient" element={<HomePatient />} />
        <Route path="/historialMedico" element={<HistorialMedico />} />
        <Route path="/pqrs" element={<Pqrs />} />
        <Route path="/informacionPaciente" element={<InformacionPaciente />} />

        <Route path="/inicioMedico" element={<HomeDoctor />} />
        <Route path="/atenderCita" element={<AtenderCita />} />

        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/createmedico" element={<CreateMedico />} />
        <Route path="/pqrsadmin" element={<PqrsAdmin />} />
        <Route path="/historialconsultasmed" element={<HistorialConsultasMed />} />
        <Route path="/crudmed" element={<CrudMed />} />

        <Route path="/maintenancePage" element={<MaintenancePage />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
