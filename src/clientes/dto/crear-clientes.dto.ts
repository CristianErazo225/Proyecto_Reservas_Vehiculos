import { IsString, IsNotEmpty } from 'class-validator';

export class CrearClientesDto {
    
    @IsNotEmpty()
    Nombre: String;

    @IsNotEmpty()
    Direccion: String;

    @IsNotEmpty()
    Telefono: number;

    @IsString()
    Correo: string;
}