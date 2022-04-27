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

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  first_name: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  phone_number: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'enum', enum: [AccountStatus.Active, AccountStatus.Blocked], nullable: false })
  status: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'enum', enum: [Role.Admin, Role.User], nullable: false })
  role: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  avatar_url: string;

  @Field(() => Int, { nullable: false })
  @Column({ type: 'integer', nullable: false })
  age: number;

  @Field(() => Float, { nullable: false })
  @Column({ type: 'float', nullable: false })
  height: number;

  @Field(() => Float, { nullable: false })
  @Column({ type: 'float', nullable: false })
  weight: number;

  @Field(() => String, { nullable: false })
  @Column({ type: 'enum', enum: [Gender.Male, Gender.Femaile], nullable: false })
  gender: string;

  @Field(() => Float, { nullable: false })
  @Column({ type: 'float', nullable: false })
  goal_weight: number;

  @Field(() => Boolean, { nullable: false })
  @Column({ type: 'boolean', nullable: false })
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
