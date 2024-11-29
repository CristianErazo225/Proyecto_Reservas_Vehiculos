import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from './mantenimiento.entity';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';
import { ActualizarMantenimientoDto } from './dto/actualizar-mantenimiento.dto';

@Injectable()
export class MantenimientoService {
    constructor(
        @InjectRepository(Mantenimiento)
        private mantenimientoRepository: Repository<Mantenimiento>,
    ) {}

    // Obtener todos los mantenimientos
    findAll(): Promise<Mantenimiento[]> {
        return this.mantenimientoRepository.find();
    }

    // Obtener un mantenimiento por ID
    async findOne(id_mantenimiento: number): Promise<Mantenimiento> {
        const mantenimiento = await this.mantenimientoRepository.findOne({ where: { id_mantenimiento } });
        if (!mantenimiento) {
            throw new NotFoundException(`El mantenimiento con ID ${id_mantenimiento} no fue encontrado.`);
        }
        return mantenimiento;
    }

    // Crear un mantenimiento
    async create(crearMantenimientoDto: CrearMantenimientoDto): Promise<Mantenimiento> {
        const nuevoMantenimiento = this.mantenimientoRepository.create(crearMantenimientoDto);
        return this.mantenimientoRepository.save(nuevoMantenimiento);
    }

    // Actualizar un mantenimiento
    async update(
        id_mantenimiento: number,
        actualizarMantenimientoDto: ActualizarMantenimientoDto
    ): Promise<Mantenimiento> {
        const mantenimiento = await this.findOne(id_mantenimiento); // Verifica que el mantenimiento exista

        // Actualiza solo los campos que están en el DTO
        mantenimiento.fecha_mantenimiento = actualizarMantenimientoDto.fecha_mantenimiento || mantenimiento.fecha_mantenimiento;
        mantenimiento.descripcion_mantenimiento = actualizarMantenimientoDto.descripcion_mantenimiento || mantenimiento.descripcion_mantenimiento;
        mantenimiento.costo_mantenimiento = actualizarMantenimientoDto.costo_mantenimiento || mantenimiento.costo_mantenimiento;

        return this.mantenimientoRepository.save(mantenimiento);
    }

    // Eliminar un mantenimiento
    async remove(id_mantenimiento: number): Promise<void> {
        const mantenimiento = await this.findOne(id_mantenimiento); // Verifica que el mantenimiento exista
        await this.mantenimientoRepository.remove(mantenimiento);
    }
}
