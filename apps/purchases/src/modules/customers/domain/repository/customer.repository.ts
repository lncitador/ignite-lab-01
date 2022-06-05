import { Repository } from '@shared/domain/base/repository';
import { CustomerEntity } from '../entity/customer.entity';

export abstract class ICustomerRepository extends Repository<CustomerEntity> {
  public abstract findByAuthUserId(authUserId: string): Promise<CustomerEntity>;
}
