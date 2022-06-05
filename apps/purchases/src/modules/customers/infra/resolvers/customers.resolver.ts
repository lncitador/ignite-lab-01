import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { Customer } from '../model/customer';
import { CurrentUser } from '@shared/infrastructure/common/decorators/current-user.decorator';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';

@UseGuards(Auth0Guard)
@Resolver(() => Customer)
export class CustomersResolver {
  @Query(() => Customer)
  @UseGuards(Auth0Guard)
  me(@CurrentUser() user: AuthUser) {
    return { sub: '' };
  }
}
