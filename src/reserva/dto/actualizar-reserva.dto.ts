import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActualizarReservaDto {
    @IsNotEmpty()
    @IsOptional()
    fecha_reserva?: Date;

    @IsNotEmpty()
    @IsOptional()
    fecha_inicio?: Date;

    @IsNotEmpty()
    @IsOptional()
    fecha_fin?: Date;

    @IsString()
    @IsOptional()
    estado?: string;
}