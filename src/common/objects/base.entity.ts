import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Base extends BaseEntity {
  @Field(() => String, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
