import { GetProductByIdUseCase } from '@modules/products/usecases/get-product-by-id.usecase';
import { Module, Provider } from '@nestjs/common';
import { PROVIDER } from './domain/constants/provider';
import { PurchasesPrismaRepository } from './infrastructure/repository/prisma/purchases.repository';
import { PurchasesResolver } from './infrastructure/resolver/purchases.resolver';
import { CreatePurchasesUseCase } from './usecases/create-purchases.usecase';
import { ListAllPurchasesUseCase } from './usecases/list-all-purchases.usecase';

const PROVIDERS: Provider[] = [
  {
    provide: PROVIDER.PURCHASES_REPOSITORY,
    useClass: PurchasesPrismaRepository,
  },
];

@Module({
  providers: [
    ...PROVIDERS,
    PurchasesResolver,
    CreatePurchasesUseCase,
    ListAllPurchasesUseCase,
    GetProductByIdUseCase,
  ],
  exports: [...PROVIDERS],
})
export class PurchasesModule {}
