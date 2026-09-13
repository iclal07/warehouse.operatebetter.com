import { Controller, Get, Query } from "@nestjs/common";
import { MovementType } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

@Controller({ path: "stock-movements", version: "1" })
export class StockMovementsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(
    @Query("productId") productId?: string,
    @Query("warehouseId") warehouseId?: string,
    @Query("type") type?: MovementType,
  ) {
    return this.prisma.stockMovement.findMany({
      where: {
        productId,
        type,
        OR: warehouseId ? [{ sourceWarehouseId: warehouseId }, { targetWarehouseId: warehouseId }] : undefined,
      },
      include: {
        product: true, user: true, sourceWarehouse: true, sourceShelf: true,
        targetWarehouse: true, targetShelf: true,
      },
      take: 100,
      orderBy: { createdAt: "desc" },
    });
  }
}
