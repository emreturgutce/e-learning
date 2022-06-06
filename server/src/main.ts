import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { FRONTEND_URL, PORT, SESSION_SECRET } from './config';
import { session } from './common/middleware/session.middleware';
import { RedisService } from './providers/redis/redis.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_VERSION, GLOBAL_PREFIX } from './config/contants';
import logger from './config/logger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  const redisService = app.get(RedisService);

  // Config
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors({
    origin: FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('E-Learning')
    .setDescription('E-learning rest api documentation.')
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, document);

  // Middlewares
  app.use(helmet());
  app.use(session(redisService.instance));
  app.use(cookieParser(SESSION_SECRET));
  // app.use(csurf());

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: () => {
        return new BadRequestException('Validation error');
      },
    }),
  );

  await app.listen(PORT);
}

bootstrap().catch(console.error);
