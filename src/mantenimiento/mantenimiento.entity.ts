import { Vehiculo } from 'src/vehiculo/vehiculo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


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

    //Cada mantenimiento está asociada a un solo vehículo en particular
    @ManyToOne(() => Vehiculo, vehiculo => vehiculo.mantenimientos, { onDelete: 'SET NULL'})
    vehiculo: Vehiculo;

    
}


