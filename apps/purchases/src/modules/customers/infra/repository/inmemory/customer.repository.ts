import { CustomerEntity } from '@modules/customers/domain/entity/customer.entity';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { InMemoryRepository } from '@shared/infrastructure/persistence/inmemory/inmemory.service';

export class CustomersInmemoryRepository
  extends InMemoryRepository<CustomerEntity>
  implements ICustomerRepository
{
  public async findByAuthUserId(authUserId: string): Promise<CustomerEntity> {
    return this.data.find((customer) => customer.authUserId === authUserId);
  }
}
