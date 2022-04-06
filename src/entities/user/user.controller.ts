import { BadRequestException, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { FIREBASE_ADMIN_INJECT } from 'src/common/constants';
import { FirebaseAdminSDK } from 'src/common/interface/firebase-sdk.type';
import { initializeApp } from 'firebase/app';
import { getAuth, verifyPasswordResetCode, applyActionCode } from 'firebase/auth';

@Controller('usermgmt')
export class UserController {
  constructor(@Inject(FIREBASE_ADMIN_INJECT) private readonly admin: FirebaseAdminSDK) {}

  @Get('generate-email-verification-link/:email')
  async generateEmailVerificationLink(@Param('email') email: string) {
    return await this.admin.auth().generateEmailVerificationLink(email);
  }

  @Get('generate-password-reset-link/:email')
  async generatePasswordResetLink(@Param('email') email: string) {
    return await this.admin.auth().generatePasswordResetLink(email);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.admin.auth().getUser(id);
  }

  @Get()
  async handler(
    @Query('mode') mode: string,
    @Query('oobCode') actionCode: string,
    @Query('continueUrl') continueUrl: string,
  ) {
    const config = { apiKey: process.env.FIREBASE_API_KEY };
    const app = initializeApp(config);
    const auth = getAuth(app);
    switch (mode) {
      case 'resetPassword':
        return this.handleResetPassword(auth, actionCode, continueUrl);
      case 'verifyEmail':
        await this.handleVerifyEmail(auth, actionCode, continueUrl);
        return 'email verified';
      default:
        throw new BadRequestException('Query Param [mode] must be [resetPassword] or [verifyEmail]');
    }
  }

  async handleResetPassword(auth: any, actionCode: string, continueUrl: string) {
    try {
      console.log(continueUrl);
      return await verifyPasswordResetCode(auth, actionCode);
    } catch (error) {
      throw new BadRequestException('Invalid or expired action code. Try to reset the password again');
    }
  }

  async handleVerifyEmail(auth: any, actionCode: string, continueUrl: string) {
    try {
      console.log(continueUrl);
      await applyActionCode(auth, actionCode);
    } catch (error) {
      throw new BadRequestException('Code is invalid or expired. Verify your email address again');
    }
  }
}
