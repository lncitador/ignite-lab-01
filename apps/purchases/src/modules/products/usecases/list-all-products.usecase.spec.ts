import { randomUUID } from 'node:crypto';
import { ProductEntity } from '../domain/entity/product.entity';
import { ProductsInmemoryRepository } from '../infrastructure/repository/inmemory/products.repository';
import { ListAllProductsUseCase } from './list-all-products.usecase';

/**
 * todo: [ ] Should be able list all products
 */
describe('ListAllProductsUseCase', () => {
  let productsRepository: ProductsInmemoryRepository;
  let sut: ListAllProductsUseCase;

  const mock: ProductEntity = {
    id: randomUUID(),
    title: 'Product 1',
    slug: 'product-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    productsRepository = new ProductsInmemoryRepository([mock]);
    sut = new ListAllProductsUseCase(productsRepository);
  });

  it('should be able to list all products', async () => {
    const result = await sut.execute();

    expect(result.length).toBe(1);
  });
});
