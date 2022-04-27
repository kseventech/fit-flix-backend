import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PagePipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) throw new BadRequestException('Page can not be negative');
    if (value > 0) {
      return value - 1;
    }
    if (value === 0) return value;
  }
}
