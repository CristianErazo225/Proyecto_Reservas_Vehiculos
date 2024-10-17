import {IsString,IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';

export class ActualizarClientesDto{
    
   
    @IsOptional()
    nombre: String;

    
    @IsOptional()
    direccion: String;

    
    @IsOptional()
    telefono: number;

    @IsOptional()
    correo: string;

}
