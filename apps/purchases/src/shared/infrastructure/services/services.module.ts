import { Module } from '@nestjs/common';
import { BullModule } from './bull/bull.module';
import { GraphQLModule } from './graphql/graphql.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, BullModule, GraphQLModule],
  exports: [LoggerModule, BullModule, GraphQLModule],
})
export class ServicesModule {}
