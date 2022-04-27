import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LimitPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0 || value === 0) throw new BadRequestException('Limit can not be negative or zero');
    if (value > 0) return value;
  }
}
