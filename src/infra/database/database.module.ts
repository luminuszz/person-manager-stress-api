import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PersonRepository } from '@domain/person/contracts/person-repository';
import { PrismaPersonRepository } from './prisma-person.repository';

@Module({
  providers: [PrismaService, { provide: PersonRepository, useClass: PrismaPersonRepository }],

  exports: [PrismaService, PersonRepository],
})
export class DatabaseModule {}
