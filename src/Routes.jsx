import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HistorialMedico from './pages/HistorialMedico';
import Pqrs from './pages/Pqrs';
import Navbar from './components/Navbar';
import EjemploPage from './pages/EjemploPage'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historialMedico" element={<HistorialMedico />} />
        <Route path="/pqrs" element={<Pqrs />} />
        <Route path="/ejemplo" element={<EjemploPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
