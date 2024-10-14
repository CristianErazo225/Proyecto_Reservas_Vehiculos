import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ActualizarReservaDto } from './dto/actualizar-reserva.dto';

@Controller('reserva')
export class ReservaController {
    constructor(private readonly reservaService: ReservaService) {
    }

    //CRUD DE RESERVAS
    
    //Leer todas las Reservas
    @Get('obtener/reservas')
    obtenerReservas() {
        return this.reservaService.findAll();
    }

    //Crear reserva
    @Post('crear/reservas')
    crear(@Body() crearReservaDto: CrearReservaDto) {
        return this.reservaService.create(crearReservaDto);
    }

    //Actualizar reserva
    @Put(':id_reserva')
    actualizar(
        @Param('id_reserva') id_reserva: number,
        @Body() actualizarReservaDto: ActualizarReservaDto
    ) {
        return this.reservaService.update(id_reserva, actualizarReservaDto);
    }

    //Eliminar reserva
    @Delete(':id_reserva')
    borrar(@Param('id_reserva') id_reserva: number) {
        return this.reservaService.remove(id_reserva);
    }
}
