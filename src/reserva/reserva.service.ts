import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ActualizarReservaDto } from './dto/actualizar-reserva.dto';

@Injectable()
export class ReservaService {
    constructor(
        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>,
    ) { }

    //Servicio para obtener todas las Reservas
    findAll(): Promise<Reserva[]> {
        return this.reservaRepository.find();
    }

    //Servicio para crear Reservas
    async create(crearReservaDto: CrearReservaDto): Promise<Reserva> {
        const reserva = this.reservaRepository.create(crearReservaDto);
        return this.reservaRepository.save(reserva);
    }

    //Servicio para Actualizar Reservas
    async update(id_reserva: number, actualizarReservaDto: ActualizarReservaDto): Promise<Reserva> {
        const reserva = await this.findOne(id_reserva);
        Object.assign(reserva, actualizarReservaDto);
        return this.reservaRepository.save(reserva);
    }

    async findOne(id_reserva: number): Promise<Reserva> {
        const reserva = await this.reservaRepository.findOne({ 
            where: { id_reserva }
         });
        if (!reserva) {
            throw new NotFoundException('Reserva con ID ' + id_reserva + ' no encontrado');
        }
        return reserva;
    }

    //Servicio para eliminar Reservas
    async remove(id_reserva: number): Promise<void> {
        const reserva = await this.findOne(id_reserva);
        await this.reservaRepository.delete(id_reserva);
    }
}