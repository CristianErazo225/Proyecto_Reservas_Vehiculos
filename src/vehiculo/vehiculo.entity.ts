import { Mantenimiento } from 'src/mantenimiento/mantenimiento.entity';
import { Reserva } from 'src/reserva/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

//import { EstadoVehiculo } from './estado-vehiculo.enum'; // Importa el enum

@Entity()
export class Vehiculo {

  @PrimaryGeneratedColumn()
  id_vehiculo: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  anio: number;

  @Column()
  placa: string;

  @Column()
  estado: string;

  //Un Vehiculo puede estar involucrado en muchas reservas
  @OneToMany(() => Reserva, reserva => reserva.vehiculo)
  reservas: Reserva[];

  //Un Vehiculo puede estar involucrado en muchas mantenimientos
  @OneToMany(() => Mantenimiento, mantenimiento => mantenimiento.vehiculo)
  mantenimientos: Mantenimiento[];

}
