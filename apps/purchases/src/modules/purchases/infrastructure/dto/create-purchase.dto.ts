import { CreatePurchaseInput } from '@modules/purchases/domain/entity/create-purchase-input.interface';
import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreatePurchaseDto implements CreatePurchaseInput {
  @Field()
  @IsUUID('4')
  productId: string;
}
