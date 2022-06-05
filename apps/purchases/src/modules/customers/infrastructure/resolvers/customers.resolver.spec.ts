import { FindAllAuthenticatedUserPurchasesUseCase } from '@modules/customers/usecases/find-all-authenticated-user-purchases.usecase';
import { purchasesInmemoryFactory } from '@modules/purchases/infrastructure/repository/inmemory/purchases.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentModule } from '@shared/infrastructure/environment/environment.module';
import { customersInmemoryFactory } from '../repository/inmemory/customer.factory';
import { CustomersResolver } from './customers.resolver';

describe('CustomersResolver', () => {
  let resolver: CustomersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
      providers: [
        CustomersResolver,
        FindAllAuthenticatedUserPurchasesUseCase,
        purchasesInmemoryFactory.get(),
        customersInmemoryFactory.get(),
      ],
    }).compile();

    resolver = module.get<CustomersResolver>(CustomersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
