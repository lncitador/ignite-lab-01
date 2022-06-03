import { Module } from '@nestjs/common';
import { CustomersResolver } from './infra/resolvers/customers.resolver';

@Module({
  providers: [CustomersResolver],
})
export class CustomersModule {}
