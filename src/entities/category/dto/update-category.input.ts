import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsString()
  @Field(() => String, { nullable: false })
  id: string;
}
