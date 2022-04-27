import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProgramService } from './program.service';
import { Program } from './entities/program.entity';
import { CreateProgramInput } from './dto/create-program.input';
import { UpdateProgramInput } from './dto/update-program.input';

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Mutation(() => Program)
  createProgram(
    @Args({ name: 'createProgramInput', nullable: false, type: () => CreateProgramInput })
    createProgramInput: CreateProgramInput,
  ) {
    return this.programService.create(createProgramInput);
  }

  @Query(() => [Program], { name: 'programs' })
  findAll() {
    return this.programService.findAll();
  }

  @Query(() => Program, { name: 'program' })
  findOne(@Args({ name: 'id', nullable: false, type: () => String }) id: string) {
    return this.programService.findOne(id);
  }

  @Mutation(() => Program)
  updateProgram(
    @Args({ name: 'updateProgramInput', nullable: false, type: () => UpdateProgramInput })
    updateProgramInput: UpdateProgramInput,
  ) {
    return this.programService.update(updateProgramInput.id, updateProgramInput);
  }

  @Mutation(() => Program)
  removeProgram(@Args({ name: 'id', nullable: false, type: () => String }) id: string) {
    return this.programService.remove(id);
  }
}
