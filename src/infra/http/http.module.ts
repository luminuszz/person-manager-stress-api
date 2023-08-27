import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { DatabaseModule } from '../database/database.module';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';
import { FindPersonByIdUseCase } from '@domain/person/useCases/FindPersonById';

@Module({
  imports: [DatabaseModule],
  providers: [CreatePersonUseCase, FetchPersonsUseCase, FindPersonByIdUseCase],
  controllers: [PersonController],
})
export class HttpModule {}
