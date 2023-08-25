import { Person } from '@domain/person/person';

export abstract class PersonRepository {
  abstract create(person: Person): Promise<void>;

  abstract findByCpfCnpj(cpfCnpj: string): Promise<Person | undefined>;
}
