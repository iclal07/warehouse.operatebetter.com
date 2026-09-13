import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { ProductsModule } from "./modules/products/products.module";
import { WarehousesModule } from "./modules/warehouses/warehouses.module";
import { ShelvesModule } from "./modules/shelves/shelves.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { OperationsModule } from "./modules/operations/operations.module";
import { CatalogModule } from "./modules/catalog/catalog.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    ProductsModule,
    WarehousesModule,
    ShelvesModule,
    InventoryModule,
    DashboardModule,
    OperationsModule,
    CatalogModule,
  ],
})
export class AppModule {}
