// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './reserva_components/Navbar';

// Importaciones reserva_components
import CrearReserva from './reserva_components/ReservaCrear';
import ReservasList from './reserva_components/ReservaList';
import ActualizarReserva from './reserva_components/ActualizarReserva';
import FacturasList from './factura_components/FacturaList';
import CrearFactura from './factura_components/FacturaCrear';
import ActualizarFactura from './factura_components/ActualizarFactura';

// Importaciones cliente_components
import ClientesList from './cliente_components/ClienteList'; 
import ClienteCrear from './cliente_components/ClienteCrear'; 
import ActualizarCliente from './cliente_components/ActualizarCliente';

// Importaciones mantenimiento_components
import MantenimientoList from './mantenimiento_components/MantenimientoList';
import CrearMantenimiento from './mantenimiento_components/MantenimientoCrear'; // Asegúrate de que el nombre sea correcto

function App() {
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null); // Definir el estado para selectedMantenimiento

  return (
    <Router>
      <div>
        <Navbar />
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<h2>Sistema Gestión de Reservas de Vehículos</h2>} />
            <Route path='/reservas' element={<ReservasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/reserva/crear' element={<CrearReserva />} />
            <Route path='/reserva/actualizar/:id' element={<ActualizarReserva reserva={selectedReserva} />} />
            {/* Facturas */}
            <Route path='/facturas' element={<FacturasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/factura/crear' element={<CrearFactura />} />
            <Route path='/factura/actualizar/:id' element={<ActualizarFactura />} />
            {/* Clientes */}
            <Route path='/clientes' element={<ClientesList onSelectCliente={selectedReserva} />} />
            <Route path='/cliente/crear' element={<ClienteCrear />} />
            <Route path='/cliente/actualizar/:id' element={<ActualizarCliente />} />
            {/* Mantenimiento */}
            <Route path='/mantenimiento' element={<MantenimientoList onSelectMantenimiento={selectedMantenimiento} />} />
            <Route path='/mantenimiento/crear' element={<CrearMantenimiento />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
