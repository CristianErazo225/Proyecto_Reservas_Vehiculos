import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive } from 'class-validator';

export class ActualizarVehiculoDto {
    @IsNotEmpty()
    @IsString() // Asegúrate de que 'marca' es una cadena
    @IsOptional()
    marca?: string;

    @IsNotEmpty()
    @IsString() // Asegúrate de que 'modelo' es una cadena
    @IsOptional()
    modelo?: string;

    @IsNotEmpty()
    @IsOptional()
    anio?: number;

    @IsNotEmpty()
    @IsString() // Verifica que 'placa' sea una cadena
    @IsOptional()
    placa?: string;

    @IsNotEmpty()
    @IsString() // Verifica que 'estado' sea una cadena
    @IsOptional()
    estado?: string; 
}
