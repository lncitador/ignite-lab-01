import { CreateProductInput } from '@modules/products/domain/interfaces/create-product-input.interface';
import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Create product input' })
export class CreateProductDto implements CreateProductInput {
  @Field({ description: 'Product title' })
  title: string;
}
