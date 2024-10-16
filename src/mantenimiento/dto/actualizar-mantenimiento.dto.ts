import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActualizarMantenimientoDto {
    
    @IsOptional()
    fecha_mantenimineto?: Date;

    
    @IsOptional()
    descrpcion_mantenimiento?: string;

 
    @IsOptional()
    costo_mantenimiento?: number;

}