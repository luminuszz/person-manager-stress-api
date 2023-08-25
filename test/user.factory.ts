import { faker } from '@faker-js/faker';

interface CreatePersonInput {
  nome: string;
  cpfCnpj: string;
  seguros: string[] | null;
  nascimento: string;
}

export const createPersonPayload = (): CreatePersonInput => ({
  nome: faker.person.firstName(),
  nascimento: faker.date.past().toISOString(),
  cpfCnpj: faker.string.nanoid({ min: 11, max: 14 }),
  seguros: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.company.name()),
});
