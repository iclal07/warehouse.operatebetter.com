"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../database/prisma.service");
let StockMovementsController = class StockMovementsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(productId, warehouseId, type) {
        return this.prisma.stockMovement.findMany({
            where: {
                productId,
                type,
                OR: warehouseId ? [{ sourceWarehouseId: warehouseId }, { targetWarehouseId: warehouseId }] : undefined,
            },
            include: {
                product: true, user: true, sourceWarehouse: true, sourceShelf: true,
                targetWarehouse: true, targetShelf: true,
            },
            take: 100,
            orderBy: { createdAt: "desc" },
        });
    }
};
exports.StockMovementsController = StockMovementsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("productId")),
    __param(1, (0, common_1.Query)("warehouseId")),
    __param(2, (0, common_1.Query)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], StockMovementsController.prototype, "list", null);
exports.StockMovementsController = StockMovementsController = __decorate([
    (0, common_1.Controller)({ path: "stock-movements", version: "1" }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockMovementsController);
//# sourceMappingURL=stock-movements.controller.js.map