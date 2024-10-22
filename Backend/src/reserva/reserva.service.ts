import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ActualizarReservaDto } from './dto/actualizar-reserva.dto';
import { Facturacion } from 'src/facturacion/facturacion.entity';

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

    // async findAll(): Promise<any[]> {

    //      const reservas = await this.reservaRepository.find(
    //          { 
    //              select: ['fecha_inicio', 'fecha_fin'],
    //              relations: ['Facturacion'] 
    //          }
    //      );

    //      return reservas.map(reserva => ({
    //          fecha_inicio:reserva.fecha_inicio,
    //          fecha_fin:reserva.fecha_fin,
    //          facturaciones: reserva.Facturaciones.map(facturacion => ({
    //          MontoTotal: facturacion.MontoTotal
    //          })),

    //      }));
    //  }

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
            where: { id_reserva }, 
            relations: ['vehiculo', 'clientes']
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

    async findFull(): Promise<Reserva[]>{
        return this.reservaRepository.find( {relations: ['vehiculo', 'clientes']});

    }
}
