import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from 'src/services/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  async createFirebaseUser(email: string, password: string) {
    return await this.firebaseAuthService.createUser(email, password);
  }
}
