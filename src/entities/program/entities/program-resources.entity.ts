import { ObjectType, Field } from '@nestjs/graphql';
import { Resource } from 'src/entities/resource/entities/resource.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Program } from './program.entity';

@ObjectType()
@Entity({ name: 'programs_resources' })
export class ProgramResource {
  @Field(() => String)
  @PrimaryColumn({ type: 'uuid', nullable: false })
  program_id: string;

  @Field(() => String)
  @PrimaryColumn({ type: 'uuid', nullable: false })
  resource_id: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String, { nullable: false })
  playlist_order: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // relations

  @Field(() => Program, { nullable: false })
  @ManyToOne(() => Program, (program) => program.resources, { onDelete: 'CASCADE' })
  @JoinTable()
  program: Program;

  @Field(() => Resource, { nullable: false })
  @ManyToOne(() => Resource, (resource) => resource.programs, { onDelete: 'CASCADE' })
  @JoinTable()
  resource: Resource;
}
