import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Students } from '../entities/students.entity';
import { CreateStudentsInput } from '../dto/create-students.input';
import { UpdateStudentsInput } from '../dto/update-customer.input';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';

@UseGuards(Auth0Guard)
@Resolver(() => Students)
export class StudentsResolver {
  @Mutation(() => Students)
  createCustomer(
    @Args('createCustomerInput') { exampleField }: CreateStudentsInput,
  ) {
    return { exampleField };
  }

  @Query(() => [Students], { name: 'customers' })
  findAll() {
    return [];
  }

  @Query(() => Students, { name: 'customer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return { exampleField: id };
  }

  @Mutation(() => Students)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateStudentsInput,
  ) {
    return { exampleField: updateCustomerInput.exampleField };
  }

  @Mutation(() => Students)
  removeCustomer(@Args('id', { type: () => Int }) id: number) {
    return {};
  }
}
