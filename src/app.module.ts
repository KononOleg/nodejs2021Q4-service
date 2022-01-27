import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnectionOptions from './common/ConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectionOptions),
  ],
})
export class AppModule {}