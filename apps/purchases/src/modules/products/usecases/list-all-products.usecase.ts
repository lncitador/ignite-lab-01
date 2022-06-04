import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UseCase } from '@shared/domain/base/usecase';
import { PROVIDER } from '../domain/constants/provider';
import { IProductsRepository } from '../domain/repository/product.repository';

@Injectable()
export class ListAllProductsUseCase implements UseCase<Product[]> {
  constructor(
    @Inject(PROVIDER.PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}

  public execute(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
