import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ListModule } from 'resources/goodDeedList/list.module';
import { ListEntity } from 'resources/goodDeedList/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ListEntity]), ListModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
