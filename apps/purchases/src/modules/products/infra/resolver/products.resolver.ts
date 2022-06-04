import { CreateProductsUseCase } from '@modules/products/usecases/create-products.usecase';
import { ListAllProductsUseCase } from '@modules/products/usecases/list-all-products.usecase';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../model/product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly createProductUseCase: CreateProductsUseCase,
    private readonly listAllProductUseCase: ListAllProductsUseCase,
  ) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductDto) {
    return this.createProductUseCase.execute(data);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.listAllProductUseCase.execute();
  }
}

/**
 * Other resolvers
 * 
 @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
 */
