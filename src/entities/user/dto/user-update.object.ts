import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, Matches } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsNumber()
  @Field(() => Float, { nullable: false })
  height: number;

  @IsNumber()
  @Field(() => Float, { nullable: false })
  weight: number;

  @Matches(/^(Male|Female)$/, { message: 'Invalid gender type, possible types are [Male,Female]' })
  @Field(() => String, { nullable: false })
  gender: string;

  @IsDate()
  @Field(() => String, { nullable: false })
  date_of_birth: string;
}
