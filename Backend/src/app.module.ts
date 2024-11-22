import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaService } from './reserva/reserva.service';
import { ReservaController } from './reserva/reserva.controller';
import { Reserva } from './reserva/reserva.entity';

import { VehiculoService } from './vehiculo/vehiculo.service';
import { VehiculoController } from './vehiculo/vehiculo.controller';
import { Vehiculo } from './vehiculo/vehiculo.entity';

import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { Clientes } from './clientes/clientes.entity';

import { MantenimientoService } from './mantenimiento/mantenimiento.service';
import { MantenimientoController } from './mantenimiento/mantenimiento.controller';
import { Mantenimiento } from './mantenimiento/mantenimiento.entity';

import { FacturacionService } from './facturacion/facturacion.service';
import { FacturacionController } from './facturacion/facturacion.controller';
import { Facturacion } from './facturacion/facturacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gestion_vehiculos',
      entities: [Reserva, Vehiculo, Clientes, Mantenimiento, Facturacion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reserva, Vehiculo, Clientes, Mantenimiento, Facturacion]),
  ],
  providers: [ReservaService, VehiculoService, ClientesService, MantenimientoService, FacturacionService],
  controllers: [ReservaController, VehiculoController, ClientesController, MantenimientoController, FacturacionController],
  
})
export class AppModule {}
