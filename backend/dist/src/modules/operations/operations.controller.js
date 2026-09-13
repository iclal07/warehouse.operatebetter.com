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
exports.StockCountsController = exports.TransfersController = exports.DispatchesController = exports.ReceiptsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const inventory_operation_dto_1 = require("../inventory/dto/inventory-operation.dto");
const inventory_service_1 = require("../inventory/inventory.service");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let ReceiptsController = class ReceiptsController {
    inventory;
    prisma;
    constructor(inventory, prisma) {
        this.inventory = inventory;
        this.prisma = prisma;
    }
    list() { return this.prisma.goodsReceipt.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
    create(dto, userId) { dto.userId = userId; return this.inventory.completeReceipt(dto); }
};
exports.ReceiptsController = ReceiptsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.ReceiptDocumentDto, String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "create", null);
exports.ReceiptsController = ReceiptsController = __decorate([
    (0, common_1.Controller)({ path: "receipts", version: "1" }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, prisma_service_1.PrismaService])
], ReceiptsController);
let DispatchesController = class DispatchesController {
    inventory;
    prisma;
    constructor(inventory, prisma) {
        this.inventory = inventory;
        this.prisma = prisma;
    }
    list() { return this.prisma.goodsDispatch.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
    create(dto, userId) { dto.userId = userId; return this.inventory.completeDispatch(dto); }
};
exports.DispatchesController = DispatchesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DispatchesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.DispatchDocumentDto, String]),
    __metadata("design:returntype", void 0)
], DispatchesController.prototype, "create", null);
exports.DispatchesController = DispatchesController = __decorate([
    (0, common_1.Controller)({ path: "dispatches", version: "1" }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, prisma_service_1.PrismaService])
], DispatchesController);
let TransfersController = class TransfersController {
    inventory;
    prisma;
    constructor(inventory, prisma) {
        this.inventory = inventory;
        this.prisma = prisma;
    }
    list() { return this.prisma.stockTransfer.findMany({ include: { items: { include: { product: true } }, sourceWarehouse: true, targetWarehouse: true }, orderBy: { createdAt: "desc" } }); }
    create(dto, userId) { dto.userId = userId; return this.inventory.completeTransfer(dto); }
};
exports.TransfersController = TransfersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransfersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.TransferDocumentDto, String]),
    __metadata("design:returntype", void 0)
], TransfersController.prototype, "create", null);
exports.TransfersController = TransfersController = __decorate([
    (0, common_1.Controller)({ path: "transfers", version: "1" }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, prisma_service_1.PrismaService])
], TransfersController);
let StockCountsController = class StockCountsController {
    inventory;
    prisma;
    constructor(inventory, prisma) {
        this.inventory = inventory;
        this.prisma = prisma;
    }
    list() { return this.prisma.stockCount.findMany({ include: { items: { include: { product: true, shelf: true } }, warehouse: true }, orderBy: { createdAt: "desc" } }); }
    create(dto, userId) { dto.userId = userId; return this.inventory.completeCount(dto); }
};
exports.StockCountsController = StockCountsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockCountsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_operation_dto_1.CountDocumentDto, String]),
    __metadata("design:returntype", void 0)
], StockCountsController.prototype, "create", null);
exports.StockCountsController = StockCountsController = __decorate([
    (0, common_1.Controller)({ path: "stock-counts", version: "1" }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, prisma_service_1.PrismaService])
], StockCountsController);
//# sourceMappingURL=operations.controller.js.map