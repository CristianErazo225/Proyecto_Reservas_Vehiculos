import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarMantenimiento() {
    const { id } = useParams(); // Obtener el ID del mantenimiento de la URL
    const navigate = useNavigate();
    const [mantenimiento, setMantenimiento] = useState({
        fecha_mantenimiento: '',
        descripcion_mantenimiento: '',
        costo_mantenimiento: '',
        vehiculo: {
            id_vehiculo: '' // Si necesitas asociar un vehículo, asegúrate de que este campo se maneje correctamente
        }
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener el mantenimiento por ID
        api.get(`/mantenimiento/${id}`)
            .then(response => {
                setMantenimiento(response.data);
            })
            .catch(error => console.error("Error al obtener el mantenimiento: ", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMantenimiento(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        api.put(`/mantenimiento/${id}`, mantenimiento)
            .then(() => {
                navigate('/mantenimiento'); // Redirigir a la lista de mantenimientos después de la actualización
            })
            .catch(error => {
                console.error("Error al actualizar el mantenimiento", error);
                setError("No se pudo actualizar el mantenimiento: " + (error.response ? error.response.data : "Error desconocido."));
            });
    };

    return (
        <div>
            <h2>Actualizar Mantenimiento</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Fecha de Mantenimiento:</label>
                <input
                    type="date"
                    name="fecha_mantenimiento"
                    value={mantenimiento.fecha_mantenimiento}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Descripción del Mantenimiento:</label>
                <textarea
                    name="descripcion_mantenimiento"
                    value={mantenimiento.descripcion_mantenimiento}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Costo del Mantenimiento:</label>
                <input
                    type="number"
                    name="costo_mantenimiento"
                    value={mantenimiento.costo_mantenimiento}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>ID del Vehículo:</label>
                <input
                    type="number"
                    name="id_vehiculo"
                    value={mantenimiento.vehiculo.id_vehiculo}
                    onChange={(e) => setMantenimiento({ ...mantenimiento, vehiculo: { id_vehiculo: e.target.value }})}
                    className="form-control"
                    required
                />
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>
                Actualizar
            </button>
        </div>
    );
}

export default ActualizarMantenimiento;
