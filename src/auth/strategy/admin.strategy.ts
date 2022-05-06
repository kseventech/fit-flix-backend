import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt } from 'passport-jwt';
import { Role } from 'src/common/enums/account-role.enum';
import { User } from 'src/entities/user/entity/user.entity';
import { FirebaseAuthStrategy } from 'src/services/firebase/firebase.strategy';
import { Repository } from 'typeorm';

@Injectable()
export class AdminStrategy extends PassportStrategy(FirebaseAuthStrategy, 'admin') {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  override async validate(payload: any) {
    if (!payload.email_verified) throw new BadRequestException('Email not verified');
    const user = await this.userRepo.findOne({ firebase_id: payload.uid });
    if (user.role !== Role.Admin) throw new ForbiddenException();
    if (!user) throw new NotFoundException('Admin data in db not found');
    return user;
  }
}
