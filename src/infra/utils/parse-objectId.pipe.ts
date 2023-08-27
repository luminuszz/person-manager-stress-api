import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'bson';

export class ParseObjectIdPipe implements PipeTransform {
  private validateObjectIdType(value: unknown): value is ObjectId {
    return typeof value === 'string' && ObjectId.isValid(value);
  }

  transform(value: unknown, metadata: ArgumentMetadata): ObjectId {
    const isParam = metadata.type === 'param';

    if (!isParam) return value as ObjectId;

    const isValidObjectId = this.validateObjectIdType(value);

    if (!isValidObjectId) {
      throw new BadRequestException(`invalid id type`);
    }

    return value;
  }
}
