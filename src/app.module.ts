import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConnectionConfig } from './config/ormdatasource';

@Module({
  imports: [TypeOrmModule.forRoot(ormConnectionConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
