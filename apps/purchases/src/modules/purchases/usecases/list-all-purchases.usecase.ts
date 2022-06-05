import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/domain/base/usecase';
import { PROVIDER } from '../domain/constants/provider';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';

@Injectable()
export class ListAllPurchasesUseCase implements UseCase<PurchaseEntity[]> {
  constructor(
    @Inject(PROVIDER.PURCHASES_REPOSITORY)
    private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  public async execute(): Promise<PurchaseEntity[]> {
    return this.purchaseRepository.findAll();
  }
}
