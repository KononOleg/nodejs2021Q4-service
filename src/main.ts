import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as multer from 'fastify-multer';
import { AppModule } from './app.module';
import config from './common/config';
import { loggerOptions } from './Middleware/logger.middleware';

const bootstrap = async (): Promise<void> => {
  if (config.USE_FASTIFY === 'true') {
    const fastifyAdapter = new FastifyAdapter();
    fastifyAdapter.register(multer.contentParser);
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
      loggerOptions
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(config.PORT);
  } else {
    const app = await NestFactory.create(AppModule, loggerOptions);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(config.PORT);
  }

  /*   throw Error('Oops!'); */
  /*   Promise.reject(Error('Oops!')); */
};
bootstrap();
