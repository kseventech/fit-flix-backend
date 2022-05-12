import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EqupmentService } from './equpment.service';
import { Equpment } from './entities/equpment.entity';
import { CreateEqupmentInput } from './dto/create-equpment.input';
import { UpdateEqupmentInput } from './dto/update-equpment.input';

@Resolver(() => Equpment)
export class EqupmentResolver {
  constructor(private readonly equpmentService: EqupmentService) {}

  @Mutation(() => Equpment)
  createEqupment(@Args('createEqupmentInput') createEqupmentInput: CreateEqupmentInput) {
    return this.equpmentService.create(createEqupmentInput);
  }

  @Query(() => [Equpment], { name: 'equpment' })
  findAll() {
    return this.equpmentService.findAll();
  }

  @Query(() => Equpment, { name: 'equpment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.equpmentService.findOne(id);
  }

  @Mutation(() => Equpment)
  updateEqupment(@Args('updateEqupmentInput') updateEqupmentInput: UpdateEqupmentInput) {
    return this.equpmentService.update(updateEqupmentInput.id, updateEqupmentInput);
  }

  @Mutation(() => Equpment)
  removeEqupment(@Args('id', { type: () => Int }) id: number) {
    return this.equpmentService.remove(id);
  }
}
