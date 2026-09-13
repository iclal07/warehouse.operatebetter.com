import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { ProductQueryDto } from "./dto/product-query.dto";

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPage(query: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {
      categoryId: query.categoryId,
      balances: query.warehouseId ? { some: { warehouseId: query.warehouseId } } : undefined,
      OR: query.search ? [
        { name: { contains: query.search, mode: "insensitive" } },
        { sku: { contains: query.search, mode: "insensitive" } },
        { barcode: { contains: query.search, mode: "insensitive" } },
      ] : undefined,
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { category: true, balances: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { items, total };
  }

  findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        balances: { include: { warehouse: true, shelf: true } },
        movements: { take: 20, orderBy: { createdAt: "desc" }, include: { user: true } },
      },
    });
  }

  create(data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data, include: { category: true } });
  }
}
