import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/patient/Home';
import HistorialMedico from './pages/patient/HistorialMedico';
import Pqrs from './pages/patient/Pqrs';
import Navbar from './components/Navbar';
import EjemploPage from './pages/admin/EjemploPage'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

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
        <Route path="/ejemplo" element={<EjemploPage />} />
        <Route path="/inicioMedico" element={<HomeMedico/>}/>
        <Route path="/atenderCita/:id" element={<AtenderCita />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
