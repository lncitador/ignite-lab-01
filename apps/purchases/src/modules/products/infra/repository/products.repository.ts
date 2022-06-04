import { ProductEntity } from '@modules/products/domain/entity/product.entity';
import { IProductsRepository } from '@modules/products/domain/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class ProductsPrismaRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<ProductEntity> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  public findAll(): Promise<ProductEntity[]> {
    return this.prisma.product.findMany();
  }

  public create(entity: ProductEntity): Promise<ProductEntity> {
    return this.prisma.product.create({ data: entity });
  }

  public update(id: string, entity: ProductEntity): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }
}
