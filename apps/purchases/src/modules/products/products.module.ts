import { Module, Provider } from '@nestjs/common';
import { PROVIDER } from './domain/constants/provider';
import { ProductsPrismaRepository } from './infra/repository/prisma/products.repository';
import { ProductsResolver } from './infra/resolver/products.resolver';
import { CreateProductsUseCase } from './usecases/create-products.usecase';
import { ListAllProductsUseCase } from './usecases/list-all-products.usecase';

const PROVIDERS: Provider[] = [
  {
    provide: PROVIDER.PRODUCTS_REPOSITORY,
    useClass: ProductsPrismaRepository,
  },
];

@Module({
  providers: [
    ...PROVIDERS,
    ProductsResolver,
    CreateProductsUseCase,
    ListAllProductsUseCase,
  ],
  exports: [...PROVIDERS],
})
export class ProductsModule {}
