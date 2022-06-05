import { UseCase } from '@shared/domain/base/usecase';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';
import { PurchasesInmemoryRepository } from '../infrastructure/repository/inmemory/purchases.repository';

class ListAllPurchasesUseCase implements UseCase<PurchaseEntity[]> {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}
  public async execute(): Promise<PurchaseEntity[]> {
    return this.purchaseRepository.findAll();
  }
}

describe('ListAllPurchasesUseCase', () => {
  let purchaseRepository: IPurchaseRepository;
  let sut: ListAllPurchasesUseCase;

  beforeEach(() => {
    purchaseRepository = new PurchasesInmemoryRepository();
    sut = new ListAllPurchasesUseCase(purchaseRepository);
  });

  it('should be return all purchases', async () => {
    const purchases = await sut.execute();

    expect(purchases).toBeTruthy();
  });
});
