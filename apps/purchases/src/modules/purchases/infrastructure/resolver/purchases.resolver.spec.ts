import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchasesUseCase } from '@modules/purchases/usecases/create-purchases.usecase';
import { CustomersInmemoryRepository } from '@modules/customers/infrastructure/repository/inmemory/customer.repository';
import { EnvironmentModule } from '@shared/infrastructure/environment/environment.module';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { PROVIDER as CUSTOMER } from '@modules/customers/domain/constants/provider';
import { PROVIDER } from '@modules/purchases/domain/constants/provider';
import { PurchasesInmemoryRepository } from '../repository/inmemory/purchases.repository';
import { PurchasesResolver } from './purchases.resolver';
import { customersInmemoryFactory } from '@modules/customers/infrastructure/repository/inmemory/customer.factory';
import { purchasesInmemoryFactory } from '../repository/inmemory/purchases.factory';

describe('PurchaseResolver', () => {
  let resolver: PurchasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
      providers: [
        PurchasesResolver,
        CreatePurchasesUseCase,
        purchasesInmemoryFactory.get(),
        customersInmemoryFactory.get(),
      ],
    }).compile();

    resolver = module.get<PurchasesResolver>(PurchasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
