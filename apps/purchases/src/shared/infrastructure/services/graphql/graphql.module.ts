import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import path from 'node:path';

@Module({
  imports: [
    GraphQL.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class GraphQLModule {}
