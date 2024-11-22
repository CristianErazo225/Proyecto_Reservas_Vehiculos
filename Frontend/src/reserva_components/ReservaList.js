import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function ReservasList({ onSelectReserva }) {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = () => {
        api.get("/reserva/full/reservas")
            .then((response) => setReservas(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la reserva Nro: ${id}?`)) {
            api.delete(`/reserva/${id}`)
                .then(() => {
                    console.log(`Reserva Nro: ${id} eliminada correctamente.`);
                    fetchReservas();
                })
                .catch((error) => console.error("Error: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Reservas</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th># Reserva</th>
                            <th>Fecha Reserva</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id_reserva}>
                                <td>{reserva.id_reserva}</td>
                                <td>{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            reserva.estado === "Activo"
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {reserva.estado}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/reserva/actualizar/${reserva.id_reserva}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(reserva.id_reserva)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReservasList;
