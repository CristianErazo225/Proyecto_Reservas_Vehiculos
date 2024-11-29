import React, { useState } from "react";
import api from "../axiosConfig";

function CrearMantenimiento() {
    const [fecha_mantenimiento, setFecha_mantenimiento] = useState('');
    const [descripcion_mantenimiento, setDescripcion_mantenimiento] = useState('');
    const [costo_mantenimiento, setCosto_mantenimiento] = useState('');
    const [error, setError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');  // Estado para el mensaje de éxito
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const nuevoMantenimiento = {
            fecha_mantenimiento: fecha_mantenimiento,
            descripcion_mantenimiento: descripcion_mantenimiento,
            costo_mantenimiento: parseFloat(costo_mantenimiento),  // Convertir a número si es necesario
        };

        api.post('/mantenimiento/crear/mantenimiento', nuevoMantenimiento)
            .then(response => {
                console.log('Mantenimiento creado: ', response.data);
                setFecha_mantenimiento('');
                setDescripcion_mantenimiento('');
                setCosto_mantenimiento('');
                setMensajeExito('Mantenimiento creado correctamente');  // Actualiza el mensaje de éxito
                setTimeout(() => setMensajeExito(''), 5000);  // Elimina el mensaje después de 5 segundos
            })
            .catch(error => {
                console.error("Error al crear el mantenimiento", error);
                setError('Error al crear el mantenimiento. Por favor, intenta de nuevo.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={styles.background}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={styles.card}>
                    
                    {/* Mostrar el mensaje de éxito encima del título */}
                    {mensajeExito && (
                        <div className="alert alert-success text-center mb-4">
                            {mensajeExito}
                        </div>
                    )}

                    {/* Mostrar el mensaje de error encima del título si existe */}
                    {error && <div className="alert alert-danger text-center mb-4">{error}</div>}
                    
                    <h2 className="text-center mb-4">Crear Mantenimiento</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Mantenimiento</label>
                            <input
                                className="form-control"
                                type="date"
                                value={fecha_mantenimiento}
                                onChange={(e) => setFecha_mantenimiento(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descripción del Mantenimiento</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Descripción del Mantenimiento"
                                value={descripcion_mantenimiento}
                                onChange={(e) => setDescripcion_mantenimiento(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Costo del Mantenimiento</label>
                            <input
                                className="form-control"
                                type="number"
                                placeholder="Costo del Mantenimiento"
                                value={costo_mantenimiento}
                                onChange={(e) => setCosto_mantenimiento(e.target.value)}
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Creando...' : 'Guardar Mantenimiento'}
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
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
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

export default CrearMantenimiento;
