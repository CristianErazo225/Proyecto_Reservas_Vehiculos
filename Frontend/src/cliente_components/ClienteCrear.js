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
                // Limpiar los campos después de crear el cliente
                setNombre('');
                setDireccion('');
                setTelefono('');
                setCorreo('');
                setSuccessMessage('Cliente creado correctamente'); // Mensaje de éxito
                setErrorMessage(''); // Limpiar el mensaje de error
            })
            .catch(error => {
                console.error("Error al crear el cliente", error);
                setErrorMessage("Error al crear el cliente. Por favor intenta de nuevo."); // Mensaje de error
                setSuccessMessage(''); // Limpiar el mensaje de éxito
            });
    };

    return (
        <div>
            <h3>Crear Cliente</h3>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mostrar mensaje de error */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Mostrar mensaje de éxito */}

            <h5>Nombre</h5>
            <input
                className="form-control"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <br />

            <h5>Dirección</h5>
            <input
                className="form-control"
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
            />
            <br />

            <h5>Teléfono</h5>
            <input
                className="form-control"
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
            <br />

            <h5>Correo Electrónico</h5>
            <input
                className="form-control"
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <br />

            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar Cliente</button>
        </div>
    );
}

export default CrearCliente;
