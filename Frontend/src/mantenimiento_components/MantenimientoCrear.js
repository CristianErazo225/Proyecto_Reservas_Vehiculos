import React, { useState, useEffect } from "react";
import api from "../axiosConfig";

function CrearMantenimiento() {
    const [fecha_mantenimiento, setFecha_mantenimiento] = useState('');
    const [descripcion_mantenimiento, setDescripcion_mantenimiento] = useState('');
    const [costo_mantenimiento, setCosto_mantenimiento] = useState('');
    const [vehiculoId, setVehiculoId] = useState('');
    const [vehiculos, setVehiculos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Obtener la lista de vehículos disponibles para asociar el mantenimiento
    useEffect(() => {
        api.get('/vehiculo/obtener/vehiculos')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setVehiculos(response.data);
                } else {
                    setErrorMessage("No se encontraron vehículos.");
                }
            })
            .catch(error => {
                console.error("Error al cargar los vehículos: ", error);
                setErrorMessage("Error al cargar los vehículos.");
            });
    }, []);

    const handleSubmit = () => {
        // Validación básica de los campos
        if (!fecha_mantenimiento || !descripcion_mantenimiento || !costo_mantenimiento || !vehiculoId) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        const newMantenimiento = {
            fecha_mantenimiento,
            descripcion_mantenimiento,
            costo_mantenimiento: parseFloat(costo_mantenimiento), // Asegurarse de que el costo sea un número
            vehiculoId,
        };

        api.post('/mantenimiento', newMantenimiento)
            .then(response => {
                console.log('Mantenimiento creado: ', response.data);
                // Limpiar los campos después de crear el mantenimiento
                setFecha_mantenimiento('');
                setDescripcion_mantenimiento('');
                setCosto_mantenimiento('');
                setVehiculoId('');
                setSuccessMessage('Mantenimiento creado correctamente'); // Mensaje de éxito
                setErrorMessage(''); // Limpiar el mensaje de error
            })
            .catch(error => {
                console.error("Error al crear el mantenimiento", error);
                setErrorMessage("Error al crear el mantenimiento. Por favor, intenta de nuevo."); // Mensaje de error
                setSuccessMessage(''); // Limpiar el mensaje de éxito
            });
    };

    return (
        <div>
            <h3>Crear Mantenimiento</h3>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mostrar mensaje de error */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Mostrar mensaje de éxito */}

            <h5>Fecha de Mantenimiento</h5>
            <input
                className="form-control"
                type="date"
                placeholder="Fecha de Mantenimiento"
                value={fecha_mantenimiento}
                onChange={(e) => setFecha_mantenimiento(e.target.value)}
            />
            <br />

            <h5>Descripción del Mantenimiento</h5>
            <input
                className="form-control"
                type="text"
                placeholder="Descripción"
                value={descripcion_mantenimiento}
                onChange={(e) => setDescripcion_mantenimiento(e.target.value)}
            />
            <br />

            <h5>Costo del Mantenimiento</h5>
            <input
                className="form-control"
                type="number"
                placeholder="Costo"
                value={costo_mantenimiento}
                onChange={(e) => setCosto_mantenimiento(e.target.value)}
            />
            <br />

            <h5>Vehículo</h5>
            <select
                className="form-control"
                value={vehiculoId}
                onChange={(e) => setVehiculoId(e.target.value)}
            >
                <option value="">Seleccione un vehículo</option>
                {vehiculos.map(vehiculo => (
                    <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                        {vehiculo.id_vehiculo} - {vehiculo.marca} {vehiculo.modelo}
                    </option>
                ))}
            </select>
            <br />

            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit}>Guardar Mantenimiento</button>
        </div>
    );
}

export default CrearMantenimiento;
