import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './reserva_components/Navbar';

//importaciones reserva_components
import CrearReserva from './reserva_components/ReservaCrear';
import ReservasList from './reserva_components/ReservaList';
import ActualizarReserva from './reserva_components/ActualizarReserva';

//Facturas
import FacturasList from './factura_components/FacturaList';
import CrearFactura from './factura_components/FacturaCrear';
import ActualizarFactura from './factura_components/ActualizarFactura';

import ClientesList from './cliente_components/ClienteList'; 
import ClienteCrear from './cliente_components/ClienteCrear'; 
import ActualizarCliente from './cliente_components/ActualizarCliente';

import VehiculoList from "./vehiculo_components/VehiculoList"; 
import ActualizarVehiculo from "./vehiculo_components/ActualizarVehiculo";
import VehiculoCrear from "./vehiculo_components/VehiculoCrear";

function App() {
  const [selectedReserva, setSelectedReserva] = useState(null);

  return (
    <Router>
      <div>
        <Navbar />
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={
              <div style={styles.container}>
                <h2 style={styles.title}>Sistema de Gestión de Reservas de Vehículos</h2>
                <p style={styles.description}>
                  Bienvenido al sistema de reservas, donde podrás gestionar tus reservas de vehículos, 
                  crear nuevas facturas, administrar clientes y más. Con una interfaz intuitiva y funcional, 
                  podrás realizar todas tus tareas de manera rápida y eficiente.
                </p>
              </div>
            } />
            <Route path='/reservas' element={<ReservasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/reserva/crear' element={<CrearReserva />} />
            <Route path='/reserva/actualizar/:id' element={<ActualizarReserva reserva={selectedReserva} />} />
            
            {/* facturas */}
            <Route path='/facturas' element={<FacturasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/factura/crear' element={<CrearFactura />} />
            <Route path='/factura/actualizar/:id' element={<ActualizarFactura />} />
            
            <Route path='/clientes' element={<ClientesList onSelectCliente={selectedReserva} />} />
            <Route path='/cliente/crear' element={<ClienteCrear />} />
            <Route path='/cliente/actualizar/:id' element={<ActualizarCliente />} />
            
            <Route path="/vehiculos" element={<VehiculoList />} />
            <Route path="/vehiculo/crear" element={<VehiculoCrear />} />
            <Route path="/vehiculo/actualizar/:id" element={<ActualizarVehiculo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4E73DF', // Azul suave
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#6c757d', // Gris suave
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  }
};

export default App;
