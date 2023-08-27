import { UseCaseImplementation } from '@core/use-case';
import { Either, right } from '@core/either';
import { Person } from '@domain/person/person';
import { Injectable } from '@nestjs/common';
import { PersonRepository } from '@domain/person/contracts/person-repository';

interface UseCaseInput {
  query?: string;
}

type UseCaseOutput = Either<Error, { persons: Person[] }>;

@Injectable()
export class FetchPersonsUseCase implements UseCaseImplementation<UseCaseInput, UseCaseOutput> {
  constructor(private personRepository: PersonRepository) {}

  async execute({ query }: UseCaseInput): Promise<UseCaseOutput> {
    const results = await this.personRepository.findAll(query);

    return right({ persons: results });
  }
}
