import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';

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
