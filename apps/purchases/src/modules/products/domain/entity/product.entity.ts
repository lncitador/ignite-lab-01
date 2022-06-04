import { Entity } from '@shared/domain/base/entity';

export class ProductEntity implements Entity {
  id: string;

  title: string;

  slug: string;

  createdAt: Date;

  updatedAt: Date;
}
