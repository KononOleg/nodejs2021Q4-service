import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources_nestJS/users/users.module';
import ConnectionOptions from './common/ConnectionOptions';
import { BoardsModule } from './resources_nestJS/boards/boards.module';
import { TasksModule } from './resources_nestJS/tasks/tasks.module';
import { LoginModule } from './resources_nestJS/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectionOptions),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
  ],
})
export class AppModule {}
