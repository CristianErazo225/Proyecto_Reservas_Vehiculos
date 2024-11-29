import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizacionMantenimiento() {
    const { id } = useParams(); // Obtiene el ID del mantenimiento de la URL
    const navigate = useNavigate(); // Para redirigir al listado de mantenimientos después de la actualización
    const [mantenimiento, setMantenimiento] = useState({
        fecha_mantenimiento: '', // Cambiado para coincidir con el backend
        descripcion_mantenimiento: '',
        costo_mantenimiento: ''
    });
    const [error, setError] = useState(''); // Para mostrar posibles errores
    const [successMessage, setSuccessMessage] = useState(''); // Para mostrar mensaje de éxito

    // UseEffect para cargar los datos del mantenimiento al inicio
    useEffect(() => {
        // Obtener mantenimiento por ID
        api.get(`/mantenimiento/${id}`)
            .then(response => {
                setMantenimiento(response.data); // Actualiza el estado con los datos obtenidos
            })
            .catch(error => {
                console.error("Error al obtener el mantenimiento: ", error);
                setError("No se pudo obtener los detalles del mantenimiento.");
            });
    }, [id]); // Solo se ejecuta cuando cambia el ID

    // Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        setMantenimiento({ ...mantenimiento, [e.target.name]: e.target.value });
    };

    // Función para actualizar los datos del mantenimiento
    const handleUpdate = () => {
        api.put(`/mantenimiento/${id}`, mantenimiento)
            .then(() => {
                setSuccessMessage("Mantenimiento actualizado correctamente.");
                setTimeout(() => setSuccessMessage(''), 5000); // El mensaje de éxito se elimina después de 5 segundos
                navigate('/mantenimientos'); // Redirige al listado de mantenimientos
            })
            .catch(error => {
                console.error("Error al actualizar el mantenimiento", error);
                const errorMessage = error.response ? error.response.data.message || "Error desconocido." : "Error desconocido.";
                setError(`No se pudo actualizar el mantenimiento: ${errorMessage}`);
            });
    };

    return (
        <div style={styles.container}>
            <div className="card shadow-lg p-4" style={styles.card}>
                <h2 className="text-center mb-4">Actualizar Mantenimiento</h2>

                {/* Mostrar el mensaje de éxito si existe */}
                {successMessage && (
                    <div className="alert alert-success text-center mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Mostrar el mensaje de error si existe, pero solo si no es vacío */}
                {error && <div className="alert alert-danger text-center mb-4">{error}</div>}

                <div className="form-group mb-3">
                    <label className="form-label">Fecha de Mantenimiento:</label>
                    <input
                        type="date"
                        name="fecha_mantenimiento" // Cambiado para coincidir con el backend
                        value={mantenimiento.fecha_mantenimiento}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Descripción del Mantenimiento:</label>
                    <input
                        type="text"
                        name="descripcion_mantenimiento" // Cambiado para coincidir con el backend
                        value={mantenimiento.descripcion_mantenimiento}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Costo del Mantenimiento:</label>
                    <input
                        type="number"
                        name="costo_mantenimiento" // Cambiado para coincidir con el backend
                        value={mantenimiento.costo_mantenimiento}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Actualizar Mantenimiento
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
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }
};

export default ActualizacionMantenimiento;
