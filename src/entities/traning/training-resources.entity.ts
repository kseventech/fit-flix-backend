import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Resource } from '../resource/entities/resource.entity';
import { TrainingDay } from './traning-day.entity';

@Entity({ name: 'training_days_resources' })
@ObjectType()
export class TrainingDayResources {
  @Field(() => String, { nullable: false })
  @PrimaryColumn({ type: 'uuid', nullable: false })
  training_day_id: string;

  @Field(() => String, { nullable: false })
  @PrimaryColumn({ type: 'uuid', nullable: false })
  resource_id: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  resource_order: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  pause: string;

  // relations

  @Field(() => TrainingDay, { nullable: false })
  @ManyToOne(() => TrainingDay, (trainingDay) => trainingDay.training_days_resources, { onDelete: 'CASCADE' })
  @JoinColumn()
  training_day: TrainingDay;

  @Field(() => Resource, { nullable: false })
  @ManyToOne(() => Resource, (resource) => resource.training_days_resources, { onDelete: 'CASCADE' })
  @JoinColumn()
  resource: Resource;
}
