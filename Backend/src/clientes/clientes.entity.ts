import { Reserva } from 'src/reserva/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id_clientes: number; // identificador clientes 

    @Column()
    nombre: String;// Nombre Cliente 

    @Column()
    direccion: String; // Direccion Cliente

    @Column() // Telefno cliente 
    telefono: number;

    @Column()
    correo: String;

    //Un Cliente puede tener muchas reservas
    @OneToMany(() => Reserva, reserva => reserva.clientes)
    reservas: Reserva[];
}



