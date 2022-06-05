import { AuthenticatedUserCustomerUseCase } from '@modules/customers/usecases/authenticated-user-customer.usecase.';
import { purchasesInmemoryFactory } from '@modules/purchases/infrastructure/repository/inmemory/purchases.factory';
import { FindAllPurchasesByCustomerIdUseCase } from '@modules/purchases/usecases/find-all-purchases-by-customer-id.usecase';
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
        AuthenticatedUserCustomerUseCase,
        FindAllPurchasesByCustomerIdUseCase,
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
