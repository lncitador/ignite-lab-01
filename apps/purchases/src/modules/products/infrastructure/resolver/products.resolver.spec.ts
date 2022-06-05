import { PROVIDER } from '@modules/products/domain/constants/provider';
import { CreateProductsUseCase } from '@modules/products/usecases/create-products.usecase';
import { ListAllProductsUseCase } from '@modules/products/usecases/list-all-products.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentModule } from '@shared/infrastructure/environment/environment.module';
import { productsInmemoryFactory } from '../repository/inmemory/products.factory';
import { ProductsInmemoryRepository } from '../repository/inmemory/products.repository';
import { ProductsResolver } from './products.resolver';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
      providers: [
        ProductsResolver,
        CreateProductsUseCase,
        ListAllProductsUseCase,
        productsInmemoryFactory.get(),
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
