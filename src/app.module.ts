import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources_nestJS/users/users.module';
import ConnectionOptions from './common/ConnectionOptions';

@Module({
  imports: [TypeOrmModule.forRoot(ConnectionOptions), UsersModule],
})
export class AppModule {}
