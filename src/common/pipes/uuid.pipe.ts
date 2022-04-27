import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  transform(value: string) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const validUUID = regexExp.test(value);
    if (validUUID) return value;
    throw new BadRequestException('Id must be a valid uuid type');
  }
}
