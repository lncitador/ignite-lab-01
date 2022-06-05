import { Test, TestingModule } from '@nestjs/testing';
import { CreatePurchasesUseCase } from '@modules/purchases/usecases/create-purchases.usecase';
import { EnvironmentModule } from '@shared/infrastructure/environment/environment.module';
import { PurchasesResolver } from './purchases.resolver';
import { customersInmemoryFactory } from '@modules/customers/infrastructure/repository/inmemory/customer.factory';
import { purchasesInmemoryFactory } from '../repository/inmemory/purchases.factory';
import { ListAllPurchasesUseCase } from '@modules/purchases/usecases/list-all-purchases.usecase';
import { GetProductByIdUseCase } from '@modules/products/usecases/get-product-by-id.usecase';
import { productsInmemoryFactory } from '@modules/products/infrastructure/repository/inmemory/products.factory';

describe('PurchaseResolver', () => {
  let resolver: PurchasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
      providers: [
        PurchasesResolver,
        CreatePurchasesUseCase,
        ListAllPurchasesUseCase,
        GetProductByIdUseCase,
        purchasesInmemoryFactory.get(),
        customersInmemoryFactory.get(),
        productsInmemoryFactory.get(),
      ],
    }).compile();

    resolver = module.get<PurchasesResolver>(PurchasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
