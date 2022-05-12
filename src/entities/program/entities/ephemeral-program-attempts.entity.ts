import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/common/enums/category-status.enum';
import { Base } from 'src/common/objects/base.entity';
import { Training } from 'src/entities/traning/traning.entity';
import { User } from 'src/entities/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'ephemeral_program_attempts' })
export class EphemeralProgramAttempt extends Base {
  @Column({ type: 'enum', enum: [Status.Active, Status.Inactive], nullable: false })
  @Field(() => String, { nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date, { nullable: false })
  start_date: Date;

  // relations

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.ephemeral_program_attempts, { onDelete: 'CASCADE' })
  @JoinColumn()
  account_id: User;

  @Field(() => Training, { nullable: false })
  @OneToMany(() => Training, (traning) => traning.ephemeral_program_attempts, { onDelete: 'CASCADE' })
  traning: Training;
}
