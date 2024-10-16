import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id_clientes: number; // identificador clientes 


    @Column()
    Nombre: String;// Nombre Cliente 

    @Column()
    Direccion: String; // Direccion Cliente

    @Column() // Telefno cliente 
    Telefono: number;

    @Column()
    Correo: String;
}



