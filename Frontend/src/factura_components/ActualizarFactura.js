import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ActualizarFactura() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [factura, setFactura] = useState({
        FechaEmision: '',
        MontoTotal: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        api.get(`/facturacion/${id}`)
            .then(response => setFactura(response.data))
            .catch(error => console.error("Error al obtener la factura: ", error));
    }, [id]);

    const handleChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        api.put(`/facturacion/${id}`, factura)
            .then(() => {
                setSuccessMessage("Factura actualizada correctamente.");
                setTimeout(() => setSuccessMessage(''), 5000);
                navigate('/facturas');
            })
            .catch(error => {
                console.error("Error al actualizar la factura", error);
                setError("No se pudo actualizar la factura: " + (error.response ? error.response.data : "Error desconocido."));
            });
    };

    return (
        <div style={styles.container}>
            <div className="card shadow-lg p-4" style={styles.card}>
                <h2 className="text-center mb-4">Actualizar Factura</h2>

                {/* Mostrar el mensaje de éxito si existe */}
                {successMessage && (
                    <div className="alert alert-success text-center mb-4">
                        {successMessage}
                    </div>
                )}

                {/* Mostrar el mensaje de error si existe */}
                {error && <div className="alert alert-danger text-center mb-4">{error}</div>}

                <div className="form-group mb-3">
                    <label className="form-label">Fecha de Emisión:</label>
                    <input
                        type="date"
                        name="FechaEmision"
                        value={factura.FechaEmision}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                
                <div className="form-group mb-3">
                    <label className="form-label">Monto Total:</label>
                    <input
                        type="number"
                        name="MontoTotal"
                        value={factura.MontoTotal}
                        onChange={handleChange}
                        className="form-control"
                        step="0.01"  // Permite decimales
                        required
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Actualizar Factura
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

export default ActualizarFactura;
