import { randomUUID } from 'node:crypto';
import { ProductEntity } from '../domain/entity/product.entity';
import { ProductsInmemoryRepository } from '../infra/repository/inmemory/products.repository';
import { CreateProductsUseCase } from './create-products.usecase';

describe('CreateProductsUseCase', () => {
  let productsRepository: ProductsInmemoryRepository;
  let sut: CreateProductsUseCase;

  const mock: ProductEntity = {
    id: randomUUID(),
    title: 'Product 1',
    slug: 'product-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    productsRepository = new ProductsInmemoryRepository([mock]);
    sut = new CreateProductsUseCase(productsRepository);
  });

  it('should be able to create a product', async () => {
    const result = await sut.execute({
      title: 'Product 2',
    });

    const products = await productsRepository.findAll();

    expect(result.slug).toBe('product-2');
    expect(products.length).toBe(2);
  });

  it('should not be able to create a product with slug that already exists', async () => {
    await expect(
      sut.execute({
        title: 'Product 1',
      }),
    ).rejects.toThrow();
  });
});
