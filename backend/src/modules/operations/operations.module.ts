import { Module } from "@nestjs/common";
import { InventoryModule } from "../inventory/inventory.module";
import { DispatchesController, ReceiptsController, StockCountsController, TransfersController } from "./operations.controller";

@Module({
  imports: [InventoryModule],
  controllers: [ReceiptsController, DispatchesController, TransfersController, StockCountsController],
})
export class OperationsModule {}
