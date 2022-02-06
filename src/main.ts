import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './common/config';
import { loggerOptions } from './Middleware/logger.middleware';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, loggerOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(config.PORT);

  /*   throw Error('Oops!'); */
  /*   Promise.reject(Error('Oops!')); */
};
bootstrap();
