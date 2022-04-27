import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Base } from 'src/common/objects/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { EphemeralProgramAttempt } from '../program/entities/ephemeral-program-attempts.entity';
import { ProgramAttempt } from '../program/entities/program-attempts.entity';
import { Resource } from '../resource/entities/resource.entity';

@ObjectType()
@Entity({ name: 'tranings' })
export class Traning extends Base {
  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date, { nullable: false })
  start_date: Date;

  // relations

  @Field(() => Resource, { nullable: false })
  @ManyToOne(() => Resource, (resource) => resource.tranings, { onDelete: 'CASCADE' })
  @JoinColumn()
  resource: Resource;

  @Field(() => ProgramAttempt, { nullable: false })
  @ManyToOne(() => ProgramAttempt, (programAttempt) => programAttempt.tranings, { onDelete: 'CASCADE' })
  @JoinColumn()
  programAttempt: ProgramAttempt;

  @Field(() => EphemeralProgramAttempt, { nullable: false })
  @ManyToOne(() => EphemeralProgramAttempt, (ephemeralProgramAttempt) => ephemeralProgramAttempt.tranings, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  ephemeralProgramAttempt: EphemeralProgramAttempt;
}
