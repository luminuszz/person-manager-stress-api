import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { CreatePersonDto, createPersonSchema } from './validators/create-person.schema';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { ZodValidationPipe } from '../utils/zodValidate.pipe';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';
import { PersonModel } from './person.model';

@Controller('/pessoa')
export class PersonController {
  constructor(private createPerson: CreatePersonUseCase, private fetchPersons: FetchPersonsUseCase) {}

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

  @Get()
  async getAllPessoas() {
    const results = await this.fetchPersons.execute();

    if (results.isLeft()) {
      throw results.value;
    }

    return PersonModel.parseToHttp(results.value.persons);
  }
}
