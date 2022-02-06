import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import config from '../common/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loger: Logger) {
    process.on('uncaughtException', (e) => {
      this.loger.error(`${e}`);
    });
    process.on('unhandledRejection', (e) => {
      this.loger.error(`${e}`);
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const { method, originalUrl, params, query, body } = req;
      const { statusCode, statusMessage } = res;
      this.loger.log(
        `Received ${method} request to ${originalUrl} with params: ${JSON.stringify(
          params
        )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(
          body
        )}. Request completed with ${statusCode} status code with message: ${statusMessage}.`
      );
    });
    next();
  }
}

export const loggerOptions = {
  logger: WinstonModule.createLogger({
    level: config.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    transports: [
      new winston.transports.File({
        filename: config.ERROR_LOG,
        level: 'error',
      }),
      new winston.transports.File({ filename: config.ALL_LOG }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
          )
        ),
      }),
    ],
  }),
};
