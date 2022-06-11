import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UseCase } from '@shared/domain/base/usecase';
import { PROVIDER } from '../domain/constants/provider';
import { CreateProductInput } from '../domain/interfaces/create-product-input.interface';
import { IProductsRepository } from '../domain/repository/product.repository';

@Injectable()
export class CreateProductsUseCase
  implements UseCase<CreateProductInput, Product>
{
  constructor(
    @Inject(PROVIDER.PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}

  public async execute({ title }: CreateProductInput): Promise<Product> {
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\./g, '')
      .replace(/\//g, '-');

    const withSlugAlreadyExists = await this.productsRepository.findBySlug(
      slug,
    );

    if (withSlugAlreadyExists) {
      throw new BadRequestException('Product with this slug already exists');
    }

    return this.productsRepository.create({
      title,
      slug,
    });
  }
}
