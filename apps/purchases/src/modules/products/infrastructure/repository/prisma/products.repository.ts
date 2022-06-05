import { ProductEntity } from '@modules/products/domain/entity/product.entity';
import { IProductsRepository } from '@modules/products/domain/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class ProductsPrismaRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public findBySlug(slug: string): Promise<ProductEntity> {
    return this.prisma.product.findUnique({ where: { slug } });
  }

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
    return this.prisma.product.update({
      where: { id },
      data: entity,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
