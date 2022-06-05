import { PurchaseEntity } from '@modules/purchases/domain/entity/purchase.entity';
import { IPurchaseRepository } from '@modules/purchases/domain/repository/purchases.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class PurchasesPrismaRepository implements IPurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}
  public async findAllByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
    }) as Promise<PurchaseEntity[]>;
  }

  public async findById(id: string) {
    return this.prisma.purchase.findUnique({
      where: { id },
    }) as Promise<PurchaseEntity>;
  }

  public async findAll() {
    return this.prisma.purchase.findMany() as Promise<PurchaseEntity[]>;
  }

  public async create(
    entity: Omit<PurchaseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.prisma.purchase.create({
      data: {
        ...entity,
      },
    }) as Promise<PurchaseEntity>;
  }

  public async update(id: string, entity: Partial<PurchaseEntity>) {
    return this.prisma.purchase.update({
      where: { id },
      data: {
        ...entity,
      },
    }) as Promise<PurchaseEntity>;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.purchase.delete({
      where: { id },
    });
  }
}
