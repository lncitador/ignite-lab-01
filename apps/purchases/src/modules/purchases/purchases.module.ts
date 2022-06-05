import { Module, Provider } from '@nestjs/common';
import { PROVIDER } from './domain/constants/provider';
import { PurchasesPrismaRepository } from './infrastructure/repository/prisma/purchases.repository';
import { PurchasesResolver } from './infrastructure/resolver/purchases.resolver';
import { CreatePurchasesUseCase } from './usecases/create-purchases.usecase';

const PROVIDERS: Provider[] = [
  {
    provide: PROVIDER.PURCHASES_REPOSITORY,
    useClass: PurchasesPrismaRepository,
  },
];

@Module({
  providers: [...PROVIDERS, PurchasesResolver, CreatePurchasesUseCase],
  exports: [...PROVIDERS],
})
export class PurchasesModule {}
