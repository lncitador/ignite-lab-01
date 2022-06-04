import { CustomerEntity } from '@modules/customers/domain/entity/customer.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class Customer implements CustomerEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
