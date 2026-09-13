import { Injectable } from "@nestjs/common";
import { Prisma, StockBalance } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

type DbClient = Prisma.TransactionClient | PrismaService;

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findBalance(client: DbClient, productId: string, warehouseId: string, shelfId: string) {
    return client.stockBalance.findUnique({
      where: { productId_warehouseId_shelfId: { productId, warehouseId, shelfId } },
    });
  }

  increment(client: DbClient, productId: string, warehouseId: string, shelfId: string, quantity: number) {
    return client.stockBalance.upsert({
      where: { productId_warehouseId_shelfId: { productId, warehouseId, shelfId } },
      create: { productId, warehouseId, shelfId, quantity },
      update: { quantity: { increment: quantity } },
    });
  }

  decrement(client: DbClient, balance: StockBalance, quantity: number) {
    return client.stockBalance.update({
      where: { id: balance.id },
      data: { quantity: { decrement: quantity } },
    });
  }

  setQuantity(client: DbClient, productId: string, warehouseId: string, shelfId: string, quantity: number) {
    return client.stockBalance.upsert({
      where: { productId_warehouseId_shelfId: { productId, warehouseId, shelfId } },
      create: { productId, warehouseId, shelfId, quantity },
      update: { quantity },
    });
  }
}
