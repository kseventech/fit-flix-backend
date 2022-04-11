import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserRecord } from './dto/user-record';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/auth/guards/firebase-auth.guard';
import { User } from './entity/user.entity';
import { UserGuard } from 'src/auth/guards/firebase-user.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserRecord, { name: 'createFirebaseUser' })
  createFirebaseUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.createFirebaseUser(email, password);
  }

  @UseGuards(UserGuard)
  @Query(() => User, { name: 'me' })
  getOne(@Context() context: any) {
    return context.req.user;
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User, { name: 'createUser' })
  create(@Context() context: any) {
    return this.userService.create(context);
  }
}
