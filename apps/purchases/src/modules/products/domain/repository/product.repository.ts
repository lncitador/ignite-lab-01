import { Repository } from '@shared/domain/base/repository';
import { ProductEntity } from '../entity/product.entity';

export abstract class IProductsRepository extends Repository<ProductEntity> {}
