import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/common/objects/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User extends Base {
  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  firebaseId: string;
}
