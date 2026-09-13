import { Controller, Get, Param, Query } from "@nestjs/common";
import { ShelvesService } from "./shelves.service";

@Controller({ path: "shelves", version: "1" })
export class ShelvesController {
  constructor(private readonly shelves: ShelvesService) {}
  @Get() list(@Query("warehouseId") warehouseId?: string) { return this.shelves.list(warehouseId); }
  @Get(":id") detail(@Param("id") id: string) { return this.shelves.detail(id); }
}
