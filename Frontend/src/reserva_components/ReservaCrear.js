import React, {useEffect, useState} from "react";
import api from "../axiosConfig";

function CrearReserva(){
    const [fecha_reserva, setFecha_reserva] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    const [estado, setEstado] = useState('');

    const [id_vehiculo, setId_vehiculo] = useState('');
    const [id_clientes, setId_clientes] = useState('');

    const [vehiculos, setVehiculos] = useState([]);
    const [clientes, setClientes] = useState([]);

     useEffect(
         () => {
             api.get('/vehiculo/obtener/vehiculos')
                 .then(response => setVehiculos(response.data))
                 .catch(error => console.error("Error: ", error));
         }, []);

    useEffect(
    () => {
        api.get('/clientes/obtener/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error("Error: ", error));
    }, []);

    const handleSubmit = () => {
        const newReserva = { fecha_reserva, fecha_inicio, fecha_fin, estado, vehiculo: id_vehiculo, clientes: id_clientes};
        console.log(newReserva);
        api.post('/reserva/crear/reservas', newReserva)
            .then(
                response => {
                    console.log('Reserva creada: ', response.data);
                    setFecha_reserva('');
                    setFecha_inicio('');
                    setFecha_fin('');
                    setEstado('');
                    setId_vehiculo('');
                    setId_clientes('');
                }
            )
            .catch(error => console.error("Error al crear la reserva", error));
    };

    return (
        <div>
            
            <h3>Fecha de la reserva</h3>
            <input className="form-control" type="date" placeholder="Fecha_reserva" value={fecha_reserva} onChange={(e) => setFecha_reserva(e.target.value)} />
            <br />
            <h3>Fecha de inicio</h3>
            <input className="form-control" type="date" placeholder="Fecha_inicio" value={fecha_inicio} onChange={(e) => setFecha_inicio(e.target.value)} />
            <br />
            <h3>Fecha de fin</h3>
            <input className="form-control" type="date" placeholder="Fecha_fin" value={fecha_fin} onChange={(e) => setFecha_fin(e.target.value)} />
            <br />
            <h3>Estado de la reserva</h3>
            <input className="form-control" type="text" placeholder="(Confirmada, Pendiente, Cancelada)" value={estado} onChange={(e) => setEstado(e.target.value)} />
            <br />
            <br />

            <div>
                <label>
                    Cliente:
                    <select value={id_clientes} onChange={(e) => setId_clientes(e.target.value)}>
                        <option value="">Selecione al cliente</option>
                        {
                            clientes.map(cliente => (
                                <option key={cliente.id_clientes} value={cliente.id_clientes}>{cliente.id_clientes} - {cliente.nombre} - {cliente.telefono} </option>
                            )) 
                        }
                    </select>
                </label>
            </div>
          
            <br />

            <div>
                <label>
                    Vehiculo:
                    <select value={id_vehiculo} onChange={(e) => setId_vehiculo(e.target.value)}>
                        <option value="">Selecione un vehiculo</option>
                        {
                            vehiculos.map(vehiculo => (
                                <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>{vehiculo.id_vehiculo} - {vehiculo.marca} - {vehiculo.modelo} </option>
                            )) 
                        }
                    </select>
                </label>
            </div>
          
            <br />
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar</button>
        </div>
    );
}

export default CrearReserva;