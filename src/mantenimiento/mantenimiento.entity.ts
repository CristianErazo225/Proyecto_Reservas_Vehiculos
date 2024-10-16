import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Mantenimiento {

    @PrimaryGeneratedColumn()
    id_mantenimiento: number; // identificador clientes 


    @Column()
    fecha_mantenimiento: Date;// fecha mantenimiento 

    @Column()
    descripcion_mantenimiento: string; // descripcion mantenimiento

    @Column() // costo mantenimineto
    costo_mantenimiento: number;

    
}


