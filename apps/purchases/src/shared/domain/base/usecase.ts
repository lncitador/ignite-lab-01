/**
 * @description This class represents a usecases structures.
 * @class UseCase
 * @template TRequest - The request type.
 * @template TResponse - The response type.
 * @example
 * ```typescript
 * import { UseCase } from '@shared/domain/base/usecase';
 *
 * class MyUseCase extends UseCase<MyRequest, MyResponse> {
 *  async execute(request: MyRequest): Promise<MyResponse> {
 *   // ...
 * }
 * ```
 */
export abstract class UseCase<TRequest = never, TResponse = TRequest> {
  public abstract execute(
    request: TRequest,
    ...args: any[]
  ): Promise<TResponse>;
}
