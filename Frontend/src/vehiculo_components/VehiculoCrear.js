import React, { useState } from "react";
import api from "../axiosConfig"; // Asegúrate de tener configurada correctamente la baseURL en axiosConfig

function CrearVehiculo() {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [placa, setPlaca] = useState('');
    const [estado, setEstado] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!marca || !modelo || !anio || !placa || !estado) {
            setError('Por favor, complete todos los campos.');
            return;
        }
        
        if (isNaN(anio) || parseInt(anio) <= 0) {
            setError('El año debe ser un número positivo.');
            return;
        }

        const newVehiculo = { 
            marca, 
            modelo, 
            anio: parseInt(anio, 10), // Asegúrate de que sea un número
            placa, 
            estado 
        };
    
        console.log('Datos a enviar:', newVehiculo); // Imprimir datos para depuración
    
        setLoading(true); // Muestra que la solicitud está en curso
        api.post('/vehiculo/crear/vehiculos', newVehiculo) // Asegúrate de que esta ruta coincida con la del backend
            .then(response => {
                console.log('Vehículo creado: ', response.data);
                // Limpiar el formulario después de crear el vehículo
                setMarca('');
                setModelo('');
                setAnio('');
                setPlaca('');
                setEstado('');
                setError(''); // Limpia el error si se creó correctamente
            })
            .catch(error => {
                if (error.response) {
                    console.error("Error al crear el vehículo", error.response.data);
                    
                } else {
                    console.error("Error: No se recibió respuesta del servidor", error.request);
                    setError("No se recibió respuesta del servidor. Verifique su conexión.");
                }
            })
            .finally(() => {
                setLoading(false); // Restablece el estado de carga
            });
    };

    return (
        <div>
            <h3>Marca</h3>
            <input className="form-control" type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
            <br />
            <h3>Modelo</h3>
            <input className="form-control" type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            <br />
            <h3>Año</h3>
            <input className="form-control" type="number" placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
            <br />
            <h3>Placa</h3>
            <input className="form-control" type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
            <br />
            <h3>Estado</h3>
            <input className="form-control" type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary btn-sm me-2" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </div>
    );
}

export default CrearVehiculo;
