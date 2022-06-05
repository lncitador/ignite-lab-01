import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/domain/base/usecase';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { PROVIDER } from '../domain/constants/provider';
import { PROVIDER as CUSTOMER } from '@modules/customers/domain/constants/provider';
import { CreatePurchaseInput } from '../domain/entity/create-purchase-input.interface';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';

interface Inputs {
  data: CreatePurchaseInput;
  user: AuthUser;
}

@Injectable()
export class CreatePurchasesUseCase implements UseCase<Inputs, PurchaseEntity> {
  constructor(
    @Inject(PROVIDER.PURCHASES_REPOSITORY)
    private readonly purchasesRepository: IPurchaseRepository,
    @Inject(CUSTOMER.CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  public async execute({ data, user }: Inputs): Promise<PurchaseEntity> {
    let customer = await this.customerRepository.findByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customerRepository.create({
        authUserId: user.sub,
      });
    }

    const allProductOwnedByCustomer =
      await this.purchasesRepository.findAllByCustomerId(customer.id);

    const customerAlreadyOwnsProduct = allProductOwnedByCustomer.some(
      (purchase) => purchase.productId === data.productId,
    );

    if (customerAlreadyOwnsProduct) {
      throw new Error('Customer already owns the product');
    }

    return this.purchasesRepository.create({
      ...data,
      customerId: customer.id,
    });
  }
}
