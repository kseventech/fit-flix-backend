import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateUserByUserInput {
  @IsNumber()
  @Field(() => Float, { nullable: false })
  height: number;

  @IsNumber()
  @Field(() => Float, { nullable: false })
  weight: number;

  @IsString()
  @Field(() => String, { nullable: false })
  gender: string;

  @IsDate()
  @Field(() => String, { nullable: false })
  date_of_birth: string;
}
