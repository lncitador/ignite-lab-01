import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Students {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
