import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CrearVehiculoDto {
    
    @IsNotEmpty()
    @IsString() // Asegúrate de que 'marca' es una cadena
    marca: string;

    @IsNotEmpty()
    @IsString() // Asegúrate de que 'modelo' es una cadena
    modelo: string;

    @IsNotEmpty()
    @IsInt() // Verifica que 'anio' sea un número entero
    @IsPositive() // Verifica que 'anio' sea positivo
    anio: number;

    @IsNotEmpty()
    @IsString() // Verifica que 'placa' sea una cadena
    placa: string;

    @IsNotEmpty()
    @IsString() // Verifica que 'estado' sea una cadena
    estado: string;
}

