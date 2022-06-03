import { Global, Module } from '@nestjs/common';

import { InfrastructureModule } from '@shared/infrastructure/infrastructure.module';
import { IocModule } from '@modules/ioc.module';

@Global()
@Module({
  imports: [InfrastructureModule, IocModule],
  exports: [InfrastructureModule, IocModule],
})
export class AppModule {}
