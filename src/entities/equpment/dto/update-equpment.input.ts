import { CreateEqupmentInput } from './create-equpment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEqupmentInput extends PartialType(CreateEqupmentInput) {
  @Field(() => Int)
  id: number;
}
