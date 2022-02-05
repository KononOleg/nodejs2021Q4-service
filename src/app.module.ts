import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/users/users.module';
import ConnectionOptions from './common/ConnectionOptions';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { LoginModule } from './resources/login/login.module';

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
