import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { PersonFakeRepository } from '@test/mocks/person-fake-repository';
import { FindPersonByIdUseCase } from '@domain/person/useCases/FindPersonById';
import { createPersonPayload } from '@test/user.factory';
import { ResourceNotFoundError } from '@core/errors/ResourceNotFound';

describe('FindPersonById', () => {
  let createPersonUseCase: CreatePersonUseCase;
  let personRepository: PersonFakeRepository;
  let stu: FindPersonByIdUseCase;

  beforeEach(() => {
    personRepository = new PersonFakeRepository();
    createPersonUseCase = new CreatePersonUseCase(personRepository);
    stu = new FindPersonByIdUseCase(personRepository);
  });

  it('should be to find a person by id', async () => {
    const useCaseResults = await createPersonUseCase.execute(createPersonPayload());

    if (useCaseResults.isLeft()) throw useCaseResults.value;

    const response = await stu.execute({ id: useCaseResults.value.person.id });

    expect(response.isRight()).toBeTruthy();

    if (response.isRight()) {
      expect(response.value.person.id).toEqual(useCaseResults.value.person.id);
    }
  });

  it('should not be to find a person by id if resource not exists', async () => {
    const useCaseResults = await createPersonUseCase.execute(createPersonPayload());

    if (useCaseResults.isLeft()) throw useCaseResults.value;

    const response = await stu.execute({ id: 'FAKE_ID' });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
