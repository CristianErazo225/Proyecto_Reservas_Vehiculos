import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { CrearVehiculoDto } from './dto/crear-vehiculo.dto';
import { ActualizarVehiculoDto } from './dto/actualizar-vehiculo.dto';

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
    ) { }

    //Servicio para obtener los vehiculos
    async findAll(): Promise<any[]> {
        // return this.vehiculoRepository.find();

        const vehiculos = await this.vehiculoRepository.find(
            { 
                select: ['marca', 'modelo', 'placa'],
                relations: ['reservas'] 
            }
        );

        return vehiculos.map(vehiculo => ({
            marca:vehiculo.marca,
            modelo:vehiculo.modelo,
            reservas: vehiculo.reservas.map(reserva => ({
                fecha_reserva: reserva.fecha_reserva,
                estado: reserva.estado  

            })),

        }));
    }

    //Servicio para crear Vehiculos
    async create(crearVehiculoDto: CrearVehiculoDto): Promise<Vehiculo> {
        console.log(crearVehiculoDto); // Esto te ayudará a ver lo que estás recibiendo
        const vehiculo = this.vehiculoRepository.create(crearVehiculoDto);
        try {
            return await this.vehiculoRepository.save(vehiculo);
        } catch (error) {
            throw new InternalServerErrorException('Error al guardar el vehículo');
        }
    }

    //Servicio para actualizar Vehiculos
    async update(id_vehiculo: number, actualizarVehiculoDto: ActualizarVehiculoDto): Promise<Vehiculo> {
        const vehiculo = await this.findOne(id_vehiculo);
        Object.assign(vehiculo, actualizarVehiculoDto);
        return this.vehiculoRepository.save(vehiculo);
    }

    async findOne(id_vehiculo: number): Promise<Vehiculo> {
        const vehiculo = await this.vehiculoRepository.findOne({ 
            where: { id_vehiculo }
         });
        if (!vehiculo) {
            throw new NotFoundException('Vehiculo con ID ' + id_vehiculo + ' no encontrado');
        }
        return vehiculo;
    }

    //Servicio para eliminar Vehiculos
    async remove(id_vehiculo: number): Promise<void> {
        const vehiculo = await this.findOne(id_vehiculo);
        await this.vehiculoRepository.delete(id_vehiculo);
    }
}
