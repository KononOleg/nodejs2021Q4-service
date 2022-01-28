import {
  FastifyInstance,
  FastifyLoggerOptions,
  FastifyServerOptions,
} from 'fastify';
import fs from 'fs';
import config from '../common/config';

let app;

const loggerOptions = {
  logger: {
    file: config.ALL_LOG,
    level: config.LOG_LEVEL,
    prettyPrint: {
      colorize: false,
      ignore: 'pid,hostname,reqId,responseTime',
      translateTime: 'SYS:standard',
    },
  },
  disableRequestLogging: true,
} as FastifyLoggerOptions;

const requestLogging = (): void => {
  app.addHook('preHandler', (req, _reply, done) => {
    const { method, url, params, body, query } = req;
    req.log.info(
      `Received ${method} request to ${url} with params: ${JSON.stringify(
        params
      )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)} `
    );
    done();
  });
};

const responseLogging = (): void => {
  app.addHook('onResponse', (_res, reply, done) => {
    const { statusCode } = reply;
    reply.log.info(`Request completed with ${statusCode} status code`);
    done();
  });
};
const getDateTime = (): string => new Date().toLocaleString();
const writeError = (errorMessage: string): void =>
  fs.appendFile(config.ERROR_LOG, errorMessage, () => {
    process.exit(9);
  });

const uncaughtExceptionError = (): void => {
  process.on('uncaughtException', (e: Error): void => {
    const errorMessage = `[ ${getDateTime()} ] ERROR:  ${e.message}\n`;
    writeError(errorMessage);
  });
};

const unhandledRejectionError = (): void => {
  process.on('unhandledRejection', (e: Error): void => {
    const errorMessage = `[ ${getDateTime()} ] ERROR:  ${e.message}\n`;
    writeError(errorMessage);
  });
};

const setErrorHandler = (): void => {
  app.setErrorHandler((error, _request, reply) => {
    const errorMessage = `[ ${getDateTime()} ] ${error}\n`;
    writeError(errorMessage);
    reply.status(error.statusCode as number).send(error);
  });
};

const logger = (
  _fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
): void => {
  unhandledRejectionError();
  uncaughtExceptionError();
  setErrorHandler();
  requestLogging();
  responseLogging();
  done();
};

export { loggerOptions, logger };
