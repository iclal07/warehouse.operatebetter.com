import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [products, balances, movements, warehouses, receipts, dispatches] = await Promise.all([
      this.prisma.product.findMany({ where: { status: "ACTIVE" }, include: { balances: true } }),
      this.prisma.stockBalance.aggregate({ _sum: { quantity: true } }),
      this.prisma.stockMovement.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          product: true, user: true, sourceWarehouse: true, sourceShelf: true,
          targetWarehouse: true, targetShelf: true,
        },
      }),
      this.prisma.warehouse.findMany({ include: { shelves: { include: { balances: true } } } }),
      this.prisma.stockMovement.aggregate({
        where: { type: "IN", createdAt: { gte: startOfDay } },
        _sum: { quantity: true },
      }),
      this.prisma.stockMovement.aggregate({
        where: { type: "OUT", createdAt: { gte: startOfDay } },
        _sum: { quantity: true },
      }),
    ]);

    const criticalProducts = products
      .map(product => ({
        ...product,
        totalStock: product.balances.reduce((sum, balance) => sum + balance.quantity, 0),
      }))
      .filter(product => product.totalStock <= product.minimumStock);

    return {
      metrics: {
        totalProducts: products.length,
        totalStock: balances._sum.quantity ?? 0,
        criticalStock: criticalProducts.length,
        todayReceived: receipts._sum.quantity ?? 0,
        todayDispatched: dispatches._sum.quantity ?? 0,
      },
      criticalProducts: criticalProducts.slice(0, 6),
      recentMovements: movements,
      warehouseOccupancy: warehouses.map(warehouse => {
        const used = warehouse.shelves.reduce((sum, shelf) =>
          sum + shelf.balances.reduce((shelfSum, balance) => shelfSum + balance.quantity, 0), 0);
        return {
          id: warehouse.id,
          name: warehouse.name,
          capacity: warehouse.capacity,
          used,
          rate: warehouse.capacity ? Math.round((used / warehouse.capacity) * 100) : 0,
        };
      }),
    };
  }
}
