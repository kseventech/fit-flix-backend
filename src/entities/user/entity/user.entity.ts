import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/common/enums/account-role.enum';
import { AccountStatus } from 'src/common/enums/account-status.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Base } from 'src/common/objects/base.entity';
import { EphemeralProgramAttempt } from 'src/entities/program/entities/ephemeral-program-attempts.entity';
import { ProgramAttempt } from 'src/entities/program/entities/program-attempts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'accounts' })
export class User extends Base {
  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  firebase_id: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  first_name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'enum', enum: [AccountStatus.Active, AccountStatus.Blocked], nullable: true })
  status: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'enum', enum: [Role.Admin, Role.User], nullable: false })
  role: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatar_url: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  age: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  height: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  weight: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'enum', enum: [Gender.Male, Gender.Femaile], nullable: true })
  gender: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  goal_weight: number;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  has_rated_app: boolean;

  // relations
  @Field(() => [ProgramAttempt], { nullable: false })
  @OneToMany(() => ProgramAttempt, (programAttempt) => programAttempt.account_id, { onDelete: 'CASCADE' })
  programAttempts: ProgramAttempt[];

  @Field(() => [EphemeralProgramAttempt], { nullable: false })
  @OneToMany(() => EphemeralProgramAttempt, (EphemeralProgramAttempt) => EphemeralProgramAttempt.account_id, {
    onDelete: 'CASCADE',
  })
  ephemeralProgramAttempts: EphemeralProgramAttempt[];
}
