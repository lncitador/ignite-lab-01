import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { Customer } from '../model/customer';
import { CurrentUser } from '@shared/infrastructure/common/decorators/current-user.decorator';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { AuthenticatedUserCustomerUseCase } from '@modules/customers/usecases/authenticated-user-customer.usecase.';
import { FindAllPurchasesByCustomerIdUseCase } from '@modules/purchases/usecases/find-all-purchases-by-customer-id.usecase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly authenticatedUserCustomerUseCase: AuthenticatedUserCustomerUseCase,
    private readonly findAllPurchasesByCustomerIdUseCase: FindAllPurchasesByCustomerIdUseCase,
  ) {}

  @UseGuards(Auth0Guard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    console.log(user);
    return this.authenticatedUserCustomerUseCase.execute(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.findAllPurchasesByCustomerIdUseCase.execute(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.authenticatedUserCustomerUseCase.execute(reference.authUserId);
  }
}
