import { Module } from '@nestjs/common';
import { StudentsResolver } from './infra/resolvers/students.resolver';

@Module({
  providers: [StudentsResolver],
})
export class StudentsModule {}
