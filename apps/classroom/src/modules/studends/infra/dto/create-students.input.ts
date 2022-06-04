import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentsInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
