import { CreateProductsUseCase } from '@modules/products/usecases/create-products.usecase';
import { ListAllProductsUseCase } from '@modules/products/usecases/list-all-products.usecase';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../model/product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly createProductUseCase: CreateProductsUseCase,
    private readonly listAllProductUseCase: ListAllProductsUseCase,
  ) {}

  @Mutation(() => Product)
  @UseGuards(Auth0Guard)
  createProduct(@Args('data') data: CreateProductDto) {
    return this.createProductUseCase.execute(data);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.listAllProductUseCase.execute();
  }
}
