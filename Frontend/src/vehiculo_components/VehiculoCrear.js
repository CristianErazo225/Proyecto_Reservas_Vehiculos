import React, { useState } from "react";
import api from "../axiosConfig";

function CrearVehiculo() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [placa, setPlaca] = useState('');
    const [estado, setEstado] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!marca || !modelo || !anio || !placa || !estado) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (isNaN(anio) || parseInt(anio) <= 0) {
            setError('El año debe ser un número positivo.');
            return;
        }

        const newVehiculo = {
            marca,
            modelo,
            anio: parseInt(anio, 10),
            placa,
            estado,
        };

        setLoading(true);

        api.post('/vehiculo/crear/vehiculos', newVehiculo)
            .then(response => {
                console.log('Vehículo creado: ', response.data);
                setMarca('');
                setModelo('');
                setAnio('');
                setPlaca('');
                setEstado('');
                setError('');
                setSuccessMessage('Vehículo creado correctamente.');
            })
            .catch(err => {
                if (err.response) {
                    console.error("Error al crear el vehículo", err.response.data);
                    setError(err.response.data.message || 'Error al crear el vehículo. Intenta de nuevo.');
                } else {
                    console.error("Error: No se recibió respuesta del servidor", err.request);
                    setError("No se recibió respuesta del servidor. Verifica tu conexión.");
                }
                setSuccessMessage('');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={styles.background}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={styles.card}>
                    <h2 className="text-center mb-4">Crear Vehículo</h2>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Marca</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Modelo</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Modelo"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Año</label>
                            <input
                                className="form-control"
                                type="number"
                                placeholder="Año"
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Placa</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Placa"
                                value={placa}
                                onChange={(e) => setPlaca(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button 
                                className="btn btn-primary" 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar Vehículo'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    background: {
        background: "linear-gradient(135deg, #73A5FF 0%, #5477F5 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: "10px",
        background: "#fff",
        maxWidth: "500px",
        width: "100%",
    },
};

export default CrearVehiculo;
