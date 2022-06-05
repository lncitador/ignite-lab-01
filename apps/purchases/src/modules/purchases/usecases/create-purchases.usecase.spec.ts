import { CustomerEntity } from '@modules/customers/domain/entity/customer.entity';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { CustomersInmemoryRepository } from '@modules/customers/infrastructure/repository/inmemory/customer.repository';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { randomUUID } from 'node:crypto';
import { PurchaseEntity } from '../domain/entity/purchase.entity';
import { PurchaseStatus } from '../domain/interfaces/purchases-status.interface';
import { IPurchaseRepository } from '../domain/repository/purchases.repository';
import { PurchasesInmemoryRepository } from '../infrastructure/repository/inmemory/purchases.repository';
import { CreatePurchasesUseCase } from './create-purchases.usecase';

describe('CreatePurchasesUsecase', () => {
  const productId = randomUUID();

  const user: AuthUser = {
    sub: randomUUID(),
  };

  const purchasesMock: PurchaseEntity = {
    id: randomUUID(),
    status: PurchaseStatus.PENDING,
    customerId: user.sub,
    productId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const customersMock: CustomerEntity = {
    id: user.sub,
    authUserId: user.sub,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let purchaseRepository: IPurchaseRepository;
  let customerRepository: ICustomerRepository;
  let sut: CreatePurchasesUseCase;

  beforeEach(() => {
    purchaseRepository = new PurchasesInmemoryRepository([purchasesMock]);
    customerRepository = new CustomersInmemoryRepository([customersMock]);
    sut = new CreatePurchasesUseCase(purchaseRepository, customerRepository);
  });

  it('should be create new purchase', async () => {
    const data = {
      customerId: randomUUID(),
      productId: randomUUID(),
    };

    const purchase = await sut.execute({
      data,
      user: {
        sub: randomUUID(),
      },
    });

    expect(purchase).toBeTruthy();
  });

  it('should not be possible to create a purchase if the customer already owns the product', () => {
    const data = {
      productId,
    };

    const purchase = sut.execute({
      data,
      user,
    });

    expect(purchase).rejects.toThrow();
  });

  // it should create a client if the sub of the authenticated user does not yet exist
  it('should create a client if the sub of the authenticated user does not yet exist', async () => {
    const data = {
      productId: randomUUID(),
    };

    await sut.execute({
      data,
      user: {
        sub: randomUUID(),
      },
    });

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
  });

  it('this should not create a client if the sub of the authenticated user already exists', async () => {
    const data = {
      productId: randomUUID(),
    };

    await sut.execute({
      data,
      user,
    });

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(1);
  });
});
