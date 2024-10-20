import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CrearVehiculoDto } from './dto/crear-vehiculo.dto';
import { ActualizarVehiculoDto } from './dto/actualizar-vehiculo.dto';


@Controller('vehiculo')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) {}

    // Leer todos los vehículos
    @Get('obtener/vehiculos')
    obtenerVehiculos() {
        return this.vehiculoService.findAll(); 
    }

    //Crear vehiculo
    @Post('crear/vehiculos')
    crear(@Body() crearVehiculoDto: CrearVehiculoDto) {
        return this.vehiculoService.create(crearVehiculoDto);
    }    
    
    //Actualizar vehiculo
    @Put(':id_vehiculo')
    actualizar(
        @Param('id_vehiculo') id_vehiculo: number,
        @Body() actualizarVehiculoDto: ActualizarVehiculoDto
    ) {
        return this.vehiculoService.update(id_vehiculo, actualizarVehiculoDto);
    }

    //Eliminar reserva
    @Delete(':id_vehiculo')
    borrar(@Param('id_vehiculo') id_vehiculo: number) {
        return this.vehiculoService.remove(id_vehiculo);
    }
}
