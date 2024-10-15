import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

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

// @Column({
//   type: 'enum',
//   enum: EstadoVehiculo,
//   default: EstadoVehiculo.DISPONIBLE, // Valor por defecto
// })
// estado: EstadoVehiculo;

}
