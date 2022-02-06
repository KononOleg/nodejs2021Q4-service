import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { IMessage } from './interfaces/IMessage';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): IMessage {
    return { message: `File "${file.originalname}" uploaded to server.` };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.getFile(filename);
  }
}
