import { Module } from '@nestjs/common';
// import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    //CustomersModule,
    ProductsModule,
  ],
  exports: [IocModule],
})
export class IocModule {}
