import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { ProgramDuration } from 'src/common/enums/program-duration.enum';
import { ProgramLevel } from 'src/common/enums/program-level.enum';
import { ProgramSection } from 'src/common/enums/program-section.enum';
import { Base } from 'src/common/objects/base.entity';
import { Category } from 'src/entities/category/entities/category.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { ProgramAttempt } from './program-attempts.entity';
import { ProgramTrainingDay } from './program-training-day.entity';

@ObjectType()
@Entity({ name: 'programs' })
export class Program extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  desc: string;

  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  image_url: string;

  @Column({ type: 'enum', enum: [ProgramLevel.Pocetni], nullable: false })
  @Field(() => String, { nullable: false })
  level: string;

  @Column({
    type: 'enum',
    enum: [ProgramDuration.Day, ProgramDuration.Hour, ProgramDuration.Month, ProgramDuration.Week],
    nullable: false,
  })
  @Field(() => String, { nullable: false })
  duration: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  duration_unit: number;

  @Column({ type: 'enum', enum: [ProgramSection.PT, ProgramSection.VOD], nullable: false })
  @Field(() => String, { nullable: false })
  section: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  intensity_level: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  total_met: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  excercise_type: string;

  @Column({ type: 'enum', enum: [], nullable: false })
  @Field(() => String, { nullable: false })
  gender: string;

  @Column({ type: 'enum', enum: [], nullable: false })
  @Field(() => String, { nullable: false })
  purpose: string;

  // relations

  @Field(() => Category, { nullable: false })
  @ManyToOne(() => Category, (category) => category.programs, { onDelete: 'CASCADE' })
  @JoinTable()
  category: Category;

  @Field(() => [ProgramTrainingDay], { nullable: false })
  @OneToMany(() => ProgramTrainingDay, (programTrainingDay) => programTrainingDay.program, { onDelete: 'CASCADE' })
  program_training_days: ProgramTrainingDay[];

  @Field(() => [ProgramAttempt], { nullable: false })
  @OneToMany(() => ProgramAttempt, (programAttempt) => programAttempt.program, { onDelete: 'CASCADE' })
  program_attempts: ProgramAttempt[];
}
