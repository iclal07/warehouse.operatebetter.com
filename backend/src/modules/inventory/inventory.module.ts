import { Module } from "@nestjs/common";
import { InventoryController } from "./inventory.controller";
import { InventoryGateway } from "./inventory.gateway";
import { InventoryRepository } from "./inventory.repository";
import { InventoryService } from "./inventory.service";
import { StockMovementsController } from "./stock-movements.controller";

@Module({
  controllers: [InventoryController, StockMovementsController],
  providers: [InventoryService, InventoryRepository, InventoryGateway],
  exports: [InventoryService],
})
export class InventoryModule {}
