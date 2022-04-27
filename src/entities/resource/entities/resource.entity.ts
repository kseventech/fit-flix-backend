import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { ResourceMediaType } from 'src/common/enums/resouce-media-type.enum';
import { ResourceProvider } from 'src/common/enums/resource-provider.enum';
import { ResourceType } from 'src/common/enums/resource-type.enum';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ProgramResource } from 'src/entities/program/entities/program-resources.entity';
import { Base } from 'src/common/objects/base.entity';
import { Tag } from 'src/entities/tag/tag.entity';
import { Traning } from 'src/entities/traning/traning.entity';

@Entity({ name: 'resources' })
@ObjectType()
export class Resource extends Base {
  @Column({ type: 'enum', enum: [ResourceMediaType.Video], nullable: false })
  @Field(() => String, { nullable: false })
  media_type: string;

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

  // relations

  @Field(() => [ProgramResource], { nullable: false })
  @OneToMany(() => ProgramResource, (programResource) => programResource.program, { onDelete: 'CASCADE' })
  programs: ProgramResource[];

  @Field(() => [Tag], { nullable: false })
  @ManyToMany(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  tags: Tag[];

  @Field(() => [Traning], { nullable: false })
  @OneToMany(() => Traning, (traning) => traning.resource, { onDelete: 'CASCADE' })
  tranings: Traning[];
}
