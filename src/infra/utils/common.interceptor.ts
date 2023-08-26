import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ResourceAlreadyExists } from '@core/errors/ResourceAlreadyExists';
import { ResourceNotFoundError } from '@core/errors/ResourceNotFound';

@Injectable()
export class CommonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ResourceAlreadyExists) {
          throw new BadRequestException(error.message);
        }

        if (error instanceof ResourceNotFoundError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
