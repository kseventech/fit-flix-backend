import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResourceService } from './resource.service';
import { Resource } from './entities/resource.entity';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';

@Resolver(() => Resource)
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Mutation(() => Resource)
  createResource(@Args('createResourceInput') createResourceInput: CreateResourceInput) {
    return this.resourceService.create(createResourceInput);
  }

  @Query(() => [Resource], { name: 'resource' })
  findAll() {
    return this.resourceService.findAll();
  }

  @Query(() => Resource, { name: 'resource' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resourceService.findOne(id);
  }

  @Mutation(() => Resource)
  updateResource(@Args('updateResourceInput') updateResourceInput: UpdateResourceInput) {
    return this.resourceService.update(updateResourceInput.id, updateResourceInput);
  }

  @Mutation(() => Resource)
  removeResource(@Args('id', { type: () => Int }) id: number) {
    return this.resourceService.remove(id);
  }
}
