import { ProductEntity } from '@modules/products/domain/entity/product.entity';
import { IProductsRepository } from '@modules/products/domain/repository/product.repository';
import { InMemoryRepository } from '@shared/infrastructure/persistence/inmemory/inmemory.service';

export class ProductsInmemoryRepository
  extends InMemoryRepository<ProductEntity>
  implements IProductsRepository
{
  public async findBySlug(slug: string): Promise<ProductEntity> {
    return this.data.find((product) => product.slug === slug);
  }
}
