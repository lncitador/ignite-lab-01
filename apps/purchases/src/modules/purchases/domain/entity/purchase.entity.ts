import { PurchaseStatus } from '@modules/purchases/domain/interfaces/purchases-status.interface';
import { Entity } from '@shared/domain/base/entity';

export class PurchaseEntity implements Entity {
  id: string;
  status?: PurchaseStatus;
  customerId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}
