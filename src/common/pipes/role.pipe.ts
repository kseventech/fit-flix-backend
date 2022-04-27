import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Role } from '../enums/account-role.enum';

@Injectable()
export class RolePipe implements PipeTransform {
  transform(value: string) {
    if (value !== Role.Admin && value !== Role.SuperAdmin && value !== Role.User) {
      throw new BadRequestException('Invalid role');
    }
    return value;
  }
}
