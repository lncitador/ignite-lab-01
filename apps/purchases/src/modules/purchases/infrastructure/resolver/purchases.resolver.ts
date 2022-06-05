import { CreatePurchasesUseCase } from '@modules/purchases/usecases/create-purchases.usecase';
import { ListAllPurchasesUseCase } from '@modules/purchases/usecases/list-all-purchases.usecase';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { CurrentUser } from '@shared/infrastructure/common/decorators/current-user.decorator';
import { Auth0Guard } from '@shared/infrastructure/common/guards/auth0.guard';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { Purchase } from '../model/purchases';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly createPurchaseUseCase: CreatePurchasesUseCase,
    private readonly listAllPurchasesUseCase: ListAllPurchasesUseCase,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(Auth0Guard)
  purchases() {
    return this.listAllPurchasesUseCase.execute();
  }

  @Mutation(() => Purchase)
  @UseGuards(Auth0Guard)
  createPurchase(
    @Args('data') data: CreatePurchaseDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.createPurchaseUseCase.execute({
      data,
      user,
    });
  }
}
