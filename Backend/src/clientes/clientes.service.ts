import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { CrearClientesDto } from './dto/crear-clientes.dto';
import { ActualizarClientesDto } from './dto/actualizar-clientes.dto';


@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Clientes)
        private clientesRepository: Repository<Clientes>,
        ) {}



        findAll(): Promise<Clientes[]> {
        return this.clientesRepository.find();
        }

        async findOne(id_clientes: number): Promise<Clientes> {
            const clientes = await this.clientesRepository.findOne({ where: { id_clientes } });
            if (!clientes){
                throw new NotFoundException('Cliente no Encontrado')
            }
            return clientes;
        }

        async create(crearClientesDto : CrearClientesDto):Promise<Clientes>{
            const clientes = this.clientesRepository.create(crearClientesDto);
            return this.clientesRepository.save(clientes);
        }

        async update(id_clientes: number, actualizarClientesDto: ActualizarClientesDto):Promise<Clientes>{
            const clientes = await this.findOne(id_clientes)
            Object.assign(clientes, actualizarClientesDto);
            return this.clientesRepository.save(clientes);
        }

        async remove(id_clientes: number): Promise<void> {
            const clientes = await this.findOne(id_clientes);
            this.clientesRepository.delete(id_clientes);
        }


            
            


}
