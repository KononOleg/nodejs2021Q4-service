import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../Middleware/auth.guard';
import Board from '../../entity/board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/CreateBoard.dto';
import { ParamBoardDto } from './dto/ParamUser.dto';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamBoardDto): Promise<Board> {
    return this.boardsService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: ParamBoardDto): Promise<void> {
    return this.boardsService.remove(params.id);
  }

  @Post()
  create(@Body() createUserDto: CreateBoardDTO): Promise<Board> {
    return this.boardsService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param() params: ParamBoardDto,
    @Body() createUserDto: CreateBoardDTO
  ): Promise<Board> {
    return this.boardsService.update(createUserDto, params.id);
  }
}
