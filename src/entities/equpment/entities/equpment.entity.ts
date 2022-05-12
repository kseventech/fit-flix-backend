import { ObjectType, Field } from '@nestjs/graphql';
import { Base } from 'src/common/objects/base.entity';
import { Resource } from 'src/entities/resource/entities/resource.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'equipments' })
export class Equpment extends Base {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  icon: string;

  // relations

  @Field(() => [Resource], { nullable: false })
  @ManyToMany(() => Resource, (resource) => resource.id, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'equipment_resources' })
  resource: Resource[];
}
