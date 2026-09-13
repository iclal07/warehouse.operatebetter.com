import { Controller, Get, Param } from "@nestjs/common";
import { WarehousesService } from "./warehouses.service";

@Controller({ path: "warehouses", version: "1" })
export class WarehousesController {
  constructor(private readonly warehouses: WarehousesService) {}

  @Get()
  list() {
    return this.warehouses.list();
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.warehouses.detail(id);
  }
}
