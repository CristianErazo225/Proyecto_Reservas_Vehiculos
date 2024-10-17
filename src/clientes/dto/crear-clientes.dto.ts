import { IsString, IsNotEmpty } from 'class-validator';

export class CrearClientesDto {
    
    @IsNotEmpty()
    nombre: String;

    @IsNotEmpty()
    direccion: String;

    @IsNotEmpty()
    telefono: number;

    @IsString()
    correo: string;
}