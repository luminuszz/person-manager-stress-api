import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { CreatePersonDto, createPersonSchema } from './validators/create-person.schema';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { ZodValidationPipe } from '../utils/zodValidate.pipe';

@Controller('/pessoa')
export class PersonController {
  constructor(private createPerson: CreatePersonUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPersonSchema))
  async createPessoa(@Body() data: CreatePersonDto) {
    const results = await this.createPerson.execute({
      nome: data.nome,
      seguros: data.seguros,
      cpfCnpj: data.cpfCnpj,
      nascimento: data.nascimento,
    });

    if (results.isLeft()) {
      throw results.value;
    }
  }
}
