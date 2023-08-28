import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { DatabaseModule } from '../database/database.module';
import { CreatePersonUseCase } from '@domain/person/useCases/create-person';
import { FetchPersonsUseCase } from '@domain/person/useCases/fetchPersons';
import { FindPersonByIdUseCase } from '@domain/person/useCases/FindPersonById';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        store: redisStore as any,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CreatePersonUseCase, FetchPersonsUseCase, FindPersonByIdUseCase],
  controllers: [PersonController],
})
export class HttpModule {}
