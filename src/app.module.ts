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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gestion_vehiculos',
      entities: [Reserva, Vehiculo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reserva, Vehiculo]), 
  ],
  providers: [ReservaService, VehiculoService],
  controllers: [ReservaController, VehiculoController], 
})
export class AppModule {}
