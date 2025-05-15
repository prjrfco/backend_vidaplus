import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {envs} from "./common/env-values";
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: /.*/ });
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(envs.APP_PORT, () => {
    logger.log(`Server running on port: ${envs.APP_PORT} ...`);
  });
}
bootstrap().then(() => null);
