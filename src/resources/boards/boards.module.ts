import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from '../../entity/board.model';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
