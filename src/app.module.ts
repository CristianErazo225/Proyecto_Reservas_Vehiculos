import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaService } from './reserva/reserva.service';
import { ReservaController } from './reserva/reserva.controller';
import { Reserva } from './reserva/reserva.entity';


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
      entities: [Reserva, Facturacion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reserva, Facturacion]),
  ],
  providers: [ReservaService, FacturacionService],
  controllers: [ReservaController, FacturacionController],
  
})
export class AppModule { }
