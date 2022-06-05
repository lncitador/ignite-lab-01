import { Injectable } from '@nestjs/common';
import { Entity } from '@shared/domain/base/entity';
import { Repository } from '@shared/domain/base/repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class InMemoryRepository<
  TEntity extends Entity,
> extends Repository<TEntity> {
  protected readonly data: TEntity[];

  constructor(private readonly mock?: TEntity[]) {
    super();
    this.data = this.mock || [];
  }

  public async findById(id: string): Promise<TEntity> {
    return this.data.find((item) => item.id === id);
  }

  public async findAll(): Promise<TEntity[]> {
    return this.data;
  }

  public async create(
    entity: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TEntity> {
    const data = {
      id: this.generateId(),
      ...entity,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TEntity;

    this.data.push(data);

    return data;
  }

  public async update(id: string, entity: Partial<TEntity>): Promise<TEntity> {
    const index = this.getIndexById(id);

    if (index === -1) {
      return undefined;
    }

    const data = {
      ...this.data[index],
      ...entity,
      updatedAt: new Date(),
    } as TEntity;

    this.data[index] = data;

    return data;
  }

  public async delete(id: string): Promise<void> {
    const index = this.getIndexById(id);

    if (index === -1) {
      return undefined;
    }

    this.data.splice(index, 1);
  }

  private getIndexById(id: string): number {
    const index = this.data.findIndex((item) => item.id === id);
    return index;
  }

  private generateId(): string {
    return randomUUID();
  }
}
