import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class LimitPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data !== 'limit') return value;
    if (value < 0 || value === 0) throw new BadRequestException('Limit can not be negative or zero');
    if (value > 0) return value;
  }
}
