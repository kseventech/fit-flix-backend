import { ObjectType, Field } from '@nestjs/graphql';
import { TrainingDay } from 'src/entities/traning/traning-day.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Program } from './program.entity';

@ObjectType()
@Entity({ name: 'program_training_days' })
export class ProgramTrainingDay {
  @Field(() => String)
  @PrimaryColumn({ type: 'uuid', nullable: false })
  program_id: string;

  @Field(() => String)
  @PrimaryColumn({ type: 'uuid', nullable: false })
  training_day_id: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  training_day_order: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // relations

  @Field(() => Program, { nullable: false })
  @ManyToOne(() => Program, (program) => program.program_training_days, { onDelete: 'CASCADE' })
  @JoinTable()
  program: Program;

  @Field(() => TrainingDay, { nullable: false })
  @ManyToOne(() => TrainingDay, (trainingDay) => trainingDay.program_training_day, { onDelete: 'CASCADE' })
  @JoinTable()
  training_day: TrainingDay;
}
