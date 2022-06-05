import { ProductEntity } from '@modules/products/domain/entity/product.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product implements ProductEntity {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
