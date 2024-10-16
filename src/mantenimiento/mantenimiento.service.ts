import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento} from './mantenimiento.entity';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';
import { ActualizarMantenimientoDto } from './dto/actualizar-mantenimiento.dto';



@Injectable()
export class MantenimientoService {
    constructor(
        @InjectRepository(Mantenimiento)
        private mantenimientoRepository: Repository<Mantenimiento>,
        ) {}



        findAll(): Promise<Mantenimiento[]> {
        return this.mantenimientoRepository.find();
        }

        async findOne(id_mantenimiento: number): Promise<Mantenimiento> {
            const mantenimiento = await this.mantenimientoRepository.findOne({ where: { id_mantenimiento} });
            if (!mantenimiento){
                throw new NotFoundException('Mantenimiento no Encontrada')
            }
            return mantenimiento;
        }

        async create(crearMantenimientoDto : CrearMantenimientoDto):Promise<Mantenimiento>{
            const mantenimiento = this.mantenimientoRepository.create(crearMantenimientoDto);
            return this.mantenimientoRepository.save(mantenimiento);
        }

        async update(id_mantenimiento: number, actualizarMantenimientoDto: ActualizarMantenimientoDto):Promise<Mantenimiento>{
            const mantenimiento = await this.findOne(id_mantenimiento)
            Object.assign(mantenimiento, actualizarMantenimientoDto);
            return this.mantenimientoRepository.save(mantenimiento);
        }

        async remove(id_mantenimiento: number): Promise<void> {
            const mantenimiento = await this.findOne(id_mantenimiento);
            this.mantenimientoRepository.delete(id_mantenimiento);
        }



}
