import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

function CrearFactura() {
    const [fecha_emision, setFecha_emision] = useState('');
    const [monto_total, setMonto_total] = useState('');
    const [id_reserva, setId_reserva] = useState('');

    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        // Obtener reservas disponibles desde la API
        api.get('/reserva/obtener/reservas')
            .then(response => {
                // Verificamos si la respuesta contiene datos
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
            alert('Factura creada correctamente');
        })
        .catch(error => console.error("Error al crear la factura", error));
    };

    return (
        <div>
            <h3>Fecha de Emisión</h3>
            <input 
                className="form-control" 
                type="date" 
                placeholder="Fecha de Emisión" 
                value={fecha_emision} 
                onChange={(e) => setFecha_emision(e.target.value)} 
            />
            <br />

            <h3>Monto Total</h3>
            <input 
                className="form-control" 
                type="number" 
                placeholder="Monto Total" 
                value={monto_total} 
                onChange={(e) => setMonto_total(e.target.value)} 
            />
            <br />

            <div>
                <label>
                    Reserva:
                    <select 
                        value={id_reserva} 
                        onChange={(e) => setId_reserva(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Seleccione una reserva</option>
                        {
                            reservas.map(reserva => (
                                <option 
                                    key={reserva.id_reserva} 
                                    value={reserva.id_reserva}
                                >
                                    {reserva.id_reserva} - {reserva.fecha_reserva} - {reserva.estado}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </div>

            <br />
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar Factura</button>
        </div>
    );
}

export default CrearFactura;
