import { Entity } from '@shared/domain/base/entity';

export class CustomerEntity implements Entity {
  id: string;
  authUserId: string;
  createdAt: Date;
  updatedAt: Date;
}
