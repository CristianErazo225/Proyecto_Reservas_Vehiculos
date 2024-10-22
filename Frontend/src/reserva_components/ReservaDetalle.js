import React, {useEffect, useState} from "react";
import api from "../axiosConfig";

function ReservaDetalle(reservaId){
    const [reserva, setReserva] = useState(null);

    useEffect(
        () => {
            api.get('/reserva/${reservaId}')
            .then(response => setReserva(response.data))
            .catch(error => console.error("Error: ", error));
        }, [reservaId]);

        if(!reserva){
            return <p>La reserva Seleccionada no tiene infromacion</p>
        }

        console.log(reserva);
        

        //Renderizar el componente
    return (
        <div>
            <h3>Detalle de la reserva</h3>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva.id} onClick={() => onSelectReserva(reserva.id)}>
                        Nro: {reserva.id_reserva} - {reserva.fecha_reserva}, Estado: {reserva.estado}
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}
