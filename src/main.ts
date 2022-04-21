import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { limitValidationPipe, pageValidationPipe, uuidValidationPipe, validationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT || 3000);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(validationPipe, uuidValidationPipe, pageValidationPipe, limitValidationPipe);
  app.enableCors();
}
bootstrap();
