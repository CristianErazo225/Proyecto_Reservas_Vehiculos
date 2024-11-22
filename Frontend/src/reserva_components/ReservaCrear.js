import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function CrearReserva() {
    const [fecha_reserva, setFecha_reserva] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    const [estado, setEstado] = useState('');

    const [id_vehiculo, setId_vehiculo] = useState('');
    const [id_clientes, setId_clientes] = useState('');

    const [vehiculos, setVehiculos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        api.get('/vehiculo/obtener/vehiculos')
            .then(response => setVehiculos(response.data))
            .catch(error => console.error("Error al obtener vehículos: ", error));
    }, []);

    useEffect(() => {
        api.get('/clientes/obtener/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error("Error al obtener clientes: ", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReserva = {
            fecha_reserva,
            fecha_inicio,
            fecha_fin,
            estado,
            vehiculo: id_vehiculo,
            clientes: id_clientes,
        };

        api.post('/reserva/crear/reservas', newReserva)
            .then(response => {
                console.log('Reserva creada:', response.data);
                alert("Reserva creada exitosamente!");
                setFecha_reserva('');
                setFecha_inicio('');
                setFecha_fin('');
                setEstado('');
                setId_vehiculo('');
                setId_clientes('');
            })
            .catch(error => {
                console.error("Error al crear la reserva", error);
                alert("Hubo un error al crear la reserva.");
            });
    };

    return (
        <div style={styles.background}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={styles.card}>
                    <h2 className="text-center mb-4">Crear Reserva</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Fecha de la Reserva</label>
                            <input
                                className="form-control"
                                type="date"
                                value={fecha_reserva}
                                onChange={(e) => setFecha_reserva(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha de Inicio</label>
                            <input
                                className="form-control"
                                type="date"
                                value={fecha_inicio}
                                onChange={(e) => setFecha_inicio(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha de Fin</label>
                            <input
                                className="form-control"
                                type="date"
                                value={fecha_fin}
                                onChange={(e) => setFecha_fin(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estado de la Reserva</label>
                            <select
                                className="form-select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            >
                                <option value="">Seleccione el estado</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Cliente</label>
                            <select
                                className="form-select"
                                value={id_clientes}
                                onChange={(e) => setId_clientes(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id_clientes} value={cliente.id_clientes}>
                                        {cliente.nombre} - {cliente.telefono}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Vehículo</label>
                            <select
                                className="form-select"
                                value={id_vehiculo}
                                onChange={(e) => setId_vehiculo(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un vehículo</option>
                                {vehiculos.map(vehiculo => (
                                    <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                                        {vehiculo.marca} - {vehiculo.modelo} - {vehiculo.placa}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    background: {
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: "10px",
        background: "#fff",
        maxWidth: "500px",
        width: "100%",
    },
};

export default CrearReserva;
