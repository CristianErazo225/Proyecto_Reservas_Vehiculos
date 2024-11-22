import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function ClientesList() {
    const [clientes, setClientes] = useState([]);

    // Función para obtener todos los clientes
    const fetchClientes = () => {
        api.get("/clientes/obtener/clientes")
            .then((response) => setClientes(response.data))
            .catch((error) => console.error("Error al obtener clientes: ", error));
    };

    // Hook para obtener los clientes al cargar el componente
    useEffect(() => {
        fetchClientes();
    }, []);

    // Función para eliminar un cliente
    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al cliente ID: ${id}?`)) {
            api.delete(`/clientes/${id}`)
                .then(() => {
                    console.log(`Cliente ID: ${id} eliminado correctamente`);
                    setClientes(clientes.filter((cliente) => cliente.id_clientes !== id));
                })
                .catch((error) => console.error("Error al eliminar cliente: ", error));
        }
    };

    // Renderizar el componente
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Clientes</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={cliente.id_clientes}>
                                <td>{index + 1}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.correo}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/cliente/actualizar/${cliente.id_clientes}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cliente.id_clientes)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientesList;
