//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './reserva_components/Navbar';

//importaciones reserva_components
import CrearReserva from './reserva_components/ReservaCrear';
import ReservasList from './reserva_components/ReservaList';
import ActualizarReserva from './reserva_components/ActualizarReserva';

function App() {
  const [selectedReserva, setSelectedReserva] = useState(null);

  return (
    <Router>
      <div>
        <Navbar/>
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<h2>Sistema Gestion de Reservas de Vehiculos</h2> } />
            <Route path='/reservas' element={<ReservasList onSelectReserva={setSelectedReserva} />} />
            <Route path='/reserva/crear' element={<CrearReserva />} />
            <Route path='/reserva/actualizar/:id' element={<ActualizarReserva reserva={selectedReserva} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
