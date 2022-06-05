import { Repository } from '@shared/domain/base/repository';
import { PurchaseEntity } from '../entity/purchase.entity';

export abstract class IPurchaseRepository extends Repository<PurchaseEntity> {
  public abstract findAllByCustomerId(
    customerId: string,
  ): Promise<PurchaseEntity[]>;
}
