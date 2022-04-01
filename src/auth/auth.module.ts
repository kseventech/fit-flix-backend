import { Module } from '@nestjs/common';
import { FirebaseStrategy } from './strategy/firebase.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [FirebaseStrategy],
  exports: [FirebaseStrategy],
})
export class AuthModule {}
