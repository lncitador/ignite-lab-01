import { Entity } from '@shared/domain/base/entity';

export class CustomerEntity implements Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
