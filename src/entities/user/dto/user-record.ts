import { Field, ObjectType } from '@nestjs/graphql';
import { UserInfo } from './user-info';
import { UserMetadata } from './user-metdata';

@ObjectType()
export class UserRecord {
  @Field(() => String, { nullable: false })
  uid: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => Boolean, { nullable: false })
  emailVerified: boolean;

  @Field(() => String, { nullable: true })
  displayName: string;

  @Field(() => String, { nullable: true })
  photoURL: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Boolean, { nullable: false })
  disabled: boolean;

  @Field(() => UserMetadata, { nullable: false })
  metadata: UserMetadata;

  @Field(() => [UserInfo], { nullable: false })
  providerData: UserInfo[];
}
