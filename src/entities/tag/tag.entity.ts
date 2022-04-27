import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/common/objects/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Resource } from '../resource/entities/resource.entity';

@ObjectType()
@Entity({ name: 'tags' })
export class Tag extends Base {
  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  // relations
  @Field(() => [Resource], { nullable: false })
  @ManyToMany(() => Resource, (resource) => resource.id, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'tags_resources' })
  resources: Resource[];
}
