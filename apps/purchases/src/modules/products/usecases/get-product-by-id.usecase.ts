import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/domain/base/usecase';
import { PROVIDER } from '../domain/constants/provider';
import { ProductEntity } from '../domain/entity/product.entity';
import { IProductsRepository } from '../domain/repository/product.repository';

@Injectable()
export class GetProductByIdUseCase implements UseCase<string, ProductEntity> {
  constructor(
    @Inject(PROVIDER.PRODUCTS_REPOSITORY)
    private productRepository: IProductsRepository,
  ) {}
  public async execute(productId: string): Promise<ProductEntity> {
    return this.productRepository.findById(productId);
  }
}
