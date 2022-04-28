import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserRecord } from './dto/user-record';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/auth/guards/firebase-auth.guard';
import { User } from './entity/user.entity';
import { UsersFindAndCount } from './dto/user-find-and-count.dto';
import { limitValidationPipe, pageValidationPipe, roleValidationPipe, uuidValidationPipe } from 'src/common/pipes';
import { AdminGuard } from 'src/auth/guards/firebase-adminr.guard';
import { UserGuard } from 'src/auth/guards/firebase-user.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserRecord, { name: 'createFirebaseUser' })
  createFirebaseUser(
    @Args({ name: 'email', nullable: false, type: () => String }) email: string,
    @Args({ name: 'password', nullable: false, type: () => String }) password: string,
  ) {
    return this.userService.createFirebaseUser(email, password);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => User, { name: 'setRole' })
  setRole(
    @Args({ name: 'id', nullable: false, type: () => String }, uuidValidationPipe) id: string,
    @Args({ name: 'role', nullable: false, type: () => String }, roleValidationPipe) role: string,
  ) {
    return this.userService.setRole(id, role);
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

  @UseGuards(AdminGuard)
  @Query(() => UsersFindAndCount, { name: 'getUsers' })
  getUsers(
    @Args({ name: 'page', nullable: false, type: () => Number }, pageValidationPipe) page: number,
    @Args({ name: 'limit', nullable: false, type: () => Number }, limitValidationPipe) limit: number,
  ) {
    return this.userService.getUsers(page, limit);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Boolean, { name: 'removeUser' })
  remove(@Args({ name: 'id', nullable: false, type: () => String }, uuidValidationPipe) id: string) {
    return this.userService.remove(id);
  }

  // @UseGuards(UserGuard)
  @Query(() => Boolean, { name: 'supportTicket' })
  support(
    @Args({ name: 'userEmail', nullable: false, type: () => String }) email: string,
    @Args({ name: 'message', nullable: false, type: () => String }) message: string,
    @Args({ name: 'issue', nullable: false, type: () => String }) issue: string,
  ) {
    return this.userService.support(email, message, issue);
  }
}
