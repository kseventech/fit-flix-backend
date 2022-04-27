import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Traning } from 'src/entities/traning/traning.entity';
import { User } from 'src/entities/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'ephemeral_program_attempts' })
export class EphemeralProgramAttempt {
  @Field(() => String, { nullable: false })
  @PrimaryColumn({ type: 'uuid', nullable: false })
  account_id: string;

  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date, { nullable: false })
  start_date: Date;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // relations

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.ephemeralProgramAttempts, { onDelete: 'CASCADE' })
  account: User;

  @Field(() => [Traning], { nullable: false })
  @OneToMany(() => Traning, (traning) => traning.ephemeralProgramAttempt, { onDelete: 'CASCADE' })
  tranings: Traning[];
}
