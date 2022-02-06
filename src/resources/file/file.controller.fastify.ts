import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { FileService } from './file.service';
import { IMessage } from './interfaces/IMessage';

@Controller('file')
export class FileFastifyController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileFastifyInterceptor('file'))
  single(@UploadedFile() file: Express.Multer.File): IMessage {
    return { message: `File "${file.originalname}" uploaded to server.` };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.getFile(filename);
  }
}
