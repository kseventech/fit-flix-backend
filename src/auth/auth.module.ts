import { Module } from '@nestjs/common';
import { FirebaseStrategy } from './strategy/firebase.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/entity/user.entity';
import { UserStrategy } from './strategy/user.strategy';
import { AdminStrategy } from './strategy/admin.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [FirebaseStrategy, UserStrategy, AdminStrategy],
  exports: [FirebaseStrategy, UserStrategy, AdminStrategy],
})
export class AuthModule {}
