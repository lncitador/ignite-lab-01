import { Module } from '@nestjs/common';
import { StudentsModule } from './studends/students.module';

@Module({
  imports: [StudentsModule],
  exports: [IocModule],
})
export class IocModule {}
