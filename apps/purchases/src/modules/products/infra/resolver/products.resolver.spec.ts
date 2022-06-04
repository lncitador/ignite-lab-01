import { CreateProductsUseCase } from '@modules/products/usecases/create-products.usecase';
import { ListAllProductsUseCase } from '@modules/products/usecases/list-all-products.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        CreateProductsUseCase,
        ListAllProductsUseCase,
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
