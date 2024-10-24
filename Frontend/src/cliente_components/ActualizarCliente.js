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
                navigate('/clientes'); // Redirigir a la lista de clientes después de la actualización
            })
            .catch(error => {
                console.error("Error al actualizar el cliente", error); // Mostrar el error completo
                setError("No se pudo actualizar el cliente: " + (error.response ? error.response.data : "Error desconocido."));
            });
    };

    return (
        <div>
            <h2>Actualizar Cliente</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Dirección:</label>
                <input
                    type="text"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Teléfono:</label>
                <input
                    type="tel"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Correo Electrónico:</label>
                <input
                    type="email"
                    name="correo"
                    value={cliente.correo}
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

export default ActualizarCliente;
