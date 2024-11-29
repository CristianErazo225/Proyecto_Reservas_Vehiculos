import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarCliente() {
    const { id } = useParams(); // Obtener el ID del cliente de la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [cliente, setCliente] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Obtener el cliente por ID
        api.get(`/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(error => console.error("Error al obtener el cliente: ", error));
    }, [id]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        api.put(`/clientes/${id}`, cliente)
            .then(() => {
                setSuccessMessage("Cliente actualizado correctamente.");
                setTimeout(() => setSuccessMessage(''), 5000);
                navigate('/clientes'); // Redirigir a la lista de clientes después de la actualización
            })
            .catch(error => {
                console.error("Error al actualizar el cliente", error); // Mostrar el error completo
                setError("No se pudo actualizar el cliente: " + (error.response ? error.response.data : "Error desconocido."));
            });
    };

    return (
        <div style={styles.container}>
            <div className="card shadow-lg p-4" style={styles.card}>
                <h2 className="text-center mb-4">Actualizar Cliente</h2>

                {/* Mostrar el mensaje de éxito si existe */}
                {successMessage && (
                    <div className="alert alert-success text-center mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Mostrar el mensaje de error si existe */}
                {error && <div className="alert alert-danger text-center mb-4">{error}</div>}

                <div className="form-group mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                
                <div className="form-group mb-3">
                    <label className="form-label">Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={cliente.direccion}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Correo Electrónico:</label>
                    <input
                        type="email"
                        name="correo"
                        value={cliente.correo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Actualizar Cliente
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

export default ActualizarCliente;