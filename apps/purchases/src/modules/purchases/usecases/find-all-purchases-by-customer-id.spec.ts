import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { CustomersInmemoryRepository } from '@modules/customers/infrastructure/repository/inmemory/customer.repository';
import { PurchaseStatus } from '@modules/purchases/domain/interfaces/purchases-status.interface';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { PurchasesInmemoryRepository } from '@modules/purchases/infrastructure/repository/inmemory/purchases.repository';
import { randomUUID } from 'crypto';
import { FindAllPurchasesByCustomerIdUseCase } from './find-all-purchases-by-customer-id.usecase';

describe('FindAllPurchasesByCustomer', () => {
  const customerId = randomUUID();
  const productId = randomUUID();

  let purchaseRepository: IPurchaseRepository;
  let customerRepository: ICustomerRepository;
  let sut: FindAllPurchasesByCustomerIdUseCase;

  beforeEach(async () => {
    purchaseRepository = new PurchasesInmemoryRepository([
      {
        id: randomUUID(),
        status: PurchaseStatus.PENDING,
        customerId,
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    customerRepository = new CustomersInmemoryRepository([
      {
        id: customerId,
        authUserId: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    sut = new FindAllPurchasesByCustomerIdUseCase(
      purchaseRepository,
      customerRepository,
    );
  });

  it('should be able list purchases', async () => {
    const purchases = await sut.execute(customerId);

    expect(purchases.length).toBe(1);
  });
});
