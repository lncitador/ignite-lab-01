import { PurchaseEntity } from '@modules/purchases/domain/entity/purchase.entity';
import { PurchaseStatus } from '@modules/purchases/domain/interfaces/purchases-status.interface';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { InMemoryRepository } from '@shared/infrastructure/persistence/inmemory/inmemory.service';
import { randomUUID } from 'node:crypto';

export class PurchasesInmemoryRepository
  extends InMemoryRepository<PurchaseEntity>
  implements IPurchaseRepository
{
  public async create(
    entity: Omit<PurchaseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PurchaseEntity> {
    const purchase: PurchaseEntity = {
      id: randomUUID(),
      ...entity,
      status: PurchaseStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.data.push(purchase);

    return purchase;
  }

  public async findAllByCustomerId(
    customerId: string,
  ): Promise<PurchaseEntity[]> {
    return this.data.filter((purchase) => purchase.customerId === customerId);
  }
}
