import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/users/users.module';
import ConnectionOptions from './common/ConnectionOptions';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { LoginModule } from './resources/login/login.module';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { FileModule } from './resources/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectionOptions),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
    FileModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
