import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AdjustStockDto, DispatchStockDto, ReceiveStockDto, TransferStockDto } from "./dto/inventory-operation.dto";
import { InventoryService } from "./inventory.service";
import { CurrentUserId } from "../auth/current-user.decorator";

@Controller({ path: "stock", version: "1" })
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get()
  list(@Query("warehouseId") warehouseId?: string, @Query("shelfId") shelfId?: string, @Query("productId") productId?: string) {
    return this.inventory.list(warehouseId, shelfId, productId);
  }

  @Post("receive")
  receive(@Body() dto: ReceiveStockDto, @CurrentUserId() userId: string) {
    dto.userId = userId;
    return this.inventory.receiveStock(dto);
  }

  @Post("dispatch")
  dispatch(@Body() dto: DispatchStockDto, @CurrentUserId() userId: string) {
    dto.userId = userId;
    return this.inventory.dispatchStock(dto);
  }

  @Post("transfer")
  transfer(@Body() dto: TransferStockDto, @CurrentUserId() userId: string) {
    dto.userId = userId;
    return this.inventory.transferStock(dto);
  }

  @Post("adjust")
  adjust(@Body() dto: AdjustStockDto, @CurrentUserId() userId: string) {
    dto.userId = userId;
    return this.inventory.adjustStock(dto);
  }
}
