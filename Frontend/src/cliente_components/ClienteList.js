import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function ClientesList({ onSelectCliente }) {
    const [clientes, setClientes] = useState([]);

    // Función para obtener todos los clientes
    const fetchClientes = () => {
        // Asegúrate de que esta ruta coincide con la que tienes en tu backend
        api.get('/clientes/obtener/clientes')  
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => console.error("Error al obtener clientes: ", error));
    };

    // Hook para obtener los clientes al cargar el componente
    useEffect(() => {
        fetchClientes();
    }, []);

    // Función para eliminar un cliente
    const handleDelete = (id) => {
        api.delete(`/clientes/${id}`)
        .then(() => {
            console.log(`Cliente ID: ${id} eliminado correctamente`);
            // Eliminar el cliente del estado sin necesidad de hacer otra solicitud GET
            setClientes(clientes.filter(cliente => cliente.id_clientes !== id));
        })
        .catch(error => console.error("Error al eliminar cliente: ", error));
    };

    // Renderizar el componente
    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id_clientes} >
                        Cliente: {cliente.nombre} {' - '}
                        Dirección: {cliente.direccion} {' - '}
                        Teléfono: {cliente.telefono} {' - '}
                        Correo: {cliente.correo}{' - '}
                        <Link className="btn btn-primary btn-sm me-2" to={'/cliente/actualizar/'+cliente.id_clientes} >Actualizar</Link>

                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(cliente.id_clientes)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientesList;
