import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';
import { User } from '../entity/user.entity';

@ObjectType()
export class UsersFindAndCount {
  @IsArray()
  @Field(() => [User], { nullable: true })
  results: User[];

  @IsNumber()
  @Field(() => Int, { nullable: true })
  count: number;
}
