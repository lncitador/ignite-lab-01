import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { Customer } from '../model/customer';
import { CurrentUser } from '@shared/infrastructure/common/decorators/current-user.decorator';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { FindAllAuthenticatedUserPurchasesUseCase } from '@modules/customers/usecases/find-all-authenticated-user-purchases.usecase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly findAllAuthenticatedUserPurchasesUsecase: FindAllAuthenticatedUserPurchasesUseCase,
  ) {}
  @UseGuards(Auth0Guard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    console.log(user);
    return { sub: '' };
  }
}
