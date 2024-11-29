import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function CrearFactura() {
    const [fecha_emision, setFecha_emision] = useState('');
    const [monto_total, setMonto_total] = useState('');
    const [id_reserva, setId_reserva] = useState('');

    const [reservas, setReservas] = useState([]);
    const [mensajeExito, setMensajeExito] = useState('');  // Estado para el mensaje de éxito

    useEffect(() => {
        api.get('/reserva/obtener/reservas')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setReservas(response.data);
                } else {
                    console.error("No se encontraron reservas.");
                }
            })
            .catch(error => console.error("Error al cargar las reservas: ", error));
    }, []);

    const handleSubmit = () => {
        const newFactura = {
            FechaEmision: fecha_emision,
            MontoTotal: monto_total,
            reservaIdReserva: id_reserva
        };

        api.post('/facturacion', newFactura)
            .then(response => {
                console.log('Factura creada: ', response.data);
                setFecha_emision('');
                setMonto_total('');
                setId_reserva('');
                setMensajeExito('Factura creada correctamente');  // Actualiza el mensaje de éxito
                setTimeout(() => setMensajeExito(''), 5000);  // Elimina el mensaje después de 5 segundos
            })
            .catch(error => console.error("Error al crear la factura", error));
    };

    return (
        <div style={styles.background}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={styles.card}>
                    
                    {/* Mostrar el mensaje de éxito encima del título */}
                    {mensajeExito && (
                        <div className="alert alert-success text-center mb-4">
                            {mensajeExito}
                        </div>
                    )}

                    <h2 className="text-center mb-4">Crear Factura</h2>
                    
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Emisión</label>
                            <input 
                                className="form-control" 
                                type="date" 
                                placeholder="Fecha de Emisión" 
                                value={fecha_emision} 
                                onChange={(e) => setFecha_emision(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Monto Total</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                placeholder="Monto Total" 
                                value={monto_total} 
                                onChange={(e) => setMonto_total(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Reserva</label>
                            <select 
                                className="form-select"
                                value={id_reserva} 
                                onChange={(e) => setId_reserva(e.target.value)}
                                required
                            >
                                <option value="">Seleccione una reserva</option>
                                {reservas.map(reserva => (
                                    <option 
                                        key={reserva.id_reserva} 
                                        value={reserva.id_reserva}
                                    >
                                        {reserva.id_reserva} - {reserva.fecha_reserva} - {reserva.estado}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-center">
                            <button 
                                className="btn btn-primary" 
                                type="submit"
                            >
                                Guardar Factura
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

export default CrearFactura;
