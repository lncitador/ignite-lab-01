import { randomUUID } from 'node:crypto';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { PurchaseStatus } from '../domain/interfaces/purchases-status.interface';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';
import { PurchasesInmemoryRepository } from '../infrastructure/repository/inmemory/purchases.repository';
import { CreatePurchasesUseCase } from './create-purchases.usecase';

describe('CreatePurchasesUsecase', () => {
  const customerId = randomUUID();
  const productId = randomUUID();

  const mock: PurchaseEntity = {
    id: randomUUID(),
    status: PurchaseStatus.PENDING,
    customerId,
    productId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let purchaseRepository: IPurchaseRepository;
  let sut: CreatePurchasesUseCase;

  beforeEach(() => {
    purchaseRepository = new PurchasesInmemoryRepository([mock]);
    sut = new CreatePurchasesUseCase(purchaseRepository);
  });

  it('should be create new purchase', async () => {
    const purchase = await sut.execute({
      customerId: randomUUID(),
      productId: randomUUID(),
    });

    expect(purchase).toBeTruthy();
  });

  it('should not be possible to create a purchase if the customer already owns the product', () => {
    const purchase = sut.execute({
      customerId,
      productId,
    });

    expect(purchase).rejects.toThrow();
  });
});
