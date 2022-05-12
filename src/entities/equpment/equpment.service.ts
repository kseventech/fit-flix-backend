import { Injectable } from '@nestjs/common';
import { CreateEqupmentInput } from './dto/create-equpment.input';
import { UpdateEqupmentInput } from './dto/update-equpment.input';

@Injectable()
export class EqupmentService {
  create(createEqupmentInput: CreateEqupmentInput) {
    console.log(createEqupmentInput);
    return 'This action adds a new equpment';
  }

  findAll() {
    return `This action returns all equpment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equpment`;
  }

  update(id: number, updateEqupmentInput: UpdateEqupmentInput) {
    console.log(updateEqupmentInput);
    return `This action updates a #${id} equpment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equpment`;
  }
}
