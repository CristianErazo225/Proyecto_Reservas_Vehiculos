import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facturacion } from './facturacion.entity';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { ActualizarFacturaDto } from './dto/actualizar-factura.dto';



@Injectable()
export class FacturacionService {
    constructor(
        @InjectRepository(Facturacion)
        private facturacionRepository: Repository<Facturacion>,
        ) {}



        findAll(): Promise<Facturacion[]> {
        return this.facturacionRepository.find();
        }

        async findOne(FacturaID: number): Promise<Facturacion> {
            const facturacion = await this.facturacionRepository.findOne({ where: { FacturaID } });
            if (!facturacion){
                throw new NotFoundException('Factura no Encontrada')
            }
            return facturacion;
        //return this.facturacionRepository.findOne({ where: { FacturaID } });
        }

        async create(crearFacturaDto : CrearFacturaDto):Promise<Facturacion>{
            const factura = this.facturacionRepository.create(crearFacturaDto);
            return this.facturacionRepository.save(factura);
        }

        async update(FacturaID: number, actualizarFacturaDto: ActualizarFacturaDto):Promise<Facturacion>{
            const factura = await this.findOne(FacturaID)
            Object.assign(factura, actualizarFacturaDto);
            return this.facturacionRepository.save(factura);
        }

        async remove(FacturaID: number): Promise<void> {
            const factura = await this.findOne(FacturaID);
            this.facturacionRepository.delete(FacturaID);
        }


            
            


}
