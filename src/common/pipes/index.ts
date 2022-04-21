import { ValidationPipe } from '@nestjs/common';
import { LimitPipe } from './limit.pipe';
import { PagePipe } from './page.pipe';
import { UUIDValidationPipe } from './uuid.pipe';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});

export const pageValidationPipe = new PagePipe();
export const limitValidationPipe = new LimitPipe();
export const uuidValidationPipe = new UUIDValidationPipe();
