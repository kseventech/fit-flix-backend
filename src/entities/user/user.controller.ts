import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Query, Res } from '@nestjs/common';
import { FIREBASE_ADMIN_INJECT } from 'src/common/constants';
import { FirebaseAdminSDK } from 'src/common/interface/firebase-sdk.type';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  verifyPasswordResetCode,
  applyActionCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Response } from 'express';

@Controller('usermgmt')
export class UserController {
  constructor(@Inject(FIREBASE_ADMIN_INJECT) private readonly admin: FirebaseAdminSDK) {}

  auth = getAuth(initializeApp({ apiKey: process.env.FIREBASE_API_KEY }));

  @Get('generate-email-verification-link/:email')
  async generateEmailVerificationLink(@Param('email') email: string) {
    return await this.admin.auth().generateEmailVerificationLink(email);
  }

  @Get('generate-password-reset-link/:email')
  async generatePasswordResetLink(@Param('email') email: string) {
    return await this.admin.auth().generatePasswordResetLink(email);
  }

  @Get('idToken/:email')
  async getIdToken(@Param('email') email: string) {
    return await signInWithEmailAndPassword(this.auth, email, 'Test1234!');
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
    @Res() res: Response,
  ) {
    if (mode === 'resetPassword') {
      return res.render('reset-password', { actionCode });
    }
    if (mode === 'verifyEmail') {
      console.log('before handle verify email');
      await this.handleVerifyEmail(this.auth, actionCode, continueUrl);
      console.log('after handle verify email');
      return 'email verified';
    }
  }

  @Post()
  async confirmPasswordReset(@Body() body: any) {
    try {
      await confirmPasswordReset(this.auth, body.actionCode, body.newPassword);
      return 'password restarted';
    } catch (error) {
      throw new BadRequestException(
        'Error occurred during confirmation. The code might have expired or the password is too weak.',
      );
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
