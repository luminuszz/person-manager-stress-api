import { PersonRepository } from '@domain/person/contracts/person-repository';
import { Person } from '@domain/person/person';

export class PersonFakeRepository implements PersonRepository {
  public persons = new Map<string, Person>();

  async create(person: Person): Promise<void> {
    this.persons.set(person.id.toString(), person);
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Person | undefined> {
    for (const [, person] of this.persons) {
      if (person.cpfCnpj === cpfCnpj) return person;
    }
  }
}
