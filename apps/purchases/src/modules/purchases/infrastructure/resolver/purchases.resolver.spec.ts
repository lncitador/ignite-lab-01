import { PROVIDER } from '@modules/purchases/domain/constants/provider';
import { PROVIDER as CUSTOMER } from '@modules/customers/domain/constants/provider';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { CreatePurchasesUseCase } from '@modules/purchases/usecases/create-purchases.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentModule } from '@shared/infrastructure/environment/environment.module';
import { PurchasesInmemoryRepository } from '../repository/inmemory/purchases.repository';
import { PurchasesResolver } from './purchases.resolver';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { CustomersInmemoryRepository } from '@modules/customers/infra/repository/inmemory/customer.repository';

describe('PurchaseResolver', () => {
  let resolver: PurchasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
      providers: [
        PurchasesResolver,
        CreatePurchasesUseCase,
        {
          provide: PROVIDER.PURCHASES_REPOSITORY,
          useFactory: (): IPurchaseRepository =>
            new PurchasesInmemoryRepository(),
        },
        {
          provide: CUSTOMER.CUSTOMERS_REPOSITORY,
          useFactory: (): ICustomerRepository =>
            new CustomersInmemoryRepository(),
        },
      ],
    }).compile();

    resolver = module.get<PurchasesResolver>(PurchasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
