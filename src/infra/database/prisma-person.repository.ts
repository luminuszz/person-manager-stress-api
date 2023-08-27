import { PersonRepository } from '@domain/person/contracts/person-repository';
import { Injectable } from '@nestjs/common';
import { Person } from '@domain/person/person';
import { PrismaService } from './prisma.service';
import { Person as PrismaPerson, Seguro } from '@prisma/client';

import { UniqueEntityID } from '@core/entities/unique-entity-id';

interface Target extends PrismaPerson {
  seguros: Seguro[];
}

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  private prismaPersonToDomainPerson = (prismaPerson: Target): Person =>
    Person.create(
      {
        nome: prismaPerson.nome,
        nascimento: prismaPerson.nascimento,
        seguros: prismaPerson.seguros.map((seguro) => seguro.name),
        cpfCnpj: prismaPerson.cpfCnpj,
      },
      new UniqueEntityID(prismaPerson.id),
    );

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

  async findAll(query?: string): Promise<Person[]> {
    if (!query) {
      const results = await this.prisma.person.findMany({
        take: 50,
        include: {
          seguros: true,
        },
      });

      return results.map((result) => this.prismaPersonToDomainPerson(result));
    }

    const results = await this.prisma.person.findMany({
      where: {
        OR: [
          {
            nome: {
              contains: query,
            },
          },

          {
            seguros: {
              some: {
                name: {
                  contains: query,
                },
              },
            },
          },
        ],
      },

      include: {
        seguros: true,
      },
      take: 50,
    });

    return results.map((result) => this.prismaPersonToDomainPerson(result));
  }

  async findById(id: string): Promise<Person | undefined> {
    const results = await this.prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        seguros: true,
      },
    });

    return results ? this.prismaPersonToDomainPerson(results) : undefined;
  }
}
