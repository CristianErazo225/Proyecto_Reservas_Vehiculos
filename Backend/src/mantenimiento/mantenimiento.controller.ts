import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';
import { ActualizarMantenimientoDto } from './dto/actualizar-mantenimiento.dto';

@Controller('mantenimiento')
export class MantenimientoController {
    constructor(private readonly mantenimientoService: MantenimientoService) {}

    // Leer todos los mantenimientos
    @Get('obtener/mantenimiento')
    obtenerMantenimiento() {
        return this.mantenimientoService.findAll();
    }

    // Leer un mantenimiento por ID
    @Get(':id_mantenimiento')
    obtenerUno(@Param('id_mantenimiento', ParseIntPipe) id_mantenimiento: number) {
        return this.mantenimientoService.findOne(id_mantenimiento);
    }

    // Crear mantenimiento
    @Post('crear/mantenimiento')
    crear(@Body() crearMantenimientoDto: CrearMantenimientoDto) {
        return this.mantenimientoService.create(crearMantenimientoDto);
    }

    // Actualizar mantenimiento
    @Put(':id_mantenimiento')
    actualizar(
        @Param('id_mantenimiento', ParseIntPipe) id_mantenimiento: number,
        @Body() actualizarMantenimientoDto: ActualizarMantenimientoDto
    ) {
        return this.mantenimientoService.update(id_mantenimiento, actualizarMantenimientoDto);
    }

    // Eliminar mantenimiento
    @Delete(':id_mantenimiento')
    borrar(@Param('id_mantenimiento', ParseIntPipe) id_mantenimiento: number) {
        return this.mantenimientoService.remove(id_mantenimiento);
    }
}
