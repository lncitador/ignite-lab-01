import { Product } from '@modules/products/infrastructure/model/product.entity';
import { PurchaseEntity } from '@modules/purchases/domain/entity/purchase.entity';
import { PurchaseStatus } from '@modules/purchases/domain/interfaces/purchases-status.interface';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
export class Purchase implements PurchaseEntity {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status?: PurchaseStatus;

  @Field(() => Product)
  product: Product;

  customerId: string;

  productId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
