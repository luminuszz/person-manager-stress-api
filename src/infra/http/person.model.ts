import { Person } from '@domain/person/person';
import { z } from 'zod';

const personHttpSchema = z.object({
  nome: z.string(),
  nascimento: z.string(),
  seguros: z.array(z.string()),
  cpfCnpj: z.string(),
});

export class PersonModel {
  nome: string;
  nascimento: string;
  seguros: string[];
  cpfCnpj: string;

  static parseToHttp(data: Person | Person[]) {
    if (Array.isArray(data)) {
      return z.array(personHttpSchema).parse(data);
    }

    return personHttpSchema.parse(data);
  }
}
