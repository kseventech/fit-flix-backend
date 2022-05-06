import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FIREBASE_ADMIN_INJECT } from 'src/common/constants';
import { FirebaseAdminSDK } from 'src/common/interface/firebase-sdk.type';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Injectable()
export class FirebaseAuthService {
  constructor(@Inject(FIREBASE_ADMIN_INJECT) private readonly admin: FirebaseAdminSDK) {}

  auth = getAuth(initializeApp({ apiKey: process.env.FIREBASE_API_KEY }));

  async getUser(id: string) {
    try {
      return await this.admin.auth().getUser(id);
    } catch (error) {
      throw new NotFoundException(`Firebase user with id [${id}] not found`);
    }
  }

  async createUser(email: string, password: string, emailVerified: boolean) {
    try {
      const user = await this.admin.auth().createUser({ email, password, emailVerified });
      return user;
    } catch (error) {
      throw new BadRequestException(`Firebase user allready exists`);
    }
  }

  async setClaims(uid: string, role: string) {
    try {
      await this.admin.auth().setCustomUserClaims(uid, { role });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeUser(uid: string) {
    try {
      return await this.admin.auth().deleteUser(uid);
    } catch (error) {
      throw new NotFoundException(`Firebase user with id [${uid}] not found`);
    }
  }

  async sendResetPasswordEmail(email: string) {
    await sendPasswordResetEmail(this.auth, email);
  }
}
