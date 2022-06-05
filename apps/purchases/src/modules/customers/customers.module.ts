import { FindAllAuthenticatedUserPurchasesUseCase } from '@modules/purchases/usecases/find-all-authenticated-user-purchases.usecase';
import { Module, Provider } from '@nestjs/common';
import { PROVIDER } from './domain/constants/provider';
import { CustomersPrismaRepository } from './infrastructure/repository/prisma/customer.repository';
import { CustomersResolver } from './infrastructure/resolvers/customers.resolver';

const PROVIDERS: Provider[] = [
  {
    provide: PROVIDER.CUSTOMERS_REPOSITORY,
    useClass: CustomersPrismaRepository,
  },
];
@Module({
  providers: [
    ...PROVIDERS,
    CustomersResolver,
    FindAllAuthenticatedUserPurchasesUseCase,
  ],
  exports: [...PROVIDERS],
})
export class CustomersModule {}
