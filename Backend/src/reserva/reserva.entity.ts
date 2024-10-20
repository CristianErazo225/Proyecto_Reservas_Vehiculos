import { Clientes } from 'src/clientes/clientes.entity';
import { Facturacion } from 'src/facturacion/facturacion.entity';
import { Vehiculo } from 'src/vehiculo/vehiculo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    id_reserva: number;

    @Column()
    fecha_reserva: Date;

    @Column()
    fecha_inicio: Date;

    @Column()
    fecha_fin: Date;

    @Column()
    estado: string;
    
    //Cada reserva está asociada a un solo vehículo en particular
    @ManyToOne(() => Vehiculo, vehiculo => vehiculo.reservas, { onDelete: 'SET NULL'})
    vehiculo: Vehiculo;

    //Cada reserva está asociada a un solo cliente
    @ManyToOne(() => Clientes, clientes => clientes.reservas, { onDelete: 'SET NULL'})
    clientes: Clientes;

    //Un Factura puede estar involucrada en muchas reservas
    @OneToMany(() => Facturacion, Facturacion => Facturacion.reserva)
    Facturaciones: Facturacion[];
} 