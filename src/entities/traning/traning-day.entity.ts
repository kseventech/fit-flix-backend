import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ResourceMediaType } from 'src/common/enums/resouce-media-type.enum';
import { Base } from 'src/common/objects/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProgramTrainingDay } from '../program/entities/program-training-day.entity';
import { TrainingDayResources } from './training-resources.entity';

@Entity({ name: 'training_days' })
@ObjectType()
export class TrainingDay extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  title: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  intensity_level: number;

  @Column({ type: 'enum', enum: [ResourceMediaType.Video], nullable: false })
  @Field(() => String, { nullable: false })
  video_type: string;

  @Column({ type: 'enum', enum: [ResourceMediaType.Video], nullable: false })
  @Field(() => String, { nullable: false })
  excercise_type: string;

  // relations

  @Field(() => [TrainingDayResources], { nullable: false })
  @OneToMany(() => TrainingDayResources, (trainingDayResources) => trainingDayResources.training_day, {
    onDelete: 'CASCADE',
  })
  training_days_resources: TrainingDayResources[];

  @Field(() => [ProgramTrainingDay], { nullable: false })
  @OneToMany(() => ProgramTrainingDay, (programTrainingDay) => programTrainingDay.training_day, { onDelete: 'CASCADE' })
  program_training_day: ProgramTrainingDay[];
}
