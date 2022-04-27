import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/services/email/email.module';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
