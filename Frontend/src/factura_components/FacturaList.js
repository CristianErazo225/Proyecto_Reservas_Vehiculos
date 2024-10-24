import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function FacturasList({ onSelectFactura }) {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        api.get('/facturacion')
            .then(response => setFacturas(response.data))
            .catch(error => console.error("Error: ", error));
    }, []);

    const handleDelete = (id) => {
        api.delete('/facturacion/'+id)
        .then(() => {
            console.log('Factura Nro: '+id+' Eliminada correctamenta');
            fetchfacturas();
        })
        .catch(error => console.error("Error: ", error));
    }

    const fetchfacturas = () => {
        api.get('/reserva/full/reservas')
            .then(response => setFacturas(response.data))
            .catch(error => console.error("Error: ", error));
    }

    //Renderizar el componente
    return (
        <div>
            <h2>Lista de Facturas</h2>
            <ul>
                {facturas.map(factura => (
                    <li key={factura.FacturaID} >
                        Factura Numero: {factura.FacturaID} {' - '}
                        Fecha de emision: {factura.FechaEmision}{' - '}
                        Monto Total: {factura.MontoTotal}{' - '}
                        <Link className="btn btn-primary btn-sm me-2" to={'/factura/actualizar/'+factura.FacturaID} >Actualizar</Link>

                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(factura.FacturaID)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FacturasList;
