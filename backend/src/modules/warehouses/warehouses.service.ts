import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.warehouse.findMany({
      include: { _count: { select: { shelves: true, balances: true } } },
      orderBy: { name: "asc" },
    });
  }

  async detail(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: {
        shelves: { include: { balances: true }, orderBy: { code: "asc" } },
        balances: { include: { product: true, shelf: true } },
        sourceMoves: { take: 20, orderBy: { createdAt: "desc" }, include: { product: true, user: true } },
      },
    });
    if (!warehouse) throw new NotFoundException("Depo bulunamadı");
    const stock = warehouse.balances.reduce((sum, item) => sum + item.quantity, 0);
    const usedCapacity = warehouse.shelves.reduce((sum, shelf) =>
      sum + shelf.balances.reduce((shelfSum, balance) => shelfSum + balance.quantity, 0), 0);
    return {
      ...warehouse,
      stock,
      occupancyRate: warehouse.capacity ? Math.round((usedCapacity / warehouse.capacity) * 100) : 0,
    };
  }
}
