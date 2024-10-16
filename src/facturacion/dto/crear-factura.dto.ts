import {IsString,IsBoolean, IsNotEmpty} from 'class-validator';


export class CrearFacturaDto{
    
    @IsNotEmpty()
    FechaEmision: Date;



    @IsNotEmpty()
    MontoTotal: number;






}
