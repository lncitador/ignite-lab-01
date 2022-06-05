import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { CustomersInmemoryRepository } from '@modules/customers/infrastructure/repository/inmemory/customer.repository';
import { PurchaseStatus } from '@modules/purchases/domain/interfaces/purchases-status.interface';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { PurchasesInmemoryRepository } from '@modules/purchases/infrastructure/repository/inmemory/purchases.repository';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { randomUUID } from 'crypto';
import { FindAllAuthenticatedUserPurchasesUseCase } from './find-all-authenticated-user-purchases.usecase';

describe('FindAllPurchasesByCustomer', () => {
  const customerId = randomUUID();
  const productId = randomUUID();

  const user: AuthUser = {
    sub: randomUUID(),
  };

  let purchaseRepository: IPurchaseRepository;
  let customerRepository: ICustomerRepository;
  let sut: FindAllAuthenticatedUserPurchasesUseCase;

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
        authUserId: user.sub,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    sut = new FindAllAuthenticatedUserPurchasesUseCase(
      purchaseRepository,
      customerRepository,
    );
  });

  it('should be able list purchases', async () => {
    const purchases = await sut.execute(user.sub);

    expect(purchases.length).toBe(1);
  });
});
