import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Facturacion {

    @PrimaryGeneratedColumn()
    FacturaID: number; 

    @Column()
    FechaEmision: Date; 

    @Column() 
    MontoTotal: number;
}