import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './reserva_components/Navbar';

import CrearReserva from './reserva_components/ReservaCrear';
import ReservasList from './reserva_components/ReservaList';
import ActualizarReserva from './reserva_components/ActualizarReserva';

import VehiculoList from "./vehiculo_components/VehiculoList"; 
import ActualizarVehiculo from "./vehiculo_components/ActualizarVehiculo";
import VehiculoCrear from "./vehiculo_components/VehiculoCrear"; // Importa el componente

function App() {
  const [selectedReserva, setSelectedReserva] = useState(null);

  return (
    <Router>
      <div>
        <Navbar />
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<h2>Sistema Gestion de Reservas de Vehiculos</h2>} />
            <Route path='/reservas' element={<ReservasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/reserva/crear' element={<CrearReserva />} />
            <Route path='/reserva/actualizar/:id' element={<ActualizarReserva reserva={selectedReserva} />} />

            <Route path="/vehiculos" element={<VehiculoList />} />
            <Route path="/vehiculo/crear" element={<VehiculoCrear />} /> {/* Añade esta línea */}
            <Route path="/vehiculo/actualizar/:id" element={<ActualizarVehiculo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;