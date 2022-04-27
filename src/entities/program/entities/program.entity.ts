import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { ProgramDuration } from 'src/common/enums/program-duration.enum';
import { ProgramLevel } from 'src/common/enums/program-level.enum';
import { ProgramSection } from 'src/common/enums/program-section.enum';
import { Base } from 'src/common/objects/base.entity';
import { Category } from 'src/entities/category/entities/category.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { ProgramAttempt } from './program-attempts.entity';
import { ProgramResource } from './program-resources.entity';

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

  // relations

  @Field(() => Category, { nullable: false })
  @ManyToOne(() => Category, (category) => category.programs, { onDelete: 'CASCADE' })
  @JoinTable()
  category: Category;

  @Field(() => [ProgramResource], { nullable: false })
  @OneToMany(() => ProgramResource, (programResource) => programResource.resource, { onDelete: 'CASCADE' })
  resources: ProgramResource[];

  @Field(() => [ProgramAttempt], { nullable: false })
  @OneToMany(() => ProgramAttempt, (programAttempt) => programAttempt.program, { onDelete: 'CASCADE' })
  programAttempts: ProgramAttempt[];
}
