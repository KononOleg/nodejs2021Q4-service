import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import Board from '../../entity/board.model';
import ColumnEntity from '../../entity/column.model';
import { CreateColumnDTO } from './dto/CreateColumn.dto';
import { CreateBoardDTO } from './dto/CreateBoard.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find({ relations: ['columns'] });
  }

  async findOne(parameter: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(parameter, {
      relations: ['columns'],
    });
    if (!board)
      throw new HttpException(
        `Board with parameter ${parameter} not found`,
        HttpStatus.NOT_FOUND
      );
    else return board;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.boardsRepository.delete(id);
  }

  async create(newBoard: CreateBoardDTO): Promise<Board> {
    const newColumns = await Promise.all(
      newBoard.columns.map(async (column: CreateColumnDTO) => {
        const newColumn = await getRepository(ColumnEntity).save(column);
        return newColumn;
      })
    );
    const createdBoard = {
      ...newBoard,
      columns: newColumns,
    };
    return this.boardsRepository.save(createdBoard);
  }

  async update(updateBoardDto: CreateBoardDTO, id: string): Promise<Board> {
    const board = await this.findOne(id);
    const updatedBoard = this.boardsRepository.merge(board, updateBoardDto);
    return this.boardsRepository.save(updatedBoard);
  }
}
