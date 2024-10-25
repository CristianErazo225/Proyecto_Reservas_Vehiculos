import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarVehiculo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehiculo, setVehiculo] = useState({
        marca: '',
        modelo: '',
        anio: '',
        placa: '',
        estado: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/vehiculos/${id}`)
            .then(response => setVehiculo(response.data))
            .catch(error => console.error("Error al obtener el vehículo: ", error));
    }, [id]);

    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio || !vehiculo.placa || !vehiculo.estado) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        api.put(`/vehiculo/${id}`, vehiculo)
            .then(() => {
                navigate('/vehiculos');
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || "Error desconocido.";
                setError("No se pudo actualizar el vehículo: " + errorMessage);
            });
    };

    return (
        <div>
            <h2>Actualizar Vehículo</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Marca:</label>
                <input
                    type="text"
                    name="marca"
                    value={vehiculo.marca}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Modelo:</label>
                <input
                    type="text"
                    name="modelo"
                    value={vehiculo.modelo}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Año:</label>
                <input
                    type="number"
                    name="anio"
                    value={vehiculo.anio}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Placa:</label>
                <input
                    type="text"
                    name="placa"
                    value={vehiculo.placa}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Estado:</label>
                <input
                    type="text"
                    name="estado"
                    value={vehiculo.estado}
                    onChange={handleChange}
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

export default ActualizarVehiculo;
