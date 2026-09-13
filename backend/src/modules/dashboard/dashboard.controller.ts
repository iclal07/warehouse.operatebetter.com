import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller({ path: "dashboard", version: "1" })
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}
  @Get() overview() { return this.dashboard.overview(); }
}
