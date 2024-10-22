import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function ReservasList({ onSelectReserva }) {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        api.get('/reserva/obtener/reservas')
            .then(response => setReservas(response.data))
            .catch(error => console.error("Error: ", error));
    }, []);

    const handleDelete = (id) => {
        api.delete('/reserva/'+id)
        .then(() => {
            console.log('Reserva Nro: '+id+' Eliminada correctamenta');
            fetchReservas();
        })
        .catch(error => console.error("Error: ", error));
    }

    const fetchReservas = () => {
        api.get('/reserva/full/reservas')
            .then(response => setReservas(response.data))
            .catch(error => console.error("Error: ", error));
    }

    //Renderizar el componente
    return (
        <div>
            <h2>Lista de Reservas</h2>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva.id_reserva} >
                        Nro: {reserva.id_reserva} - {reserva.fecha_reserva},
                        Estado: {reserva.estado} &nbsp;
                        <Link className="btn btn-primary btn-sm me-2" to={'/reserva/actualizar/'+reserva.id_reserva} >Actualizar</Link>

                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(reserva.id_reserva)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReservasList;
