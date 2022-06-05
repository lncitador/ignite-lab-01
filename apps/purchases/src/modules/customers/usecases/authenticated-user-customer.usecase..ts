import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/domain/base/usecase';
import { PROVIDER } from '../domain/constants/provider';
import { CustomerEntity } from '../domain/entity/customer.entity';
import { ICustomerRepository } from '../domain/repository/customer.repository';

type AuthUserId = string;

@Injectable()
export class AuthenticatedUserCustomerUseCase
  implements UseCase<AuthUserId, CustomerEntity>
{
  constructor(
    @Inject(PROVIDER.CUSTOMERS_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  public async execute(authUserId: AuthUserId): Promise<CustomerEntity> {
    return this.customerRepository.findByAuthUserId(authUserId);
  }
}
