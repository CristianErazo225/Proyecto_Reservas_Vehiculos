import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function MantenimientosList({ onSelectMantenimiento }) {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMantenimientos();
    }, []);

    const fetchMantenimientos = () => {
        api.get('/mantenimiento/obtener/mantenimiento')
            .then(response => {
                console.log("Mantenimientos recibidos:", response.data);
                setMantenimientos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener mantenimientos: ", error);
                const errorMsg = error.response
                    ? `Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
                    : error.request
                    ? "Error: No se recibió respuesta del servidor."
                    : `Error inesperado: ${error.message}`;
                setError(errorMsg);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el mantenimiento Nro: ${id}?`)) {
            api.delete(`/mantenimiento/${id}`)
                .then(() => {
                    console.log(`Mantenimiento Nro: ${id} eliminado correctamente`);
                    setMantenimientos(mantenimientos.filter(mantenimiento => mantenimiento.id_mantenimiento !== id));
                })
                .catch(error => {
                    console.error("Error al eliminar mantenimiento: ", error);
                    setError("Error al eliminar el mantenimiento.");
                });
        }
    };

    if (loading) return <p>Cargando mantenimientos...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Mantenimientos</h2>
            {mantenimientos.length === 0 ? (
                <p className="text-center">No hay mantenimientos disponibles.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Costo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mantenimientos.map((mantenimiento, index) => (
                                <tr key={mantenimiento.id_mantenimiento}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(mantenimiento.fecha_mantenimiento).toLocaleDateString()}</td>
                                    <td>{mantenimiento.descripcion_mantenimiento}</td>
                                    <td>${mantenimiento.costo_mantenimiento}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary btn-sm me-2"
                                            to={`/mantenimiento/actualizar/${mantenimiento.id_mantenimiento}`}
                                        >
                                            Actualizar
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(mantenimiento.id_mantenimiento)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MantenimientosList;
