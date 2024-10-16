import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaService } from './reserva/reserva.service';
import { ReservaController } from './reserva/reserva.controller';
import { Reserva } from './reserva/reserva.entity';


import {Clientes} from './clientes/clientes.entity';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesService } from './clientes/clientes.service';

import { MantenimientoService } from './mantenimiento/mantenimiento.service';
import { MantenimientoController } from './mantenimiento/mantenimiento.controller';
import { Mantenimiento } from './mantenimiento/mantenimiento.entity';



//Facturacion
import { FacturacionController } from './facturacion/facturacion.controller';
import { FacturacionService } from './facturacion/facturacion.service';
import {Facturacion} from './facturacion/facturacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gestion_vehiculos',
      entities: [Reserva, Clientes, Mantenimiento, Facturacion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reserva, Facturacion, Clientes, Mantenimiento]),
  ],
  providers: [ReservaService, ClientesService, MantenimientoService, , FacturacionService],
  controllers: [ReservaController, ClientesController, MantenimientoController, FacturacionController],
  
})
export class AppModule {}
