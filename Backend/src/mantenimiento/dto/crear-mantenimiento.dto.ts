import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CrearMantenimientoDto {

    @IsNotEmpty()
    fecha_mantenimiento: Date;  // Mantén esta propiedad para el campo fecha_mantenimiento

    @IsNotEmpty()
    descripcion_mantenimiento: string;

    @IsNotEmpty()
    @IsNumber()
    costo_mantenimiento: number; // Cambié @IsString() por @IsNumber()
}
