import { CustomerEntity } from '@modules/customers/domain/entity/customer.entity';
import { ICustomerRepository } from '@modules/customers/domain/repository/customer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class CustomersPrismaRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByAuthUserId(authUserId: string): Promise<CustomerEntity> {
    return this.prisma.customer.findUnique({
      where: { authUserId },
    });
  }

  public async findById(id: string): Promise<CustomerEntity> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  public async findAll(): Promise<CustomerEntity[]> {
    return this.prisma.customer.findMany();
  }

  public async create(
    entity: Omit<CustomerEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CustomerEntity> {
    return this.prisma.customer.create({
      data: {
        ...entity,
      },
    });
  }

  public async update(
    id: string,
    entity: Partial<CustomerEntity>,
  ): Promise<CustomerEntity> {
    return this.prisma.customer.update({
      where: { id },
      data: {
        ...entity,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
