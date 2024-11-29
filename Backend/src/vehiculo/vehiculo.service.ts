import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    ) {}

    // Servicio para obtener los vehículos
    async findAll(): Promise<any[]> {
        const vehiculos = await this.vehiculoRepository.find({
            select: ['id_vehiculo', 'marca', 'modelo', 'anio', 'placa', 'estado'], // Agregamos 'anio', 'placa', y 'estado'
            relations: ['reservas'], // Si quieres seguir obteniendo las reservas relacionadas
        });

        return vehiculos.map(vehiculo => ({
            id_vehiculo: vehiculo.id_vehiculo,
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            anio: vehiculo.anio, // Incluimos el año
            placa: vehiculo.placa, // Incluimos la placa
            estado: vehiculo.estado, // Incluimos el estado
            reservas: vehiculo.reservas.map(reserva => ({
                fecha_reserva: reserva.fecha_reserva,
                estado: reserva.estado,
            })),
        }));
    }

    // Servicio para crear vehículos
    async create(crearVehiculoDto: CrearVehiculoDto): Promise<Vehiculo> {
        const vehiculo = this.vehiculoRepository.create(crearVehiculoDto);
        try {
            return await this.vehiculoRepository.save(vehiculo);
        } catch (error) {
            throw new InternalServerErrorException('Error al guardar el vehículo');
        }
    }

    // Servicio para actualizar vehículos
    async update(id_vehiculo: number, actualizarVehiculoDto: ActualizarVehiculoDto): Promise<Vehiculo> {
        const vehiculo = await this.findOne(id_vehiculo);
        Object.assign(vehiculo, actualizarVehiculoDto);
        return this.vehiculoRepository.save(vehiculo);
    }

    // Buscar un vehículo por ID
    async findOne(id_vehiculo: number): Promise<Vehiculo> {
        const vehiculo = await this.vehiculoRepository.findOne({
            where: { id_vehiculo },
        });
        if (!vehiculo) {
            throw new NotFoundException('Vehículo con ID ' + id_vehiculo + ' no encontrado');
        }
        return vehiculo;
    }

    // Servicio para eliminar vehículos
    async remove(id_vehiculo: number): Promise<void> {
        const vehiculo = await this.findOne(id_vehiculo);
        await this.vehiculoRepository.delete(id_vehiculo);
    }
}
