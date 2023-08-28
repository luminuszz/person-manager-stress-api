import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { createPersonPayload } from '@test/user.factory';
import { PersonFakeRepository } from '@test/mocks/person-fake-repository';
import { faker } from '@faker-js/faker';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';

describe('FetchPersons', () => {
  let createPersonUseCase: CreatePersonUseCase;
  let personRepository: PersonFakeRepository;
  let stu: FetchPersonsUseCase;

  beforeEach(() => {
    personRepository = new PersonFakeRepository();
    createPersonUseCase = new CreatePersonUseCase(personRepository);
    stu = new FetchPersonsUseCase(personRepository);
  });

  it('should be able to retrieve all persons', async () => {
    const randomQuantity = faker.number.int({ min: 1, max: 10 });

    for (let i = 0; i < randomQuantity; i++) {
      await createPersonUseCase.execute(createPersonPayload());
    }

    const results = await stu.execute({ query: null });

    expect(results.isRight()).toBeTruthy();

    if (results.isRight()) {
      expect(results.value.persons.length).toBe(randomQuantity);
    }
  });
});
