import { DatabaseConfig } from '@shared/domain/config/database.interface';
import { RedisConfig } from '@shared/domain/config/redis.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth0Config } from '@shared/domain/config/auth0.interface';

@Injectable()
export class EnvironmentConfigService
  implements RedisConfig, DatabaseConfig, Auth0Config
{
  constructor(private configService: ConfigService) {}

  public getAuth0Domain(): string {
    return this.configService.get<string>('AUTH0_DOMAIN');
  }

  public getAuth0Audience(): string {
    return this.configService.get<string>('AUTH0_AUDIENCE');
  }

  public getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  public getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  public getRedisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  public getRedisUrl(): string {
    return this.configService.get<string>('REDIS_URL');
  }

  public getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
