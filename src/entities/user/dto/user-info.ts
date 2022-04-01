import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInfo {
  @Field(() => String, { nullable: false })
  uid: string;

  @Field(() => String, { nullable: false })
  displayName: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  photoURL: string;

  @Field(() => String, { nullable: false })
  providerId: string;

  @Field(() => String, { nullable: false })
  phoneNumber: string;
}
