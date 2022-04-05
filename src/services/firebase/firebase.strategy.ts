import { Strategy } from 'passport-strategy';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthStrategyOptions } from 'src/common/interface/firebase-options.intefrace';
import { FirebaseUser } from 'src/common/interface/firebase-admin.interface';
import * as admin from 'firebase-admin';

export class FirebaseAuthStrategy extends Strategy {
  checkRevoked = false;

  constructor(options: FirebaseAuthStrategyOptions, private extractor: JwtFromRequestFunction) {
    super();
    if (!options.extractor) {
      throw new Error('\n Extractor is not a function. You should provide an extractor.');
    }
    this.extractor = options.extractor;
    this.checkRevoked = options.checkRevoked;
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }

  override async authenticate(req: Request) {
    try {
      const idToken = this.extractor(req);
      if (!idToken) throw new Error('Authentication token not found');
      const data = await admin.auth().verifyIdToken(idToken, this.checkRevoked);
      await this.validateDecodedIdToken(data);
    } catch (error) {
      req.next(new UnauthorizedException(error.message));
    }
  }

  private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
    try {
      const result = await this.validate(decodedIdToken);
      if (result) this.success(result);
    } catch (error) {
      throw error;
    }
  }
}
