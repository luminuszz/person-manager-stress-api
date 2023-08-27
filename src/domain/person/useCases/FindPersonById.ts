import { UseCaseImplementation } from '@core/use-case';
import { Either, left, right } from '@core/either';
import { Person } from '@domain/person/person';
import { ResourceNotFoundError } from '@core/errors/ResourceNotFound';
import { Injectable } from '@nestjs/common';
import { PersonRepository } from '@domain/person/contracts/person-repository';

interface UseCaseInput {
  id: string;
}

type UseCaseOutput = Either<ResourceNotFoundError, { person: Person }>;

@Injectable()
export class FindPersonByIdUseCase implements UseCaseImplementation<UseCaseInput, UseCaseOutput> {
  constructor(private readonly personRepository: PersonRepository) {}

  async execute({ id }: UseCaseInput): Promise<UseCaseOutput> {
    const results = await this.personRepository.findById(id);

    if (!results) return left(new ResourceNotFoundError('Person not found', id));

    return right({
      person: results,
    });
  }
}
