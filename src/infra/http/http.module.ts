import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { DatabaseModule } from '../database/database.module';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';

@Module({
  imports: [DatabaseModule],
  providers: [CreatePersonUseCase],
  controllers: [PersonController],
})
export class HttpModule {}
