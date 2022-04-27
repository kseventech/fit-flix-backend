import { Injectable } from '@nestjs/common';
import { CreateProgramInput } from './dto/create-program.input';
import { UpdateProgramInput } from './dto/update-program.input';

@Injectable()
export class ProgramService {
  create(createProgramInput: CreateProgramInput) {
    console.log(createProgramInput);
    return 'This action adds a new program';
  }

  findAll() {
    return `This action returns all program`;
  }

  findOne(id: string) {
    return `This action returns a #${id} program`;
  }

  update(id: string, updateProgramInput: UpdateProgramInput) {
    console.log(updateProgramInput);
    return `This action updates a #${id} program`;
  }

  remove(id: string) {
    return `This action removes a #${id} program`;
  }
}
