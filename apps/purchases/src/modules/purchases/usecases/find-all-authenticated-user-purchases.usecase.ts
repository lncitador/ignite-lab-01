import { PROVIDER as CUSTOMER } from '@modules/customers/domain/constants/provider';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { PROVIDER } from '@modules/purchases/domain/constants/provider';
import { PurchaseEntity } from '@modules/purchases/domain/entity/purchase.entity';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/domain/base/usecase';

type AuthUserId = string;

@Injectable()
export class FindAllAuthenticatedUserPurchasesUseCase
  implements UseCase<AuthUserId, PurchaseEntity[]>
{
  constructor(
    @Inject(PROVIDER.PURCHASES_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
    @Inject(CUSTOMER.CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  public async execute(authUserId: AuthUserId): Promise<PurchaseEntity[]> {
    const customer = await this.customerRepository.findByAuthUserId(authUserId);

    return this.purchaseRepository.findAllByCustomerId(customer.id);
  }
}
