import {IsString,IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';

export class ActualizarFacturaDto{
    
    @IsOptional()
    FechaEmision?: Date;

    @IsOptional()
    MontoTotal: number;
}
