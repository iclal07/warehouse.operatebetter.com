import { Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CurrentUserId } from "../auth/current-user.decorator";

@Controller({ path: "categories", version: "1" })
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}
  @Get() list() { return this.prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: "asc" } }); }
}

@Controller({ path: "search", version: "1" })
export class SearchController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async search(@Query("q") query = "") {
    const q = query.trim();
    if (q.length < 2) return { products: [], warehouses: [], shelves: [] };
    const [products, warehouses, shelves] = await Promise.all([
      this.prisma.product.findMany({
        where: { OR: [
          { name: { contains: q, mode: "insensitive" } },
          { sku: { contains: q, mode: "insensitive" } },
          { barcode: { contains: q, mode: "insensitive" } },
        ] },
        take: 10,
      }),
      this.prisma.warehouse.findMany({
        where: { OR: [
          { name: { contains: q, mode: "insensitive" } },
          { code: { contains: q, mode: "insensitive" } },
        ] },
        take: 10,
      }),
      this.prisma.shelf.findMany({
        where: { code: { contains: q, mode: "insensitive" } },
        include: { warehouse: true },
        take: 10,
      }),
    ]);
    return { products, warehouses, shelves };
  }
}

@Controller({ path: "notifications", version: "1" })
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  @Patch(":id/read")
  markRead(@Param("id") id: string, @CurrentUserId() userId: string) {
    return this.prisma.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
  }

  @Patch("read-all")
  markAllRead(@CurrentUserId() userId: string) {
    return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
  }
}
