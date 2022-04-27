import { CreateProgramInput } from './create-program.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateProgramInput extends PartialType(CreateProgramInput) {
  @IsString()
  @Field(() => String, { nullable: false })
  id: string;
}
