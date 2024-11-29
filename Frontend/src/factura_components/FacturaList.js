import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

function FacturasList({ onSelectFactura }) {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        fetchFacturas();
    }, []);

    const fetchFacturas = () => {
        api.get("/facturacion")
            .then((response) => setFacturas(response.data))
            .catch((error) => console.error("Error: ", error));
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la factura Nro: ${id}?`)) {
            api.delete(`/facturacion/${id}`)
                .then(() => {
                    console.log(`Factura Nro: ${id} eliminada correctamente.`);
                    fetchFacturas();
                })
                .catch((error) => console.error("Error: ", error));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de Facturas</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th># Factura</th>
                            <th>Fecha de Emisión</th>
                            <th>Monto Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map((factura) => (
                            <tr key={factura.FacturaID}>
                                <td>{factura.FacturaID}</td>
                                <td>{new Date(factura.FechaEmision).toLocaleDateString()}</td>
                                <td>${factura.MontoTotal.toFixed(2)}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary btn-sm me-2"
                                        to={`/factura/actualizar/${factura.FacturaID}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(factura.FacturaID)}
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

export default FacturasList;
