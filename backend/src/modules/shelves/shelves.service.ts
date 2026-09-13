import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ShelvesService {
  constructor(private readonly prisma: PrismaService) {}

  list(warehouseId?: string) {
    return this.prisma.shelf.findMany({
      where: { warehouseId },
      include: { warehouse: true, balances: { include: { product: true } } },
      orderBy: [{ zone: "asc" }, { code: "asc" }],
    });
  }

  async detail(id: string) {
    const shelf = await this.prisma.shelf.findUnique({
      where: { id },
      include: {
        warehouse: true,
        balances: { include: { product: true } },
        sourceMoves: { take: 20, orderBy: { createdAt: "desc" }, include: { product: true } },
      },
    });
    if (!shelf) throw new NotFoundException("Raf bulunamadı");
    const used = shelf.balances.reduce((sum, item) => sum + item.quantity, 0);
    return { ...shelf, used, occupancyRate: Math.round((used / shelf.capacity) * 100) };
  }
}
