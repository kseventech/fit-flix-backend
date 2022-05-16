import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enums/account-role.enum';
import { FirebaseAuthService } from 'src/services/firebase/firebase.service';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { EmailService } from 'src/services/email/email.service';
import { customAlphabet } from 'nanoid';
import { UpdateProfileInput } from './dto/user-update.object';

@Injectable()
export class UserService {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private emailService: EmailService,
  ) {}

  private possbileChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  private nanoLength = 8;

  async createFirebaseUser(email: string, password: string) {
    return await this.firebaseAuthService.createUser(email, password, false);
  }

  async setRole(id: string, role: string) {
    const user = await this.userRepo.findOne({ id });
    if (!user) throw new NotFoundException();
    await this.firebaseAuthService.setClaims(user.firebase_id, role);
    user.role = role;
    await this.userRepo.update(id, user);
    return await this.userRepo.findOne({ id });
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
    const found = await this.userRepo.findOne({ id });
    if (!found) throw new NotFoundException('User not found');
    await Promise.all([this.userRepo.delete(id), this.firebaseAuthService.removeUser(found.firebase_id)]);
    return true;
  }

  async support(email: string, message: string, issue: string) {
    return await this.emailService.sendEmail(email, message, issue);
  }

  async createUserByAdmin(email: string, first_name: string, last_name: string, phone_number: string, role: string) {
    const randomPassword = customAlphabet(this.possbileChars, this.nanoLength)();
    const firebaseUser = await this.firebaseAuthService.createUser(email, randomPassword, true);
    const user = this.userRepo.create({
      email,
      firebase_id: firebaseUser.uid,
      role,
      first_name,
      last_name,
      phone_number,
    });
    await this.firebaseAuthService.sendResetPasswordEmail(email);
    return await this.userRepo.save(user);
  }

  async updateUserByUser(user: User, updateUserByUserInput: UpdateProfileInput) {
    await this.userRepo.update(
      { id: user.id },
      {
        date_of_birth: updateUserByUserInput.date_of_birth,
        gender: updateUserByUserInput.gender,
        height: updateUserByUserInput.height,
        weight: updateUserByUserInput.weight,
      },
    );
    return await this.userRepo.findOne({ id: user.id });
  }
}
