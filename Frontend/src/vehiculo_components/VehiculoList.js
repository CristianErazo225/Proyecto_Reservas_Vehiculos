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
            .catch(error => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        api.delete(`/vehiculo/${id}`)
            .then(() => {
                console.log(`Vehículo Nro: ${id} eliminado correctamente`);
                fetchVehiculos(); 
            })
            .catch(error => console.error("Error: ", error));
    };

    return (
        <div>
            <h2>Lista de Vehículos</h2>
            <ul>
                {vehiculos.map(vehiculo => (
                    <li key={vehiculo.id_vehiculo}>
                        Nro: {vehiculo.id_vehiculo} - 
                        Marca: {vehiculo.marca}, 
                        Modelo: {vehiculo.modelo}, 
                        Año: {vehiculo.anio}, 
                        Placa: {vehiculo.placa}, 
                        Estado: {vehiculo.estado} &nbsp;
                        <Link className="btn btn-primary btn-sm me-2" to={`/vehiculo/actualizar/${vehiculo.id_vehiculo}`}>Actualizar</Link>

                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(vehiculo.id_vehiculo)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VehiculosList;
