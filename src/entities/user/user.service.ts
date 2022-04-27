import { Injectable, NotFoundException } from '@nestjs/common';
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

  async setFirebaseAdmin(uid: string, role: string) {
    await this.firebaseAuthService.setClaims(uid, role);
    return true;
  }

  async create(context: any) {
    console.log(context);
    // const user = this.userRepo.create({ email: context.req.user.email, firebaseId: context.req.user.uid });
    // return await this.userRepo.save(user);
  }

  async getUsers(page: number, limit: number) {
    const [results, count] = await this.userRepo.findAndCount({
      skip: page,
      take: limit,
    });
    return {
      results,
      count,
    };
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne({ id });
    if (!user) throw new NotFoundException();
    await Promise.all([this.userRepo.delete(id), this.firebaseAuthService.removeUser(user.firebase_id)]);
    return true;
  }

  async support(email: string, message: string, issue: string) {
    console.log(email);
    console.log(message);
    console.log(issue);
  }
}
