import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { ActualizarFacturaDto } from './dto/actualizar-factura.dto';


@Controller('facturacion')
export class FacturacionController {

    constructor (private readonly facturacionService : FacturacionService){

    }

    // @Get()
    // obtenerProyectos() {
    // return 'Lista de proyectos';
    // }

    @Get()
    obtenerTodos(){
        return this.facturacionService.findAll();
    }

    @Get(':FacturaID')
    obtenerUno(@Param('FacturaID') FacturaID:number){
        return this.facturacionService.findOne(FacturaID);
    }

    @Post()
    crear(@Body() crearFacturaDto: CrearFacturaDto){
        return this.facturacionService.create(crearFacturaDto);
    }

    @Put(':FacturaID')
    actualizar(
        @Param('FacturaID') FacturaID:number,
        @Body () actualizarFacturaDto: ActualizarFacturaDto
    ){
        return this.facturacionService.update(FacturaID, actualizarFacturaDto);
    }

    @Delete(':FacturaID')
    borrar(@Param('FacturaID')FacturaID:number){
        return this.facturacionService.remove(FacturaID);
    }

}
