import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/patient/Home';
import HistorialMedico from './pages/patient/HistorialMedico';
import Pqrs from './pages/patient/Pqrs';
import Navbar from './components/patient/Navbar';
import HomeAdmin from './pages/admin/HomeAdmin'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import CreateMedico from './pages/admin/CreateMedico'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import PqrsAdmin from './pages/admin/PqrsAdmin'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import HistorialConsultasMed from './pages/admin/HistorialConsultasMed'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import CrudMed from './pages/admin/CrudMed';
import Ejemplo from './Ejemplo';

import HomeMedico from './pages/doctor/Home'
import AtenderCita from './pages/doctor/AtenderCita';


const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historialMedico" element={<HistorialMedico />} />
        <Route path="/pqrs" element={<Pqrs />} />

        <Route path="/inicioMedico" element={<HomeMedico/>}/>
        <Route path="/atenderCita/" element={<AtenderCita />} />

        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/createmedico" element={<CreateMedico />} />
        <Route path="/pqrsadmin" element={<PqrsAdmin />} />
        <Route path="/historialconsultasmed" element={<HistorialConsultasMed />} />
        <Route path="/crudmed" element={<CrudMed />} />
        <Route path="/ejemplo" element={<Ejemplo />} />
      </Routes>
    </Router>
  );
} 

export default AppRoutes;
