import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt } from 'passport-jwt';
import { User } from 'src/entities/user/entity/user.entity';
import { FirebaseAuthStrategy } from 'src/services/firebase/firebase.strategy';
import { Repository } from 'typeorm';

@Injectable()
export class UserStrategy extends PassportStrategy(FirebaseAuthStrategy, 'user') {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  override async validate(payload: any) {
    const user = await this.userRepo.findOne({ firebaseId: payload.uid });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
