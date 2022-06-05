import { PROVIDER } from '@modules/purchases/domain/constants/provider';
import { Provider } from '@nestjs/common';
import { PurchasesInmemoryRepository } from './purchases.repository';

export const purchasesInmemoryFactory = {
  get(): Provider<PurchasesInmemoryRepository> {
    return {
      provide: PROVIDER.PURCHASES_REPOSITORY,
      useFactory: () => {
        return new PurchasesInmemoryRepository();
      },
    };
  },
};
