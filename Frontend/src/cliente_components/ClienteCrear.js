import React, { useState } from "react";
import api from "../axiosConfig";

function CrearCliente() {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = () => {
        // Validación básica de los campos
        if (!nombre || !direccion || !telefono || !correo) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        const newCliente = {
            nombre,
            direccion,
            telefono,
            correo,
        };

        api.post('/clientes/crear/clientes', newCliente)
            .then(response => {
                console.log('Cliente creado: ', response.data);
                setNombre('');
                setDireccion('');
                setTelefono('');
                setCorreo('');
                setSuccessMessage('Cliente creado correctamente');
                setErrorMessage('');
            })
            .catch(error => {
                console.error("Error al crear el cliente", error);
                setErrorMessage("Error al crear el cliente. Por favor intenta de nuevo.");
                setSuccessMessage('');
            });
    };

    return (
        <div style={styles.background}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow-lg p-4" style={styles.card}>
                    <h2 className="text-center mb-4">Crear Cliente</h2>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input
                                className="form-control"
                                type="tel"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Correo Electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button 
                                className="btn btn-primary"
                                type="submit"
                            >
                                Guardar Cliente
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
        background: "linear-gradient(135deg, #FFC371 0%, #FF5F6D 100%)",
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

export default CrearCliente;
