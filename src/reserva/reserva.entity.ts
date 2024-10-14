import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

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

    // @ManyToOne(() => Responsable, responsable => responsable.proyectos, { onDelete: 'SET NULL' })
    // responsable: Responsable;

    // @OneToOne(() => Detalle, detalle => detalle.proyecto)
    // detalle: Detalle;
}