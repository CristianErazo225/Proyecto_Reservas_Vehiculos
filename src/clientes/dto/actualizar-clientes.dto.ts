import {IsString,IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';

export class ActualizarClientesDto{
    
   
    @IsOptional()
    Nombre: String;

    
    @IsOptional()
    Direccion: String;

    
    @IsOptional()
    Telefono: number;

    @IsOptional()
    Correo: string;

}
