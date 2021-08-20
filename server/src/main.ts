import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { GLOBAL_PREFIX, PORT, SESSION_SECRET } from './config';
import { session } from './common/middleware/session.middleware';
import { RedisService } from './providers/redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      format: format.combine(format.timestamp(), format.ms()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    }),
  });

  const redisService = app.get(RedisService);

  app.disable('x-powered-by');
  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.use(helmet());
  app.use(session(redisService.instance));
  app.use(cookieParser(SESSION_SECRET));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap().catch(console.error);
