import {
  FastifyInstance,
  FastifyLoggerOptions,
  FastifyServerOptions,
} from 'fastify';
import { app } from './app';
import config from './common/config';

const loggerOptions = {
  logger: {
    file: config.ALL_LOG,
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

const logger = (
  _fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
): void => {
  requestLogging();
  responseLogging();
  done();
};

export { loggerOptions, logger };
