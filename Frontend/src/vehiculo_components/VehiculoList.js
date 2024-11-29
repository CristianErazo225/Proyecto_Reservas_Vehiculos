import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function VehiculosList() {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = () => {
        api.get('/vehiculo/obtener/vehiculos')
            .then(response => {
                console.log("Vehículos recibidos:", response.data);
                setVehiculos(response.data);
            })
            .catch(error => console.error("Error al obtener vehículos: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el vehículo Nro: ${id}?`)) {
            api.delete(`/vehiculo/${id}`)
                .then(() => {
                    console.log(`Vehículo Nro: ${id} eliminado correctamente`);
                    setVehiculos(vehiculos.filter(vehiculo => vehiculo.id_vehiculo !== id));
                })
                .catch(error => console.error("Error al eliminar vehículo: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Vehículos</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Placa</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map((vehiculo, index) => (
                            <tr key={vehiculo.id_vehiculo}>
                                <td>{index + 1}</td>
                                <td>{vehiculo.marca}</td>
                                <td>{vehiculo.modelo}</td>
                                <td>{vehiculo.anio}</td>
                                <td>{vehiculo.placa}</td>
                                <td>{vehiculo.estado}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/vehiculo/actualizar/${vehiculo.id_vehiculo}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(vehiculo.id_vehiculo)}
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

export default VehiculosList;
