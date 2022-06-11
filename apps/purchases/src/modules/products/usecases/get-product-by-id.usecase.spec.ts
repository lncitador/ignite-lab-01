import { UseCase } from '@shared/domain/base/usecase';
import { randomUUID } from 'crypto';
import { ProductEntity } from '../domain/entity/product.entity';
import { IProductsRepository } from '../domain/repository/product.repository';
import { ProductsInmemoryRepository } from '../infrastructure/repository/inmemory/products.repository';

class GetProductByIdUseCase implements UseCase<string, ProductEntity> {
  constructor(private productRepository: IProductsRepository) {}
  public async execute(productId: string): Promise<ProductEntity> {
    return this.productRepository.findById(productId);
  }
}

describe('GetProductByIdUseCase', () => {
  const mock: ProductEntity = {
    id: randomUUID(),
    title: 'Product 1',
    slug: 'product-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let productRepository: IProductsRepository;
  let sut: GetProductByIdUseCase;

  beforeEach(() => {
    productRepository = new ProductsInmemoryRepository([mock]);
    sut = new GetProductByIdUseCase(productRepository);
  });

  it('should return a product by id', async () => {
    const product = await sut.execute(mock.id);

    expect(product.slug).toBe('product-1');
  });
});
