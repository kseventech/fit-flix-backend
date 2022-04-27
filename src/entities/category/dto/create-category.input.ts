import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { Status } from 'src/common/enums/category-status.enum';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsEnum(Status)
  @Field(() => String, { nullable: false })
  status: string;

  @IsString()
  @Field(() => String, { nullable: false })
  image_url: string;
}
