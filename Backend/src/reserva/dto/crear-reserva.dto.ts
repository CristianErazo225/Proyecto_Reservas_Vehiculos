import { IsString, IsNotEmpty } from 'class-validator';

export class CrearReservaDto {
    
    @IsNotEmpty()
    fecha_reserva: Date;

    @IsNotEmpty()
    fecha_inicio: Date;

    @IsNotEmpty()
    fecha_fin: Date;

    @IsString()
    estado: string;
}