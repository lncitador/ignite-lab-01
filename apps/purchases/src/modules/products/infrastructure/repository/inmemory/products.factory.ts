import { PROVIDER } from '@modules/products/domain/constants/provider';
import { Provider } from '@nestjs/common';
import { ProductsInmemoryRepository } from './products.repository';

export const productsInmemoryFactory = {
  get(): Provider<ProductsInmemoryRepository> {
    return {
      provide: PROVIDER.PRODUCTS_REPOSITORY,
      useFactory: () => {
        return new ProductsInmemoryRepository();
      },
    };
  },
};
