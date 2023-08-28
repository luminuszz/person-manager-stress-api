import { Body, Controller, Get, Param, Post, Query, UseInterceptors, UsePipes } from '@nestjs/common';

import { CreatePersonDto, createPersonSchema } from './validators/create-person.schema';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { ZodValidationPipe } from '../utils/zodValidate.pipe';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';
import { PersonModel } from './person.model';
import { FindPersonByIdUseCase } from '@domain/person/useCases/FindPersonById';
import { ParseObjectIdPipe } from '../utils/parse-objectId.pipe';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/pessoa')
@UseInterceptors(CacheInterceptor)
export class PersonController {
  constructor(
    private createPerson: CreatePersonUseCase,
    private fetchPersons: FetchPersonsUseCase,
    private findPersonById: FindPersonByIdUseCase,
  ) {}

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
  async getAllPessoas(@Query('t') query: string) {
    console.log('query', query);

    const results = await this.fetchPersons.execute({ query });

    if (results.isLeft()) {
      throw results.value;
    }

    return PersonModel.parseToHttp(results.value.persons);
  }

  @Get('/:id')
  async getPessoaById(@Param('id', ParseObjectIdPipe) id: string) {
    const results = await this.findPersonById.execute({ id });

    if (results.isLeft()) {
      throw results.value;
    }

    return PersonModel.parseToHttp(results.value.person);
  }
}
