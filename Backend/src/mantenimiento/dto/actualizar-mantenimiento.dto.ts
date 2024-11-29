import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActualizarMantenimientoDto {

    @IsOptional()
    fecha_mantenimiento?: Date;

    @IsOptional()
    descripcion_mantenimiento?: string;

    @IsOptional()
    costo_mantenimiento?: number;
}
