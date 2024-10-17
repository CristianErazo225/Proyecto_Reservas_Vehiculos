import { Reserva } from 'src/reserva/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Facturacion {

    @PrimaryGeneratedColumn()
    FacturaID: number; 

    @Column()
    FechaEmision: Date; 

    @Column() 
    MontoTotal: number;

    //Cada Factura está asociada a una reserva en particular
    @ManyToOne(() => Reserva, reserva => reserva.Facturaciones, { onDelete: 'SET NULL'})
    reserva: Reserva;

    
}