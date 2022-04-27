import { ObjectType, Field } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Base } from 'src/common/objects/base.entity';
import { Program } from 'src/entities/program/entities/program.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'categories' })
export class Category extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  name: string;

  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  image_url: string;

  // relations
  @Field(() => [Program], { nullable: false })
  @OneToMany(() => Program, (program) => program.category, { onDelete: 'CASCADE' })
  programs: Program[];
}
