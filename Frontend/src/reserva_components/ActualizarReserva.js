import React, { useState, useEffect } from "react";
import api from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarReserva({ reserva, onUpdate }) {
    const { id } = useParams(); // Obtener el ID de la URL
    const navigate = useNavigate(); // Para redirigir después de actualizar
    const [fecha_reserva, setFecha_reserva] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    const [estado, setEstado] = useState('');
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        if (reserva) {
            // Si ya se pasó una reserva por `props`, usamos sus valores
            setFecha_reserva(reserva.fecha_reserva);
            setFecha_inicio(reserva.fecha_inicio);
            setFecha_fin(reserva.fecha_fin);
            setEstado(reserva.estado);
            setLoading(false);
        } else if (id) {
            // Si no hay reserva pasada, cargamos los datos desde el servidor usando el ID
            setLoading(true);
            api.get(`/reserva/${id}`)
                .then(response => {
                    const fetchedReserva = response.data;
                    setFecha_reserva(fetchedReserva.fecha_reserva);
                    setFecha_inicio(fetchedReserva.fecha_inicio);
                    setFecha_fin(fetchedReserva.fecha_fin);
                    setEstado(fetchedReserva.estado);
                })
                .catch(error => {
                    console.error("Error al obtener la reserva:", error);
                    setError("No se pudo cargar la reserva.");
                })
                .finally(() => setLoading(false));
        }
    }, [id, reserva]);

    const handleSubmit = () => {
        // Validación de datos antes de enviar
        if (!fecha_reserva || !fecha_inicio || !fecha_fin || !estado) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const updateReserva = { 
            fecha_reserva, 
            fecha_inicio, 
            fecha_fin, 
            estado 
        };

        console.log('Actualizando reserva con datos:', updateReserva);

        api.put(`/reserva/${id}`, updateReserva)
            .then(response => {
                console.log('Reserva actualizada:', response.data);
                if (onUpdate) onUpdate(response.data); // Llamar la función de actualización si existe
                navigate('/reservas'); // Redirigir a la lista de reservas
            })
            .catch(error => {
                console.error("Error al actualizar la reserva:", error);
                setError("No se pudo actualizar la reserva. Verifique los datos.");
            });
    };

    if (loading) return <div>Cargando...</div>;

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h3>Nro reserva: {id}</h3>
            
            <h3>Fecha de la reserva</h3>
            <input 
                className="form-control" 
                type="date" 
                value={fecha_reserva} 
                onChange={(e) => setFecha_reserva(e.target.value)} 
                required 
            />
            <br />

            <h3>Fecha de inicio</h3>
            <input 
                className="form-control" 
                type="date" 
                value={fecha_inicio} 
                onChange={(e) => setFecha_inicio(e.target.value)} 
                required 
            />
            <br />

            <h3>Fecha de fin</h3>
            <input 
                className="form-control" 
                type="date" 
                value={fecha_fin} 
                onChange={(e) => setFecha_fin(e.target.value)} 
                required 
            />
            <br />

            <h3>Estado de la reserva</h3>
            <input 
                className="form-control" 
                type="text" 
                value={estado} 
                onChange={(e) => setEstado(e.target.value)} 
                placeholder="Estado de la reserva"
                required 
            />
            <br />
            
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>
                Actualizar
            </button>
        </div>
    );
}

export default ActualizarReserva;
