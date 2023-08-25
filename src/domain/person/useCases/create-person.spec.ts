import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { createPersonPayload } from '@test/user.factory';
import { PersonFakeRepository } from '@test/mocks/person-fake-repository';
import { ResourceAlreadyExists } from '@core/errors/ResourceAlreadyExists';

describe('Create Person', () => {
  let stu: CreatePersonUseCase;
  let personRepository: PersonFakeRepository;

  beforeEach(() => {
    personRepository = new PersonFakeRepository();
    stu = new CreatePersonUseCase(personRepository);
  });

  it('should be able to create a Person', async () => {
    const payload = createPersonPayload();

    const results = await stu.execute(payload);

    expect(results.isRight()).toBeTruthy();

    if (results.isRight()) {
      expect(results.value.person.nome).toBe(payload.nome);
    }
  });

  it('not should be able to create a person with same cpf/cnpj', async () => {
    const payload = createPersonPayload();

    await stu.execute(payload);

    const results = await stu.execute(payload);

    expect(results.isLeft()).toBeTruthy();

    expect(results.value).toBeInstanceOf(ResourceAlreadyExists);
  });
});
