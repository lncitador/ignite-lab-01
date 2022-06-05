import { UseCase } from '@shared/domain/base/usecase';
import { AuthUser } from '@shared/domain/interfaces/auth-user.interface';
import { randomUUID } from 'crypto';
import { CustomerEntity } from '../domain/entity/customer.entity';
import { ICustomerRepository } from '../domain/repository/customer.repository';
import { CustomersInmemoryRepository } from '../infrastructure/repository/inmemory/customer.repository';

type AuthUserId = string;

class AuthenticatedUserCustomerUseCase
  implements UseCase<AuthUserId, CustomerEntity>
{
  constructor(private readonly customerRepository: ICustomerRepository) {}
  public execute(authUserId: AuthUserId): Promise<CustomerEntity> {
    return this.customerRepository.findByAuthUserId(authUserId);
  }
}
describe('AuthenticatedUserCustomer', () => {
  const user: AuthUser = {
    sub: randomUUID(),
  };

  let customerRepository: ICustomerRepository;
  let sut: AuthenticatedUserCustomerUseCase;

  beforeEach(() => {
    customerRepository = new CustomersInmemoryRepository([
      {
        id: randomUUID(),
        authUserId: user.sub,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    sut = new AuthenticatedUserCustomerUseCase(customerRepository);
  });

  it('should return a customer of the authenticated user', async () => {
    const customer = await sut.execute(user.sub);

    expect(customer).toBeTruthy();
  });
});
