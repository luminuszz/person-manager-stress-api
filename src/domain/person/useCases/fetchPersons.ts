import { UseCaseImplementation } from '@core/use-case';
import { Either, right } from '@core/either';
import { Person } from '@domain/person/person';
import { Injectable } from '@nestjs/common';
import { PersonRepository } from '@domain/person/contracts/person-repository';

type UseCaseOutput = Either<Error, { persons: Person[] }>;

@Injectable()
export class FetchPersonsUseCase implements UseCaseImplementation<void, UseCaseOutput> {
  constructor(private personRepository: PersonRepository) {}

  async execute(): Promise<UseCaseOutput> {
    const results = await this.personRepository.findAll();

    return right({ persons: results });
  }
}
