import { Body, Controller, Get, Post } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import {
  CountDocumentDto, DispatchDocumentDto, ReceiptDocumentDto, TransferDocumentDto,
} from "../inventory/dto/inventory-operation.dto";
import { InventoryService } from "../inventory/inventory.service";
import { CurrentUserId } from "../auth/current-user.decorator";

@Controller({ path: "receipts", version: "1" })
export class ReceiptsController {
  constructor(private readonly inventory: InventoryService, private readonly prisma: PrismaService) {}
  @Get() list() { return this.prisma.goodsReceipt.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
  @Post() create(@Body() dto: ReceiptDocumentDto, @CurrentUserId() userId: string) { dto.userId = userId; return this.inventory.completeReceipt(dto); }
}

@Controller({ path: "dispatches", version: "1" })
export class DispatchesController {
  constructor(private readonly inventory: InventoryService, private readonly prisma: PrismaService) {}
  @Get() list() { return this.prisma.goodsDispatch.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
  @Post() create(@Body() dto: DispatchDocumentDto, @CurrentUserId() userId: string) { dto.userId = userId; return this.inventory.completeDispatch(dto); }
}

@Controller({ path: "transfers", version: "1" })
export class TransfersController {
  constructor(private readonly inventory: InventoryService, private readonly prisma: PrismaService) {}
  @Get() list() { return this.prisma.stockTransfer.findMany({ include: { items: { include: { product: true } }, sourceWarehouse: true, targetWarehouse: true }, orderBy: { createdAt: "desc" } }); }
  @Post() create(@Body() dto: TransferDocumentDto, @CurrentUserId() userId: string) { dto.userId = userId; return this.inventory.completeTransfer(dto); }
}

@Controller({ path: "stock-counts", version: "1" })
export class StockCountsController {
  constructor(private readonly inventory: InventoryService, private readonly prisma: PrismaService) {}
  @Get() list() { return this.prisma.stockCount.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
  @Post() create(@Body() dto: CountDocumentDto, @CurrentUserId() userId: string) { dto.userId = userId; return this.inventory.completeCount(dto); }
}
