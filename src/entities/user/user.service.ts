import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enums/account-role.enum';
import { FirebaseAuthService } from 'src/services/firebase/firebase.service';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { EmailService } from 'src/services/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createFirebaseUser(email: string, password: string) {
    return await this.firebaseAuthService.createUser(email, password);
  }

  async setFirebaseAdmin(uid: string, role: string) {
    await this.firebaseAuthService.setClaims(uid, role);
    return true;
  }

  async create(context: any) {
    const user = this.userRepo.create({
      email: context.req.user.email,
      firebase_id: context.req.user.uid,
      role: Role.User,
    });
    return await this.userRepo.save(user);
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
    return await this.emailService.sendEmail(email, message, issue);
  }
}
