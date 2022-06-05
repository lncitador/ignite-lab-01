import { UseCase } from '@shared/domain/base/usecase';
import { CreatePurchaseInput } from '../domain/entity/create-purchase-input.interface';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';

export class CreatePurchasesUseCase
  implements UseCase<CreatePurchaseInput, PurchaseEntity>
{
  constructor(private repository: IPurchaseRepository) {}

  public async execute(request: CreatePurchaseInput): Promise<PurchaseEntity> {
    const allProductOwnedByCustomer = await this.repository.findAllByCustomerId(
      request.customerId,
    );

    const customerAlreadyOwnsProduct = allProductOwnedByCustomer.some(
      (purchase) => purchase.productId === request.productId,
    );

    if (customerAlreadyOwnsProduct) {
      throw new Error('Customer already owns the product');
    }

    return this.repository.create({
      ...request,
    });
  }
}
