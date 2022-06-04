import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EnvironmentConfigService } from '@shared/infrastructure/environment/environment.service';
import { expressjwt as jwt, GetVerificationKey } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private readonly environmentConfig: EnvironmentConfigService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.environmentConfig.getAuth0Domain()}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.environmentConfig.getAuth0Audience(),
        issuer: this.environmentConfig.getAuth0Domain(),
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);

      return true;
    } catch {
      return false;
    }
  }
}
