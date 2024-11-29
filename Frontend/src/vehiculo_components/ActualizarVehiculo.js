import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarVehiculo() {
    const { id } = useParams(); // Obtener el ID del vehículo de la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [vehiculo, setVehiculo] = useState({
        marca: '',
        modelo: '',
        anio: '',
        placa: '',
        estado: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Obtener el vehículo por ID
        api.get(`/vehiculos/${id}`)
            .then(response => setVehiculo(response.data))
            .catch(error => console.error("Error al obtener el vehículo: ", error));
    }, [id]);

    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        api.put(`/vehiculo/${id}`, vehiculo)  // Cambia 'vehiculos' a 'vehiculo'
            .then(() => {
                setSuccessMessage("Vehículo actualizado correctamente.");
                setTimeout(() => setSuccessMessage(''), 5000);
                navigate('/vehiculos'); // Redirigir a la lista de vehículos después de la actualización
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || "Error desconocido.";
                setError("No se pudo actualizar el vehículo: " + errorMessage);
            });
    };

    return (
        <div style={styles.container}>
            <div className="card shadow-lg p-4" style={styles.card}>
                <h2 className="text-center mb-4">Actualizar Vehículo</h2>

                {/* Mostrar el mensaje de éxito si existe */}
                {successMessage && (
                    <div className="alert alert-success text-center mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Mostrar el mensaje de error si existe */}
                {error && <div className="alert alert-danger text-center mb-4">{error}</div>}

                <div className="form-group mb-3">
                    <label className="form-label">Marca:</label>
                    <input
                        type="text"
                        name="marca"
                        value={vehiculo.marca}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Modelo:</label>
                    <input
                        type="text"
                        name="modelo"
                        value={vehiculo.modelo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Año:</label>
                    <input
                        type="number"
                        name="anio"
                        value={vehiculo.anio}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Placa:</label>
                    <input
                        type="text"
                        name="placa"
                        value={vehiculo.placa}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Estado:</label>
                    <input
                        type="text"
                        name="estado"
                        value={vehiculo.estado}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Actualizar Vehículo
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    },
    card: {
        borderRadius: "10px",
        background: "#fff",
        maxWidth: "500px",
        width: "100%",
    }
};

export default ActualizarVehiculo;
