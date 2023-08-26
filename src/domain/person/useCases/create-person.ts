import { UseCaseImplementation } from '@core/use-case';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@core/either';
import { Person } from '../person';
import { PersonRepository } from '@domain/person/contracts/person-repository';
import { ResourceAlreadyExists } from '@core/errors/ResourceAlreadyExists';

interface CreateUserInput {
  nome: string;
  cpfCnpj: string;
  nascimento: string;
  seguros: string[] | null;
}

type CreateUserOutput = Either<ResourceAlreadyExists, { person: Person }>;

@Injectable()
export class CreatePersonUseCase implements UseCaseImplementation<CreateUserInput, CreateUserOutput> {
  constructor(private personRepository: PersonRepository) {}

  async execute({ cpfCnpj, seguros, nome, nascimento }: CreateUserInput): Promise<CreateUserOutput> {
    const personExists = await this.personRepository.findByCpfCnpj(cpfCnpj);

    console.log({
      personExists,
    });

    if (personExists) return left(new ResourceAlreadyExists('Person', cpfCnpj));

    const person = Person.create({
      cpfCnpj,
      seguros: seguros ?? null,
      nome,
      nascimento,
    });

    await this.personRepository.create(person);

    return right({ person });
  }
}
