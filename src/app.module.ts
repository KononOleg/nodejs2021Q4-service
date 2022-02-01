import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources_nestJS/users/users.module';
import ConnectionOptions from './common/ConnectionOptions';
import { BoardsModule } from './resources_nestJS/boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectionOptions),
    UsersModule,
    BoardsModule,
  ],
})
export class AppModule {}
