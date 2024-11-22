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
                navigate('/facturas'); 
            })
            .catch(error => {
                console.error("Error al actualizar la factura", error); 
                setError("No se pudo actualizar la factura: " + (error.response ? error.response.data : "Error desconocido."));
            });
    };

    return (
        <div>
            <h2>Actualizar Factura</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Fecha de Emisión:</label>
                <input
                    type="date"
                    name="FechaEmision"
                    value={factura.FechaEmision}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Monto Total:</label>
                <input
                    type="number"
                    name="MontoTotal"
                    value={factura.MontoTotal}
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

export default ActualizarFactura;
