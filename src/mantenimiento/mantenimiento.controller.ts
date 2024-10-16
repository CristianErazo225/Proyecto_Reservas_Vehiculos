import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';

import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';
import { ActualizarMantenimientoDto } from './dto/actualizar-mantenimiento.dto';
import { identity } from 'rxjs';

@Controller('mantenimiento')
export class MantenimientoController {
    constructor (private readonly mantenimientoService : MantenimientoService ){

    }
//CRUD DE CLIENTES
     //Leer todas los mantenimientos

     @Get('obtener/mantenimiento')
     obtenerMantenimiento() {
         return this.mantenimientoService.findAll();
     }
 
     //Crear mantenimientos
     @Post('crear/mantenimiento')
     crear(@Body() crearMantenimientoDto: CrearMantenimientoDto) {
         return this.mantenimientoService.create(crearMantenimientoDto);
     }
 
     //Actualizar mantenimientos
     @Put(':id_mantenimiento')
     actualizar(
         @Param('id_mantenimiento') id_mantenimiento: number,
         @Body() actualizarMantenimientoDto: ActualizarMantenimientoDto
     ) {
         return this.mantenimientoService.update(id_mantenimiento, actualizarMantenimientoDto);
     }
 
     //Eliminar mantenimientos 
     @Delete(':id_mantenimiento')
     borrar(@Param('id_mantenimiento') id_mantenimiento: number) {
         return this.mantenimientoService.remove(id_mantenimiento);
     }
}
