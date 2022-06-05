import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [CustomersModule, ProductsModule, PurchasesModule],
  exports: [CustomersModule, ProductsModule, PurchasesModule],
})
export class IocModule {}
