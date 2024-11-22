import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function MantenimientosList({ onSelectMantenimiento }) {
    const [mantenimientos, setMantenimientos] = useState([]);

    // Función para obtener todos los mantenimientos
    const fetchMantenimientos = () => {
        api.get('/mantenimiento/obtener/mantenimientos')  
            .then(response => {
                console.log(response.data); // Verificar la respuesta
                setMantenimientos(response.data);
            })
            .catch(error => console.error("Error al obtener mantenimientos: ", error));
    };

    // Hook para obtener los mantenimientos al cargar el componente
    useEffect(() => {
        fetchMantenimientos();
    }, []);

    // Función para eliminar un mantenimiento
    const handleDelete = (id) => {
        api.delete(`/mantenimiento/${id}`)
        .then(() => {
            console.log(`Mantenimiento ID: ${id} eliminado correctamente`);
            // Eliminar el mantenimiento del estado sin necesidad de hacer otra solicitud GET
            setMantenimientos(mantenimientos.filter(mantenimiento => mantenimiento.id_mantenimiento !== id));
        })
        .catch(error => console.error("Error al eliminar mantenimiento: ", error));
    };

    // Renderizar el componente
    return (
        <div>
            <h2>Lista de Mantenimientos</h2>
            {mantenimientos.length === 0 ? (
                <p>No hay mantenimientos disponibles.</p>
            ) : (
                <ul>
                    {mantenimientos.map(mantenimiento => (
                        <li key={mantenimiento.id_mantenimiento}>
                            Fecha: {mantenimiento.fecha_mantenimiento} {' - '}
                            Descripción: {mantenimiento.descripcion_mantenimiento} {' - '}
                            Costo: {mantenimiento.costo_mantenimiento} {' - '}
                            Vehículo ID: {mantenimiento.vehiculo.id_vehiculo} {' - '}
                            <Link className="btn btn-primary btn-sm me-2" to={'/mantenimiento/actualizar/' + mantenimiento.id_mantenimiento} >Actualizar</Link>
                            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(mantenimiento.id_mantenimiento)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MantenimientosList;
