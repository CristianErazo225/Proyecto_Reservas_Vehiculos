import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservaService } from './reserva/reserva.service';
import { ReservaController } from './reserva/reserva.controller';
import { Reserva } from './reserva/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'gestion_vehiculos',
      entities: [Reserva],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reserva]),
  ],
  providers: [ReservaService],
  controllers: [ReservaController],
  
})
export class AppModule { }
