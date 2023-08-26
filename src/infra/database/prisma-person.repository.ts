import { PersonRepository } from '@domain/person/contracts/person-repository';
import { Injectable } from '@nestjs/common';
import { Person } from '@domain/person/person';
import { PrismaService } from './prisma.service';
import { Person as PrismaPerson, Seguro } from '@prisma/client';

interface Target extends PrismaPerson {
  seguros: Seguro[];
}

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  private prismaPersonToDomainPerson = (prismaPerson: Target): Person =>
    Person.create({
      nome: prismaPerson.nome,
      nascimento: prismaPerson.nascimento,
      seguros: prismaPerson.seguros.map((seguro) => seguro.name),
      cpfCnpj: prismaPerson.cpfCnpj,
    });

  async create(person: Person): Promise<void> {
    await this.prisma.person.create({
      data: {
        nome: person.nome,
        id: person.id,
        cpfCnpj: person.cpfCnpj,
        nascimento: person.nascimento,
        seguros: {
          createMany: {
            data: person.seguros.map((name) => ({ name })),
          },
        },
      },
    });
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Person | undefined> {
    const results = await this.prisma.person.findUnique({
      where: {
        cpfCnpj,
      },
      include: {
        seguros: true,
      },
    });

    return results ? this.prismaPersonToDomainPerson(results) : undefined;
  }
}
