import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { DatabaseModule } from '../database/database.module';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';

@Module({
  imports: [DatabaseModule],
  providers: [CreatePersonUseCase, FetchPersonsUseCase],
  controllers: [PersonController],
})
export class HttpModule {}
