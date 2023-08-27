import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonInterceptor } from './infra/utils/common.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonInterceptor,
    },
  ],
})
export class AppModule {}
