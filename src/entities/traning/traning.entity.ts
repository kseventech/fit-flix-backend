import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Base } from 'src/common/objects/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { EphemeralProgramAttempt } from '../program/entities/ephemeral-program-attempts.entity';
import { ProgramAttempt } from '../program/entities/program-attempts.entity';

@ObjectType()
@Entity({ name: 'trainings' })
export class Training extends Base {
  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date, { nullable: false })
  start_date: Date;

  // relations

  @Field(() => ProgramAttempt, { nullable: false })
  @ManyToOne(() => ProgramAttempt, (program_attempt) => program_attempt.tranings, { onDelete: 'CASCADE' })
  @JoinColumn()
  program_attempt: ProgramAttempt;

  @Field(() => [EphemeralProgramAttempt], { nullable: false })
  @ManyToOne(() => EphemeralProgramAttempt, (ephemeral_program_attempts) => ephemeral_program_attempts.traning, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  ephemeral_program_attempts: EphemeralProgramAttempt[];
}
