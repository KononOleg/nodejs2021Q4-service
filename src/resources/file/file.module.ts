import { Module } from '@nestjs/common';
import config from '../../common/config';
import { FileController } from './file.controller';
import { FileFastifyController } from './file.controller.fastify';
import { FileService } from './file.service';

@Module({
  controllers: [
    config.USE_FASTIFY === 'true' ? FileFastifyController : FileController,
  ],
  providers: [FileService],
})
export class FileModule {}
