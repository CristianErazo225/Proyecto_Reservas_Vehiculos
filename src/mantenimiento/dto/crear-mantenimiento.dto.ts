import { IsString, IsNotEmpty } from 'class-validator';

export class CrearMantenimientoDto {
    
    @IsNotEmpty()
    fecha_reserva: Date;

    @IsNotEmpty()
    fecha_mantenimiento: Date;

    @IsNotEmpty()
    descripcion_mantenimiento: string;

    @IsString()
    costo_mantenimiento: number;
}

