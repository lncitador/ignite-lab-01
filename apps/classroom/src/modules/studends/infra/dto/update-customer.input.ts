import { CreateStudentsInput } from './create-students.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentsInput extends PartialType(CreateStudentsInput) {
  @Field(() => Int)
  id: number;
}
