import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Base } from 'src/common/objects/base.entity';
import { Traning } from 'src/entities/traning/traning.entity';
import { User } from 'src/entities/user/entity/user.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Program } from './program.entity';

@ObjectType()
@Entity({ name: 'program_attempts' })
export class ProgramAttempt extends Base {
  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date, { nullable: false })
  start_date: Date;

  // relations

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.programAttempts, { onDelete: 'CASCADE' })
  @JoinTable()
  account_id: User;

  @Field(() => Program, { nullable: false })
  @ManyToOne(() => Program, (program) => program.programAttempts, { onDelete: 'CASCADE' })
  @JoinTable()
  program: Program;

  @Field(() => [Traning], { nullable: false })
  @OneToMany(() => Traning, (traning) => traning.programAttempt, { onDelete: 'CASCADE' })
  tranings: Traning[];
}
