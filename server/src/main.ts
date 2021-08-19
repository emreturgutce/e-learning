import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: format.combine(format.timestamp(), format.ms()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    }),
    bodyParser: true,
  });

  app.setGlobalPrefix('/api/v1');

  await app.listen(3000);
}

bootstrap().catch(console.error);
