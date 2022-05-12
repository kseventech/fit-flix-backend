import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { ResourceProvider } from 'src/common/enums/resource-provider.enum';
import { ResourceType } from 'src/common/enums/resource-type.enum';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Base } from 'src/common/objects/base.entity';
import { Tag } from 'src/entities/tag/tag.entity';
import { Equpment } from 'src/entities/equpment/entities/equpment.entity';
import { TrainingDayResources } from 'src/entities/traning/training-resources.entity';

@Entity({ name: 'resources' })
@ObjectType()
export class Resource extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  url: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  description: string;

  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'enum', enum: [ResourceProvider.Vimeo], nullable: false })
  @Field(() => String, { nullable: false })
  provider: string;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  duration_in_sec: number;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  thumb_url: string;

  @Column({ type: 'enum', enum: [ResourceType.Full, ResourceType.TR, ResourceType.Vid], nullable: false })
  @Field(() => String, { nullable: false })
  type: string;

  @Column({ type: 'json', nullable: false })
  @Field(() => GraphQLJSONObject, { nullable: false })
  additional_info: any;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  intensity_level: number;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  met: number;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float, { nullable: false })
  reps: number;

  @Column({ type: 'enum', enum: [], nullable: false })
  @Field(() => String, { nullable: false })
  video_type: string;

  @Column({ type: 'enum', enum: [], nullable: false })
  @Field(() => String, { nullable: false })
  exercise_type: string;

  @Column({ type: 'integer', nullable: true })
  @Field(() => Int, { nullable: true })
  rpe: number;

  // relations

  @Field(() => [Equpment], { nullable: false })
  @ManyToMany(() => Equpment, (equpment) => equpment.id, { onDelete: 'CASCADE' })
  equipments: Equpment[];

  @Field(() => [Tag], { nullable: false })
  @ManyToMany(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  tags: Tag[];

  @Field(() => [TrainingDayResources], { nullable: false })
  @OneToMany(() => TrainingDayResources, (trainingDayResources) => trainingDayResources.resource, {
    onDelete: 'CASCADE',
  })
  training_days_resources: TrainingDayResources[];
}
