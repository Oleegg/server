import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'resources/auth/auth.module';
import { UserModule } from 'resources/users/user.module';
import config from 'config/settings';
import { ormConnectionConfig } from 'config/ormdatasource';
import { AuthMiddleware } from 'resources/auth/middlewares/auth.middleware';
import { ListModule } from 'resources/goodDeedList/list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config],
      cache: true,
    }),
    TypeOrmModule.forRoot(ormConnectionConfig),
    AuthModule,
    UserModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
