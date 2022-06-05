import { PROVIDER } from '@modules/customers/domain/constants/provider';
import { Provider } from '@nestjs/common';
import { CustomersInmemoryRepository } from './customer.repository';

export const customersInmemoryFactory = {
  get(): Provider<CustomersInmemoryRepository> {
    return {
      provide: PROVIDER.CUSTOMERS_REPOSITORY,
      useFactory: () => {
        return new CustomersInmemoryRepository();
      },
    };
  },
};
