import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FIREBASE_ADMIN_INJECT } from 'src/common/constants';
import { FirebaseAdminSDK } from 'src/common/interface/firebase-sdk.type';

@Injectable()
export class FirebaseAuthService {
  constructor(@Inject(FIREBASE_ADMIN_INJECT) private readonly admin: FirebaseAdminSDK) {}

  async getUser(id: string) {
    try {
      return await this.admin.auth().getUser(id);
    } catch (error) {
      throw new NotFoundException(`Firebase user with id [${id}] not found`);
    }
  }

  async createUser(email: string, password: string) {
    try {
      const user = await this.admin.auth().createUser({ email, password, emailVerified: false });
      return user;
    } catch (error) {
      throw new BadRequestException(`Firebase user allready exists`);
    }
  }

  async setClaims(uid: string, isAdmin: boolean) {
    try {
      await this.admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
