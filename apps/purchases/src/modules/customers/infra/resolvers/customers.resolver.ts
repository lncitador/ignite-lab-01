import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { Customer } from '../model/customer';

@UseGuards(Auth0Guard)
@Resolver(() => Customer)
export class CustomersResolver {
  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') { exampleField }: CreateCustomerInput,
  ) {
    return { exampleField };
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll() {
    return [];
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return { exampleField: id };
  }

  @Mutation(() => Customer)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return { exampleField: updateCustomerInput.exampleField };
  }

  @Mutation(() => Customer)
  removeCustomer(@Args('id', { type: () => Int }) id: number) {
    return {};
  }
}
