import { CustomerEntity } from '@modules/customers/domain/entity/customer.entity';
import { Purchase } from '@modules/purchases/infrastructure/model/purchases';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer implements CustomerEntity {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];

  createdAt: Date;

  updatedAt: Date;
}
