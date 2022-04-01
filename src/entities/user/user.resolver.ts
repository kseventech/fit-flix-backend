import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserRecord } from './dto/user-record';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserRecord, { name: 'createFirebaseUser' })
  createFirebaseUser(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.createFirebaseUser(email, password);
  }
}
