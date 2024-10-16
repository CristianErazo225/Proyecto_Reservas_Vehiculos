import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CrearClientesDto } from './dto/crear-clientes.dto';
import { ActualizarClientesDto } from './dto/actualizar-clientes.dto';


@Controller('clientes')
export class ClientesController {
    constructor (private readonly clientesService : ClientesService){
    }

    //CRUD DE CLIENTES
     //Leer todas los clientes
    
    //CRUD DE RESERVAS
    
    //Leer todas las Reservas
    @Get('obtener/clientes')
    obtenerClientes() {
        return this.clientesService.findAll();
    }

    //Crear reserva
    @Post('crear/clientes')
    crear(@Body() crearClientesDto: CrearClientesDto) {
        return this.clientesService.create(crearClientesDto);
    }

    //Actualizar reserva
    @Put(':id_clientes')
    actualizar(
        @Param('id_clientes') id_clientes: number,
        @Body() actualizarClientesDto: ActualizarClientesDto
    ) {
        return this.clientesService.update(id_clientes, actualizarClientesDto);
    }

    //Eliminar reserva
    @Delete(':id_clientes')
    borrar(@Param('id_clientes') id_clientes: number) {
        return this.clientesService.remove(id_clientes);
    }
}




