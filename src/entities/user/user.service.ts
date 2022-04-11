import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseAuthService } from 'src/services/firebase/firebase.service';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createFirebaseUser(email: string, password: string) {
    return await this.firebaseAuthService.createUser(email, password);
  }

  async create(context: any) {
    const user = this.userRepo.create({ email: context.req.user.email, firebaseId: context.req.user.uid });
    return await this.userRepo.save(user);
  }
}
