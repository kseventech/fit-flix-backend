import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMetadata {
  @Field(() => String)
  creationTime: string;

  @Field(() => String)
  lastSignInTime: string;

  @Field(() => String, { nullable: true })
  lastRefreshTime: string;
}
